import { useState } from "react";
import { cn } from "@/lib/cn";
import { dateKey, monthGrid, monthLabel } from "@/lib/calendar";
import CalendarNav from "@/features/talent/components/calendar/CalendarNav";
import WeekdayHeader from "@/features/talent/components/calendar/WeekdayHeader";
import { DAY_STYLES } from "@/features/talent/components/calendar/availabilityStyles";

/**
 * One month of the availability window. Days outside [first, last] are greyed out.
 * `statusFor(key)` gives a day's status; with `onDayClick(key)` days inside the window are
 * buttons, otherwise the calendar is read-only. `changedKeys` marks unsaved days.
 */
export default function AvailabilityMonth({
  first,
  last,
  statusFor,
  labelFor,
  onDayClick,
  changedKeys,
}) {
  const [cursor, setCursor] = useState(() => new Date(first.getFullYear(), first.getMonth(), 1));
  const { firstDay, daysInMonth } = monthGrid(cursor);
  const atStart =
    cursor.getFullYear() === first.getFullYear() && cursor.getMonth() === first.getMonth();
  const atEnd =
    cursor.getFullYear() === last.getFullYear() && cursor.getMonth() === last.getMonth();
  const shift = (offset) =>
    setCursor((date) => new Date(date.getFullYear(), date.getMonth() + offset, 1));

  return (
    <div>
      <CalendarNav
        label={monthLabel(cursor)}
        onPrevious={() => !atStart && shift(-1)}
        onNext={() => !atEnd && shift(1)}
        previousDisabled={atStart}
        nextDisabled={atEnd}
      />
      <WeekdayHeader />
      <div className="mt-1 grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, index) => (
          <span key={`blank-${index}`} className="h-9" />
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => {
          const date = new Date(cursor.getFullYear(), cursor.getMonth(), day);
          const key = dateKey(date);
          const inWindow = date >= first && date <= last;
          const status = inWindow ? statusFor(key) : "outside";
          const style = DAY_STYLES[status];
          const changed = changedKeys?.has(key);
          const content = (
            <>
              <span>{day}</span>
              <span
                className={cn(
                  "absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full",
                  style.dot,
                )}
              />
            </>
          );
          const className = cn(
            "relative grid h-9 place-items-center rounded-xl text-xs font-semibold",
            style.text,
            status === "unavailable" && "line-through decoration-white/20",
            changed && "ring-1 ring-amber-400/60",
          );
          const label = inWindow ? `${key}: ${labelFor(status)}` : `${key}: outside the 90 days`;

          if (onDayClick && inWindow) {
            return (
              <button
                type="button"
                key={key}
                onClick={() => onDayClick(key)}
                aria-label={`${label}${changed ? " (not saved)" : ""}`}
                className={cn(className, "transition", style.hover)}
              >
                {content}
              </button>
            );
          }
          return (
            <span key={key} aria-label={label} className={className}>
              {content}
            </span>
          );
        })}
      </div>
    </div>
  );
}
