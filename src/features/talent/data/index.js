import talents from "./talents";

/** @returns {import("@/lib/types").Talent | undefined} */
export const getTalentById = (id) => talents.find((talent) => String(talent.id) === String(id));

export { getOwnerTalent } from "./ownerTalent";
export { getInitialSettings, DEFAULT_NOTIFICATIONS } from "./ownerSettings";
export { MEDIA_SEED } from "./mediaSeed";
export { SETTINGS_STORAGE_KEY, readStoredSettings, saveStoredSettings } from "./settingsStorage";
