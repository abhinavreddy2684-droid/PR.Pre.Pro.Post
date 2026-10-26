import { useEffect, useRef, useState } from "react";
import { INITIAL_PROFILE } from "@/features/talent/components/onboarding/steps";

/** Step 0 is the hero, 1-3 are the form steps, 4 is the completion screen. */
export const STEP_HERO = 0;
export const STEP_COMPLETE = 4;

/**
 * State for the talent onboarding flow: the current step and the profile being built.
 * Owns the object URL created for the chosen photo and releases it when replaced or unmounted.
 */
export default function useOnboardingForm() {
  const [step, setStep] = useState(STEP_HERO);
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const photoUrl = useRef("");

  useEffect(
    () => () => {
      if (photoUrl.current) URL.revokeObjectURL(photoUrl.current);
    },
    [],
  );

  const updateProfile = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const setPhoto = (file) => {
    if (photoUrl.current) URL.revokeObjectURL(photoUrl.current);
    photoUrl.current = URL.createObjectURL(file);
    updateProfile("photo", photoUrl.current);
  };

  const selectPrimaryCraft = (craft) => {
    setProfile((current) => ({
      ...current,
      primaryCraft: craft,
      supportingCrafts: current.supportingCrafts.filter((item) => item !== craft),
    }));
  };

  const toggleSupportingCraft = (craft) => {
    setProfile((current) => ({
      ...current,
      supportingCrafts: current.supportingCrafts.includes(craft)
        ? current.supportingCrafts.filter((item) => item !== craft)
        : [...current.supportingCrafts, craft],
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
    setPhoto,
    selectPrimaryCraft,
    toggleSupportingCraft,
    selectState,
  };
}
