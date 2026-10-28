import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import { useCatalog } from "@/catalog";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

const FIELD_CLASS =
  "flex min-h-12 items-center gap-3 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 px-4 py-3";

/**
 * Search box plus state, city and availability filters above the talent grid. States and
 * cities come from bootstrap and are sent by slug.
 */
export default function DiscoveryFilters({ heading, filters, onChange }) {
  const { states, stateBySlug } = useCatalog();
  const cities = stateBySlug(filters.state)?.cities ?? [];
  const set = (field) => (event) => onChange({ [field]: event.target.value });

  return (
    <div className="mt-7 sm:mt-12 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-3 sm:p-4">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto_auto]">
        <label className={FIELD_CLASS}>
          <Search size={18} className="text-neutral-500 shrink-0" />
          <Input
            type="search"
            value={filters.q}
            maxLength={100}
            onChange={set("q")}
            placeholder={`Search ${heading.toLowerCase()} by name, bio or city`}
            aria-label="Search talent"
          />
        </label>

        <label className={FIELD_CLASS}>
          <MapPin size={18} className="text-amber-400 shrink-0" />
          <Select
            value={filters.state}
            onChange={(event) => onChange({ state: event.target.value, city: "" })}
            className="w-full lg:min-w-40"
            aria-label="State"
          >
            <option value="" className="bg-neutral-950">
              All states
            </option>
            {states.map((state) => (
              <option key={state.slug} value={state.slug} className="bg-neutral-950">
                {state.name}
              </option>
            ))}
          </Select>
        </label>

        <label className={FIELD_CLASS}>
          <MapPin size={18} className="text-amber-400 shrink-0" />
          <Select
            value={filters.city}
            onChange={set("city")}
            disabled={!filters.state}
            className="w-full lg:min-w-36 disabled:opacity-40"
            aria-label="City"
            title={filters.state ? undefined : "Choose a state first"}
          >
            <option value="" className="bg-neutral-950">
              {filters.state ? "All cities" : "Choose a state first"}
            </option>
            {cities.map((city) => (
              <option key={city.slug} value={city.slug} className="bg-neutral-950">
                {city.name}
              </option>
            ))}
          </Select>
        </label>

        <label className={FIELD_CLASS}>
          <SlidersHorizontal size={18} className="text-amber-400 shrink-0" />
          <Select
            value={filters.available ? "available" : ""}
            onChange={(event) => onChange({ available: event.target.value === "available" })}
            className="w-full lg:min-w-36"
            aria-label="Availability"
          >
            <option value="" className="bg-neutral-950">
              Any availability
            </option>
            <option value="available" className="bg-neutral-950">
              Available
            </option>
          </Select>
        </label>
      </div>
    </div>
  );
}
