// PrivateTalent <-> the Professional details form. Only changed fields are sent.

export const PROFESSIONAL_NAME_MAX = 150;
export const BIO_MAX = 1000;
export const YEARS_MAX = 80; // backend: talent_years_experience_sane
export const GENRES_MAX = 20;
export const GENRE_MAX_LENGTH = 40;

/** @param {import("@/lib/types").PrivateTalent} talent */
export function toProfessionalDraft(talent) {
  return {
    professionalName: talent.professional_name ?? "",
    bio: talent.bio ?? "",
    state: talent.city?.state_slug ?? "",
    cityId: talent.city?.id ?? "",
    years:
      talent.years_experience === null || talent.years_experience === undefined
        ? ""
        : String(talent.years_experience),
    genres: talent.genres ?? [],
  };
}

/** Field errors the form can catch before sending. */
export function validateProfessional(draft) {
  const errors = {};
  if (!draft.professionalName.trim()) errors.professional_name = "Enter your professional name.";
  if (draft.state && !draft.cityId) errors.city_id = "Choose a city.";
  if (draft.years !== "") {
    const years = Number(draft.years);
    if (!/^\d+$/.test(draft.years) || years > YEARS_MAX) {
      errors.years_experience = `Enter whole years from 0 to ${YEARS_MAX}.`;
    }
  }
  return errors;
}

const sameList = (a, b) => a.length === b.length && a.every((item, index) => item === b[index]);

/** The PATCH /api/talent/me body for what changed; null when nothing did. */
export function professionalChanges(talent, draft) {
  const before = toProfessionalDraft(talent);
  const changes = {};
  const name = draft.professionalName.trim();
  if (name !== before.professionalName) changes.professional_name = name;
  if (draft.bio !== before.bio) changes.bio = draft.bio;
  if (draft.cityId !== before.cityId) changes.city_id = draft.cityId || null;
  if (draft.years !== before.years) {
    changes.years_experience = draft.years === "" ? null : Number(draft.years);
  }
  if (!sameList(draft.genres, before.genres)) changes.genres = draft.genres;
  return Object.keys(changes).length ? changes : null;
}
