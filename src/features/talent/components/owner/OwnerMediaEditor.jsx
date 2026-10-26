import { X } from "lucide-react";
import { useState } from "react";

export default function OwnerMediaEditor({ item, onClose, onSave }) {
  const [draft, setDraft] = useState(item);
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-5 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#121212] p-6 shadow-2xl sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400">
              Media management
            </p>
            <h3 className="mt-2 text-2xl font-bold text-white">Edit media</h3>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/50 hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mt-7 space-y-4">
          <input
            value={draft.title}
            onChange={(event) => setDraft({ ...draft, title: event.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="Title"
          />
          <textarea
            value={draft.description}
            onChange={(event) => setDraft({ ...draft, description: event.target.value })}
            rows={4}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="Description"
          />
          <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
            <p className="text-xs font-semibold text-white/70">Visibility</p>
            <p className="mt-1 text-xs text-white/30">
              Public — media uploaded to Pre Pro Post is always visible to everyone.
            </p>
          </div>
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
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
