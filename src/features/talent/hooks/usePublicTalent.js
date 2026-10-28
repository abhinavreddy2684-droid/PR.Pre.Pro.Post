import { useCallback, useEffect, useState } from "react";
import { isAbortError } from "@/lib/api";
import { getPublicTalent } from "@/features/talent/api/talentSearchApi";

/**
 * Loads GET /api/talent/{id}. `status` is "loading", "ready", "notFound" (404: unknown,
 * unpublished or not a UUID) or "error".
 */
export default function usePublicTalent(id) {
  const [attempt, setAttempt] = useState(0);
  const key = `${id}#${attempt}`;
  const [result, setResult] = useState({ key: null, talent: null, error: null });

  useEffect(() => {
    const controller = new AbortController();
    const resultKey = `${id}#${attempt}`;
    getPublicTalent(id, { signal: controller.signal }).then(
      (talent) => setResult({ key: resultKey, talent, error: null }),
      (error) => {
        if (!isAbortError(error)) setResult({ key: resultKey, talent: null, error });
      },
    );
    return () => controller.abort();
  }, [id, attempt]);

  /** Refetch quietly (no loading state), e.g. before the signed photo URL expires. */
  const reload = useCallback(async () => {
    const talent = await getPublicTalent(id);
    setResult((current) => ({ ...current, talent, error: null }));
  }, [id]);

  let status = "ready";
  if (result.key !== key) status = "loading";
  else if (result.error?.status === 404) status = "notFound";
  else if (result.error) status = "error";

  return {
    status,
    talent: result.key === key ? result.talent : null,
    error: result.error,
    retry: () => setAttempt((value) => value + 1),
    reload,
  };
}
