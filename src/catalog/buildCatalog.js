/**
 * Indexes the bootstrap payload once so lookups by slug / id are cheap. Crafts and locations
 * are always referenced by slug or id, never by display name.
 * @param {import("@/lib/types").Bootstrap} data
 */
export function buildCatalog(data) {
  const crafts = data.crafts ?? [];
  const states = data.locations ?? [];
  const enums = data.enums ?? {};

  const craftsBySlug = new Map(crafts.map((craft) => [craft.slug, craft]));
  const statesBySlug = new Map(states.map((state) => [state.slug, state]));
  const statesById = new Map(states.map((state) => [state.id, state]));
  const citiesById = new Map(
    states.flatMap((state) => state.cities.map((city) => [city.id, { ...city, state }])),
  );

  return {
    version: data.version,
    crafts,
    states,
    enums,
    /** @returns {import("@/lib/types").BootstrapCraft | undefined} */
    craftBySlug: (slug) => craftsBySlug.get(slug),
    stateBySlug: (slug) => statesBySlug.get(slug),
    stateById: (id) => statesById.get(id),
    /** The city plus its `state`. */
    cityById: (id) => citiesById.get(id),
    /** Options of a bootstrap enum, e.g. enumOptions("gallery_stages"). */
    enumOptions: (name) => enums[name] ?? [],
    /** Display label for an enum value; falls back to the raw value. */
    enumLabel: (name, value) =>
      (enums[name] ?? []).find((option) => option.value === value)?.label ?? value,
  };
}
