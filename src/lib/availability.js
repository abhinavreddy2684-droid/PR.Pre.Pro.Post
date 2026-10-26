/** Next state when a calendar day is clicked: available -> tentative -> unavailable -> available. */
export function nextAvailability(status) {
  if (status === "available") return "tentative";
  if (status === "tentative") return "unavailable";
  return "available";
}
