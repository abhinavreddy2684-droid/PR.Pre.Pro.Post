import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../ui/Button";

export default function MobileMenu({ navLinks }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const iconButtonClass = "!p-0 w-12 h-12 flex items-center justify-center";

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const handleNavigation = (href) => {
    setOpen(false);

    const url = new URL(href, window.location.origin);
    const targetPath = url.pathname;
    const targetHash = url.hash;
    const currentHash = window.location.hash;

    // A router navigation to the current route does not remount the page.
    // Explicitly handle that case so Home always means "go to the top" and
    // the current anchor can still be reselected.
    if (location.pathname === targetPath && currentHash === targetHash) {
      requestAnimationFrame(() => {
        if (targetHash) {
          document.getElementById(targetHash.slice(1))?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      });
      return;
    }

    navigate(`${targetPath}${targetHash}`);
  };

  const menuOverlay = open ? (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col"
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
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className={iconButtonClass}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-8 sm:py-14">
          <div className="mx-auto max-w-sm flex flex-col gap-3">
            {navLinks.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <button
                  type="button"
                  onClick={() => handleNavigation(item.href)}
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
    </AnimatePresence>
  ) : null;

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className={iconButtonClass}
      >
        <Menu className="w-5 h-5 text-white" />
      </Button>

      {typeof document !== "undefined" && createPortal(menuOverlay, document.body)}
    </>
  );
}
