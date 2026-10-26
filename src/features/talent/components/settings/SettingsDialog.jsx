import { useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { EASE_CINEMATIC } from "@/animations/easing";
import useDialog from "@/hooks/useDialog";
import SettingsSidebar from "@/features/talent/components/settings/SettingsSidebar";
import SettingsMobileTabs from "@/features/talent/components/settings/SettingsMobileTabs";

/**
 * The visible dialog: backdrop, side menu, header and the selected section's view. Mounted only
 * while the settings are open, so its keyboard handling lives exactly that long.
 */
export default function SettingsDialog({ active, selected, session, onSelect, onClose, children }) {
  const dialogRef = useRef(null);
  useDialog(dialogRef, onClose);
  const ActiveIcon = active.icon;

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-3 py-4 backdrop-blur-[3px] sm:px-6 sm:py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        type="button"
        aria-label="Close settings"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />
      <motion.aside
        ref={dialogRef}
        tabIndex={-1}
        style={{ outlineStyle: "none" }}
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
        <SettingsSidebar selected={selected} onSelect={onSelect} />
        <main className="relative min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto min-h-full max-w-4xl px-5 pb-10 sm:px-8 sm:pb-12 lg:px-12">
            <header className="sticky top-0 z-20 -mx-5 flex items-center justify-end bg-[#080808]/92 px-5 pb-4 pt-5 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close settings"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/[0.045] text-white/45 transition hover:bg-amber-500 hover:text-black"
              >
                <X size={18} />
              </button>
            </header>
            <SettingsMobileTabs selected={selected} onSelect={onSelect} />
            <motion.section
              key={`${selected}-${session}`}
              className="max-w-3xl pt-3 sm:pt-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-400">
                {active.eyebrow}
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
              <div className="mt-8">{children}</div>
            </motion.section>
          </div>
        </main>
      </motion.aside>
    </motion.div>
  );
}
