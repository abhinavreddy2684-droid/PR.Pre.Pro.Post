import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../ui/Button";

export default function MobileMenu({ navLinks }) {
  const [open, setOpen] = useState(false);
  const iconButtonClass = "!p-0 w-12 h-12 flex items-center justify-center";

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className={iconButtonClass}>
        <Menu className="w-5 h-5 text-white" />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-2xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 sm:px-6 border-b border-white/10">
              <h2 className="text-sm sm:text-xl font-black tracking-[0.2em] sm:tracking-[0.3em] text-amber-400 uppercase">Menu</h2>
              <Button variant="secondary" onClick={() => setOpen(false)} aria-label="Close menu" className={iconButtonClass}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-10 sm:py-14">
              <div className="mx-auto max-w-sm flex flex-col gap-3">
                {navLinks.map((item, index) => (
                  <motion.div key={item.label} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }}>
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-14 items-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-lg sm:text-2xl font-bold uppercase tracking-[0.12em] text-neutral-200 active:bg-amber-500 active:text-black hover:border-amber-500/40 hover:text-amber-400 transition-all duration-300"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            <div className="px-6 py-6 text-center border-t border-white/10 safe-area-bottom">
              <p className="text-neutral-500 uppercase tracking-[0.18em] text-[10px] sm:text-xs">Enter The World Of Cinema</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
