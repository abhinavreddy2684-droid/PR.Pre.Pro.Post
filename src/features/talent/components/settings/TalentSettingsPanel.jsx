import { BriefcaseBusiness, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { saveStoredSettings } from "@/features/talent/data";
import { EASE_CINEMATIC } from "@/animations/easing";
import { sections, getInitialSettings } from "@/features/talent/components/settings/settingsConfig";
import ProfessionalSettings from "@/features/talent/components/settings/sections/ProfessionalSettings";
import CraftSettings from "@/features/talent/components/settings/sections/CraftSettings";
import MediaSettings from "@/features/talent/components/settings/sections/MediaSettings";
import ExperienceSettings from "@/features/talent/components/settings/sections/ExperienceSettings";
import AvailabilitySettings from "@/features/talent/components/settings/sections/AvailabilitySettings";
import NotificationsSettings from "@/features/talent/components/settings/sections/NotificationsSettings";

export default function TalentSettingsPanel({ open, onClose, initialSection = "professional" }) {
  const [selected, setSelected] = useState(initialSection);
  const [settings, setSettings] = useState(getInitialSettings);
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- re-syncs the local draft when the panel reloads settings; Phase 4 replaces this with a key-based reset.
      setSettings(getInitialSettings());
      setSelected(
        sections.some((section) => section.id === initialSection) ? initialSection : "professional",
      );
    }
  }, [open, initialSection]);
  const active = sections.find((section) => section.id === selected) || sections[0];
  const ActiveIcon = active.icon;
  const update = (key, value) =>
    setSettings((current) => {
      const next = { ...current, [key]: value };
      saveStoredSettings(next);
      return next;
    });
  const eyebrow =
    selected === "professional" || selected === "crafts"
      ? "Profile"
      : selected === "media"
        ? "Portfolio"
        : selected === "experience"
          ? "Career"
          : selected === "calendar"
            ? "Availability"
            : "Account";
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-3 py-4 backdrop-blur-[3px] sm:px-6 sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            aria-label="Close settings"
            onClick={onClose}
            className="absolute inset-0 cursor-default"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Talent settings"
            className="relative flex h-[min(880px,calc(100vh-32px))] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-[#080808]/95 shadow-[0_35px_120px_rgba(0,0,0,.65)] ring-1 ring-white/[0.09] backdrop-blur-2xl sm:h-[min(880px,calc(100vh-64px))] sm:rounded-[2.5rem]"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.38, ease: EASE_CINEMATIC }}
          >
            <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-amber-500/[0.06] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-amber-500/[0.035] blur-3xl" />
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
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-white">
                      Talent settings
                    </h2>
                  </div>
                </div>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 pb-6">
                <p className="px-3 pb-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/25">
                  Manage profile
                </p>
                <div className="space-y-1">
                  {sections.map(({ id, icon: Icon, label }) => (
                    <button
                      key={id}
                      onClick={() => setSelected(id)}
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
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/15">
                  Talent profile
                </p>
                <p className="mt-2 text-xs leading-5 text-white/25">
                  Settings changes are saved for your talent profile.
                </p>
              </div>
            </aside>
            <main className="relative min-w-0 flex-1 overflow-y-auto">
              <div className="mx-auto min-h-full max-w-4xl px-5 pb-10 sm:px-8 sm:pb-12 lg:px-12">
                <header className="sticky top-0 z-20 -mx-5 flex items-center justify-end bg-[#080808]/92 px-5 pb-4 pt-5 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
                  <button
                    onClick={onClose}
                    aria-label="Close settings"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/[0.045] text-white/45 transition hover:bg-amber-500 hover:text-black"
                  >
                    <X size={18} />
                  </button>
                </header>
                <div className="mb-7 pt-2 lg:hidden">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {sections.map(({ id, label }) => (
                      <button
                        key={id}
                        onClick={() => setSelected(id)}
                        className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold transition ${selected === id ? "bg-amber-500 text-black" : "bg-white/[0.045] text-white/50 hover:bg-white/[0.08]"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <motion.section
                  key={selected}
                  className="max-w-3xl pt-3 sm:pt-5"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-400">
                    {eyebrow}
                  </p>
                  <div className="mt-2 flex items-start justify-between gap-6">
                    <div>
                      <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                        {active.label}
                      </h1>
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
                        {active.description}
                      </p>
                    </div>
                    <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-500/[0.07] text-amber-400 sm:grid">
                      <ActiveIcon size={21} />
                    </div>
                  </div>
                  <div className="mt-8">
                    {selected === "professional" && (
                      <ProfessionalSettings
                        settings={settings.professional}
                        onSave={(value) => update("professional", value)}
                      />
                    )}
                    {selected === "crafts" && (
                      <CraftSettings
                        settings={settings.crafts}
                        onSave={(value) => update("crafts", value)}
                      />
                    )}
                    {selected === "media" && (
                      <MediaSettings
                        settings={settings.media}
                        onSave={(value) => update("media", value)}
                      />
                    )}
                    {selected === "experience" && (
                      <ExperienceSettings
                        settings={settings.experiences}
                        onSave={(value) => update("experiences", value)}
                      />
                    )}
                    {selected === "calendar" && (
                      <AvailabilitySettings
                        settings={settings.availability}
                        onSave={(value) => update("availability", value)}
                      />
                    )}
                    {selected === "notifications" && (
                      <NotificationsSettings
                        settings={settings.notifications}
                        onSave={(value) => update("notifications", value)}
                      />
                    )}
                  </div>
                </motion.section>
              </div>
            </main>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
