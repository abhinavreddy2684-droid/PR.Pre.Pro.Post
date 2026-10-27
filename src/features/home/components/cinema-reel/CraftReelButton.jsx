import { motion } from "framer-motion";
import { pad2 } from "@/lib/format";

/**
 * One craft tile in the reel. `active` highlights it; other props go to the <button>.
 * @param {{ number: number, active?: boolean, onClick: () => void }} props  `number` is the
 *   craft's position in the reel
 */
export default function CraftReelButton({ children, active = false, onClick, number, ...props }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={active ? undefined : { scale: 1.05 }}
      className={`snap-center relative flex-shrink-0 w-48 h-28 md:w-64 md:h-40 rounded-sm flex items-center justify-center transition-all duration-300 ease-out cursor-pointer group ${
        active
          ? "bg-amber-500 scale-105 md:scale-110 z-10 shadow-[0_0_30px_rgba(245,158,11,0.4)]"
          : "bg-neutral-900 hover:bg-neutral-800 opacity-60 hover:opacity-100"
      }`}
      {...props}
    >
      <div className="absolute inset-1 border border-neutral-950/20 rounded-sm" />
      <span
        className={`px-4 text-base md:text-xl font-bold tracking-wide text-center transition-colors duration-300 ${
          active ? "text-black" : "text-neutral-300 group-hover:text-white"
        }`}
      >
        {children}
      </span>
      <span
        className={`absolute bottom-2 right-3 text-[10px] md:text-xs font-mono ${
          active ? "text-black/60" : "text-neutral-600"
        }`}
      >
        {pad2(number)}
      </span>
    </motion.button>
  );
}
