import { motion } from "framer-motion";
import { BadgeCheck, Camera, Check, MapPin, Play } from "lucide-react";
import StoryWindow from "@/features/home/components/ecosystem-story/StoryWindow";

const crafts = [
  "Screenplay",
  "Direction",
  "Cinematography",
  "Editing",
  "Sound",
  "Music",
  "VFX",
  "Production",
];

export default function PortfolioScene() {
  return (
    <div className="space-y-3 sm:space-y-4">
      <StoryWindow>
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/[0.05]">
                <Camera size={17} className="text-amber-400" />
              </div>
              <div>
                <p className="text-[7px] uppercase tracking-[0.22em] text-amber-400">
                  THE PORTFOLIO
                </p>
                <p className="mt-1 text-sm text-neutral-200 sm:text-base">
                  A professional identity built around the work.
                </p>
              </div>
            </div>
            <BadgeCheck size={17} className="text-amber-400" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {["SCREENPLAY", "CINEMATOGRAPHY", "EDITING"].map((label, index) => (
              <motion.div
                key={label}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 4.5,
                  delay: index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/[0.08] bg-[linear-gradient(135deg,#21170c,#090909)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_28%,rgba(245,158,11,.22),transparent_25%)]" />
                <div className="absolute inset-x-3 bottom-3 h-px bg-white/10" />
                <span className="absolute bottom-4 left-3 text-[6px] uppercase tracking-[0.16em] text-white/45">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </StoryWindow>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.018] p-4 sm:p-5">
          <p className="text-[7px] uppercase tracking-[0.22em] text-neutral-600">CRAFT</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {crafts.map((craft) => (
              <span
                key={craft}
                className="rounded-full border border-white/[0.07] px-2.5 py-1.5 text-[7px] text-neutral-500"
              >
                {craft}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.018] p-4 sm:p-5">
          <p className="text-[7px] uppercase tracking-[0.22em] text-neutral-600">PROFILE CONTEXT</p>
          <div className="mt-3 space-y-2.5 text-[8px] text-neutral-500">
            <div className="flex items-center gap-2">
              <MapPin size={11} className="text-amber-400/70" />
              Location
            </div>
            <div className="flex items-center gap-2">
              <Play size={11} className="text-amber-400/70" />
              Reel & selected work
            </div>
            <div className="flex items-center gap-2">
              <Check size={11} className="text-amber-400/70" />
              Experience & availability
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
