import { motion } from "framer-motion";
import { Briefcase, MapPin, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../ui/Button";

export default function TalentCard({ artist, talent = artist }) {
  const profile = talent || artist;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_50%)]" />

      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-full h-full object-cover grayscale-[15%] group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-[0.18em] text-amber-300">
          {profile.availability || "Featured Artist"}
        </span>
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
            {profile.craft || profile.specialty}
          </p>
          <h3 className="mt-2 text-2xl font-bold">{profile.name}</h3>
        </div>
      </div>

      <div className="relative p-5">
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <MapPin size={15} />
          {profile.location || "Location on request"}
        </div>

        {profile.bio && (
          <p className="mt-4 text-sm leading-relaxed text-neutral-500 line-clamp-2">
            {profile.bio}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {(profile.genres || []).map((genre) => (
            <span key={genre} className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs text-neutral-400">
              {genre}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 text-sm text-neutral-400">
          <Briefcase size={15} />
          <span>{profile.experience} experience</span>
          <Star size={15} className="ml-auto text-amber-400" />
        </div>

        <Link to={`/talent/${profile.id}`} className="block mt-5">
          <Button className="w-full flex items-center justify-center gap-2">
            View Profile
            <Sparkles size={16} />
          </Button>
        </Link>
      </div>
    </motion.article>
  );
}
