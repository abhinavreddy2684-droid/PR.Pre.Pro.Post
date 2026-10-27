import { Bell, Settings } from "lucide-react";
import {
  NOTIFICATIONS_DISABLED_REASON,
  SETTINGS_DISABLED_REASON,
} from "@/features/talent/components/owner/ownerNotices";

const DISABLED_BUTTON =
  "grid h-10 w-10 cursor-not-allowed place-items-center rounded-full text-white/25";

/** Floating owner shortcuts. Both are disabled until their backend work lands. */
export default function OwnerControls() {
  return (
    <div className="fixed right-5 top-24 z-40 flex items-center gap-1.5 rounded-full border border-white/10 bg-[#080808]/80 p-1.5 shadow-2xl backdrop-blur-xl sm:right-8">
      <button
        type="button"
        disabled
        aria-label={`Notifications. ${NOTIFICATIONS_DISABLED_REASON}`}
        title={NOTIFICATIONS_DISABLED_REASON}
        className={DISABLED_BUTTON}
      >
        <Bell size={17} />
      </button>
      <button
        type="button"
        disabled
        aria-label={`Settings. ${SETTINGS_DISABLED_REASON}`}
        title={SETTINGS_DISABLED_REASON}
        className={DISABLED_BUTTON}
      >
        <Settings size={17} />
      </button>
    </div>
  );
}
