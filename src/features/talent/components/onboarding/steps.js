export const ONBOARDING_STEPS = [
  { number: "01", label: "Identity" },
  { number: "02", label: "Craft" },
  { number: "03", label: "Location" },
];

export const INITIAL_PROFILE = {
  fullName: "",
  professionalName: "",
  primaryCraft: "", // craft slug
  supportingCrafts: [], // craft slugs
  state: "", // state id (bootstrap locations)
  city: "", // city id, sent as city_id
};

export const MIN_FULL_NAME_LENGTH = 2;
