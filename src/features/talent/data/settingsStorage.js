// The settings panel persists the owner's edits here; the owner talent reads them back.
export const SETTINGS_STORAGE_KEY = "pre-pro-post:talent-settings";

export function readStoredSettings() {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function saveStoredSettings(settings) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* optional persistence */
  }
}
