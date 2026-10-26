import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

export default function DiscoveryScene() {
  return (
    <div className="relative grid min-h-[320px] grid-cols-[1fr_auto_1fr] items-center gap-2 sm:min-h-[370px] sm:gap-5">
      <div className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.018] p-4 sm:p-5">
        <p className="text-[7px] uppercase tracking-[0.22em] text-neutral-600">PROJECT BRIEF</p>
        <p className="mt-3 text-sm font-medium leading-snug text-white sm:text-base">
          A production needs a visual voice.
        </p>
        <div className="mt-4 space-y-2.5 text-[8px] text-neutral-500 sm:text-[9px]">
          <span className="block">Craft · Cinematography</span>
          <span className="block">Location · Mumbai</span>
          <span className="block">Experience · Feature work</span>
        </div>
      </div>
      <div className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <motion.div
          animate={{ scale: [0.8, 1.45, 0.8], opacity: [0.25, 0.05, 0.25] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-amber-400/20"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-1 rounded-full border border-dashed border-amber-400/30"
        />
        <Sparkles size={22} className="relative text-amber-300" />
      </div>
      <div className="rounded-[1.25rem] border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.08] to-black p-4 sm:p-5">
        <p className="text-[7px] uppercase tracking-[0.22em] text-amber-400">DISCOVERED</p>
        <p className="mt-3 text-sm font-medium leading-snug text-white sm:text-base">
          The work makes the shortlist meaningful.
        </p>
        <div className="mt-4 space-y-2.5">
          <div className="flex items-center gap-2 text-[8px] text-neutral-500">
            <Check size={11} className="text-amber-400" />
            Craft aligned
          </div>
          <div className="flex items-center gap-2 text-[8px] text-neutral-500">
            <Check size={11} className="text-amber-400" />
            Experience aligned
          </div>
          <div className="flex items-center gap-2 text-[8px] text-neutral-500">
            <Check size={11} className="text-amber-400" />
            Availability aligned
          </div>
        </div>
      </div>
      <motion.div
        animate={{ scaleX: [0.2, 1, 0.2], opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[25%] right-[25%] top-1/2 h-px origin-center bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
      />
    </div>
  );
}
