import { api } from "./client";
import { ApiError, isAbortError } from "./errors";

// Steps 1-3 of the upload sequence shared by the gallery and the avatar:
//   1. the domain endpoint (passed in as `start`) answers with { media_id, upload, ... };
//   2. the file goes to the storage origin as multipart/form-data (no Authorization header,
//      credentials omitted, not through the API wrapper: it is another origin);
//   3. on any 2xx, POST /api/media/{id}/confirm straight away.
// Polling the owning item afterwards (step 4) belongs to the caller.

const CONFIRM_RETRY_DELAYS_MS = [1000, 2000, 3000, 5000];
// A signed form this close to its expiry is replaced before use, not after a failed upload.
const FORM_EXPIRY_MARGIN_MS = 5000;

/** An upload that failed. `step` says where, so callers know what is safe to do next. */
export class UploadError extends ApiError {
  /** @param {{ step: "start" | "upload" | "confirm", status: number, code: string, message: string, details?: unknown }} fields */
  constructor({ step, ...fields }) {
    super(fields);
    this.name = "UploadError";
    this.step = step;
  }
}

const asUploadError = (error, step) =>
  error instanceof ApiError
    ? new UploadError({
        step,
        status: error.status,
        code: error.code,
        message: error.message,
        details: error.details,
      })
    : error;

const abortError = () => new DOMException("The upload was cancelled.", "AbortError");

function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(abortError());
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(abortError());
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

/** Abandons a pending upload (and the item waiting on it). 409 once it has been confirmed. */
export const cancelUpload = (mediaId) =>
  api.post(`/api/media/${encodeURIComponent(mediaId)}/cancel`);

/** A fresh signed form for the same pending upload (the old one expired). */
const refreshUploadForm = (mediaId, signal) =>
  api.post(`/api/media/${encodeURIComponent(mediaId)}/upload-url`, undefined, { signal });

// The bucket answers an expired signed form with 403 and a message naming the policy.
const looksExpired = (status, text) => status === 403 && /expired/i.test(text);

/** Step 2: one multipart POST to the storage origin, with progress. */
function postToStorage(upload, file, contentType, { onProgress, signal }) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(abortError());

    // Every signed field first, in the order the API gave them, then the file as `file`.
    const form = new FormData();
    for (const [name, value] of Object.entries(upload.fields)) form.append(name, value);
    // The bucket enforces the exact Content-Type that was signed.
    form.append("file", new Blob([file], { type: contentType }), file.name || "upload");

    const request = new XMLHttpRequest();
    request.open("POST", upload.url);
    request.withCredentials = false;

    request.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.({ loaded: event.loaded, total: event.total });
    };
    request.onload = () => {
      cleanup();
      if (request.status >= 200 && request.status < 300) return resolve();
      const expired = looksExpired(request.status, request.responseText);
      reject(
        new UploadError({
          step: "upload",
          status: request.status,
          code: expired ? "upload_form_expired" : "storage_rejected",
          message: expired
            ? "The upload form expired."
            : "The storage service refused the file. Check its type and size and try again.",
        }),
      );
    };
    request.onerror = () => {
      cleanup();
      reject(
        new UploadError({
          step: "upload",
          status: 0,
          code: "storage_unreachable",
          message: "We couldn't reach the file storage. Check your connection and try again.",
        }),
      );
    };
    request.onabort = () => {
      cleanup();
      reject(abortError());
    };

    const onAbort = () => request.abort();
    const cleanup = () => signal?.removeEventListener("abort", onAbort);
    signal?.addEventListener("abort", onAbort, { once: true });

    request.send(form);
  });
}

/** Step 3. 409 upload_missing (the file is not in storage yet), 503 and network errors retry. */
async function confirmUpload(mediaId, signal) {
  const path = `/api/media/${encodeURIComponent(mediaId)}/confirm`;
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await api.post(path, undefined, { signal });
    } catch (error) {
      const retryable =
        error instanceof ApiError &&
        (error.code === "upload_missing" || error.status === 503 || error.status === 0);
      if (!retryable || attempt >= CONFIRM_RETRY_DELAYS_MS.length) {
        throw asUploadError(error, "confirm");
      }
      await sleep(CONFIRM_RETRY_DELAYS_MS[attempt], signal);
    }
  }
}

/**
 * Sends one file through steps 1-3.
 * - Aborting `signal` stops the transfer and cancels the pending upload on the server.
 * - A signed form that expired (before or during the transfer) is replaced once through
 *   POST /api/media/{id}/upload-url.
 * - If the transfer itself fails, the pending upload is cancelled so it does not keep a slot.
 *   A failure while confirming leaves it alone: the file is stored, and confirming is idempotent.
 * - 410 (the upload expired) means starting again, from `start`.
 * Rejects with the AbortError, or an UploadError whose `step` says where it failed.
 * @param {object} options
 * @param {() => Promise<{ media_id: string, upload: import("@/lib/types").SignedUpload }>} options.start
 *   step 1: calls the domain upload endpoint
 * @param {File} options.file
 * @param {string} options.contentType exactly what `start` declared
 * @param {(ticket: object) => void} [options.onTicket] runs with step 1's answer (e.g. to show the item)
 * @param {(progress: { loaded: number, total: number, fraction: number }) => void} [options.onProgress]
 * @param {(phase: "uploading" | "confirming") => void} [options.onPhase]
 * @param {AbortSignal} [options.signal]
 * @returns {Promise<import("@/lib/types").MediaState>} the confirmed media
 */
export async function uploadMedia({
  start,
  file,
  contentType,
  onTicket,
  onProgress,
  onPhase,
  signal,
}) {
  let ticket;
  try {
    ticket = await start();
  } catch (error) {
    throw asUploadError(error, "start");
  }
  onTicket?.(ticket);
  const mediaId = ticket.media_id;
  const report = ({ loaded, total }) =>
    onProgress?.({ loaded, total, fraction: total ? loaded / total : 0 });

  try {
    onPhase?.("uploading");
    let { upload } = ticket;
    if (Date.parse(upload.expires_at) - Date.now() < FORM_EXPIRY_MARGIN_MS) {
      upload = (await refreshUploadForm(mediaId, signal)).upload;
    }
    try {
      await postToStorage(upload, file, contentType, { onProgress: report, signal });
    } catch (error) {
      if (error?.code !== "upload_form_expired") throw error;
      upload = (await refreshUploadForm(mediaId, signal)).upload;
      await postToStorage(upload, file, contentType, { onProgress: report, signal });
    }
  } catch (error) {
    await cancelUpload(mediaId).catch(() => {});
    throw error instanceof ApiError && !(error instanceof UploadError)
      ? asUploadError(error, "upload")
      : error;
  }

  onPhase?.("confirming");
  try {
    return await confirmUpload(mediaId, signal);
  } catch (error) {
    // Cancelled while confirming: the file may already be stored, so only abandon what is
    // still pending (the server answers 409 for a confirmed upload, which is fine).
    if (isAbortError(error)) await cancelUpload(mediaId).catch(() => {});
    throw error;
  }
}
