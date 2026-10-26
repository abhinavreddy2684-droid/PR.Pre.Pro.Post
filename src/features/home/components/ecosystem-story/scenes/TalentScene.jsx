import { motion } from "framer-motion";
import StoryWindow from "@/features/home/components/ecosystem-story/StoryWindow";

function Person({ active = false }) {
  return (
    <div className="relative h-14 w-10 sm:h-16 sm:w-12">
      <div
        className={`absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 rounded-full border ${active ? "border-amber-300/45 bg-amber-300/10" : "border-white/10 bg-white/[0.025]"}`}
      />
      <div
        className={`absolute bottom-0 left-1/2 h-8 w-9 -translate-x-1/2 rounded-t-[1rem] border ${active ? "border-amber-300/25 bg-amber-300/[0.07]" : "border-white/10 bg-white/[0.025]"}`}
      />
    </div>
  );
}

export default function TalentScene() {
  return (
    <div className="grid h-full grid-cols-[0.8fr_1.2fr] gap-3 sm:gap-4">
      <div className="relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-[radial-gradient(circle_at_50%_24%,rgba(245,158,11,.18),transparent_26%),linear-gradient(145deg,#1a1209,#080808_68%)] p-4 sm:min-h-[360px] sm:p-5">
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-400/[0.08] blur-3xl" />
        <div className="relative mx-auto mb-auto mt-10 flex items-end gap-2 sm:gap-3">
          <Person />
          <motion.div
            animate={{ y: [0, -7, 0], opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Person active />
          </motion.div>
          <Person />
        </div>
        <div className="relative border-t border-white/[0.08] pt-4">
          <p className="text-[7px] uppercase tracking-[0.25em] text-amber-400">FILMMAKERS</p>
          <p className="mt-2 text-base font-medium leading-tight text-white sm:text-lg">
            The work is already there.
          </p>
          <p className="mt-2 text-[8px] leading-relaxed text-neutral-500 sm:text-[9px]">
            The missing piece is discoverability.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <StoryWindow className="flex-1">
          <div className="p-4 sm:p-5">
            <p className="text-[7px] uppercase tracking-[0.24em] text-neutral-600">
              THE OLD JOURNEY
            </p>
            <div className="mt-4 space-y-3">
              {["Who do I know?", "Who can I trust?", "Where do I find the right craft?"].map(
                (line, index) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0.35 }}
                    animate={{ opacity: [0.35, 0.8, 0.35] }}
                    transition={{ duration: 3, delay: index * 0.4, repeat: Infinity }}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.018] px-3 py-3"
                  >
                    <span className="text-[8px] text-neutral-700">0{index + 1}</span>
                    <span className="text-[9px] text-neutral-400 sm:text-[10px]">{line}</span>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </StoryWindow>
        <div className="rounded-[1.25rem] border border-amber-400/15 bg-amber-400/[0.035] p-4 sm:p-5">
          <p className="text-[7px] uppercase tracking-[0.24em] text-amber-400">THE IDEA</p>
          <p className="mt-2 text-sm font-medium text-white sm:text-base">
            Build the gateway around the work.
          </p>
        </div>
      </div>
    </div>
  );
}
