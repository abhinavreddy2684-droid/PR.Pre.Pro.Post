import { motion } from "framer-motion";

// Chips fade in one after another; the delay is capped so long lists settle quickly.
const STAGGER_S = 0.015;
const MAX_DELAY_S = 0.18;

export default function CraftGroup({ options, selected, multiple = false, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((craft, index) => {
        const isSelected = multiple ? selected.includes(craft.title) : selected === craft.title;

        return (
          <motion.button
            key={craft.id}
            type="button"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(index * STAGGER_S, MAX_DELAY_S) }}
            onClick={() => onSelect(craft.title)}
            aria-pressed={isSelected}
            className={`rounded-full border px-4 py-2.5 text-sm transition-all duration-200 ${
              isSelected
                ? "border-amber-400 bg-amber-400 text-black shadow-[0_0_28px_rgba(245,158,11,0.16)]"
                : "border-white/10 bg-white/[0.025] text-white/55 hover:border-amber-400/35 hover:text-white/85"
            }`}
          >
            {craft.title}
          </motion.button>
        );
      })}
    </div>
  );
}
