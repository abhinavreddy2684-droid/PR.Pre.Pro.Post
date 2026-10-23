import { motion } from "framer-motion";

export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  ...props
}) {
  const variants = {
    primary:
      "bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_40px_rgba(245,158,11,0.25)]",
    secondary:
      "border border-white/15 bg-white/5 hover:border-amber-500/40 text-white backdrop-blur-xl",
  };

  const isExploreCrafts = children === "Explore Crafts";

  return (
    <motion.button
      type={type}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`min-h-12 px-5 py-3 md:px-8 md:py-4 rounded-full font-semibold tracking-wide transition-all duration-300 ${variants[variant]} ${className}`}
      onClick={
        isExploreCrafts
          ? () => {
              window.location.href = "/talent";
            }
          : onClick
      }
      {...props}
    >
      {isExploreCrafts ? "Explore Talent" : children}
    </motion.button>
  );
}
