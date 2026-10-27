import { useState } from "react";
import { SETTINGS_SECTIONS } from "@/features/talent/components/settings/settingsConfig";

const DEFAULT_SECTION = "professional";

const validSection = (id) =>
  SETTINGS_SECTIONS.some((section) => section.id === id) ? id : DEFAULT_SECTION;

/**
 * Which settings section is shown. Every time the panel opens (or is asked to open on another
 * section) `session` increases, so sections remount with drafts taken from the current profile.
 * @param {boolean} open
 * @param {string} initialSection
 */
export default function useTalentSettings(open, initialSection) {
  const [selected, setSelected] = useState(() => validSection(initialSection));
  const [session, setSession] = useState(0);
  const [seen, setSeen] = useState({ open, initialSection });

  // Adjusting state while rendering (instead of in an effect) so the first frame is already fresh.
  if (seen.open !== open || seen.initialSection !== initialSection) {
    setSeen({ open, initialSection });
    if (open) {
      setSelected(validSection(initialSection));
      setSession((current) => current + 1);
    }
  }

  return { selected, setSelected, session };
}
