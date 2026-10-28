import { useRef } from "react";
import { Loader2, Upload, UserRound } from "lucide-react";
import { userMessage } from "@/lib/api";
import { IMAGE_ONLY, acceptFor } from "@/lib/mediaRules";
import { imageUrl } from "@/features/talent/api/talentAdapters";
import { AVATAR_IN_FLIGHT } from "@/features/talent/hooks/useMyAvatar";
import StageBadge from "@/features/talent/components/media/StageBadge";
import StageNotes from "@/features/talent/components/media/StageNotes";
import UploadProgress from "@/features/talent/components/media/UploadProgress";
import FloatingCard from "@/features/talent/components/settings/fields/FloatingCard";
import useOwnerTalent from "@/features/talent/hooks/useOwnerTalent";

const BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-40";

/**
 * Profile photo: upload a new one (reviewed by staff before it shows), see its progress or
 * "in review" state, withdraw it, or read why it was refused. The approved photo stays visible
 * the whole time.
 */
export default function AvatarSettingsCard() {
  const { avatar: photo } = useOwnerTalent();
  const input = useRef(null);
  const approvedUrl = imageUrl(photo.avatar?.urls, "400");
  const inFlight = photo.stage !== null && AVATAR_IN_FLIGHT.includes(photo.stage);
  const showNotes = photo.stage === "rejected" || photo.stage === "failed";

  const choose = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) await photo.startUpload(file);
  };

  if (photo.status === "loading") {
    return (
      <FloatingCard title="Profile photo">
        <p className="text-sm text-white/40">Loading your photo…</p>
      </FloatingCard>
    );
  }
  if (photo.status === "error") {
    return (
      <FloatingCard title="Profile photo">
        <p role="alert" className="text-sm text-red-300">
          {userMessage(photo.error)}
        </p>
        <button
          type="button"
          onClick={photo.retry}
          className={`${BUTTON} mt-3 bg-white/5 text-white/70`}
        >
          Try again
        </button>
      </FloatingCard>
    );
  }

  return (
    <FloatingCard
      title="Profile photo"
      description="JPEG, PNG or WebP up to 10 MB. A new photo is reviewed before it appears; your current photo stays visible meanwhile."
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="grid h-36 w-28 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white/[0.04] text-white/20">
          {approvedUrl ? (
            <img
              src={approvedUrl}
              alt="Your current profile photo"
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound size={40} strokeWidth={1.2} aria-label="No profile photo yet" role="img" />
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          {photo.uploading ? (
            <>
              <UploadProgress
                phase={photo.upload.phase}
                fraction={photo.upload.fraction}
                label="Uploading photo"
              />
              {photo.upload.phase === "uploading" && (
                <button
                  type="button"
                  onClick={photo.cancelUpload}
                  className={`${BUTTON} bg-white/5 text-white/70`}
                >
                  Cancel upload
                </button>
              )}
            </>
          ) : (
            <>
              {inFlight && (
                <div className="space-y-2">
                  <StageBadge stage={photo.stage} />
                  <p role="status" className="text-xs leading-5 text-white/55">
                    {photo.stage === "under_review"
                      ? "Photo in review. It appears on your profile once it is approved."
                      : "Your new photo is being processed."}
                  </p>
                </div>
              )}
              {showNotes && (
                <div className="space-y-2">
                  <StageBadge stage={photo.stage} />
                  <StageNotes
                    stage={photo.stage}
                    moderationReason={photo.submission.moderation_reason}
                    moderationNote={photo.submission.moderation_note}
                    failureReason={photo.submission.failure_reason}
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {!inFlight && (
                  <button
                    type="button"
                    onClick={() => input.current?.click()}
                    className={`${BUTTON} bg-amber-500 text-black hover:bg-amber-400`}
                  >
                    <Upload size={14} />
                    {approvedUrl ? "Replace photo" : "Upload photo"}
                  </button>
                )}
                {inFlight && (
                  <button
                    type="button"
                    onClick={photo.withdraw}
                    disabled={photo.withdrawing}
                    className={`${BUTTON} bg-white/5 text-white/70 hover:text-white`}
                  >
                    {photo.withdrawing && <Loader2 size={14} className="animate-spin" />}
                    Withdraw new photo
                  </button>
                )}
              </div>
            </>
          )}

          {photo.upload.error && (
            <p role="alert" className="text-xs leading-5 text-red-300">
              {userMessage(photo.upload.error)}
            </p>
          )}
          {photo.withdrawError && (
            <p role="alert" className="text-xs leading-5 text-red-300">
              {userMessage(photo.withdrawError)}
            </p>
          )}
          <input
            ref={input}
            type="file"
            accept={acceptFor(IMAGE_ONLY)}
            className="sr-only"
            tabIndex={-1}
            aria-label="Choose a profile photo"
            onChange={choose}
          />
        </div>
      </div>
    </FloatingCard>
  );
}
