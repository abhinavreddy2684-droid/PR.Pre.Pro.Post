import { useState } from "react";
import DiscoveryFilters from "@/features/talent/components/discovery/DiscoveryFilters";
import TalentResults from "@/features/talent/components/discovery/TalentResults";
import useTalentSearch from "@/features/talent/hooks/useTalentSearch";

const NO_FILTERS = { q: "", state: "", city: "", available: false };

/**
 * Filters plus the paginated result grid. Used by /talent and /artists.
 * @param {{ heading: string, craft?: string }} props `craft` is a craft slug (from ?craft=)
 */
export default function TalentDirectory({ heading, craft }) {
  const [filters, setFilters] = useState(NO_FILTERS);
  const search = useTalentSearch({ ...filters, craft: craft || undefined });
  const update = (changes) => setFilters((current) => ({ ...current, ...changes }));

  return (
    <>
      <DiscoveryFilters heading={heading} filters={filters} onChange={update} />
      <TalentResults search={search} />
    </>
  );
}
