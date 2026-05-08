import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function TestimonialCard({ item }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="
        relative overflow-hidden
        rounded-[2rem]
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-10
      "
    >
      {/* Glow */}

      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-all duration-700 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_50%)]" />

      {/* Quote Icon */}

      <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
        <Quote className="text-amber-400" />
      </div>

      {/* Quote */}

      <p className="mt-8 text-xl leading-relaxed text-neutral-300 italic">
        “{item.quote}”
      </p>

      {/* Author */}

      <div className="mt-10">
        <h4 className="text-lg font-semibold">
          {item.name}
        </h4>

        <p className="mt-2 text-sm uppercase tracking-[0.2em] text-amber-400">
          {item.role}
        </p>
      </div>
    </motion.div>
  );
}