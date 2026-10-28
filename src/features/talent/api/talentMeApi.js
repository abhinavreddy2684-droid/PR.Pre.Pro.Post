import { api } from "@/lib/api";

// The signed-in talent's own profile (/api/talent/me...). 403 talent_role_required on a read
// means the account has no talent profile yet.

/** @returns {Promise<import("@/lib/types").PrivateTalent>} */
export const getMyTalent = () => api.get("/api/talent/me");

/** 201; 409 when the account already has a profile. */
export const createMyTalent = (fields) => api.post("/api/talent/me", fields);

/** Send only the fields that changed. */
export const updateMyTalent = (changes) => api.patch("/api/talent/me", changes);

/** Replaces all crafts: `{ primary: slug, supporting: slug[] }`. */
export const setMyCrafts = (crafts) => api.put("/api/talent/me/crafts", crafts);

/** Publishes the profile the first time. */
export const completeOnboarding = () => api.post("/api/talent/me/onboarding/complete");

/** @returns {Promise<import("@/lib/types").Experience[]>} newest first */
export const listMyExperiences = () => api.get("/api/talent/me/experiences");

export const createMyExperience = (fields) => api.post("/api/talent/me/experiences", fields);

/** Send only the fields that changed. */
export const updateMyExperience = (id, changes) =>
  api.patch(`/api/talent/me/experiences/${encodeURIComponent(id)}`, changes);

export const deleteMyExperience = (id) =>
  api.delete(`/api/talent/me/experiences/${encodeURIComponent(id)}`);

/**
 * Tentative and unavailable days between two "YYYY-MM-DD" dates; any day not listed is
 * available.
 * @returns {Promise<{ date: string, status: "tentative" | "unavailable" }[]>}
 */
export const getMyAvailability = (start, end) =>
  api.get("/api/talent/me/availability", { query: { start, end } });

/** 204. `status: "available"` clears a day. Refetch afterwards. */
export const setMyAvailability = (entries) => api.put("/api/talent/me/availability", { entries });
