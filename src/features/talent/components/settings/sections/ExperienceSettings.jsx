import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { formatPeriod } from "@/features/talent/api/talentAdapters";
import {
  createMyExperience,
  deleteMyExperience,
  updateMyExperience,
} from "@/features/talent/api/talentMeApi";
import FloatingCard from "@/features/talent/components/settings/fields/FloatingCard";
import SettingsError from "@/features/talent/components/settings/fields/SettingsError";
import ExperienceEditor from "@/features/talent/components/settings/sections/ExperienceEditor";
import {
  experienceChanges,
  toExperienceFields,
} from "@/features/talent/components/settings/sections/experienceDraft";
import useOwnerTalent from "@/features/talent/hooks/useOwnerTalent";

/**
 * Experience & credits: add, edit and delete through /api/talent/me/experiences, then reload
 * the owner profile so the page shows the result.
 */
export default function ExperienceSettings() {
  const { talent, reload } = useOwnerTalent();
  // null: closed; { entry: null }: adding; { entry }: editing that entry.
  const [editing, setEditing] = useState(null);
  const [confirmingId, setConfirmingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const craftTitles = Object.fromEntries(talent.crafts.map((craft) => [craft.slug, craft.title]));
  const craftOptions = talent.crafts.map((craft) => ({ value: craft.slug, label: craft.title }));

  const save = async (draft) => {
    const entry = editing.entry;
    if (!entry) {
      await createMyExperience(toExperienceFields(draft));
    } else {
      const changes = experienceChanges(entry, draft);
      if (changes) await updateMyExperience(entry.id, changes);
    }
    await reload();
    setEditing(null);
  };

  const remove = async (entry) => {
    setDeletingId(entry.id);
    setDeleteError(null);
    try {
      await deleteMyExperience(entry.id);
      await reload();
      setConfirmingId(null);
    } catch (error) {
      setDeleteError(error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-5">
      <FloatingCard
        title="Professional timeline"
        description="Add the experiences and credits that make your career easy to scan."
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setEditing({ entry: null })}
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2.5 text-xs font-bold text-black hover:bg-amber-400"
          >
            <Plus size={14} /> Add experience
          </button>
        </div>
        {deleteError && (
          <div className="mt-4">
            <SettingsError error={deleteError} />
          </div>
        )}
        <div className="mt-5 space-y-2">
          {talent.experiences.length ? (
            talent.experiences.map((entry) => (
              <div key={entry.id} className="flex flex-wrap gap-4 rounded-2xl bg-white/[0.025] p-4">
                <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">
                    {formatPeriod(entry.start_year, entry.end_year)}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white/80">{entry.title}</p>
                  <p className="mt-1 text-xs text-white/30">
                    {[entry.company, craftTitles[entry.craft]].filter(Boolean).join(" · ")}
                  </p>
                </div>
                {confirmingId === entry.id ? (
                  <div className="flex items-center gap-2 self-start">
                    <span className="text-[11px] text-white/50">Delete this entry?</span>
                    <button
                      type="button"
                      onClick={() => remove(entry)}
                      disabled={deletingId === entry.id}
                      className="rounded-full bg-red-500/80 px-3 py-2 text-[10px] font-semibold text-white hover:bg-red-500 disabled:opacity-50"
                    >
                      {deletingId === entry.id ? "Deleting…" : "Delete"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmingId(null)}
                      disabled={deletingId === entry.id}
                      className="rounded-full bg-white/[0.05] px-3 py-2 text-[10px] font-semibold text-white/50 hover:text-white"
                    >
                      Keep
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 self-start">
                    <button
                      type="button"
                      onClick={() => setEditing({ entry })}
                      className="rounded-full bg-white/[0.05] px-3 py-2 text-[10px] font-semibold text-white/50 hover:bg-white/[0.09] hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      aria-label={`Delete ${entry.title}`}
                      type="button"
                      onClick={() => setConfirmingId(entry.id)}
                      className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.04] text-white/25 hover:bg-amber-500 hover:text-black"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}
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
          entry={editing.entry}
          craftOptions={craftOptions}
          onClose={() => setEditing(null)}
          onSave={save}
        />
      )}
    </div>
  );
}
