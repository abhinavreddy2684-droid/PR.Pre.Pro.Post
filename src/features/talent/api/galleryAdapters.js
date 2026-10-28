import { imageUrl } from "@/features/talent/api/talentAdapters";

// LinkProviderEnum labels from openapi.yaml (the bootstrap payload does not carry them).
const PROVIDER_LABELS = {
  youtube: "YouTube",
  vimeo: "Vimeo",
  soundcloud: "SoundCloud",
  spotify: "Spotify",
  instagram: "Instagram",
  google_drive: "Google Drive",
};

/**
 * A gallery item (owner or public) as the gallery components render it.
 * @param {object} item  GalleryItemOwner or PublicGalleryItem
 * @param {(slug: string) => { title: string } | undefined} craftBySlug from useCatalog()
 */
export function toGalleryItem(item, craftBySlug) {
  const isLink = item.kind === "link";
  return {
    id: item.id,
    kind: item.kind,
    isLink,
    title: item.title,
    description: item.description ?? "",
    year: item.year ?? null,
    craftSlug: item.craft || "",
    craftTitle: item.craft ? (craftBySlug(item.craft)?.title ?? "") : "",
    position: item.position,
    likesCount: item.likes_count ?? 0,
    thumbUrl: item.kind === "image" ? imageUrl(item.urls, "400") : null,
    fileUrl: item.urls?.original ?? null,
    externalUrl: item.external_url || null,
    provider: isLink ? (PROVIDER_LABELS[item.link_provider] ?? "Link") : "",
    // Owner-only fields; absent on public items.
    stage: item.stage ?? null,
    failureReason: item.failure_reason ?? "",
    moderationReason: item.moderation_reason ?? "",
    moderationNote: item.moderation_note ?? "",
    expiresAt: item.urls?.expires_at ?? null,
  };
}
