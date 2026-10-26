import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function PublicAvailability() {
  const [cursor, setCursor] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(cursor),
    [cursor],
  );
  const { firstDay, daysInMonth } = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    return {
      firstDay: new Date(year, month, 1).getDay(),
      daysInMonth: new Date(year, month + 1, 0).getDate(),
    };
  }, [cursor]);
  const getStatus = (day) => {
    const date = new Date(cursor.getFullYear(), cursor.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return "unavailable";
    const score = (day * 7 + date.getDay() * 3) % 12;
    return score >= 9 ? "available" : score >= 6 ? "tentative" : "unavailable";
  };
  const meta = {
    available: { label: "Available", dot: "bg-amber-500", text: "text-amber-400" },
    tentative: { label: "Tentative", dot: "bg-emerald-400", text: "text-emerald-400" },
    unavailable: { label: "Unavailable", dot: "bg-white/20", text: "text-white/30" },
  };
  const shift = (offset) => {
    setCursor((date) => new Date(date.getFullYear(), date.getMonth() + offset, 1));
    setSelectedDay(null);
  };
  return (
    <section id="availability" className="mt-32 scroll-mt-24">
      <div className="flex flex-col gap-10 rounded-[2rem] bg-white/[0.03] p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
        <div className="max-w-xl">
          <SectionHeading
            eyebrow="03 / Availability"
            title="Find A Day That Works"
            subtitle="Yellow is open, green needs confirmation, and muted dates are unavailable."
          />
          <div className="mt-7 flex flex-wrap gap-5 text-xs font-semibold text-neutral-400">
            <span className="inline-flex items-center gap-2">
              <i className="h-2 w-2 rounded-full bg-amber-500" /> Open
            </span>
            <span className="inline-flex items-center gap-2">
              <i className="h-2 w-2 rounded-full bg-emerald-400" /> Tentative
            </span>
            <span className="inline-flex items-center gap-2">
              <i className="h-2 w-2 rounded-full bg-white/20" /> Unavailable
            </span>
          </div>
          {selectedDay && (
            <p className="mt-5 text-sm text-neutral-400">
              {monthLabel} {selectedDay} ·{" "}
              <span className={meta[getStatus(selectedDay)].text}>
                {meta[getStatus(selectedDay)].label}
              </span>
            </p>
          )}
        </div>
        <div className="w-full max-w-[400px] rounded-[2rem] bg-black/25 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => shift(-1)}
              aria-label="Previous month"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft size={16} />
            </button>
            <p className="text-sm font-bold text-white">{monthLabel}</p>
            <button
              onClick={() => shift(1)}
              aria-label="Next month"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[9px] font-semibold uppercase tracking-wider text-white/25">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <span key={`${day}-${i}`} className="py-1">
                {day}
              </span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <span key={`blank-${i}`} className="h-9" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const status = getStatus(day);
              const isSelected = selectedDay === day;
              return (
                <button
                  key={day}
                  disabled={status === "unavailable"}
                  onClick={() => setSelectedDay(day)}
                  title={
                    status === "unavailable" ? "Unavailable — already booked" : meta[status].label
                  }
                  className={`group relative h-9 rounded-xl text-xs font-semibold transition ${status === "available" ? "text-amber-300 hover:bg-amber-500/10" : status === "tentative" ? "text-emerald-300 hover:bg-emerald-400/10" : "cursor-not-allowed text-white/15 line-through decoration-white/20"} ${isSelected ? "bg-white/10 ring-1 ring-white/20" : ""}`}
                >
                  <span>{day}</span>
                  <span
                    className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${meta[status].dot}`}
                  />
                  {status === "unavailable" && (
                    <span className="pointer-events-none absolute inset-0 grid place-items-center text-xs text-white/20 opacity-0 transition group-hover:opacity-100">
                      ×
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
