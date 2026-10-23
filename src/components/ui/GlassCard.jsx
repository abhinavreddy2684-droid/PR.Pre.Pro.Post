import { motion } from "framer-motion";

export default function GlassCard({
  children,
  className = "",
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={`
        bg-white/[0.03]
        border border-white/10
        backdrop-blur-xl
        rounded-[2rem]
        overflow-hidden
        transition-all duration-500
        hover:border-amber-500/30
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}