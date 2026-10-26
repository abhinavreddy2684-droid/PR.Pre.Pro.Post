import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CustomDropdown({ value, options, onChange, placeholder = "Select" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const close = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const selected = options.find((option) => option.value === value);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex w-full items-center justify-between rounded-2xl bg-white/[0.035] px-4 py-3 text-left text-sm transition hover:bg-white/[0.055] ${selected ? "text-white" : "text-white/30"}`}
      >
        <span>{selected?.label || placeholder}</span>
        <ChevronDown size={16} className={`text-white/30 transition ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl bg-[#151515] p-1.5 shadow-[0_20px_60px_rgba(0,0,0,.55)] ring-1 ring-white/[0.08]"
          >
            {options.map((option) => (
              <button
                type="button"
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-sm transition ${option.value === value ? "bg-amber-500 text-black" : "text-white/65 hover:bg-white/[0.06] hover:text-white"}`}
              >
                {option.label}
                {option.value === value && <Check size={14} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
