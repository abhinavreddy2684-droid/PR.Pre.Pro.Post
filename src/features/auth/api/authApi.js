import { api, refreshAccessToken, setAccessToken } from "@/lib/api";

// The auth endpoints never carry a Bearer token or retry through refresh (auth: false); the
// refresh cookie is set and cleared by the backend.

/** @returns {Promise<import("@/lib/types").Me>} */
export const getMe = () => api.get("/api/me");

export async function login({ email, password }) {
  const { access } = await api.post("/api/auth/login", { email, password }, { auth: false });
  setAccessToken(access);
}

/** @returns {Promise<import("@/lib/types").Me>} */
export async function register({ email, password }) {
  const { access, user } = await api.post(
    "/api/auth/register",
    { email, password },
    { auth: false },
  );
  setAccessToken(access);
  return user;
}

export async function logout() {
  try {
    await api.post("/api/auth/logout", undefined, { auth: false });
  } finally {
    setAccessToken(null);
  }
}

/**
 * After a reload: trade the refresh cookie for a token, then load the account.
 * @returns {Promise<import("@/lib/types").Me | null>} null when signed out
 */
export async function restoreSession() {
  const token = await refreshAccessToken();
  return token ? getMe() : null;
}

/** @returns {Promise<import("@/lib/types").Me>} */
export const verifyEmail = (token) =>
  api.post("/api/auth/verify-email", { token }, { auth: false });

/** 204; 409 already_verified; rate limited to 3 a minute. */
export const resendVerification = () => api.post("/api/auth/resend-verification");
