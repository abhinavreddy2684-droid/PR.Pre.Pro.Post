import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  changedTalentFields,
  toOnboardingRequests,
} from "@/features/talent/api/onboardingRequests";
import {
  completeOnboarding,
  createMyTalent,
  getMyTalent,
  setMyCrafts,
  updateMyTalent,
} from "@/features/talent/api/talentMeApi";

/**
 * Submits onboarding in order: create the profile -> set crafts -> complete, then opens
 * /talent/me. A 409 on create means the profile already exists (an earlier attempt, another tab):
 * it is fetched and the flow continues. After a partial failure, submitting again resumes: the
 * created profile is remembered and only changed fields are patched.
 */
export default function useOnboardingSubmit() {
  const navigate = useNavigate();
  const serverProfile = useRef(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (profile) => {
    const { talent, crafts } = toOnboardingRequests(profile);
    setPending(true);
    setError(null);
    try {
      let current = serverProfile.current;
      if (!current) {
        try {
          current = await createMyTalent(talent);
        } catch (createError) {
          if (createError?.status !== 409) throw createError;
          current = await getMyTalent();
        }
        serverProfile.current = current;
      }

      if (!current.onboarding_completed) {
        const changes = changedTalentFields(current, talent);
        if (changes) serverProfile.current = await updateMyTalent(changes);
        serverProfile.current = await setMyCrafts(crafts);
        serverProfile.current = await completeOnboarding();
      }
      navigate("/talent/me", { replace: true });
    } catch (submitError) {
      setError(submitError);
      setPending(false);
    }
  };

  return { submit, pending, error };
}
