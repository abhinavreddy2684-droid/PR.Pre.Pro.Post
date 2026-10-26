import { motion } from "framer-motion";
import { BriefcaseBusiness, Users } from "lucide-react";

export default function ConnectionScene() {
  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-[1.5rem] border border-amber-400/20 bg-[radial-gradient(circle_at_50%_42%,rgba(245,158,11,.12),transparent_30%),linear-gradient(135deg,#0d0b08,#060606)] p-5 sm:min-h-[370px] sm:p-7">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-400/[0.08] blur-3xl" />
      <div className="relative flex h-full flex-col items-center justify-center text-center">
        <div className="relative flex items-center gap-8 sm:gap-14">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
              <Users size={20} className="text-neutral-500" />
            </div>
            <span className="text-[7px] uppercase tracking-[0.18em] text-neutral-600">Talent</span>
          </motion.div>
          <div className="relative h-px w-20 overflow-hidden bg-white/10 sm:w-28">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-1/2 bg-amber-400"
            />
          </div>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 3.5, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/[0.05] shadow-[0_0_45px_rgba(245,158,11,.1)]">
              <BriefcaseBusiness size={20} className="text-amber-300" />
            </div>
            <span className="text-[7px] uppercase tracking-[0.18em] text-amber-400">
              Production
            </span>
          </motion.div>
        </div>
        <p className="mt-9 text-[7px] uppercase tracking-[0.28em] text-amber-400">
          DISCOVER · MATCH · CONNECT
        </p>
        <h4 className="mt-3 max-w-md text-xl font-semibold tracking-tight text-white sm:text-3xl">
          The right introduction can change a production.
        </h4>
        <p className="mt-3 max-w-lg text-[9px] leading-relaxed text-neutral-500 sm:text-[10px]">
          The talent gets a genuine opportunity to be discovered. The recruiter finds the right
          craft. Pre Pro Post becomes the gateway between them.
        </p>
      </div>
    </div>
  );
}
