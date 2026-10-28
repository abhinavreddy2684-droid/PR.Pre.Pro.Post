import { api } from "@/lib/api";

/**
 * A published talent's public gallery: approved links and approved, processed files by position.
 * File URLs are signed and short-lived (`urls.expires_at`), so fetch again for fresh ones.
 * @returns {Promise<object[]>} PublicGalleryItem[] (counts only: no viewer `liked` flag)
 */
export const getPublicGallery = (talentId, { signal } = {}) =>
  api.get(`/api/talent/${encodeURIComponent(talentId)}/gallery`, { signal });

/**
 * Like or unlike a public item (signed in; both are idempotent).
 * @returns {Promise<{ item_id: string, liked: boolean, likes_count: number }>}
 */
export const setItemLike = (itemId, liked) => {
  const path = `/api/gallery-items/${encodeURIComponent(itemId)}/like`;
  return liked ? api.post(path) : api.delete(path);
};
