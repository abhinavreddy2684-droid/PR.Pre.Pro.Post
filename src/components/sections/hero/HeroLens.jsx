import { motion } from "framer-motion";
import MorphIcon from "@/components/sections/hero/MorphIcon";
import OrbitLabels from "@/components/sections/hero/OrbitLabels";

/** Right-hand "lens" graphic: rings, orbiting craft names and the morphing icon. */
export default function HeroLens() {
  return (
    <div className="hero-lens relative hidden items-center justify-center lg:flex">
      <div className="relative h-[640px] w-[640px]">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[130px]" />

        <div className="absolute left-[-80px] right-[-80px] top-1/2 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        <div className="absolute bottom-[-80px] left-1/2 top-[-80px] w-px bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-white/[0.04]"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[80px] rounded-full border border-amber-500/[0.08]"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[170px] rounded-full border border-amber-500/[0.14]"
        />

        <OrbitLabels />

        <div className="absolute left-1/2 top-1/2 flex h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-amber-500/20 bg-black/40 shadow-[0_0_140px_rgba(245,158,11,0.12)] backdrop-blur-2xl">
          <motion.div
            animate={{ opacity: [0.2, 0.55, 0.2], scale: [1, 1.08, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-amber-500/10 blur-3xl"
          />

          <MorphIcon />
        </div>
      </div>
    </div>
  );
}
