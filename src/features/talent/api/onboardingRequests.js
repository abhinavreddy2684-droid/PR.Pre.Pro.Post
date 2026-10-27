/**
 * The one place the onboarding form becomes API payloads.
 * @param {typeof import("@/features/talent/components/onboarding/steps").INITIAL_PROFILE} profile
 * @returns {{
 *   talent: { full_name: string, professional_name: string, city_id: string | null },
 *   crafts: { primary: string, supporting: string[] },
 * }}
 */
export function toOnboardingRequests(profile) {
  return {
    talent: {
      full_name: profile.fullName.trim(),
      professional_name: profile.professionalName.trim(),
      city_id: profile.city || null,
    },
    crafts: {
      primary: profile.primaryCraft,
      supporting: profile.supportingCrafts.filter((slug) => slug !== profile.primaryCraft),
    },
  };
}

/** The `talent` fields that differ from what the server already has (null when none do). */
export function changedTalentFields(existing, talent) {
  const current = {
    full_name: existing.full_name,
    professional_name: existing.professional_name,
    city_id: existing.city?.id ?? null,
  };
  const changes = Object.fromEntries(
    Object.entries(talent).filter(([field, value]) => current[field] !== value),
  );
  return Object.keys(changes).length ? changes : null;
}
