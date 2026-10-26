import { useMemo, useState } from "react";
import { filterAndSortMedia } from "@/lib/media";

export const GALLERY_PAGE_SIZE = 6;

/**
 * Type / search / sort state for a media gallery, plus "show more" pagination.
 * Changing the type or the search goes back to the first page.
 * @param {Array<{ id: number, title: string, description: string, type: string, year: number }>} media
 */
export default function useMediaFilters(media) {
  const [query, setQueryValue] = useState("");
  const [type, setTypeValue] = useState("All");
  const [sort, setSort] = useState("Latest");
  const [visibleCount, setVisibleCount] = useState(GALLERY_PAGE_SIZE);

  const filtered = useMemo(
    () => filterAndSortMedia(media, { type, query, sort }),
    [media, type, query, sort],
  );

  return {
    type,
    query,
    sort,
    setType: (value) => {
      setTypeValue(value);
      setVisibleCount(GALLERY_PAGE_SIZE);
    },
    setQuery: (value) => {
      setQueryValue(value);
      setVisibleCount(GALLERY_PAGE_SIZE);
    },
    setSort,
    filtered,
    visible: filtered.slice(0, visibleCount),
    hasMore: visibleCount < filtered.length,
    showMore: () => setVisibleCount((count) => count + GALLERY_PAGE_SIZE),
  };
}
