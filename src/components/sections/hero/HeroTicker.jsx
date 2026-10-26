import { motion } from "framer-motion";
import { TICKER_ITEMS } from "@/components/sections/hero/heroContent";

/** Looping craft-name ticker pinned to the bottom of the hero. */
export default function HeroTicker() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden border-t border-white/5 bg-black/50 py-5 backdrop-blur-2xl">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex w-max"
      >
        {TICKER_ITEMS.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-5 whitespace-nowrap border-r border-white/5 px-10 text-[11px] uppercase tracking-[0.35em] text-white/45"
          >
            <span className="text-xs text-amber-400">✦</span>
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
