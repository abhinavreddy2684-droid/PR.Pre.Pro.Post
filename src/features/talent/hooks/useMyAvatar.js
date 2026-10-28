import { useCallback, useEffect, useRef, useState } from "react";
import { ApiError, isAbortError, uploadMedia } from "@/lib/api";
import { IMAGE_ONLY, checkMediaFile } from "@/lib/mediaRules";
import {
  getMyAvatar,
  startAvatarUpload,
  withdrawAvatarSubmission,
} from "@/features/talent/api/talentMeApi";
import usePolling from "@/features/talent/hooks/usePolling";
import useRefetchBefore from "@/hooks/useRefetchBefore";

// A new photo is reviewed by staff. These stages mean "on its way".
export const AVATAR_IN_FLIGHT = ["uploading", "processing", "under_review"];

const IDLE_UPLOAD = { phase: null, fraction: 0, error: null };

/**
 * The owner's profile photo and any newer one in progress (GET /api/talent/me/avatar), with
 * upload (steps 1-3 through uploadMedia, then polling while it is uploading or processing),
 * cancel and withdraw. The approved photo stays visible while a new one is reviewed.
 * `onAvatarChanged` runs when the approved photo changes (so the profile can refetch it).
 * @param {{ onAvatarChanged?: () => void }} [options]
 */
export default function useMyAvatar({ onAvatarChanged } = {}) {
  const [state, setState] = useState({
    status: "loading",
    avatar: null,
    submission: null,
    error: null,
  });
  const [upload, setUpload] = useState(IDLE_UPLOAD);
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawError, setWithdrawError] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const controller = useRef(null);
  const approvedId = useRef(undefined);
  const changed = useRef(onAvatarChanged);

  useEffect(() => {
    changed.current = onAvatarChanged;
  });

  const apply = useCallback((data) => {
    setState({ status: "ready", avatar: data.avatar, submission: data.submission, error: null });
    const id = data.avatar?.id ?? null;
    if (approvedId.current !== undefined && approvedId.current !== id) changed.current?.();
    approvedId.current = id;
  }, []);

  const reload = useCallback(async () => apply(await getMyAvatar()), [apply]);

  useEffect(() => {
    let active = true;
    getMyAvatar().then(
      (data) => active && apply(data),
      (error) => active && setState({ status: "error", avatar: null, submission: null, error }),
    );
    return () => {
      active = false;
    };
  }, [attempt, apply]);

  const stage = state.submission?.stage ?? null;
  usePolling(stage === "uploading" || stage === "processing", async (signal) => {
    apply(await getMyAvatar({ signal }));
  });
  useRefetchBefore(state.avatar?.urls?.expires_at, () => reload().catch(() => {}));

  const startUpload = async (file) => {
    const checked = checkMediaFile(file, IMAGE_ONLY);
    if (!checked.ok) {
      setUpload({
        ...IDLE_UPLOAD,
        error: new ApiError({ status: 400, code: "invalid_file", message: checked.message }),
      });
      return false;
    }
    const abort = new AbortController();
    controller.current = abort;
    setUpload({ phase: "uploading", fraction: 0, error: null });
    try {
      await uploadMedia({
        start: () => startAvatarUpload({ content_type: checked.contentType, size: file.size }),
        file,
        contentType: checked.contentType,
        onTicket: (ticket) =>
          setState((current) => ({ ...current, submission: ticket.submission })),
        onProgress: ({ fraction }) => setUpload((current) => ({ ...current, fraction })),
        onPhase: (phase) => setUpload((current) => ({ ...current, phase })),
        signal: abort.signal,
      });
      setUpload(IDLE_UPLOAD);
      await reload();
      return true;
    } catch (error) {
      setUpload({ ...IDLE_UPLOAD, error: isAbortError(error) ? null : error });
      await reload().catch(() => {});
      return false;
    } finally {
      controller.current = null;
    }
  };

  const withdraw = async () => {
    setWithdrawing(true);
    setWithdrawError(null);
    try {
      await withdrawAvatarSubmission();
      await reload();
    } catch (error) {
      setWithdrawError(error);
    } finally {
      setWithdrawing(false);
    }
  };

  return {
    status: state.status,
    error: state.error,
    avatar: state.avatar,
    submission: state.submission,
    stage,
    upload,
    uploading: upload.phase !== null,
    startUpload,
    cancelUpload: () => controller.current?.abort(),
    withdraw,
    withdrawing,
    withdrawError,
    dismissUploadError: () => setUpload(IDLE_UPLOAD),
    retry: () => {
      setState({ status: "loading", avatar: null, submission: null, error: null });
      setAttempt((value) => value + 1);
    },
    reload,
  };
}
