import { SETTINGS_SECTIONS } from "@/features/talent/components/settings/settingsConfig";

/** Horizontal section tabs shown below the lg breakpoint. */
export default function SettingsMobileTabs({ selected, onSelect }) {
  return (
    <div className="mb-7 pt-2 lg:hidden">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {SETTINGS_SECTIONS.map(({ id, label }) => (
          <button
            type="button"
            key={id}
            onClick={() => onSelect(id)}
            className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold transition ${selected === id ? "bg-amber-500 text-black" : "bg-white/[0.045] text-white/50 hover:bg-white/[0.08]"}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
