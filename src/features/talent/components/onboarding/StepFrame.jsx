import { motion } from "framer-motion";

export default function StepFrame({ eyebrow, title, description, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-6"
    >
      <div className="max-w-3xl">
        <p className="text-[10px] uppercase tracking-[0.35em] text-amber-300">{eyebrow}</p>
        <h1 className="mt-4 text-5xl font-black leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">{description}</p>
      </div>

      <div className="mt-10">{children}</div>
    </motion.section>
  );
}
