// Experience (API) <-> the experience editor form.

export const TITLE_MAX = 160;
export const COMPANY_MAX = 160;
export const DESCRIPTION_MAX = 2000;
export const YEAR_MIN = 1900; // backend _YEAR_RANGE
export const YEAR_MAX = 2100;

export const EMPTY_EXPERIENCE = {
  title: "",
  company: "",
  startYear: "",
  endYear: "",
  current: false,
  description: "",
  craft: "",
};

/** @param {import("@/lib/types").Experience} entry */
export function toExperienceDraft(entry) {
  return {
    title: entry.title ?? "",
    company: entry.company ?? "",
    startYear: String(entry.start_year ?? ""),
    endYear: entry.end_year === null || entry.end_year === undefined ? "" : String(entry.end_year),
    current: entry.end_year === null || entry.end_year === undefined,
    description: entry.description ?? "",
    craft: entry.craft ?? "",
  };
}

const isYear = (value) => /^\d{4}$/.test(value) && +value >= YEAR_MIN && +value <= YEAR_MAX;

export function validateExperience(draft) {
  const errors = {};
  if (!draft.title.trim()) errors.title = "Enter a title.";
  if (!isYear(draft.startYear)) {
    errors.start_year = `Enter a year from ${YEAR_MIN} to ${YEAR_MAX}.`;
  }
  if (!draft.current) {
    if (!isYear(draft.endYear)) errors.end_year = "Enter the end year, or mark it as current.";
    else if (isYear(draft.startYear) && +draft.endYear < +draft.startYear) {
      errors.end_year = "The end year cannot be before the start year.";
    }
  }
  return errors;
}

/** The full create body: end_year null means "Present"; craft "" means none. */
export function toExperienceFields(draft) {
  return {
    title: draft.title.trim(),
    company: draft.company.trim(),
    start_year: Number(draft.startYear),
    end_year: draft.current ? null : Number(draft.endYear),
    description: draft.description.trim(),
    craft: draft.craft || null,
  };
}

/** The PATCH body for an existing entry: only what changed; null when nothing did. */
export function experienceChanges(entry, draft) {
  const next = toExperienceFields(draft);
  const before = toExperienceFields(toExperienceDraft(entry));
  const changes = Object.fromEntries(
    Object.entries(next).filter(([field, value]) => before[field] !== value),
  );
  return Object.keys(changes).length ? changes : null;
}
