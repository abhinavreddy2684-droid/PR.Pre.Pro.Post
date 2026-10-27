// API shapes -> what the talent components render. The only place that knows both.

/** "Hyderabad, Telangana"; "" when the talent has no city. */
export const formatLocation = (city) => (city ? `${city.name}, ${city.state_name}` : "");

/** "1 year", "8 years"; "" when unknown. */
export const formatYears = (years) =>
  years === null || years === undefined ? "" : `${years} ${years === 1 ? "year" : "years"}`;

/** Thumbnail of `size` px if there is one, else the original; null without an image. */
export const imageUrl = (urls, size = "400") => urls?.thumbnails?.[size] || urls?.original || null;

/**
 * A search result (TalentCard) as the cards render it.
 * @param {import("@/lib/types").TalentCard} card
 */
export function toTalentCard(card) {
  return {
    id: card.id,
    name: card.professional_name,
    craft: card.primary_craft?.title ?? "",
    image: imageUrl(card.avatar),
    location: formatLocation(card.city),
    experience: formatYears(card.years_experience),
    bio: card.bio ?? "",
    genres: card.genres ?? [],
    isAvailable: card.is_available,
  };
}
