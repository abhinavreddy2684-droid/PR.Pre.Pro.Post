import { BriefcaseBusiness, ChevronRight } from "lucide-react";
import { SETTINGS_SECTIONS } from "@/features/talent/components/settings/settingsConfig";

/** Desktop section menu (hidden below the lg breakpoint). */
export default function SettingsSidebar({ selected, onSelect }) {
  return (
    <aside className="relative hidden w-[285px] shrink-0 bg-white/[0.018] lg:flex lg:flex-col">
      <div className="px-7 pb-6 pt-8">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500 text-black shadow-[0_0_30px_rgba(245,158,11,.16)]">
            <BriefcaseBusiness size={17} />
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-amber-400">
              Pre Pro Post
            </p>
            <h2 className="mt-1 text-lg font-bold tracking-tight text-white">Talent settings</h2>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        <p className="px-3 pb-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/25">
          Manage profile
        </p>
        <div className="space-y-1">
          {SETTINGS_SECTIONS.map(({ id, icon: Icon, label }) => (
            <button
              type="button"
              key={id}
              onClick={() => onSelect(id)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${selected === id ? "bg-amber-500 text-black shadow-[0_8px_25px_rgba(245,158,11,.12)]" : "text-white/55 hover:bg-amber-500/[0.07] hover:text-white hover:shadow-[0_0_24px_rgba(245,158,11,.07)]"}`}
            >
              <Icon size={17} />
              <span className="flex-1 text-sm font-semibold">{label}</span>
              {selected !== id && (
                <ChevronRight
                  size={14}
                  className="text-white/15 transition group-hover:translate-x-0.5 group-hover:text-amber-400/60"
                />
              )}
            </button>
          ))}
        </div>
      </nav>
      <div className="p-5">
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/15">Talent profile</p>
        <p className="mt-2 text-xs leading-5 text-white/25">
          Settings changes are saved for your talent profile.
        </p>
      </div>
    </aside>
  );
}
