import { AnimatePresence } from "framer-motion";
import useTalentSettings from "@/features/talent/hooks/useTalentSettings";
import { SETTINGS_SECTIONS } from "@/features/talent/components/settings/settingsConfig";
import SettingsDialog from "@/features/talent/components/settings/SettingsDialog";
import ProfessionalSettings from "@/features/talent/components/settings/sections/ProfessionalSettings";
import CraftSettings from "@/features/talent/components/settings/sections/CraftSettings";
import MediaSettings from "@/features/talent/components/settings/sections/MediaSettings";
import ExperienceSettings from "@/features/talent/components/settings/sections/ExperienceSettings";
import AvailabilitySettings from "@/features/talent/components/settings/sections/AvailabilitySettings";
import NotificationsSettings from "@/features/talent/components/settings/sections/NotificationsSettings";

// Which view renders each section, and which key of the settings object it edits.
const SECTION_VIEWS = {
  professional: { View: ProfessionalSettings, settingsKey: "professional" },
  crafts: { View: CraftSettings, settingsKey: "crafts" },
  media: { View: MediaSettings, settingsKey: "media" },
  experience: { View: ExperienceSettings, settingsKey: "experiences" },
  calendar: { View: AvailabilitySettings, settingsKey: "availability" },
  notifications: { View: NotificationsSettings, settingsKey: "notifications" },
};

/**
 * Floating "Talent settings" dialog. Edits are saved to localStorage section by section.
 * @param {{ open: boolean, onClose: () => void, initialSection?: string }} props
 */
export default function TalentSettingsPanel({ open, onClose, initialSection = "professional" }) {
  const { settings, selected, setSelected, session, update } = useTalentSettings(
    open,
    initialSection,
  );
  const active = SETTINGS_SECTIONS.find((section) => section.id === selected);
  const { View, settingsKey } = SECTION_VIEWS[selected];

  return (
    <AnimatePresence>
      {open && (
        <SettingsDialog
          active={active}
          selected={selected}
          session={session}
          onSelect={setSelected}
          onClose={onClose}
        >
          <View settings={settings[settingsKey]} onSave={(value) => update(settingsKey, value)} />
        </SettingsDialog>
      )}
    </AnimatePresence>
  );
}
