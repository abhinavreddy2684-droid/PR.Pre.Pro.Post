import { useState } from "react";
import { getInitialSettings, saveStoredSettings } from "@/features/talent/data";
import { SETTINGS_SECTIONS } from "@/features/talent/components/settings/settingsConfig";

const DEFAULT_SECTION = "professional";

const validSection = (id) =>
  SETTINGS_SECTIONS.some((section) => section.id === id) ? id : DEFAULT_SECTION;

/**
 * State behind the talent settings panel: the settings being edited, the selected section, and
 * a persisting `update(key, value)`. Every time the panel opens (or is asked to open on another
 * section) settings are re-read and `session` increases, so sections remount with fresh drafts.
 * @param {boolean} open
 * @param {string} initialSection
 */
export default function useTalentSettings(open, initialSection) {
  const [settings, setSettings] = useState(getInitialSettings);
  const [selected, setSelected] = useState(() => validSection(initialSection));
  const [session, setSession] = useState(0);
  const [seen, setSeen] = useState({ open, initialSection });

  // Adjusting state while rendering (instead of in an effect) so the first frame is already fresh.
  if (seen.open !== open || seen.initialSection !== initialSection) {
    setSeen({ open, initialSection });
    if (open) {
      setSettings(getInitialSettings());
      setSelected(validSection(initialSection));
      setSession((current) => current + 1);
    }
  }

  const update = (key, value) =>
    setSettings((current) => {
      const next = { ...current, [key]: value };
      saveStoredSettings(next);
      return next;
    });

  return { settings, selected, setSelected, session, update };
}
