import { Settings } from "lucide-react";

export default function SettingsHint({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-white/35 transition hover:text-amber-400"
    >
      <Settings size={13} />
      Manage everything from Settings
    </button>
  );
}
