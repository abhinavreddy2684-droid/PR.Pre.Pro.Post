import { useState } from "react";
import SettingsField from "@/features/talent/components/settings/fields/SettingsField";
import SettingsModal from "@/features/talent/components/settings/fields/SettingsModal";

export default function ExperienceEditor({ entry, onClose, onSave }) {
  const [draft, setDraft] = useState(entry);
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  return (
    <SettingsModal
      eyebrow="Experience & credits"
      title={entry.index === -1 ? "Add experience" : "Edit experience"}
      widthClass="max-w-2xl"
      saveLabel="Save experience"
      onClose={onClose}
      onSave={() => onSave(draft)}
    >
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <SettingsField
          label="Period"
          value={draft.period}
          onChange={(value) => update("period", value)}
          placeholder="2021 — Present"
        />
        <SettingsField
          label="Role / title"
          value={draft.title}
          onChange={(value) => update("title", value)}
          placeholder="Playback Vocalist"
        />
        <SettingsField
          label="Production / company"
          value={draft.company}
          onChange={(value) => update("company", value)}
          placeholder="Feature Film Production"
        />
        <SettingsField
          label="Craft"
          value={draft.craft}
          onChange={(value) => update("craft", value)}
          placeholder="Playback Singing"
        />
      </div>
      <div className="mt-4">
        <SettingsField
          label="Description"
          value={draft.description}
          onChange={(value) => update("description", value)}
          multiline
          placeholder="Describe your contribution."
        />
      </div>
    </SettingsModal>
  );
}
