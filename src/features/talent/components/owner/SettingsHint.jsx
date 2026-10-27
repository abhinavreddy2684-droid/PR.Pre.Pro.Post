import { Settings } from "lucide-react";
import { SETTINGS_DISABLED_REASON } from "@/features/talent/components/owner/ownerNotices";

/** Disabled "Open settings" plus the reason, under the owner's hero. */
export default function SettingsHint() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <button
        type="button"
        disabled
        className="inline-flex min-h-12 cursor-not-allowed items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white/35"
      >
        <Settings size={16} />
        Open settings
      </button>
      <p className="text-xs text-white/45">{SETTINGS_DISABLED_REASON}.</p>
    </div>
  );
}
