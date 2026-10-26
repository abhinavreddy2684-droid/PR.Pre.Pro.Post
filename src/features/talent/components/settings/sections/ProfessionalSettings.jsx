import { useEffect, useState } from "react";
import Field from "@/features/talent/components/settings/fields/Field";
import SaveButton from "@/features/talent/components/settings/fields/SaveButton";
import FloatingCard from "@/features/talent/components/settings/fields/FloatingCard";

export default function ProfessionalSettings({ settings, onSave }) {
  const [draft, setDraft] = useState(settings);
  const [saved, setSaved] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- re-syncs the local draft when the panel reloads settings; Phase 4 replaces this with a key-based reset.
  useEffect(() => setDraft(settings), [settings]);
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const save = () => {
    onSave(draft);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1400);
  };
  return (
    <div className="space-y-5">
      <FloatingCard
        title="Professional identity"
        description="Keep the information recruiters see on your public talent profile accurate and current."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Professional name"
            value={draft.name}
            onChange={(value) => update("name", value)}
            placeholder="Your professional name"
          />
          <Field
            label="Location"
            value={draft.location}
            onChange={(value) => update("location", value)}
            placeholder="City, country"
          />
          <Field
            label="Experience"
            value={draft.experience}
            onChange={(value) => update("experience", value)}
            placeholder="e.g. 8 years"
          />
        </div>
        <div className="mt-5">
          <Field
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
