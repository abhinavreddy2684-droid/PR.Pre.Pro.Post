// API shapes -> what the talent components render. The only place that knows both.

/** "Hyderabad, Telangana"; "" when the talent has no city. */
export const formatLocation = (city) => (city ? `${city.name}, ${city.state_name}` : "");

/** "1 year", "8 years"; "" when unknown. */
export const formatYears = (years) =>
  years === null || years === undefined ? "" : `${years} ${years === 1 ? "year" : "years"}`;

/**
 * Thumbnail of `size` px if there is one, else the original; null without an image.
 * `size` "original" skips the thumbnails.
 */
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

/** "2021 — Present" from the years; null end_year means ongoing. */
export const formatPeriod = (startYear, endYear) =>
  `${startYear} — ${endYear === null || endYear === undefined ? "Present" : endYear}`;

/**
 * A public (GET /api/talent/{id}) or private (GET /api/talent/me) profile as the profile pages
 * render it. Only public fields are read, so the result is safe to show to anyone.
 * @param {import("@/lib/types").PublicTalent} talent
 * @param {(slug: string) => { title: string } | undefined} craftBySlug from useCatalog()
 */
export function toTalentProfile(talent, craftBySlug) {
  const crafts = talent.crafts ?? [];
  const primary = crafts.find((craft) => craft.is_primary) ?? null;
  return {
    id: talent.id,
    name: talent.professional_name,
    image: imageUrl(talent.avatar, "original"),
    primaryCraft: primary ? { slug: primary.slug, title: primary.title } : null,
    supportingCrafts: crafts
      .filter((craft) => !craft.is_primary)
      .map(({ slug, title }) => ({ slug, title })),
    location: formatLocation(talent.city),
    experience: formatYears(talent.years_experience),
    bio: talent.bio ?? "",
    genres: talent.genres ?? [],
    experiences: (talent.experiences ?? []).map((entry) => ({
      id: entry.id,
      period: formatPeriod(entry.start_year, entry.end_year),
      title: entry.title,
      company: entry.company ?? "",
      description: entry.description ?? "",
      craft: entry.craft ? (craftBySlug(entry.craft)?.title ?? "") : "",
    })),
  };
}
