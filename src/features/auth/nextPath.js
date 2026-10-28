// `?next=` only ever points back into this app: anything that does not resolve to our own
// origin (//evil.example, https://..., javascript:) is replaced by the fallback.
export const DEFAULT_AFTER_SIGN_IN = "/talent/me";

export function safeNextPath(value, fallback = DEFAULT_AFTER_SIGN_IN) {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return fallback;
  }
  try {
    const url = new URL(value, window.location.origin);
    if (url.origin !== window.location.origin) return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

/** "/login?next=<where the user is now>" */
export function loginPathFor({ pathname, search = "", hash = "" }) {
  return `/login?next=${encodeURIComponent(`${pathname}${search}${hash}`)}`;
}
