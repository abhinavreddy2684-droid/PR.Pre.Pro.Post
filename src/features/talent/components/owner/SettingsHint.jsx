import { Settings } from "lucide-react";

/** "Open settings" under the owner's hero. */
export default function SettingsHint({ onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-amber-500/40 hover:text-amber-300"
    >
      <Settings size={16} />
      Open settings
    </button>
  );
}
