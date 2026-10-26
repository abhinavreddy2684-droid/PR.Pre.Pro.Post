import { useState } from "react";
import SettingsField from "@/features/talent/components/settings/fields/SettingsField";
import SaveButton from "@/features/talent/components/settings/fields/SaveButton";
import FloatingCard from "@/features/talent/components/settings/fields/FloatingCard";
import useSavedFlash from "@/features/talent/hooks/useSavedFlash";

export default function ProfessionalSettings({ settings, onSave }) {
  const [draft, setDraft] = useState(settings);
  const [saved, flashSaved] = useSavedFlash(1400);
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const save = () => {
    onSave(draft);
    flashSaved();
  };
  return (
    <div className="space-y-5">
      <FloatingCard
        title="Professional identity"
        description="Keep the information recruiters see on your public talent profile accurate and current."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <SettingsField
            label="Professional name"
            value={draft.name}
            onChange={(value) => update("name", value)}
            placeholder="Your professional name"
          />
          <SettingsField
            label="Location"
            value={draft.location}
            onChange={(value) => update("location", value)}
            placeholder="City, country"
          />
          <SettingsField
            label="Experience"
            value={draft.experience}
            onChange={(value) => update("experience", value)}
            placeholder="e.g. 8 years"
          />
        </div>
        <div className="mt-5">
          <SettingsField
            label="Bio"
            value={draft.bio}
            onChange={(value) => update("bio", value)}
            multiline
            placeholder="Tell recruiters what defines your work."
          />
        </div>
      </FloatingCard>
      <div className="flex justify-end">
        <SaveButton onClick={save} saved={saved} />
      </div>
    </div>
  );
}
