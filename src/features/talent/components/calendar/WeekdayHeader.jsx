import { WEEKDAY_INITIALS } from "@/lib/calendar";

/** S M T W T F S header row for a 7-column month grid. */
export default function WeekdayHeader() {
  return (
    <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[9px] font-semibold uppercase tracking-wider text-white/25">
      {WEEKDAY_INITIALS.map((day, index) => (
        <span key={`${day}-${index}`} className="py-1">
          {day}
        </span>
      ))}
    </div>
  );
}
