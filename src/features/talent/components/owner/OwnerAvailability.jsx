import { CalendarDays } from "lucide-react";
import { useMemo, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionAction from "@/features/talent/components/owner/SectionAction";
import { dateKey, monthGrid, monthLabel } from "@/lib/calendar";
import CalendarNav from "@/features/talent/components/calendar/CalendarNav";
import WeekdayHeader from "@/features/talent/components/calendar/WeekdayHeader";
import { nextAvailability } from "@/lib/availability";

export default function OwnerAvailability({ onManage }) {
  const [cursor, setCursor] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [states, setStates] = useState({});
  const label = monthLabel(cursor);
  const { firstDay, daysInMonth } = useMemo(() => monthGrid(cursor), [cursor]);
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);
  const getStatus = (day) => {
    const date = new Date(cursor.getFullYear(), cursor.getMonth(), day);
    if (date < today) return "unavailable";
    return states[dateKey(date)] || "available";
  };
  const meta = {
    available: { label: "Open", dot: "bg-amber-500", text: "text-amber-400" },
    tentative: { label: "Tentative", dot: "bg-emerald-400", text: "text-emerald-400" },
    unavailable: { label: "Unavailable", dot: "bg-white/20", text: "text-white/30" },
  };
  const shift = (offset) => {
    setCursor((date) => new Date(date.getFullYear(), date.getMonth() + offset, 1));
    setSelectedDay(null);
  };
  const cycle = (day) => {
    const date = new Date(cursor.getFullYear(), cursor.getMonth(), day);
    if (date < today) return;
    const key = dateKey(date);
    setStates((current) => ({ ...current, [key]: nextAvailability(current[key] || "available") }));
    setSelectedDay(day);
  };
  const selectedStatus = selectedDay ? getStatus(selectedDay) : null;
  return (
    <section id="availability" className="mt-32 scroll-mt-24">
      <div className="flex flex-col gap-10 rounded-[2rem] bg-white/[0.03] p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
        <div className="max-w-xl">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow="03 / Availability"
              title="Find A Day That Works"
              subtitle="Your next 90 days are available by default. Mark days tentative or unavailable when needed."
            />
            <SectionAction onClick={onManage}>
              <CalendarDays size={13} />
              Manage calendar
            </SectionAction>
          </div>
          <div className="mt-7 flex flex-wrap gap-5 text-xs font-semibold text-neutral-400">
            <span className="inline-flex items-center gap-2">
              <i className="h-2 w-2 rounded-full bg-amber-500" /> Open
            </span>
            <span className="inline-flex items-center gap-2 text-emerald-300">
              <i className="h-2 w-2 rounded-full bg-emerald-400" /> Tentative
            </span>
            <span className="inline-flex items-center gap-2 text-white/30">
              <i className="h-2 w-2 rounded-full bg-white/20" /> Unavailable
            </span>
          </div>
          {selectedDay && (
            <p className="mt-5 text-sm text-neutral-400">
              {label} {selectedDay} ·{" "}
              <span className={meta[selectedStatus].text}>{meta[selectedStatus].label}</span>
            </p>
          )}
        </div>
        <div className="w-full max-w-[400px] rounded-[2rem] bg-black/25 p-5 sm:p-6">
          <CalendarNav label={label} onPrevious={() => shift(-1)} onNext={() => shift(1)} />
          <WeekdayHeader />
          <div className="mt-1 grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, index) => (
              <span key={`blank-${index}`} className="h-9" />
            ))}
            {Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => {
              const status = getStatus(day);
              const isSelected = selectedDay === day;
              return (
                <button
                  type="button"
                  key={day}
                  disabled={
                    status === "unavailable" &&
                    new Date(cursor.getFullYear(), cursor.getMonth(), day) < today
                  }
                  onClick={() => cycle(day)}
                  className={`group relative h-9 rounded-xl text-xs font-semibold transition ${status === "available" ? "text-amber-300 hover:bg-amber-500/10" : status === "tentative" ? "text-emerald-300 hover:bg-emerald-400/10" : "cursor-not-allowed text-white/15 line-through decoration-white/20"} ${isSelected ? "bg-white/10 ring-1 ring-white/20" : ""}`}
                >
                  <span>{day}</span>
                  <span
                    className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${meta[status].dot}`}
                  />
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-[10px] text-white/25">
            Only the next 90 days are managed. Past days are not editable.
          </p>
        </div>
      </div>
    </section>
  );
}
