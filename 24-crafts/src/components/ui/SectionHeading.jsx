import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`${center ? "text-center" : ""}`}
    >
      {eyebrow && (
        <p className="uppercase tracking-[0.4em] text-amber-400 text-sm mb-5">
          {eyebrow}
        </p>
      )}

      <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-8 text-neutral-400 text-lg leading-relaxed max-w-3xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}