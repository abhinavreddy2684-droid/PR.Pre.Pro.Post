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

/**
 * "YYYY-MM-DD" key for a date, as used for stored availability overrides.
 * Note: derived from the UTC date (toISOString), so local midnight east of UTC maps to the
 * previous day. Kept as-is because stored overrides already use this key.
 */
export function dateKey(date) {
  return date.toISOString().slice(0, 10);
}
