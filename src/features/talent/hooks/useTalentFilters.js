import { useMemo, useState } from "react";

export const ALL_LOCATIONS = "All locations";
export const ANY_AVAILABILITY = "Any availability";
export const AVAILABILITY_OPTIONS = ["Available", "On request"];

/**
 * Search / location / availability filtering for the talent list.
 * Locations offered are the cities ("Mumbai" of "Mumbai, India") present in `talents`.
 * @param {Array<object>} talents
 */
export default function useTalentFilters(talents) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(ALL_LOCATIONS);
  const [availability, setAvailability] = useState(ANY_AVAILABILITY);

  const locations = [
    ALL_LOCATIONS,
    ...new Set(talents.map((talent) => talent.location.split(",")[0])),
  ];

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return talents.filter((talent) => {
      const searchableFields = [
        talent.name,
        talent.location,
        talent.craft,
        talent.role,
        talent.bio,
        ...talent.genres,
      ].filter(Boolean);

      const matchesSearch =
        !query || searchableFields.some((value) => value.toLowerCase().includes(query));
      const matchesLocation = location === ALL_LOCATIONS || talent.location.startsWith(location);
      const matchesAvailability =
        availability === ANY_AVAILABILITY || talent.availability === availability;

      return matchesSearch && matchesLocation && matchesAvailability;
    });
  }, [availability, talents, location, search]);

  return {
    search,
    setSearch,
    location,
    setLocation,
    availability,
    setAvailability,
    locations,
    filtered,
  };
}
