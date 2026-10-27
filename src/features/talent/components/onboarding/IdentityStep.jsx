import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import StepFrame from "@/features/talent/components/onboarding/StepFrame";
import UnderlineField from "@/features/talent/components/onboarding/UnderlineField";
import { MIN_FULL_NAME_LENGTH } from "@/features/talent/components/onboarding/steps";

// Both names are required by the backend (TalentCreate), with a 150-character limit.
const NAME_MAX_LENGTH = 150;

export default function IdentityStep({ profile, updateProfile, onContinue }) {
  const canContinue =
    profile.fullName.trim().length >= MIN_FULL_NAME_LENGTH &&
    profile.professionalName.trim().length > 0;

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
      description="Start with your name and the name the cinema world knows you by. You can add a profile photo later."
    >
      <div className="max-w-2xl space-y-5">
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
    </StepFrame>
  );
}
