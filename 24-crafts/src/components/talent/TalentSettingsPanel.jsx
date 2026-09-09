import { Bell, BriefcaseBusiness, CalendarDays, ChevronRight, FileText, Image, UserRound, X } from "lucide-react";

const sections = [
  { id: "professional", icon: UserRound, label: "Professional details", description: "Name, contact, bio and profile information" },
  { id: "crafts", icon: BriefcaseBusiness, label: "Crafts", description: "Manage primary and supporting crafts" },
  { id: "media", icon: Image, label: "Media management", description: "Upload, edit and remove portfolio work" },
  { id: "experience", icon: FileText, label: "Experience & credits", description: "Manage your professional experience" },
  { id: "calendar", icon: CalendarDays, label: "Availability calendar", description: "Manage your rolling 90-day availability" },
  { id: "notifications", icon: Bell, label: "Notifications", description: "Stay up to date with Pre Pro Post" },
];

export default function TalentSettingsPanel({ open, onClose, onSelect }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex justify-end">
      <button aria-label="Close settings" onClick={onClose} className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-[2px]" />
      <aside className="relative h-full w-full max-w-[460px] overflow-y-auto border-l border-white/10 bg-[#111111] shadow-[-30px_0_100px_rgba(0,0,0,.45)]">
        <div className="sticky top-0 z-10 border-b border-white/10 bg-[#111111]/95 px-7 py-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-400">Talent settings</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">Manage your profile</h2>
            </div>
            <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"><X size={18} /></button>
          </div>
        </div>

        <div className="p-4">
          <p className="px-3 pb-3 pt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/25">Your profile</p>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
            {sections.map(({ id, icon: Icon, label, description }, index) => (
              <button key={id} onClick={() => onSelect(id)} className={`group flex w-full items-center gap-4 px-4 py-4 text-left transition hover:bg-white/[0.05] ${index ? "border-t border-white/[0.07]" : ""}`}>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-white/55 group-hover:bg-amber-500/10 group-hover:text-amber-400"><Icon size={18} /></span>
                <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-white/85">{label}</span><span className="mt-1 block text-xs leading-5 text-white/30">{description}</span></span>
                <ChevronRight size={16} className="shrink-0 text-white/20 transition group-hover:translate-x-0.5 group-hover:text-white/50" />
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-amber-500/15 bg-amber-500/[0.045] p-4">
            <p className="text-xs font-semibold text-amber-300">A note about visibility</p>
            <p className="mt-2 text-xs leading-5 text-white/35">Your profile and uploaded media are public to people exploring the talent network. Media cannot be made private.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
