import { motion } from "framer-motion";
import { ArrowRight, Check, FileText, Search, Sparkles, Users } from "lucide-react";

const scenes = [
  ["TALENT", "Talent wants to be discovered", Users],
  ["GATEWAY", "They find the Pre Pro Post gateway", Sparkles],
  ["PORTFOLIO", "Their portfolio becomes discoverable", FileText],
  ["RECRUITER", "Recruiters search with confidence", Search],
  ["MATCH", "The right talent gets matched", Check],
];

function People() {
  return (
    <div className="flex items-end gap-1">
      {[0, 1, 2].map((item) => (
        <motion.div key={item} animate={{ y: [0, -3, 0] }} transition={{ duration: 2.4, delay: item * 0.2, repeat: Infinity, ease: "easeInOut" }} className="relative h-12 w-8">
          <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full border border-amber-400/40 bg-amber-300/20" />
          <div className="absolute bottom-0 left-1/2 h-8 w-7 -translate-x-1/2 rounded-t-xl border border-white/10 bg-white/[0.06]" />
        </motion.div>
      ))}
    </div>
  );
}

export default function EcosystemStory() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-[#080808] shadow-[0_0_80px_rgba(245,158,11,0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(245,158,11,0.16),transparent_52%)]" />
      <div className="absolute inset-x-5 top-5 flex justify-between text-[9px] uppercase tracking-[0.25em] text-neutral-600 sm:inset-x-6 sm:top-6"><span>THE ECOSYSTEM</span><span>DISCOVERABILITY</span></div>

      <div className="absolute inset-x-5 top-1/2 -translate-y-1/2 sm:inset-x-8">
        <div className="relative flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-3">
            <People />
            <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500">Talent</span>
          </motion.div>

          <motion.div animate={{ scale: [1, 1.04, 1], boxShadow: ["0 0 35px rgba(245,158,11,.08)", "0 0 70px rgba(245,158,11,.2)", "0 0 35px rgba(245,158,11,.08)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-full border border-amber-400/40 bg-black/80 backdrop-blur-xl sm:h-36 sm:w-36">
            <Sparkles size={21} className="text-amber-400" />
            <span className="mt-2 text-[9px] uppercase tracking-[0.25em] text-amber-400">PRE PRO POST</span>
            <span className="mt-1 text-[10px] text-white/60">The Gateway</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]"><Search size={19} className="text-amber-400" /></div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500">Recruiter</span>
          </motion.div>

          <div className="absolute left-[18%] right-[18%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.35 }} className="mx-auto mt-12 max-w-[290px] rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/[0.06]"><FileText size={16} className="text-amber-400" /></div><div><p className="text-[8px] uppercase tracking-[0.2em] text-amber-400">PORTFOLIO</p><p className="mt-1 text-[11px] text-neutral-300">Become discoverable</p></div><ArrowRight size={14} className="ml-auto text-neutral-700" /></div>
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
        <div className="relative h-14 overflow-hidden rounded-2xl border border-white/10 bg-black/55 px-4 backdrop-blur-xl">
          {scenes.map(([label, text, Icon], index) => (
            <motion.div key={label} className="absolute inset-0 flex items-center gap-3" animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -8] }} transition={{ duration: 4, delay: index * 4, repeat: Infinity, repeatDelay: (scenes.length - 1) * 4, ease: "easeInOut" }}>
              <Icon size={16} className="text-amber-400" />
              <div><p className="text-[8px] uppercase tracking-[0.2em] text-amber-400">{label}</p><p className="mt-1 text-[10px] text-neutral-400">{text}</p></div>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 text-[8px] uppercase tracking-[0.2em] text-neutral-700"><Check size={11} className="text-amber-500/60" />Discover · Match · Connect</div>
      </div>
    </div>
  );
}
