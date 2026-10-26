import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import { EASE_CINEMATIC } from "@/animations/easing";
import { NAV_LINKS } from "@/components/layout/navLinks";
import useDialog from "@/hooks/useDialog";

export const ICON_BUTTON_CLASS = "!p-0 w-12 h-12 flex items-center justify-center";

/**
 * Full-screen navigation dialog for small screens. Mounted only while open: it locks page
 * scrolling for that time, and Escape / focus handling come from useDialog.
 * @param {{ onClose: () => void, onNavigate: (href: string) => void }} props
 */
export default function MobileMenuOverlay({ onClose, onNavigate }) {
  const dialogRef = useRef(null);
  useDialog(dialogRef, onClose);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: EASE_CINEMATIC }}
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col"
      ref={dialogRef}
      tabIndex={-1}
      style={{ outlineStyle: "none" }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 border-b border-white/10">
        <h2 className="text-sm sm:text-xl font-black tracking-[0.2em] sm:tracking-[0.3em] text-amber-400 uppercase">
          Menu
        </h2>
        <Button
          variant="secondary"
          onClick={onClose}
          aria-label="Close menu"
          className={ICON_BUTTON_CLASS}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto px-5 py-8 sm:py-14">
        <div className="mx-auto max-w-sm flex flex-col gap-3">
          {NAV_LINKS.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.05,
                duration: 0.4,
                ease: EASE_CINEMATIC,
              }}
            >
              <button
                type="button"
                onClick={() => onNavigate(item.href)}
                className="w-full flex min-h-14 items-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-left text-lg sm:text-2xl font-bold uppercase tracking-[0.12em] text-neutral-200 active:bg-amber-500 active:text-black hover:border-amber-500/40 hover:text-amber-400 transition-all duration-300"
              >
                {item.label}
              </button>
            </motion.div>
          ))}
        </div>
      </nav>

      <div className="px-6 py-6 text-center border-t border-white/10 safe-area-bottom">
        <p className="text-neutral-500 uppercase tracking-[0.18em] text-[10px] sm:text-xs">
          Enter The World Of Cinema
        </p>
      </div>
    </motion.div>
  );
}
