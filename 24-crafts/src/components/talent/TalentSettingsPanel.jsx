import { Bell, BriefcaseBusiness, CalendarDays, ChevronRight, FileText, Image, Search, UserRound, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

const sections = [
  { id: "professional", icon: UserRound, label: "Professional details", description: "Name, bio, location and profile information" },
  { id: "crafts", icon: BriefcaseBusiness, label: "Crafts", description: "Manage your primary and supporting crafts" },
  { id: "media", icon: Image, label: "Media management", description: "Upload, edit and organise your public work" },
  { id: "experience", icon: FileText, label: "Experience & credits", description: "Manage your professional history and credits" },
  { id: "calendar", icon: CalendarDays, label: "Availability calendar", description: "Manage the next 90 days of availability" },
  { id: "notifications", icon: Bell, label: "Notifications", description: "Choose what you want to hear about" },
];

const details = {
  professional: { eyebrow: "Profile", title: "Professional details", body: "Keep the information recruiters see on your public talent profile accurate and current.", items: ["Name and professional identity", "Location and professional experience", "Bio and profile information"] },
  crafts: { eyebrow: "Profile", title: "Crafts", body: "Your craft is one of the first things a producer sees when discovering you.", items: ["Primary craft", "Supporting crafts", "Genres and specialities"] },
  media: { eyebrow: "Portfolio", title: "Media management", body: "Your gallery is public by design. Add work, refine its description, or remove something you no longer want featured.", items: ["Upload image, video or audio", "Edit title and description", "Remove portfolio work"] },
  experience: { eyebrow: "Career", title: "Experience & credits", body: "Keep the career story behind your craft clear, concise and easy for recruiters to scan.", items: ["Add professional experience", "Edit existing credits", "Keep your timeline current"] },
  calendar: { eyebrow: "Availability", title: "Availability calendar", body: "The calendar uses the same visual language as your public profile. Only the next 90 days can be managed.", items: ["Available", "Tentative", "Unavailable"] },
  notifications: { eyebrow: "Account", title: "Notifications", body: "Stay informed about activity that matters to your work on Pre Pro Post.", items: ["New opportunities", "Profile activity", "Platform updates"] },
};

export default function TalentSettingsPanel({ open, onClose, onSelect }) {
  const [selected, setSelected] = useState("professional");
  const [query, setQuery] = useState("");

  const visibleSections = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return sections;
    return sections.filter((section) => `${section.label} ${section.description}`.toLowerCase().includes(normalized));
  }, [query]);

  const active = details[selected] || details.professional;
  const ActiveIcon = sections.find((item) => item.id === selected)?.icon || UserRound;

  const manageSection = () => onSelect(selected);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-3 py-4 backdrop-blur-[3px] sm:px-6 sm:py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.button aria-label="Close settings" onClick={onClose} className="absolute inset-0 cursor-default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Talent settings"
            className="relative flex h-[min(820px,calc(100vh-32px))] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#080808]/95 shadow-[0_35px_120px_rgba(0,0,0,.65)] backdrop-blur-2xl sm:h-[min(820px,calc(100vh-64px))] sm:rounded-[2.5rem]"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-amber-500/[0.06] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-amber-500/[0.035] blur-3xl" />

            <aside className="relative hidden w-[285px] shrink-0 border-r border-white/[0.08] bg-white/[0.018] lg:flex lg:flex-col">
              <div className="px-7 pb-6 pt-8">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500 text-black shadow-[0_0_30px_rgba(245,158,11,.16)]"><BriefcaseBusiness size={17} /></div>
                  <div><p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-amber-400">Pre Pro Post</p><h2 className="mt-1 text-lg font-bold tracking-tight text-white">Talent settings</h2></div>
                </div>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 pb-6">
                <p className="px-3 pb-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/25">Manage profile</p>
                <div className="space-y-1">
                  {sections.map(({ id, icon: Icon, label }) => (
                    <button key={id} onClick={() => setSelected(id)} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${selected === id ? "bg-amber-500 text-black shadow-[0_8px_25px_rgba(245,158,11,.12)]" : "text-white/55 hover:bg-white/[0.05] hover:text-white"}`}>
                      <Icon size={17} /><span className="flex-1 text-sm font-semibold">{label}</span>{selected !== id && <ChevronRight size={14} className="text-white/15 transition group-hover:translate-x-0.5 group-hover:text-white/35" />}
                    </button>
                  ))}
                </div>
              </nav>

              <div className="border-t border-white/[0.08] p-5">
                <div className="rounded-2xl border border-amber-500/10 bg-amber-500/[0.035] p-4"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-400">Visibility</p><p className="mt-2 text-xs leading-5 text-white/35">Your profile and uploaded media are public to people exploring the talent network.</p></div>
              </div>
            </aside>

            <main className="relative min-w-0 flex-1 overflow-y-auto">
              <div className="mx-auto min-h-full max-w-4xl px-5 pb-10 sm:px-8 sm:pb-12 lg:px-12">
                <header className="sticky top-0 z-20 -mx-5 flex items-center gap-3 border-b border-white/[0.07] bg-[#080808]/92 px-5 pb-5 pt-5 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
                  <button onClick={onClose} aria-label="Close settings" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/[0.045] text-white/55 transition hover:bg-white/[0.08] hover:text-white"><X size={17} /></button>
                  <label className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-white/[0.07] bg-white/[0.035] px-4 py-2.5"><Search size={16} className="shrink-0 text-white/25" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search settings" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25" /></label>
                </header>

                <div className="mb-8 pt-5 lg:hidden">
                  <div className="flex gap-2 overflow-x-auto pb-2">{visibleSections.map(({ id, label }) => <button key={id} onClick={() => setSelected(id)} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold transition ${selected === id ? "bg-amber-500 text-black" : "bg-white/[0.045] text-white/50 hover:bg-white/[0.08]"}`}>{label}</button>)}</div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.section key={selected} className="max-w-3xl pt-8 sm:pt-10" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-400">{active.eyebrow}</p>
                    <div className="mt-2 flex items-start justify-between gap-6">
                      <div><h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{active.title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">{active.body}</p></div>
                      <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl border border-amber-500/15 bg-amber-500/[0.07] text-amber-400 sm:grid"><ActiveIcon size={21} /></div>
                    </div>

                    <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] shadow-[0_18px_50px_rgba(0,0,0,.12)]">
                      {active.items.map((item, index) => <div key={item} className={`flex items-center gap-4 px-5 py-4 transition hover:bg-white/[0.025] sm:px-6 ${index ? "border-t border-white/[0.07]" : ""}`}><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" /><span className="text-sm text-white/65">{item}</span></div>)}
                    </div>

                    <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold text-white/80">Manage this section on your profile</p><p className="mt-1 text-xs leading-5 text-white/30">Settings gets you to the right place; your profile remains the source of truth.</p></div><button onClick={manageSection} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-xs font-bold text-black transition hover:-translate-y-0.5 hover:bg-amber-400">Open section <ChevronRight size={14} /></button></div>
                    </div>
                  </motion.section>
                </AnimatePresence>
              </div>
            </main>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
