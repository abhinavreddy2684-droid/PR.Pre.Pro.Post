import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";
import StoryWindow from "@/features/home/components/ecosystem-story/StoryWindow";

export default function RecruiterScene() {
  return (
    <div className="space-y-3 sm:space-y-4">
      <StoryWindow>
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 rounded-xl border border-amber-400/20 bg-black/55 px-3 py-3 sm:px-4 sm:py-3.5">
            <Search size={16} className="text-amber-400" />
            <span className="text-[9px] text-neutral-400 sm:text-[10px]">
              Find the right craft for a feature production...
            </span>
            <span className="ml-auto hidden rounded-lg bg-amber-400 px-3 py-1.5 text-[7px] font-semibold text-black sm:block">
              SEARCH
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Cinematography", "Mumbai", "Feature experience", "Available"].map((filter) => (
              <span
                key={filter}
                className="rounded-full border border-amber-400/15 bg-amber-400/[0.035] px-2.5 py-1.5 text-[7px] uppercase tracking-[0.12em] text-amber-200/60"
              >
                {filter}
              </span>
            ))}
          </div>
        </div>
      </StoryWindow>
      <div className="grid grid-cols-3 gap-3">
        {["CRAFT FIT", "WORK", "AVAILABILITY"].map((label, index) => (
          <motion.div
            key={label}
            animate={{ y: [0, -4, 0], opacity: [0.78, 1, 0.78] }}
            transition={{ duration: 4.2, delay: index * 0.35, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-[1.25rem] border border-white/[0.08] bg-[#090909] p-3 sm:p-4"
          >
            <div className="mb-3 flex h-16 items-center justify-center rounded-xl border border-white/[0.06] bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,.17),transparent_28%),linear-gradient(135deg,#1b1309,#070707)] sm:h-20">
              <Users size={19} className="text-neutral-600" />
            </div>
            <p className="text-[7px] uppercase tracking-[0.16em] text-neutral-500">{label}</p>
            <div className="mt-2 h-1 rounded-full bg-white/[0.07]" />
            <div className="mt-2 h-1 w-2/3 rounded-full bg-amber-400/15" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
