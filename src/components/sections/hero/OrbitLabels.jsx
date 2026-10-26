import { motion } from "framer-motion";
import { ORBIT_LABELS } from "@/components/sections/hero/heroContent";

const ORBIT_RADIUS_PX = 270;

/** Craft names floating on a circle around the lens. */
export default function OrbitLabels() {
  return (
    <>
      {ORBIT_LABELS.map((label, index) => {
        const angle = (index / ORBIT_LABELS.length) * Math.PI * 2;
        const x = Math.cos(angle) * ORBIT_RADIUS_PX;
        const y = Math.sin(angle) * ORBIT_RADIUS_PX;

        return (
          <motion.div
            key={label}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6 + index, repeat: Infinity }}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-white/10 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-amber-300/70 shadow-[0_0_30px_rgba(245,158,11,0.06)] backdrop-blur-xl"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
          >
            {label}
          </motion.div>
        );
      })}
    </>
  );
}
