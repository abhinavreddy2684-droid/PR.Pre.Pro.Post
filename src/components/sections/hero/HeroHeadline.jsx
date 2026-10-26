import { motion } from "framer-motion";

/** Three-line headline; the middle line carries the amber gradient. */
export default function HeroHeadline({ lines, sizeClass }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="leading-[0.82] tracking-tight"
    >
      <span className={`block font-black text-white ${sizeClass}`}>{lines[0]}</span>
      <span
        className={`block bg-gradient-to-r from-amber-300 via-amber-100 to-amber-500 bg-clip-text font-black text-transparent ${sizeClass}`}
      >
        {lines[1]}
      </span>
      <span className={`block font-black text-white ${sizeClass}`}>{lines[2]}</span>
    </motion.h1>
  );
}
