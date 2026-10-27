import { useEffect, useState } from "react";
import { isApiError } from "@/lib/api";
import { getMyTalent } from "@/features/talent/api/talentMeApi";

/**
 * Loads GET /api/talent/me for the signed-in owner. `status` is "loading", "ready",
 * "noProfile" (403 talent_role_required: onboarding has not created one yet) or "error".
 */
export default function useMyTalent() {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ attempt: -1, talent: null, error: null });

  useEffect(() => {
    let active = true;
    getMyTalent().then(
      (talent) => active && setResult({ attempt, talent, error: null }),
      (error) => active && setResult({ attempt, talent: null, error }),
    );
    return () => {
      active = false;
    };
  }, [attempt]);

  let status = "ready";
  if (result.attempt !== attempt) status = "loading";
  else if (isApiError(result.error, "talent_role_required")) status = "noProfile";
  else if (result.error) status = "error";

  return {
    status,
    talent: result.talent,
    error: result.error,
    retry: () => setAttempt((value) => value + 1),
  };
}
