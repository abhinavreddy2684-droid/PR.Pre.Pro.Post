import { useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import useClickOutside from "@/hooks/useClickOutside";

/**
 * Dropdown of `options` ({ value, label }); `value` is the selected option's value.
 */
export default function LocationSelect({
  label,
  value,
  options,
  placeholder = "Select an option",
  disabled = false,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const selectedLabel = options.find((option) => option.value === value)?.label;

  useClickOutside(rootRef, () => setOpen(false));

  return (
    <div
      ref={rootRef}
      className="relative"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-white/35">{label}</p>
      <button
        type="button"
        disabled={disabled}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={`flex min-h-[76px] w-full items-center justify-between rounded-[1.35rem] border px-5 text-left transition-all ${
          open
            ? "border-amber-400/55 bg-amber-500/[0.05] shadow-[0_0_30px_rgba(245,158,11,0.06)]"
            : "border-white/10 bg-white/[0.025] hover:border-white/20"
        } ${disabled ? "cursor-not-allowed opacity-45" : ""}`}
      >
        <span
          className={selectedLabel ? "text-base font-medium text-white" : "text-sm text-white/30"}
        >
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`text-amber-300 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 z-30 mt-2 max-h-72 overflow-y-auto rounded-[1.35rem] border border-amber-400/20 bg-[#0b0a08]/95 p-2 shadow-2xl backdrop-blur-2xl"
          >
            {options.map((option) => {
              const active = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange?.(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                    active
                      ? "bg-amber-400 text-black"
                      : "text-white/65 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {option.label}
                  {active && <Check size={15} />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
