import { useEffect, useRef, useState } from "react";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { isAbortError } from "@/lib/api";
import { fetchTalentPage, searchTalent } from "@/features/talent/api/talentSearchApi";
import { toTalentCard } from "@/features/talent/api/talentAdapters";

const SEARCH_DEBOUNCE_MS = 300;

/**
 * Talent search over GET /api/talent. The text query is debounced; any filter change starts
 * over from the first page (the cursor is reset) and aborts the request it replaces.
 * `loadMore` follows `next` exactly as returned.
 * @param {{ q?: string, craft?: string, state?: string, city?: string, available?: boolean,
 *   limit?: number }} filters
 */
export default function useTalentSearch({ q = "", craft, state, city, available, limit }) {
  const debouncedQ = useDebouncedValue(q.trim(), SEARCH_DEBOUNCE_MS);
  const [attempt, setAttempt] = useState(0);
  const queryKey = JSON.stringify({ q: debouncedQ, craft, state, city, available, limit });
  const key = `${queryKey}#${attempt}`;

  const [page, setPage] = useState({ key: null, results: [], next: null, error: null });
  const [more, setMore] = useState({ loading: false, error: null });
  const moreController = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const pageKey = `${queryKey}#${attempt}`;
    searchTalent(JSON.parse(queryKey), { signal: controller.signal }).then(
      (data) =>
        setPage({
          key: pageKey,
          results: data.results.map(toTalentCard),
          next: data.next,
          error: null,
        }),
      (error) => {
        if (!isAbortError(error)) setPage({ key: pageKey, results: [], next: null, error });
      },
    );
    return () => {
      controller.abort();
      moreController.current?.abort();
    };
  }, [queryKey, attempt]);

  const loadMore = async () => {
    if (!page.next || more.loading) return;
    const controller = new AbortController();
    moreController.current = controller;
    setMore({ loading: true, error: null });
    try {
      const data = await fetchTalentPage(page.next, { signal: controller.signal });
      setPage((current) =>
        current.key === page.key
          ? {
              ...current,
              results: [...current.results, ...data.results.map(toTalentCard)],
              next: data.next,
            }
          : current,
      );
      setMore({ loading: false, error: null });
    } catch (error) {
      if (!isAbortError(error)) setMore({ loading: false, error });
      else setMore({ loading: false, error: null });
    }
  };

  const status = page.key !== key ? "loading" : page.error ? "error" : "ready";

  return {
    status,
    // While a new search loads, the previous results stay on screen (dimmed by the page).
    results: page.results,
    error: page.error,
    hasMore: status === "ready" && Boolean(page.next),
    loadMore,
    loadingMore: more.loading,
    loadMoreError: more.error,
    retry: () => setAttempt((value) => value + 1),
  };
}
