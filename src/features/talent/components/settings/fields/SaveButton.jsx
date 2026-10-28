import { Check, Loader2 } from "lucide-react";

/** Section save button: "Save changes", "Saving…" while pending, a brief "Saved" after. */
export default function SaveButton({
  onClick,
  saved,
  pending = false,
  disabled = false,
  label = "Save changes",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending || disabled}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-xs font-bold text-black transition hover:-translate-y-0.5 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
    >
      {pending ? (
        <>
          <Loader2 size={14} className="animate-spin" /> Saving…
        </>
      ) : saved ? (
        <>
          <Check size={14} /> Saved
        </>
      ) : (
        label
      )}
    </button>
  );
}
