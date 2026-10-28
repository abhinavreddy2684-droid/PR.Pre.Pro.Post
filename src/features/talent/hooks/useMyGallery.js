import { useCallback, useEffect, useRef, useState } from "react";
import { ApiError, isAbortError, uploadMedia, userMessage } from "@/lib/api";
import { checkMediaFile } from "@/lib/mediaRules";
import {
  addGalleryLink,
  deleteGalleryItem,
  getMyGallery,
  getMyGalleryItem,
  startGalleryUpload,
  updateGalleryItem,
} from "@/features/talent/api/talentMeApi";
import { IN_FLIGHT_STAGES, countsAgainstLimit } from "@/features/talent/api/galleryRules";
import usePolling from "@/features/talent/hooks/usePolling";
import useRefetchBefore from "@/hooks/useRefetchBefore";

/**
 * The owner's gallery (GET /api/talent/me/gallery, every stage, ordered by position).
 * - Items uploading or processing are polled every 2.5 s, and polling stops on any other stage
 *   and on unmount.
 * - `addFile` starts an upload and resolves once the server accepted it; the transfer carries
 *   on in the background with progress in `uploads[itemId]` and failures in `failures`.
 * - `addLink`, `update`, `remove` and `move` change the gallery and refresh the list.
 * Signed file URLs are refetched before they expire.
 */
export default function useMyGallery() {
  const [state, setState] = useState({ status: "loading", items: [], error: null });
  const [uploads, setUploads] = useState({});
  const [failures, setFailures] = useState([]);
  const [attempt, setAttempt] = useState(0);
  const aborts = useRef(new Map());

  const applyItems = useCallback((items) => setState({ status: "ready", items, error: null }), []);
  const reload = useCallback(async () => applyItems(await getMyGallery()), [applyItems]);

  useEffect(() => {
    let active = true;
    getMyGallery().then(
      (items) => active && applyItems(items),
      (error) => active && setState({ status: "error", items: [], error }),
    );
    return () => {
      active = false;
    };
  }, [attempt, applyItems]);

  // Abort transfers that are still running when the owner page goes away.
  useEffect(() => {
    const running = aborts.current;
    return () => running.forEach((abort) => abort.abort());
  }, []);

  const inFlight = state.items.filter((item) => IN_FLIGHT_STAGES.includes(item.stage));
  usePolling(inFlight.length > 0, async (signal) => {
    const ids = inFlight.map((item) => item.id);
    const fresh = await Promise.all(
      ids.map((id) => getMyGalleryItem(id, { signal }).catch(() => null)),
    );
    const byId = new Map(fresh.filter(Boolean).map((item) => [item.id, item]));
    if (byId.size === 0) return;
    setState((current) => ({
      ...current,
      items: current.items.map((item) => byId.get(item.id) ?? item),
    }));
  });

  const earliestExpiry = state.items
    .map((item) => item.urls?.expires_at)
    .filter(Boolean)
    .sort()[0];
  useRefetchBefore(earliestExpiry, () => reload().catch(() => {}));

  const setUpload = (id, changes) =>
    setUploads((current) =>
      current[id] ? { ...current, [id]: { ...current[id], ...changes } } : current,
    );

  const addFile = (file, fields) =>
    new Promise((resolveStarted, rejectStarted) => {
      const checked = checkMediaFile(file);
      if (!checked.ok) {
        rejectStarted(
          new ApiError({ status: 400, code: "invalid_file", message: checked.message }),
        );
        return;
      }
      const abort = new AbortController();
      let itemId = null;
      uploadMedia({
        start: async () => {
          try {
            const ticket = await startGalleryUpload({
              ...fields,
              content_type: checked.contentType,
              size: file.size,
            });
            resolveStarted();
            return ticket;
          } catch (error) {
            rejectStarted(error);
            throw error;
          }
        },
        file,
        contentType: checked.contentType,
        onTicket: (ticket) => {
          itemId = ticket.item.id;
          aborts.current.set(itemId, abort);
          setState((current) => ({ ...current, items: [...current.items, ticket.item] }));
          setUploads((current) => ({ ...current, [itemId]: { phase: "uploading", fraction: 0 } }));
        },
        onProgress: ({ fraction }) => itemId && setUpload(itemId, { fraction }),
        onPhase: (phase) => itemId && setUpload(itemId, { phase }),
        signal: abort.signal,
      })
        .catch((error) => {
          // A start failure was already reported to the dialog that asked for the upload.
          if (error?.step === "start" || isAbortError(error)) return;
          setFailures((current) => [
            ...current,
            {
              key: itemId ?? crypto.randomUUID(),
              title: fields.title,
              message: userMessage(error),
            },
          ]);
        })
        .finally(async () => {
          if (itemId) {
            aborts.current.delete(itemId);
            setUploads((current) => {
              const rest = { ...current };
              delete rest[itemId];
              return rest;
            });
          }
          await reload().catch(() => {});
        });
    });

  const cancelUpload = (id) => aborts.current.get(id)?.abort();

  const addLink = async (fields) => {
    await addGalleryLink(fields);
    await reload();
  };

  const update = async (id, changes) => {
    const item = await updateGalleryItem(id, changes);
    setState((current) => ({
      ...current,
      items: current.items.map((existing) => (existing.id === id ? item : existing)),
    }));
  };

  const remove = async (id) => {
    await deleteGalleryItem(id);
    await reload();
  };

  /** Moves an item one place up or down by rewriting `position` on the items that changed. */
  const move = async (id, direction) => {
    const order = state.items.map((item) => item.id);
    const from = order.indexOf(id);
    const to = from + direction;
    if (from < 0 || to < 0 || to >= order.length) return;
    [order[from], order[to]] = [order[to], order[from]];
    const byId = new Map(state.items.map((item) => [item.id, item]));
    // A rejected item cannot be edited (409 item_rejected), so it keeps its position.
    const changed = order.filter(
      (itemId, index) =>
        byId.get(itemId).stage !== "rejected" && byId.get(itemId).position !== index,
    );
    try {
      await Promise.all(
        changed.map((itemId) => updateGalleryItem(itemId, { position: order.indexOf(itemId) })),
      );
    } finally {
      await reload();
    }
  };

  return {
    status: state.status,
    error: state.error,
    items: state.items,
    slotsUsed: state.items.filter(countsAgainstLimit).length,
    uploads,
    failures,
    dismissFailure: (key) => setFailures((current) => current.filter((item) => item.key !== key)),
    addFile,
    addLink,
    update,
    remove,
    move,
    cancelUpload,
    reload,
    retry: () => {
      setState({ status: "loading", items: [], error: null });
      setAttempt((value) => value + 1);
    },
  };
}
