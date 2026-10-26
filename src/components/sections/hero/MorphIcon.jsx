import { AnimatePresence, motion } from "framer-motion";
import useAutoAdvance from "@/hooks/useAutoAdvance";
import { MORPH_ICONS } from "@/components/sections/hero/heroContent";

const MORPH_INTERVAL_MS = 3200;

/** Cross-fades through a different craft icon every few seconds. */
export default function MorphIcon() {
  const [activeIcon] = useAutoAdvance(MORPH_ICONS.length, MORPH_INTERVAL_MS);

  const Icon = MORPH_ICONS[activeIcon];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeIcon}
        initial={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.4, filter: "blur(18px)" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute text-amber-300"
      >
        <Icon size={100} strokeWidth={1.4} />
      </motion.div>
    </AnimatePresence>
  );
}
