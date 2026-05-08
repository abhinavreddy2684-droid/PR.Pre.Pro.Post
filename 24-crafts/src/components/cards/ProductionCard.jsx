import { motion } from "framer-motion";
import {
  Play,
  Film,
} from "lucide-react";

export default function ProductionCard({ production }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="
        group relative overflow-hidden
        rounded-[2rem]
        border border-white/10
        bg-neutral-950
      "
    >
      {/* Poster */}

      <div className="relative aspect-video overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black scale-110 group-hover:scale-100 transition-all duration-700" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Play */}

        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className="
              w-20 h-20 rounded-full
              bg-white/10 backdrop-blur-xl
              border border-white/20
              flex items-center justify-center
              group-hover:scale-110
              transition-all duration-500
            "
          >
            <Play
              className="text-white ml-1"
              fill="white"
            />
          </button>
        </div>

        {/* Genre */}

        <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/10">
          <span className="uppercase tracking-[0.2em] text-xs text-amber-400">
            {production.genre}
          </span>
        </div>
      </div>

      {/* Content */}

      <div className="p-8">
        
        <div className="flex items-center gap-3 text-neutral-500 uppercase tracking-[0.2em] text-xs">
          <Film size={14} />
          <span>Featured Production</span>
        </div>

        <h3 className="mt-5 text-4xl font-black tracking-tight">
          {production.title}
        </h3>

        <p className="mt-5 text-neutral-400 leading-relaxed">
          {production.description}
        </p>

        {/* Credits */}

        <div className="mt-8 flex flex-wrap gap-3">
          {production.credits.map((credit) => (
            <span
              key={credit}
              className="
                px-4 py-2 rounded-full
                bg-white/[0.04]
                border border-white/10
                text-xs uppercase tracking-[0.18em]
                text-neutral-300
              "
            >
              {credit}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}