import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

const VARIANTS = {
  primary: "bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_40px_rgba(245,158,11,0.25)]",
  secondary:
    "border border-white/15 bg-white/5 hover:border-amber-500/40 text-white backdrop-blur-xl",
};

/**
 * Pill-shaped button with hover lift and tap squash.
 * @param {object} props
 * @param {"primary" | "secondary"} [props.variant] amber fill, or translucent with a border
 * @param {string} [props.className] extra classes, appended after the variant's
 * @param {"button" | "submit" | "reset"} [props.type]
 */
export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  return (
    <motion.button
      type={type}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "min-h-12 px-5 py-3 md:px-8 md:py-4 rounded-full font-semibold tracking-wide transition-all duration-300",
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
