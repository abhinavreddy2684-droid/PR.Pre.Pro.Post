import { motion } from "framer-motion";
import { ArrowRight, Briefcase, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import TalentPhoto from "@/features/talent/components/discovery/TalentPhoto";

/**
 * One talent in a result grid, linking to their public profile.
 * @param {{ talent: ReturnType<typeof import("@/features/talent/api/talentAdapters").toTalentCard> }} props
 */
export default function TalentCard({ talent }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl"
    >
      <div className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-all duration-700 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_50%)]" />

      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-neutral-800 to-black">
        <TalentPhoto
          src={talent.image}
          alt={talent.name}
          className="grayscale-[15%] lg:group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-amber-300">
          {talent.isAvailable ? "Available" : "Booked this week"}
        </span>
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
          {talent.craft && (
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-amber-300">
              {talent.craft}
            </p>
          )}
          <h3 className="mt-1.5 sm:mt-2 text-xl sm:text-2xl font-bold truncate">{talent.name}</h3>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-4 sm:p-5">
        {talent.location && (
          <div className="flex items-start gap-2 text-xs sm:text-sm text-neutral-400">
            <MapPin size={15} className="mt-0.5 shrink-0" />
            <span>{talent.location}</span>
          </div>
        )}

        {talent.bio && (
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-neutral-500 line-clamp-3">
            {talent.bio}
          </p>
        )}

        {talent.genres.length > 0 && (
          <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
            {talent.genres.map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 sm:px-2.5 rounded-full bg-white/[0.05] border border-white/10 text-[10px] sm:text-xs text-neutral-400"
              >
                {genre}
              </span>
            ))}
          </div>
        )}

        {talent.experience && (
          <div className="mt-4 sm:mt-6 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-400">
            <Briefcase size={15} className="shrink-0" />
            <span className="truncate">{talent.experience} experience</span>
          </div>
        )}

        <div className="mt-auto pt-4 sm:pt-5">
          <Link
            to={`/talent/${talent.id}`}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold tracking-wide text-black shadow-[0_0_40px_rgba(245,158,11,0.25)] transition hover:-translate-y-0.5 hover:bg-amber-400 sm:text-base"
          >
            View Profile
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
