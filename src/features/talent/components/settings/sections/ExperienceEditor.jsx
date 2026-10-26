import { X } from "lucide-react";
import { useState } from "react";
import Field from "@/features/talent/components/settings/fields/Field";

export default function ExperienceEditor({ entry, onClose, onSave }) {
  const [draft, setDraft] = useState(entry);
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-5 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl bg-[#111] p-6 shadow-2xl ring-1 ring-white/10 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-400">
              Experience & credits
            </p>
            <h3 className="mt-2 text-2xl font-bold text-white">
              {entry.index === -1 ? "Add experience" : "Edit experience"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/50 hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <Field
            label="Period"
            value={draft.period}
            onChange={(value) => update("period", value)}
            placeholder="2021 — Present"
          />
          <Field
            label="Role / title"
            value={draft.title}
            onChange={(value) => update("title", value)}
            placeholder="Playback Vocalist"
          />
          <Field
            label="Production / company"
            value={draft.company}
            onChange={(value) => update("company", value)}
            placeholder="Feature Film Production"
          />
          <Field
            label="Craft"
            value={draft.craft}
            onChange={(value) => update("craft", value)}
            placeholder="Playback Singing"
          />
        </div>
        <div className="mt-4">
          <Field
            label="Description"
            value={draft.description}
            onChange={(value) => update("description", value)}
            multiline
            placeholder="Describe your contribution."
          />
        </div>
        <div className="mt-7 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-full px-5 py-2.5 text-xs font-semibold text-white/50 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(draft)}
            className="rounded-full bg-amber-500 px-6 py-2.5 text-xs font-bold text-black"
          >
            Save experience
          </button>
        </div>
      </div>
    </div>
  );
}
