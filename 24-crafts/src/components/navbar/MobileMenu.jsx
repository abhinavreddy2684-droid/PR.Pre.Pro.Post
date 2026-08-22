import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import Button from "../ui/Button";

export default function MobileMenu({ navLinks }) {
  const [open, setOpen] = useState(false);
  const iconButtonClass = "!p-0 w-12 h-12 flex items-center justify-center";

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)} aria-label="Open menu" className={iconButtonClass}><Menu className="text-white" /></Button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-black tracking-[0.3em] text-amber-400 uppercase">Menu</h2>
              <Button variant="secondary" onClick={() => setOpen(false)} aria-label="Close menu" className={iconButtonClass}><X /></Button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-10">
              {navLinks.map((item, index) => (
                <motion.a key={item.label} href={item.href} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} onClick={() => setOpen(false)} className="text-3xl font-bold uppercase tracking-[0.2em] text-neutral-200 hover:text-amber-400 transition-all duration-300">{item.label}</motion.a>
              ))}
            </div>

            <div className="p-8 text-center border-t border-white/10"><p className="text-neutral-500 uppercase tracking-[0.25em] text-xs">Enter The World Of Cinema</p></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
