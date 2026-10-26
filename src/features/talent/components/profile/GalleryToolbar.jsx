import { ChevronDown, Search } from "lucide-react";
import { MEDIA_TYPE_FILTERS } from "@/lib/media";

/** Type chips, search box and sort select above a media gallery. */
export default function GalleryToolbar({
  type,
  onTypeChange,
  query,
  onQueryChange,
  sort,
  onSortChange,
}) {
  return (
    <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {MEDIA_TYPE_FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={type === option}
            onClick={() => onTypeChange(option)}
            className={`rounded-full px-4 py-2.5 text-xs font-semibold transition ${type === option ? "bg-amber-500 text-black" : "bg-white/5 text-white/45 hover:bg-white/10 hover:text-white"}`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="flex w-full items-center gap-3 border-b border-white/10 py-2.5 sm:w-64">
          <Search size={16} className="text-white/30" />
          <input
            aria-label="Search media"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search media"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
          />
        </label>
        <div className="relative">
          <select
            aria-label="Sort media"
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
            className="appearance-none rounded-full bg-white/5 py-2.5 pl-4 pr-9 text-xs text-white/70"
          >
            <option>Latest</option>
            <option>Oldest</option>
          </select>
          <ChevronDown
            size={13}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/35"
          />
        </div>
      </div>
    </div>
  );
}
