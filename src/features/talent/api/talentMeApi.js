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
