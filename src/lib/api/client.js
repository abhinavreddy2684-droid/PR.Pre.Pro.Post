import { API_BASE_URL } from "./config";
import { networkError, readApiError } from "./errors";
import { endSession, getAccessToken, setAccessToken } from "./token";

const REFRESH_PATH = "/api/auth/refresh";

let refreshInFlight = null;

/** `path` is "/api/..." or an absolute URL (e.g. a `next` link); empty query values are skipped. */
export function resolveUrl(path, query) {
  const url = new URL(path, `${API_BASE_URL}/`);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function send(url, { method, body, signal, token }) {
  const headers = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    return await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: "include",
      signal,
    });
  } catch (error) {
    if (error?.name === "AbortError") throw error;
    throw networkError();
  }
}

async function readBody(response) {
  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

/**
 * Exchanges the HttpOnly refresh cookie for a new access token. Concurrent callers share one
 * request (the backend rotates the cookie, so two parallel refreshes would race).
 * @returns {Promise<string | null>} the new token, or null when signed out (401)
 */
export function refreshAccessToken() {
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      const response = await send(resolveUrl(REFRESH_PATH), { method: "POST" });
      if (response.status === 401) {
        endSession();
        return null;
      }
      if (!response.ok) throw await readApiError(response);
      const { access } = await readBody(response);
      setAccessToken(access);
      return access;
    })().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

/**
 * The one way to call the backend. Sends JSON with credentials, adds the Bearer token, and on a
 * 401 refreshes once and retries. Resolves to the parsed body (null for 204); rejects with an
 * ApiError, or with the AbortError when `signal` aborts.
 * @param {string} path "/api/..." or an absolute URL
 * @param {object} [options]
 * @param {string} [options.method]
 * @param {unknown} [options.body] serialised as JSON
 * @param {Record<string, unknown>} [options.query]
 * @param {AbortSignal} [options.signal]
 * @param {boolean} [options.auth] false for the auth endpoints: no token, no refresh-and-retry
 */
export async function apiFetch(path, { method = "GET", body, query, signal, auth = true } = {}) {
  const url = resolveUrl(path, query);
  const sentToken = auth ? getAccessToken() : null;
  let response = await send(url, { method, body, signal, token: sentToken });

  if (response.status === 401 && auth) {
    // Another request may already have refreshed while this one was in flight.
    const current = getAccessToken();
    const token = current && current !== sentToken ? current : await refreshAccessToken();
    if (token) response = await send(url, { method, body, signal, token });
  }

  if (!response.ok) throw await readApiError(response);
  return readBody(response);
}

export const api = {
  get: (path, options) => apiFetch(path, { ...options, method: "GET" }),
  post: (path, body, options) => apiFetch(path, { ...options, method: "POST", body }),
  put: (path, body, options) => apiFetch(path, { ...options, method: "PUT", body }),
  patch: (path, body, options) => apiFetch(path, { ...options, method: "PATCH", body }),
  delete: (path, options) => apiFetch(path, { ...options, method: "DELETE" }),
};
