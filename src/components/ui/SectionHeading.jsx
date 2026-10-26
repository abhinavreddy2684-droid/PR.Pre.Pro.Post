import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Eyebrow + large title + optional subtitle, fading in when scrolled into view.
 * @param {object} props
 * @param {string} [props.eyebrow] small amber label above the title
 * @param {import("react").ReactNode} props.title
 * @param {string} [props.subtitle]
 * @param {boolean} [props.center] centre-align the text
 */
export default function SectionHeading({ eyebrow, title, subtitle, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className={cn(center && "text-center")}
    >
      {eyebrow && (
        <p className="uppercase tracking-[0.4em] text-amber-400 text-xs sm:text-sm mb-4">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl sm:text-5xl md:text-7xl font-black leading-none tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-5 sm:mt-6 text-neutral-400 text-base sm:text-lg leading-relaxed max-w-3xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
