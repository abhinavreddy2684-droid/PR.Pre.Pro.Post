import { ChevronLeft, ChevronRight } from "lucide-react";

const BUTTON_CLASS =
  "grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30";

/** Previous / next month buttons around the month label. */
export default function CalendarNav({ label, onPrevious, onNext, previousDisabled, nextDisabled }) {
  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={onPrevious}
        disabled={previousDisabled}
        aria-label="Previous month"
        className={BUTTON_CLASS}
      >
        <ChevronLeft size={16} />
      </button>
      <p className="text-sm font-bold text-white">{label}</p>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        aria-label="Next month"
        className={BUTTON_CLASS}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
