// Gallery limits from the API (openapi.yaml / backend settings). The limit on items is not in the
// bootstrap payload, so it is repeated here; a 409 gallery_full carries `details.max_items`.
export const GALLERY_MAX_ITEMS = 10;
export const TITLE_MAX = 160;
export const DESCRIPTION_MAX = 2000;
export const URL_MAX = 1000;
export const YEAR_MIN = 1900;
export const YEAR_MAX = 2100;

/** Stages that mean the item is still being worked on (poll them). */
export const IN_FLIGHT_STAGES = ["uploading", "processing"];

/** Items that use up one of the GALLERY_MAX_ITEMS slots (rejected and failed ones do not). */
export const countsAgainstLimit = (item) => item.stage !== "rejected" && item.stage !== "failed";

const EMPTY = { title: "", description: "", year: "", craft: "", url: "" };
export const EMPTY_GALLERY_DRAFT = EMPTY;

/** @param {ReturnType<typeof import("./galleryAdapters").toGalleryItem>} item */
export const toGalleryDraft = (item) => ({
  title: item.title,
  description: item.description,
  year: item.year === null ? "" : String(item.year),
  craft: item.craftSlug,
  url: item.externalUrl ?? "",
});

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

/** Client-side checks (the backend stays the authority). `mode`: "link" | "file" | "edit". */
export function validateGalleryDraft(draft, mode) {
  const errors = {};
  if (!draft.title.trim()) errors.title = "Enter a title.";
  if (draft.year !== "") {
    const year = Number(draft.year);
    if (!/^\d{4}$/.test(draft.year) || year < YEAR_MIN || year > YEAR_MAX) {
      errors.year = `Enter a year from ${YEAR_MIN} to ${YEAR_MAX}, or leave it empty.`;
    }
  }
  if (mode === "link") {
    if (!isHttpsUrl(draft.url.trim()))
      errors.external_url = "Enter a link that starts with https://.";
  }
  return errors;
}

/** Fields shared by add-file, add-link and edit requests. */
export const toGalleryFields = (draft) => ({
  title: draft.title.trim(),
  description: draft.description.trim(),
  year: draft.year === "" ? null : Number(draft.year),
  craft: draft.craft || null,
});

/** The PATCH body for an edit: only what changed; null when nothing did. */
export function galleryChanges(item, draft) {
  const next = toGalleryFields(draft);
  const before = toGalleryFields(toGalleryDraft(item));
  const changes = Object.fromEntries(
    Object.entries(next).filter(([field, value]) => before[field] !== value),
  );
  return Object.keys(changes).length ? changes : null;
}
