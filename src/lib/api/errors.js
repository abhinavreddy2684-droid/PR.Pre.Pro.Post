// Every backend error has one shape: {"error": {"code", "message", "details"}}. It is parsed
// here and nowhere else.

const GENERIC_MESSAGE = "Something went wrong. Please try again.";

/** A failed API call. `status` is 0 when the server could not be reached. */
export class ApiError extends Error {
  /** @param {{ status: number, code: string, message: string, details?: unknown }} fields */
  constructor({ status, code, message, details = null }) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const networkError = () =>
  new ApiError({
    status: 0,
    code: "network_error",
    message: "We couldn't reach the server. Check your connection and try again.",
  });

/** Builds an ApiError from a non-2xx response, tolerating bodies that are not the envelope. */
export async function readApiError(response) {
  let body = null;
  try {
    body = await response.json();
  } catch {
    // Not JSON (a proxy error page, an empty body): fall through to the generic error.
  }
  const error = body?.error;
  return new ApiError({
    status: response.status,
    code: typeof error?.code === "string" ? error.code : `http_${response.status}`,
    message: typeof error?.message === "string" ? error.message : GENERIC_MESSAGE,
    details: error?.details ?? null,
  });
}

export const isApiError = (error, code) =>
  error instanceof ApiError && (code === undefined || error.code === code);

export const isAbortError = (error) => error?.name === "AbortError";

/** A message that is safe to show a user for any thrown value. */
export function userMessage(error, fallback = GENERIC_MESSAGE) {
  if (!(error instanceof ApiError)) return fallback;
  if (error.status === 0) return error.message;
  if (error.status === 429) return "Too many attempts. Please wait a minute and try again.";
  if (error.status >= 500) return "The server had a problem. Please try again in a moment.";
  return error.message || fallback;
}

/**
 * Field-level messages from `details`: `{ field: ["msg", ...] }` becomes `{ field: "msg" }`,
 * and a domain error naming one field (`{ field: "title" }`) maps its message to that field.
 * @returns {Record<string, string>}
 */
export function fieldErrors(error) {
  const details = error instanceof ApiError ? error.details : null;
  if (!details || typeof details !== "object" || Array.isArray(details)) return {};
  if (typeof details.field === "string") return { [details.field]: error.message };

  const result = {};
  for (const [field, value] of Object.entries(details)) {
    const first = Array.isArray(value) ? value[0] : value;
    if (typeof first === "string") result[field] = first;
  }
  return result;
}
