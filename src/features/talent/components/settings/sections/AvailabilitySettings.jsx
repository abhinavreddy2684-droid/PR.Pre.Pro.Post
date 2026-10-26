import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import FloatingCard from "@/features/talent/components/settings/fields/FloatingCard";

export default function AvailabilitySettings({ settings, onSave }) {
  const [cursor, setCursor] = useState(() => new Date());
  const [states, setStates] = useState(settings);
  const [selected, setSelected] = useState(null);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- re-syncs the local draft when the panel reloads settings; Phase 4 replaces this with a key-based reset.
  useEffect(() => setStates(settings), [settings]);
  const today = useMemo(() => {
    const value = new Date();
    value.setHours(0, 0, 0, 0);
    return value;
  }, []);
  const maxDate = useMemo(() => {
    const value = new Date(today);
    value.setDate(value.getDate() + 89);
    return value;
  }, [today]);
  const calendar = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    return {
      firstDay: new Date(year, month, 1).getDay(),
      daysInMonth: new Date(year, month + 1, 0).getDate(),
    };
  }, [cursor]);
  const keyFor = (date) => {
    const value = new Date(date);
    value.setHours(0, 0, 0, 0);
    return value.toISOString().slice(0, 10);
  };
  const getStatus = (day) => {
    const date = new Date(cursor.getFullYear(), cursor.getMonth(), day);
    if (date < today) return "past";
    if (date > maxDate) return "outside";
    return states[keyFor(date)] || "available";
  };
  const cycle = (day) => {
    const date = new Date(cursor.getFullYear(), cursor.getMonth(), day);
    const status = getStatus(day);
    if (status === "past" || status === "outside") return;
    const key = keyFor(date);
    const next =
      status === "available" ? "tentative" : status === "tentative" ? "unavailable" : "available";
    const nextStates = { ...states, [key]: next };
    setStates(nextStates);
    onSave(nextStates);
    setSelected(key);
  };
  const shift = (offset) => {
    const next = new Date(cursor.getFullYear(), cursor.getMonth() + offset, 1);
    if (next > maxDate || new Date(next.getFullYear(), next.getMonth() + 1, 0) < today) return;
    setCursor(next);
    setSelected(null);
  };
  const label = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(cursor);
  const meta = {
    available: { label: "Available", text: "text-amber-300", dot: "bg-amber-500" },
    tentative: { label: "Tentative", text: "text-emerald-300", dot: "bg-emerald-400" },
    unavailable: { label: "Unavailable", text: "text-white/35", dot: "bg-white/20" },
    past: { label: "Past", text: "text-white/15", dot: "bg-white/10" },
    outside: { label: "Outside 90 days", text: "text-white/15", dot: "bg-white/10" },
  };
  return (
    <FloatingCard
      title="Next 90 days"
      description="Every future day starts as Available. Cycle a day through Available, Tentative and Unavailable. Past days are locked."
    >
      <div className="mx-auto max-w-[420px] rounded-[1.75rem] bg-black/20 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => shift(-1)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft size={16} />
          </button>
          <p className="text-sm font-bold text-white">{label}</p>
          <button
            onClick={() => shift(1)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[9px] font-semibold uppercase tracking-wider text-white/25">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <span key={`${day}-${index}`} className="py-1">
              {day}
            </span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {Array.from({ length: calendar.firstDay }).map((_, index) => (
            <span key={`blank-${index}`} className="h-9" />
          ))}
          {Array.from({ length: calendar.daysInMonth }, (_, index) => index + 1).map((day) => {
            const status = getStatus(day);
            const m = meta[status];
            const key = keyFor(new Date(cursor.getFullYear(), cursor.getMonth(), day));
            return (
              <button
                key={day}
                disabled={status === "past" || status === "outside"}
                onClick={() => cycle(day)}
                className={`group relative h-9 rounded-xl text-xs font-semibold transition ${m.text} ${status === "available" ? "hover:bg-amber-500/10" : status === "tentative" ? "hover:bg-emerald-400/10" : "cursor-not-allowed"} ${selected === key ? "bg-white/10 ring-1 ring-white/20" : ""}`}
              >
                <span>{day}</span>
                <span
                  className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${m.dot}`}
                />
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap gap-4 text-[10px] font-semibold text-white/35">
          <span className="inline-flex items-center gap-2">
            <i className="h-2 w-2 rounded-full bg-amber-500" /> Available
          </span>
          <span className="inline-flex items-center gap-2">
            <i className="h-2 w-2 rounded-full bg-emerald-400" /> Tentative
          </span>
          <span className="inline-flex items-center gap-2">
            <i className="h-2 w-2 rounded-full bg-white/20" /> Unavailable
          </span>
        </div>
        {selected && (
          <p className="mt-4 text-xs text-white/35">
            {selected} ·{" "}
            <span className={meta[states[selected] || "available"].text}>
              {meta[states[selected] || "available"].label}
            </span>
          </p>
        )}
      </div>
    </FloatingCard>
  );
}
