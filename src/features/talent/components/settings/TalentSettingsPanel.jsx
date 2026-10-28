import { AnimatePresence } from "framer-motion";
import useTalentSettings from "@/features/talent/hooks/useTalentSettings";
import { SETTINGS_SECTIONS } from "@/features/talent/components/settings/settingsConfig";
import SettingsDialog from "@/features/talent/components/settings/SettingsDialog";
import ProfessionalSettings from "@/features/talent/components/settings/sections/ProfessionalSettings";
import CraftSettings from "@/features/talent/components/settings/sections/CraftSettings";
import ExperienceSettings from "@/features/talent/components/settings/sections/ExperienceSettings";
import AvailabilitySettings from "@/features/talent/components/settings/sections/AvailabilitySettings";
import MediaSettings from "@/features/talent/components/settings/sections/MediaSettings";
import NotificationsSettings from "@/features/talent/components/settings/sections/NotificationsSettings";

// The view for each section. Sections read and save the owner profile through useOwnerTalent.
const SECTION_VIEWS = {
  professional: ProfessionalSettings,
  crafts: CraftSettings,
  media: MediaSettings,
  experience: ExperienceSettings,
  calendar: AvailabilitySettings,
  notifications: NotificationsSettings,
};

/**
 * Floating "Talent settings" dialog. Each section saves on its own button straight to the API.
 * Must be rendered inside the owner profile page (it provides the profile).
 * @param {{ open: boolean, onClose: () => void, initialSection?: string }} props
 */
export default function TalentSettingsPanel({ open, onClose, initialSection = "professional" }) {
  const { selected, setSelected, session } = useTalentSettings(open, initialSection);
  const active = SETTINGS_SECTIONS.find((section) => section.id === selected);
  const View = SECTION_VIEWS[selected];

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
          <View key={`${selected}-${session}`} />
        </SettingsDialog>
      )}
    </AnimatePresence>
  );
}
