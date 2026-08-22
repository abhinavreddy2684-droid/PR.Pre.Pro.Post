import { motion } from "framer-motion";

export default function MediaButton({ children, className = "", ...props }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 text-left transition-all duration-500 hover:border-amber-500/30 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
