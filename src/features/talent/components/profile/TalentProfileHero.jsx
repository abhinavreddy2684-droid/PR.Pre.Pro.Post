import { motion } from "framer-motion";
import { BriefcaseBusiness, MapPin } from "lucide-react";
import TalentPhoto from "@/features/talent/components/discovery/TalentPhoto";

/**
 * Photo + headline block at the top of a talent profile. `children` render under the genre
 * tags (the public and owner profiles put different things there). `photoNote` is a small label
 * over the photo (the owner's "Photo in review").
 * @param {{ talent: ReturnType<typeof import("@/features/talent/api/talentAdapters").toTalentProfile> }} props
 */
export default function TalentProfileHero({ talent, photoNote, children }) {
  return (
    <section className="mt-10 grid items-stretch gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] bg-neutral-900 sm:min-h-[560px]"
      >
        <div className="absolute inset-0">
          <TalentPhoto src={talent.image} alt={talent.name} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        {photoNote && (
          <span className="absolute bottom-6 left-6 rounded-full bg-amber-500 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-black">
            {photoNote}
          </span>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="flex flex-col justify-center py-4 lg:py-10"
      >
        {talent.primaryCraft && (
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
            {talent.primaryCraft.title}
          </p>
        )}
        <h1 className="mt-5 break-words text-5xl font-black leading-none tracking-tight md:text-7xl">
          {talent.name}
        </h1>
        {talent.supportingCrafts.length > 0 && (
          <p className="mt-4 text-sm text-neutral-400">
            Also: {talent.supportingCrafts.map((craft) => craft.title).join(" · ")}
          </p>
        )}
        {(talent.location || talent.experience) && (
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-base text-neutral-400">
            {talent.location && (
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} /> {talent.location}
              </span>
            )}
            {talent.experience && (
              <span className="inline-flex items-center gap-2">
                <BriefcaseBusiness size={16} /> {talent.experience} experience
              </span>
            )}
          </div>
        )}
        {talent.bio && (
          <p className="mt-8 max-w-2xl whitespace-pre-line text-lg leading-relaxed text-neutral-400">
            {talent.bio}
          </p>
        )}
        {talent.genres.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {talent.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-300"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
