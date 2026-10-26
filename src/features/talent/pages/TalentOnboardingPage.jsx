import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/sections/hero/HeroSection";
import useOnboardingForm, { STEP_COMPLETE } from "@/features/talent/hooks/useOnboardingForm";
import OnboardingShell from "@/features/talent/components/onboarding/OnboardingShell";
import IdentityStep from "@/features/talent/components/onboarding/IdentityStep";
import CraftStep from "@/features/talent/components/onboarding/CraftStep";
import LocationStep from "@/features/talent/components/onboarding/LocationStep";
import OnboardingComplete from "@/features/talent/components/onboarding/OnboardingComplete";

export default function TalentOnboardingPage() {
  const navigate = useNavigate();
  const form = useOnboardingForm();
  const { step, profile } = form;

  if (step === 0) {
    return <HeroSection variant="onboarding" onPrimaryAction={() => form.goTo(1)} />;
  }

  if (step === STEP_COMPLETE) {
    return <OnboardingComplete profile={profile} onEnter={() => navigate("/talent")} />;
  }

  return (
    <OnboardingShell step={step} onBack={form.goBack}>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <IdentityStep
            key="identity"
            profile={profile}
            updateProfile={form.updateProfile}
            onPhotoChange={form.setPhoto}
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
            onContinue={() => form.goTo(STEP_COMPLETE)}
          />
        )}
      </AnimatePresence>
    </OnboardingShell>
  );
}
