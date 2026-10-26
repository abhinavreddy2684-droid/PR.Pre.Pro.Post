import { Bell, Settings } from "lucide-react";

export default function OwnerControls({ onSettings, unread = 3 }) {
  return (
    <div className="fixed right-5 top-24 z-40 flex items-center gap-1.5 rounded-full border border-white/10 bg-[#080808]/80 p-1.5 shadow-2xl backdrop-blur-xl sm:right-8">
      <button
        type="button"
        aria-label="Notifications"
        className="relative grid h-10 w-10 place-items-center rounded-full text-white/55 transition hover:bg-white/[0.06] hover:text-white"
      >
        <Bell size={17} />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-amber-500 px-1 text-[8px] font-black text-black">
            {unread}
          </span>
        )}
      </button>
      <button
        type="button"
        aria-label="Settings"
        onClick={onSettings}
        className="grid h-10 w-10 place-items-center rounded-full text-white/55 transition hover:bg-amber-500 hover:text-black"
      >
        <Settings size={17} />
      </button>
    </div>
  );
}
