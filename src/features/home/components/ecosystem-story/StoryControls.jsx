import { ChevronLeft, ChevronRight } from "lucide-react";

/** Previous / next chapter buttons. */
export default function StoryControls({ onPrevious, onNext }) {
  return (
    <div className="flex shrink-0 gap-1.5">
      <button
        type="button"
        onClick={() => onPrevious()}
        aria-label="Previous chapter"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-neutral-500 transition hover:border-amber-400/30 hover:text-amber-300"
      >
        <ChevronLeft size={14} />
      </button>
      <button
        type="button"
        onClick={() => onNext()}
        aria-label="Next chapter"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-neutral-500 transition hover:border-amber-400/30 hover:text-amber-300"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
