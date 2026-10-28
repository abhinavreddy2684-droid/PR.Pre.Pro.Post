import { api } from "@/lib/api";

/**
 * GET /api/talent (public; the Bearer token is optional). Never send gender, min_age or max_age:
 * they are restricted to approved recruiters.
 * @param {{ q?: string, craft?: string, state?: string, city?: string, available?: boolean,
 *   limit?: number }} filters
 * @returns {Promise<import("@/lib/types").Page<import("@/lib/types").TalentCard>>}
 */
export const searchTalent = ({ q, craft, state, city, available, limit }, { signal } = {}) =>
  api.get("/api/talent", {
    query: { q, craft, state, city, available: available ? "true" : undefined, limit },
    signal,
  });

/** Follows a `next` link exactly as the API returned it. */
export const fetchTalentPage = (url, { signal } = {}) => api.get(url, { signal });

/** @returns {Promise<import("@/lib/types").PublicTalent>} 404 when unknown or unpublished */
export const getPublicTalent = (id, { signal } = {}) =>
  api.get(`/api/talent/${encodeURIComponent(id)}`, { signal });
