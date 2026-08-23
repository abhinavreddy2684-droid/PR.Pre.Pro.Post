import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, Check, FileText, Search, Sparkles, Users } from "lucide-react";

const scenes = [
  {
    key: "talent",
    title: "Talent wants to be discovered",
    label: "TALENT",
    icon: Users,
  },
  {
    key: "gateway",
    title: "They find the gateway",
    label: "PRE PRO POST",
    icon: Sparkles,
  },
  {
    key: "portfolio",
    title: "Their portfolio becomes discoverable",
    label: "PORTFOLIO",
    icon: FileText,
  },
  {
    key: "recruiter",
    title: "Recruiters search with confidence",
    label: "RECRUITER",
    icon: Search,
  },
  {
    key: "match",
    title: "The right talent gets matched",
    label: "MATCH",
    icon: BriefcaseBusiness,
  },
];

function Person({ className = "" }) {
  return (
    <div className={`relative h-11 w-8 ${className}`}>
      <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full border border-amber-400/50 bg-amber-300/20" />
      <div className="absolute bottom-0 left-1/2 h-7 w-7 -translate-x-1/2 rounded-t-[14px] border border-white/10 bg-white/[0.06]" />
    </div>
  );
}

export default function EcosystemStory() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-[#080808] shadow-[0_0_80px_rgba(245,158,11,0.06)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(245,158,11,0.14),transparent_48%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.025),transparent_35%,rgba(245,158,11,0.025))]" />

      <div className="absolute left-4 right-4 top-4 flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-neutral-600 sm:left-6 sm:right-6 sm:top-6">
        <span>THE ECOSYSTEM</span>
        <span>24 CRAFTS</span>
      </div>

      <div className="absolute inset-x-5 top-1/2 -translate-y-1/2 sm:inset-x-8">
        <motion.div
          className="relative mx-auto max-w-[340px]"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

          <motion.div
            className="relative mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full border border-amber-400/40 bg-black/80 shadow-[0_0_70px_rgba(245,158,11,0.16)] backdrop-blur-xl sm:h-32 sm:w-32"
            animate={{ boxShadow: ["0 0 50px rgba(245,158,11,0.10)", "0 0 85px rgba(245,158,11,0.20)", "0 0 50px rgba(245,158,11,0.10)"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={20} className="text-amber-400" />
            <span className="mt-2 text-[9px] uppercase tracking-[0.25em] text-amber-400">PRE PRO POST</span>
            <span className="mt-1 text-[10px] text-white/70">The Gateway</span>
          </motion.div>

          <motion.div
            className="absolute -left-2 top-1/2 -translate-y-1/2 sm:-left-6"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-end gap-0.5 rounded-2xl border border-white/10 bg-black/60 px-3 py-3 backdrop-blur-xl sm:px-4">
              <Person />
              <Person className="-ml-1" />
              <Person className="-ml-1" />
            </div>
            <span className="mt-2 block text-[8px] uppercase tracking-[0.18em] text-neutral-500">Talent</span>
          </motion.div>

          <motion.div
            className="absolute -right-2 top-1/2 -translate-y-1/2 sm:-right-6"
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/60 px-3 py-3 backdrop-blur-xl sm:px-4">
              <Search size={18} className="text-amber-400" />
              <span className="text-[8px] uppercase tracking-[0.16em] text-neutral-400">Recruiter</span>
            </div>
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-full mt-8 -translate-x-1/2 whitespace-nowrap rounded-full border border-amber-400/20 bg-amber-400/[0.06] px-4 py-2 text-[8px] uppercase tracking-[0.2em] text-amber-300"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            Discover · Match · Connect
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
        <div className="relative h-16 overflow-hidden rounded-2xl border border-white/10 bg-black/55 px-4 backdrop-blur-xl">
          {scenes.map((scene, index) => {
            const Icon = scene.icon;
            return (
              <motion.div
                key={scene.key}
                className="absolute inset-0 flex items-center gap-3 px-4"
                animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -8] }}
                transition={{
                  duration: 5,
                  delay: index * 5,
                  repeat: Infinity,
                  repeatDelay: (scenes.length - 1) * 5,
                  ease: "easeInOut",
                }}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/[0.06]">
                  <Icon size={16} className="text-amber-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-amber-400">{scene.label}</p>
                  <p className="mt-1 truncate text-[11px] text-neutral-300 sm:text-xs">{scene.title}</p>
                </div>
                <ArrowRight size={14} className="ml-auto shrink-0 text-neutral-700" />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-center gap-2 text-[8px] uppercase tracking-[0.22em] text-neutral-700">
          <Check size={11} className="text-amber-500/60" />
          A better way to find the right people
        </div>
      </div>
    </div>
  );
}
