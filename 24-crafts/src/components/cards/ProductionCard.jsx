import { motion } from "framer-motion";
import { Film, Play } from "lucide-react";

import Button from "../ui/Button";

export default function ProductionCard({ production }) {
  return (
    <motion.div whileHover={{ y: -10 }} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950">
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black scale-110 group-hover:scale-100 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button variant="secondary" aria-label={`Play ${production.title}`} className="!p-0 w-20 h-20 rounded-full flex items-center justify-center"><Play className="text-white ml-1" fill="white" /></Button>
        </div>
        <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/10"><span className="uppercase tracking-[0.2em] text-xs text-amber-400">{production.genre}</span></div>
      </div>

      <div className="p-8">
        <div className="flex items-center gap-3 text-neutral-500 uppercase tracking-[0.2em] text-xs"><Film size={14} /><span>Featured Production</span></div>
        <h3 className="mt-5 text-4xl font-black tracking-tight">{production.title}</h3>
        <p className="mt-5 text-neutral-400 leading-relaxed">{production.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">{production.credits.map((credit) => <span key={credit} className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs uppercase tracking-[0.18em] text-neutral-300">{credit}</span>)}</div>
      </div>
    </motion.div>
  );
}
