import { motion } from "framer-motion";
import { CHAPTERS } from "@/features/home/components/ecosystem-story/chapters";

/** One clickable segment per chapter; chapters up to and including `step` are filled. */
export default function StoryProgress({ step, onSelect }) {
  return (
    <div className="mt-4 flex gap-1.5">
      {CHAPTERS.map((chapter, index) => (
        <button
          key={chapter.id}
          type="button"
          aria-label={`Show ${chapter.label} chapter`}
          onClick={() => onSelect(index)}
          className="group flex-1"
        >
          <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full bg-amber-400"
              initial={false}
              animate={{ width: index <= step ? "100%" : "0%" }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <span
            className={`mt-1 hidden text-[6px] uppercase tracking-[0.16em] sm:block ${index === step ? "text-amber-400" : "text-neutral-700"}`}
          >
            {chapter.label}
          </span>
        </button>
      ))}
    </div>
  );
}
