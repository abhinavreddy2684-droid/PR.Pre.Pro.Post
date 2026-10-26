import { Check } from "lucide-react";

export default function SaveButton({ onClick, saved }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-xs font-bold text-black transition hover:-translate-y-0.5 hover:bg-amber-400"
    >
      {saved ? (
        <>
          <Check size={14} /> Saved
        </>
      ) : (
        "Save changes"
      )}
    </button>
  );
}
