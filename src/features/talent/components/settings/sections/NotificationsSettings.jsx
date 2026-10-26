import { useEffect, useState } from "react";
import SaveButton from "@/features/talent/components/settings/fields/SaveButton";
import FloatingCard from "@/features/talent/components/settings/fields/FloatingCard";

export default function NotificationsSettings({ settings, onSave }) {
  const [draft, setDraft] = useState(settings);
  const [saved, setSaved] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- re-syncs the local draft when the panel reloads settings; Phase 4 replaces this with a key-based reset.
  useEffect(() => setDraft(settings), [settings]);
  const rows = [
    {
      key: "opportunities",
      title: "New opportunities",
      body: "Relevant hiring activity and opportunities.",
    },
    {
      key: "profileActivity",
      title: "Profile activity",
      body: "When recruiters interact with your profile or work.",
    },
    {
      key: "platformUpdates",
      title: "Platform updates",
      body: "Product changes and important service announcements.",
    },
  ];
  const save = () => {
    onSave(draft);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1400);
  };
  return (
    <div className="space-y-5">
      <FloatingCard
        title="What should reach you?"
        description="Control the activity that matters to your work."
      >
        <div className="space-y-2">
          {rows.map((row) => (
            <div key={row.key} className="flex items-center gap-4 rounded-2xl bg-white/[0.025] p-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white/75">{row.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/30">{row.body}</p>
              </div>
              <button
                role="switch"
                aria-checked={draft[row.key]}
                onClick={() => setDraft({ ...draft, [row.key]: !draft[row.key] })}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${draft[row.key] ? "bg-amber-500" : "bg-white/10"}`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${draft[row.key] ? "left-6" : "left-1"}`}
                />
              </button>
            </div>
          ))}
        </div>
      </FloatingCard>
      <div className="flex justify-end">
        <SaveButton onClick={save} saved={saved} />
      </div>
    </div>
  );
}
