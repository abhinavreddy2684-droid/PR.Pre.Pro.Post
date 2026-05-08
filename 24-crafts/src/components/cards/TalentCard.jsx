import { motion } from "framer-motion";
import {
  Star,
  Briefcase,
  Sparkles,
} from "lucide-react";

export default function TalentCard({ artist }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="
        group relative overflow-hidden
        rounded-[2rem]
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
      "
    >
      {/* Glow */}

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_50%)]" />

      {/* Image */}

      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-neutral-800 to-black">
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.15),transparent_55%)]" />

        <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/10">
          <span className="text-xs uppercase tracking-[0.2em] text-amber-400">
            Featured Artist
          </span>
        </div>
      </div>

      {/* Content */}

      <div className="relative p-8">
        
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold tracking-tight">
            {artist.name}
          </h3>

          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Star size={18} className="text-amber-400" />
          </div>
        </div>

        <p className="mt-3 uppercase tracking-[0.25em] text-sm text-amber-400">
          {artist.specialty}
        </p>

        <div className="mt-8 space-y-4">
          
          <div className="flex items-center gap-3 text-neutral-400">
            <Briefcase size={16} />
            <span>{artist.experience} Years Experience</span>
          </div>

          <div className="flex items-center gap-3 text-neutral-400">
            <Sparkles size={16} />
            <span>{artist.genres.join(" / ")}</span>
          </div>
        </div>

        <button
          className="
            mt-10 w-full py-4 rounded-full
            bg-amber-500 text-black
            font-semibold
            hover:bg-amber-400
            transition-all duration-300
            shadow-[0_0_40px_rgba(245,158,11,0.2)]
          "
        >
          Connect Artist
        </button>
      </div>
    </motion.div>
  );
}