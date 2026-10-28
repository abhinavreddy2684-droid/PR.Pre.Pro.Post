/** Page heading for the ?craft= filter, given the craft's title ("Talent Network" when none). */
export default function formatCraftHeading(craft) {
  if (!craft) return "Talent Network";
  if (craft === "Playback Singing") return "Playback Singers";
  return craft;
}
