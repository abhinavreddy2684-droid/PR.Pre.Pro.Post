import talents from "./talents";

/** All talents. The first entry is the signed-in owner (see getOwnerTalent). */
export const getTalents = () => talents;

export const getTalentById = (id) => talents.find((talent) => String(talent.id) === String(id));

export { getOwnerTalent } from "./ownerTalent";
export { getInitialSettings, DEFAULT_NOTIFICATIONS } from "./ownerSettings";
export { MEDIA_SEED } from "./mediaSeed";
export { SETTINGS_STORAGE_KEY, readStoredSettings, saveStoredSettings } from "./settingsStorage";
