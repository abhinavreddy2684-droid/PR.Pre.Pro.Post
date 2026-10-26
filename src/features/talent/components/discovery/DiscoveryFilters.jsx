import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { ANY_AVAILABILITY, AVAILABILITY_OPTIONS } from "@/features/talent/hooks/useTalentFilters";

/** Search box plus location and availability selects above the talent grid. */
export default function DiscoveryFilters({
  heading,
  search,
  onSearchChange,
  location,
  locations,
  onLocationChange,
  availability,
  onAvailabilityChange,
}) {
  return (
    <div className="mt-7 sm:mt-12 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-3 sm:p-4">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
        <label className="flex min-h-12 items-center gap-3 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 px-4 sm:px-5 py-3">
          <Search size={18} className="text-neutral-500 shrink-0" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={`Search ${heading.toLowerCase()} by name, craft or location`}
          />
        </label>

        <label className="flex min-h-12 items-center gap-3 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 px-4 py-3">
          <MapPin size={18} className="text-amber-400 shrink-0" />
          <Select
            value={location}
            onChange={(event) => onLocationChange(event.target.value)}
            className="w-full lg:min-w-40"
          >
            {locations.map((item) => (
              <option key={item} value={item} className="bg-neutral-950">
                {item}
              </option>
            ))}
          </Select>
        </label>

        <label className="flex min-h-12 items-center gap-3 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 px-4 py-3">
          <SlidersHorizontal size={18} className="text-amber-400 shrink-0" />
          <Select
            value={availability}
            onChange={(event) => onAvailabilityChange(event.target.value)}
            className="w-full lg:min-w-40"
          >
            {[ANY_AVAILABILITY, ...AVAILABILITY_OPTIONS].map((option) => (
              <option key={option} value={option} className="bg-neutral-950">
                {option}
              </option>
            ))}
          </Select>
        </label>
      </div>
    </div>
  );
}
