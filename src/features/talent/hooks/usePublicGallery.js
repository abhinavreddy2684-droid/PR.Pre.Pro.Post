import { useCallback, useEffect, useState } from "react";
import { isAbortError } from "@/lib/api";
import { getPublicGallery } from "@/features/talent/api/publicGalleryApi";
import useRefetchBefore from "@/hooks/useRefetchBefore";

/**
 * Loads a talent's public gallery. `status` is "loading", "ready" or "error". The signed file URLs
 * are fetched again before the earliest one expires, without a loading state.
 */
export default function usePublicGallery(talentId) {
  const [attempt, setAttempt] = useState(0);
  const key = `${talentId}#${attempt}`;
  const [result, setResult] = useState({ key: null, items: [], error: null });

  useEffect(() => {
    const controller = new AbortController();
    const resultKey = `${talentId}#${attempt}`;
    getPublicGallery(talentId, { signal: controller.signal }).then(
      (items) => setResult({ key: resultKey, items, error: null }),
      (error) => {
        if (!isAbortError(error)) setResult({ key: resultKey, items: [], error });
      },
    );
    return () => controller.abort();
  }, [talentId, attempt]);

  const reload = useCallback(async () => {
    const items = await getPublicGallery(talentId);
    setResult((current) => ({ ...current, items, error: null }));
  }, [talentId]);

  const earliestExpiry = result.items
    .map((item) => item.urls?.expires_at)
    .filter(Boolean)
    .sort()[0];
  useRefetchBefore(earliestExpiry, () => reload().catch(() => {}));

  let status = "ready";
  if (result.key !== key) status = "loading";
  else if (result.error) status = "error";

  return {
    status,
    items: result.key === key ? result.items : [],
    error: result.error,
    retry: () => setAttempt((value) => value + 1),
  };
}
