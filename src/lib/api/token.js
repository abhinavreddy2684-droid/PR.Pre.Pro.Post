// The access token lives in this module variable only. Never write it to storage, cookies or
// the URL, and never log it. After a reload it is gone and comes back through the refresh flow.
let accessToken = null;
const sessionEndedListeners = new Set();

export const getAccessToken = () => accessToken;

export function setAccessToken(token) {
  accessToken = token || null;
}

/** Drops the token and tells listeners the session is over (the refresh cookie was refused). */
export function endSession() {
  const hadToken = accessToken !== null;
  accessToken = null;
  if (hadToken) sessionEndedListeners.forEach((listener) => listener());
}

/** Calls `listener` when a signed-in session ends without an explicit logout. */
export function onSessionEnded(listener) {
  sessionEndedListeners.add(listener);
  return () => sessionEndedListeners.delete(listener);
}
