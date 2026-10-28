/** Next state when a calendar day is clicked: available -> tentative -> unavailable -> available. */
export function nextAvailability(status) {
  if (status === "available") return "tentative";
  if (status === "tentative") return "unavailable";
  return "available";
}

// The backend stores availability for this many days starting today (AVAILABILITY_WINDOW_DAYS).
export const AVAILABILITY_WINDOW_DAYS = 90;

/** First and last editable day (local dates) of the availability window. */
export function availabilityWindow(today) {
  const last = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + AVAILABILITY_WINDOW_DAYS - 1,
  );
  return { first: today, last };
}
