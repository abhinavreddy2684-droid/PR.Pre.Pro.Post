import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useCatalog } from "@/catalog";

export default function OnboardingComplete({ profile, onEnter }) {
  const { craftBySlug, cityById } = useCatalog();
  const displayName = profile.professionalName || profile.fullName;
  const city = cityById(profile.city);

  return (
    <div className="relative flex min-h-screen items-center overflow-hidden bg-[#040404] px-6 text-white sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(245,158,11,0.16),transparent_28%)]" />
      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto mb-8 grid h-16 w-16 place-items-center rounded-full border border-amber-400/40 bg-amber-500/[0.08] text-amber-300">
            <Check size={30} />
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300">
            Talent onboarding complete
          </p>
          <h1 className="mt-5 text-6xl font-black leading-[0.82] tracking-tight sm:text-8xl lg:text-[10rem]">
            YOU&apos;RE IN.
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-white/45">
            Your place in the Talent Network starts here. Your profile and portfolio can grow with
            your work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-10 grid max-w-3xl gap-px overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/10 text-left sm:grid-cols-3"
        >
          <SummaryItem label="Talent" value={displayName} />
          <SummaryItem label="Primary craft" value={craftBySlug(profile.primaryCraft)?.title} />
          <SummaryItem label="Location" value={city && `${city.name}, ${city.state.name}`} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.5 }}
          className="mt-10"
        >
          <Button onClick={onEnter} className="inline-flex items-center gap-3">
            Enter Talent Network
            <ArrowRight size={17} />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="bg-[#080808] px-6 py-6">
      <p className="text-[9px] uppercase tracking-[0.24em] text-white/30">{label}</p>
      <p className="mt-3 truncate text-sm font-medium text-white/80">{value}</p>
    </div>
  );
}
