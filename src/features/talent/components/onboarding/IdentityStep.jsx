import { useRef } from "react";
import { ArrowRight, Upload, UserRound } from "lucide-react";
import Button from "@/components/ui/Button";
import StepFrame from "@/features/talent/components/onboarding/StepFrame";
import Field from "@/features/talent/components/onboarding/Field";

export default function IdentityStep({ profile, updateProfile, onContinue }) {
  const inputRef = useRef(null);
  const canContinue = profile.fullName.trim().length > 1;

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    updateProfile("photo", URL.createObjectURL(file));
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
      description="Start with the name you want the cinema world to know you by. Your profile photo is optional — you can add or change it later."
    >
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="group relative mx-auto flex aspect-[4/5] w-full max-w-[290px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-dashed border-white/15 bg-white/[0.025] text-center transition-all hover:border-amber-400/50 hover:bg-amber-500/[0.04]"
        >
          {profile.photo ? (
            <img
              src={profile.photo}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <>
              <span className="grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-amber-300">
                <UserRound size={28} strokeWidth={1.4} />
              </span>
              <span className="mt-5 text-sm font-medium text-white/75">Add a profile photo</span>
              <span className="mt-2 text-xs text-white/30">Optional — you can do this later</span>
            </>
          )}
          <span className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-black/60 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/65 opacity-0 backdrop-blur-xl transition-opacity group-hover:opacity-100">
            <Upload size={13} />
            {profile.photo ? "Change photo" : "Choose photo"}
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhoto}
          />
        </button>

        <div className="space-y-5">
          <Field
            label="Full name"
            required
            value={profile.fullName}
            onChange={(event) => updateProfile("fullName", event.target.value)}
            placeholder="Enter your full name"
            autoFocus
          />
          <Field
            label="Professional name"
            optional
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
