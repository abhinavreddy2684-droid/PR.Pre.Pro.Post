import talents from "./talents";

/** All talents. The first entry is the signed-in owner (see getOwnerTalent). */
export const getTalents = () => talents;

export const getTalentById = (id) => talents.find((talent) => String(talent.id) === String(id));

/** The talent whose profile the owner views at /talent/me. */
export const getOwnerTalent = () => talents[0];

export { MEDIA_SEED } from "./mediaSeed";
export { SETTINGS_STORAGE_KEY, readStoredSettings, saveStoredSettings } from "./settingsStorage";
