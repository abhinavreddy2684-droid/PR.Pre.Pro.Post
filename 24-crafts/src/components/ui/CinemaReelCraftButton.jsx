import { motion } from "framer-motion";

export default function CinemaReelCraftButton({
  children,
  active = false,
  onClick,
  craftId,
  ...props
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={active ? undefined : { scale: 1.05 }}
      className={`snap-center relative flex-shrink-0 w-64 h-40 rounded-sm flex items-center justify-center transition-all duration-300 ease-out cursor-pointer group ${
        active
          ? "bg-amber-500 scale-110 z-10 shadow-[0_0_30px_rgba(245,158,11,0.4)]"
          : "bg-neutral-900 hover:bg-neutral-800 opacity-60 hover:opacity-100"
      }`}
      {...props}
    >
      <div className="absolute inset-1 border border-neutral-950/20 rounded-sm" />
      <span
        className={`text-xl font-bold tracking-wide transition-colors duration-300 ${
          active ? "text-black" : "text-neutral-300 group-hover:text-white"
        }`}
      >
        {children}
      </span>
      <span
        className={`absolute bottom-2 right-3 text-xs font-mono ${
          active ? "text-black/60" : "text-neutral-600"
        }`}
      >
        {String(craftId).padStart(2, "0")}
      </span>
    </motion.button>
  );
}
