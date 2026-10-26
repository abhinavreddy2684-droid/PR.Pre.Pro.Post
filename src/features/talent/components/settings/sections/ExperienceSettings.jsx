import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import FloatingCard from "@/features/talent/components/settings/fields/FloatingCard";
import ExperienceEditor from "@/features/talent/components/settings/sections/ExperienceEditor";

export default function ExperienceSettings({ settings, onSave }) {
  const [entries, setEntries] = useState(settings);
  const [editing, setEditing] = useState(null);
  const saveEntries = (next) => {
    setEntries(next);
    onSave(next);
  };
  const empty = { period: "", title: "", company: "", description: "", craft: "" };
  return (
    <div className="space-y-5">
      <FloatingCard
        title="Professional timeline"
        description="Add the experiences and credits that make your career easy to scan."
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setEditing({ ...empty, index: -1 })}
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2.5 text-xs font-bold text-black hover:bg-amber-400"
          >
            <Plus size={14} /> Add experience
          </button>
        </div>
        <div className="mt-5 space-y-2">
          {entries.length ? (
            entries.map((entry, index) => (
              <div
                key={`${entry.title}-${index}`}
                className="flex gap-4 rounded-2xl bg-white/[0.025] p-4"
              >
                <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">
                    {entry.period || "Period not set"}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white/80">
                    {entry.title || "Untitled experience"}
                  </p>
                  <p className="mt-1 text-xs text-white/30">{entry.company}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditing({ ...entry, index })}
                  className="self-start rounded-full bg-white/[0.05] px-3 py-2 text-[10px] font-semibold text-white/50 hover:bg-white/[0.09] hover:text-white"
                >
                  Edit
                </button>
                <button
                  aria-label={`Delete ${entry.title || "experience"}`}
                  type="button"
                  onClick={() => saveEntries(entries.filter((_, itemIndex) => itemIndex !== index))}
                  className="self-start grid h-8 w-8 place-items-center rounded-full bg-white/[0.04] text-white/25 hover:bg-amber-500 hover:text-black"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-xs text-white/30">
              No professional experience added yet.
            </div>
          )}
        </div>
      </FloatingCard>
      {editing && (
        <ExperienceEditor
          entry={editing}
          onClose={() => setEditing(null)}
          onSave={(entry) => {
            const next = [...entries];
            if (entry.index === -1) next.unshift({ ...entry, index: undefined });
            else next[entry.index] = { ...entry, index: undefined };
            saveEntries(next);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
