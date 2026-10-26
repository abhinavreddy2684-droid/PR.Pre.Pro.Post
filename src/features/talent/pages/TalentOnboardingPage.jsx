import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/sections/hero/HeroSection";
import { initialProfile } from "@/features/talent/components/onboarding/steps";
import OnboardingShell from "@/features/talent/components/onboarding/OnboardingShell";
import IdentityStep from "@/features/talent/components/onboarding/IdentityStep";
import CraftStep from "@/features/talent/components/onboarding/CraftStep";
import LocationStep from "@/features/talent/components/onboarding/LocationStep";
import Completion from "@/features/talent/components/onboarding/Completion";

export default function TalentOnboardingPage() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState(initialProfile);
  const navigate = useNavigate();

  const updateProfile = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const toggleSupportingCraft = (craft) => {
    setProfile((current) => ({
      ...current,
      supportingCrafts: current.supportingCrafts.includes(craft)
        ? current.supportingCrafts.filter((item) => item !== craft)
        : [...current.supportingCrafts, craft],
    }));
  };

  if (step === 0) {
    return <HeroSection variant="onboarding" onPrimaryAction={() => setStep(1)} />;
  }

  if (step === 4) {
    return <Completion profile={profile} onEnter={() => navigate("/talent")} />;
  }

  return (
    <OnboardingShell
      step={step}
      profile={profile}
      onBack={() => setStep((current) => (current === 1 ? 0 : current - 1))}
    >
      <AnimatePresence mode="wait">
        {step === 1 && (
          <IdentityStep
            key="identity"
            profile={profile}
            updateProfile={updateProfile}
            onContinue={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <CraftStep
            key="craft"
            profile={profile}
            updateProfile={updateProfile}
            toggleSupportingCraft={toggleSupportingCraft}
            onContinue={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <LocationStep
            key="location"
            profile={profile}
            updateProfile={updateProfile}
            onContinue={() => setStep(4)}
          />
        )}
      </AnimatePresence>
    </OnboardingShell>
  );
}
