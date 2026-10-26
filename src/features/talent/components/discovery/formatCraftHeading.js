/** Page heading for a ?craft= filter ("Talent Network" when there is none). */
export default function formatCraftHeading(craft) {
  if (!craft) return "Talent Network";
  if (craft === "Playback Singing") return "Playback Singers";
  return craft;
}
