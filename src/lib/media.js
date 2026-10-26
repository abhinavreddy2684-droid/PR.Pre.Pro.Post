export const MEDIA_TYPE_FILTERS = ["All", "Video", "Audio", "Image"];

/** "Video" | "Audio" | "Image", from a File's MIME type. */
export function mediaTypeFromFile(file) {
  if (file.type.startsWith("video")) return "Video";
  if (file.type.startsWith("audio")) return "Audio";
  return "Image";
}

/**
 * Filters media by type ("All" keeps everything) and by a text query over title + description,
 * then sorts by year ("Latest" first, anything else oldest first), breaking ties by id.
 */
export function filterAndSortMedia(media, { type, query, sort }) {
  const needle = query.trim().toLowerCase();
  return [...media]
    .filter((item) => type === "All" || item.type === type)
    .filter((item) => !needle || `${item.title} ${item.description}`.toLowerCase().includes(needle))
    .sort((a, b) =>
      sort === "Latest" ? b.year - a.year || b.id - a.id : a.year - b.year || a.id - b.id,
    );
}
