import { useRef, useState } from "react";
import { ArrowRight, Upload, UserRound, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { IMAGE_ONLY, acceptFor, checkMediaFile } from "@/lib/mediaRules";
import StepFrame from "@/features/talent/components/onboarding/StepFrame";
import UnderlineField from "@/features/talent/components/onboarding/UnderlineField";
import { MIN_FULL_NAME_LENGTH } from "@/features/talent/components/onboarding/steps";

// Both names are required by the backend (TalentCreate), with a 150-character limit.
const NAME_MAX_LENGTH = 150;

export default function IdentityStep({
  profile,
  photoUrl,
  onPhotoChange,
  updateProfile,
  onContinue,
}) {
  const inputRef = useRef(null);
  const [photoError, setPhotoError] = useState("");
  const canContinue =
    profile.fullName.trim().length >= MIN_FULL_NAME_LENGTH &&
    profile.professionalName.trim().length > 0;

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const checked = checkMediaFile(file, IMAGE_ONLY);
    setPhotoError(checked.ok ? "" : checked.message);
    if (checked.ok) onPhotoChange(file);
  };

  return (
    <StepFrame
      eyebrow="01 — Identity"
      title={
        <>
          WHO ARE
          <br />
          YOU?
        </>
      }
      description="Start with your name and the name the cinema world knows you by. A profile photo is optional: you can add or change it later."
    >
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <div className="mx-auto w-full max-w-[290px]">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="group relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-dashed border-white/15 bg-white/[0.025] text-center transition-all hover:border-amber-400/50 hover:bg-amber-500/[0.04]"
          >
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Your chosen profile photo"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <>
                <span className="grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-amber-300">
                  <UserRound size={28} strokeWidth={1.4} />
                </span>
                <span className="mt-5 text-sm font-medium text-white/75">Add a profile photo</span>
                <span className="mt-2 px-4 text-xs text-white/40">
                  Optional. JPEG, PNG or WebP up to 10 MB.
                </span>
              </>
            )}
            <span className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-black/60 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/65 opacity-0 backdrop-blur-xl transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <Upload size={13} />
              {photoUrl ? "Change photo" : "Choose photo"}
            </span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept={acceptFor(IMAGE_ONLY)}
            className="sr-only"
            tabIndex={-1}
            aria-label="Choose a profile photo"
            onChange={handlePhoto}
          />
          {photoUrl && (
            <button
              type="button"
              onClick={() => {
                setPhotoError("");
                onPhotoChange(null);
              }}
              className="mt-3 inline-flex items-center gap-2 text-xs text-white/45 transition hover:text-amber-300"
            >
              <X size={13} /> Remove photo
            </button>
          )}
          {photoUrl && (
            <p className="mt-2 text-xs leading-5 text-white/40">
              It is uploaded when you finish and appears on your profile after review.
            </p>
          )}
          {photoError && (
            <p role="alert" className="mt-3 text-xs leading-5 text-red-300">
              {photoError}
            </p>
          )}
        </div>

        <div className="space-y-5">
          <UnderlineField
            label="Full name"
            hint="Private. Never shown on your public profile."
            required
            maxLength={NAME_MAX_LENGTH}
            value={profile.fullName}
            onChange={(event) => updateProfile("fullName", event.target.value)}
            placeholder="Enter your full name"
            autoFocus
          />
          <UnderlineField
            label="Professional name"
            hint="Shown on your public profile and in search."
            required
            maxLength={NAME_MAX_LENGTH}
            value={profile.professionalName}
            onChange={(event) => updateProfile("professionalName", event.target.value)}
            placeholder="The name you are professionally known by"
          />

          <div className="pt-3">
            <Button
              disabled={!canContinue}
              onClick={onContinue}
              className="inline-flex items-center gap-3 disabled:cursor-not-allowed disabled:opacity-35"
            >
              Continue
              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </div>
    </StepFrame>
  );
}
