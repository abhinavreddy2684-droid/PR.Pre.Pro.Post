export const WEEKDAY_INITIALS = ["S", "M", "T", "W", "T", "F", "S"];

/** "October 2026" */
export function monthLabel(date) {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);
}

/** Weekday (0 = Sunday) the month starts on, and how many days it has. */
export function monthGrid(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return {
    firstDay: new Date(year, month, 1).getDay(),
    daysInMonth: new Date(year, month + 1, 0).getDate(),
  };
}

/** "YYYY-MM-DD" for the date's local calendar day (the format the API uses for dates). */
export function dateKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Local midnight today. */
export function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/** A new date `days` calendar days after `date`. */
export function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}
