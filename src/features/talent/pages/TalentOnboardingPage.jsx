import { AnimatePresence } from "framer-motion";
import HeroSection from "@/components/sections/hero/HeroSection";
import useOnboardingForm from "@/features/talent/hooks/useOnboardingForm";
import useOnboardingSubmit from "@/features/talent/hooks/useOnboardingSubmit";
import OnboardingShell from "@/features/talent/components/onboarding/OnboardingShell";
import IdentityStep from "@/features/talent/components/onboarding/IdentityStep";
import CraftStep from "@/features/talent/components/onboarding/CraftStep";
import LocationStep from "@/features/talent/components/onboarding/LocationStep";

/** Signed-in only (see routes). Finishing submits to the API and opens /talent/me. */
export default function TalentOnboardingPage() {
  const form = useOnboardingForm();
  const submission = useOnboardingSubmit();
  const { step, profile } = form;

  if (step === 0) {
    return <HeroSection variant="onboarding" onPrimaryAction={() => form.goTo(1)} />;
  }

  return (
    <OnboardingShell step={step} onBack={form.goBack}>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <IdentityStep
            key="identity"
            profile={profile}
            photoUrl={form.photoUrl}
            onPhotoChange={form.setPhoto}
            updateProfile={form.updateProfile}
            onContinue={() => form.goTo(2)}
          />
        )}

        {step === 2 && (
          <CraftStep
            key="craft"
            profile={profile}
            selectPrimaryCraft={form.selectPrimaryCraft}
            toggleSupportingCraft={form.toggleSupportingCraft}
            onContinue={() => form.goTo(3)}
          />
        )}

        {step === 3 && (
          <LocationStep
            key="location"
            profile={profile}
            updateProfile={form.updateProfile}
            selectState={form.selectState}
            pending={submission.pending}
            error={submission.error}
            photoProgress={submission.photoProgress}
            onFinish={() => submission.submit(profile)}
          />
        )}
      </AnimatePresence>
    </OnboardingShell>
  );
}
