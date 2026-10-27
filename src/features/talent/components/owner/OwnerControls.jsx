import { Bell, Settings } from "lucide-react";
import { NOTIFICATIONS_DISABLED_REASON } from "@/features/talent/components/owner/ownerNotices";

/** Floating owner shortcuts: settings, and notifications (disabled: no backend yet). */
export default function OwnerControls({ onSettings }) {
  return (
    <div className="fixed right-5 top-24 z-40 flex items-center gap-1.5 rounded-full border border-white/10 bg-[#080808]/80 p-1.5 shadow-2xl backdrop-blur-xl sm:right-8">
      <button
        type="button"
        disabled
        aria-label={`Notifications. ${NOTIFICATIONS_DISABLED_REASON}`}
        title={NOTIFICATIONS_DISABLED_REASON}
        className="grid h-10 w-10 cursor-not-allowed place-items-center rounded-full text-white/25"
      >
        <Bell size={17} />
      </button>
      <button
        type="button"
        aria-label="Settings"
        title="Settings"
        onClick={onSettings}
        className="grid h-10 w-10 place-items-center rounded-full text-white/55 transition hover:bg-amber-500 hover:text-black"
      >
        <Settings size={17} />
      </button>
    </div>
  );
}
