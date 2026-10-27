import { useState } from "react";
import { INITIAL_PROFILE } from "@/features/talent/components/onboarding/steps";

/** Step 0 is the hero, 1-3 are the form steps. */
export const STEP_HERO = 0;

/** State for the talent onboarding flow: the current step and the profile being built. */
export default function useOnboardingForm() {
  const [step, setStep] = useState(STEP_HERO);
  const [profile, setProfile] = useState(INITIAL_PROFILE);

  const updateProfile = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const selectPrimaryCraft = (slug) => {
    setProfile((current) => ({
      ...current,
      primaryCraft: slug,
      supportingCrafts: current.supportingCrafts.filter((item) => item !== slug),
    }));
  };

  const toggleSupportingCraft = (slug) => {
    setProfile((current) => ({
      ...current,
      supportingCrafts: current.supportingCrafts.includes(slug)
        ? current.supportingCrafts.filter((item) => item !== slug)
        : [...current.supportingCrafts, slug],
    }));
  };

  /** Choosing a state clears the city, since cities belong to a state. */
  const selectState = (state) => {
    setProfile((current) => ({ ...current, state, city: "" }));
  };

  return {
    step,
    profile,
    goTo: setStep,
    goBack: () => setStep((current) => current - 1),
    updateProfile,
    selectPrimaryCraft,
    toggleSupportingCraft,
    selectState,
  };
}
