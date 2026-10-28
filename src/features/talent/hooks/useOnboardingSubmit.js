import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isApiError, uploadMedia } from "@/lib/api";
import { checkMediaFile, IMAGE_ONLY } from "@/lib/mediaRules";
import {
  changedTalentFields,
  toOnboardingRequests,
} from "@/features/talent/api/onboardingRequests";
import {
  completeOnboarding,
  createMyTalent,
  getMyTalent,
  setMyCrafts,
  startAvatarUpload,
  updateMyTalent,
} from "@/features/talent/api/talentMeApi";

const NO_PHOTO_PROGRESS = { phase: null, fraction: 0 };

/**
 * Submits onboarding in order: create the profile -> set crafts -> upload the optional photo ->
 * complete, then opens /talent/me. A 409 on create means the profile already exists (an earlier
 * attempt, another tab): it is fetched and the flow continues. After a partial failure,
 * submitting again resumes: the created profile is remembered, only changed fields are patched,
 * and a photo that was already sent is not sent twice.
 *
 * The photo never blocks completion: if it cannot be uploaded the profile is completed anyway,
 * and /talent/me is told (`location.state.photo`) so it can say so.
 */
export default function useOnboardingSubmit() {
  const navigate = useNavigate();
  const serverProfile = useRef(null);
  const photoOutcome = useRef(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [photoProgress, setPhotoProgress] = useState(NO_PHOTO_PROGRESS);

  const sendPhoto = async (file) => {
    const checked = checkMediaFile(file, IMAGE_ONLY);
    if (!checked.ok) return "failed";
    try {
      await uploadMedia({
        start: () => startAvatarUpload({ content_type: checked.contentType, size: file.size }),
        file,
        contentType: checked.contentType,
        onProgress: ({ fraction }) => setPhotoProgress((current) => ({ ...current, fraction })),
        onPhase: (phase) => setPhotoProgress((current) => ({ ...current, phase })),
      });
      return "uploaded";
    } catch (photoError) {
      // A photo from an earlier attempt that is still in flight counts as sent.
      return isApiError(photoError, "avatar_submission_open") ? "uploaded" : "failed";
    } finally {
      setPhotoProgress(NO_PHOTO_PROGRESS);
    }
  };

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
        if (profile.photo && photoOutcome.current === null) {
          photoOutcome.current = await sendPhoto(profile.photo);
        }
        serverProfile.current = await completeOnboarding();
      }
      navigate("/talent/me", { replace: true, state: { photo: photoOutcome.current } });
    } catch (submitError) {
      setError(submitError);
      setPending(false);
    }
  };

  return { submit, pending, error, photoProgress };
}
