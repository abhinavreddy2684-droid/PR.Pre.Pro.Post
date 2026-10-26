import { useState } from "react";
import SettingsField from "@/features/talent/components/settings/fields/SettingsField";
import SettingsModal from "@/features/talent/components/settings/fields/SettingsModal";

export default function MediaEditor({ item, onClose, onSave }) {
  const [draft, setDraft] = useState(item);
  return (
    <SettingsModal
      eyebrow="Media management"
      title="Edit media"
      widthClass="max-w-lg"
      saveLabel="Save media"
      onClose={onClose}
      onSave={() => onSave(draft)}
    >
      <div className="mt-7 space-y-4">
        <SettingsField
          label="Title"
          value={draft.title}
          onChange={(value) => setDraft({ ...draft, title: value })}
        />
        <SettingsField
          label="Description"
          value={draft.description}
          onChange={(value) => setDraft({ ...draft, description: value })}
          multiline
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <SettingsField
            label="Type"
            value={draft.type}
            onChange={(value) => setDraft({ ...draft, type: value })}
          />
          <SettingsField
            label="Year"
            value={String(draft.year)}
            onChange={(value) =>
              setDraft({ ...draft, year: Number(value) || new Date().getFullYear() })
            }
          />
        </div>
      </div>
    </SettingsModal>
  );
}
