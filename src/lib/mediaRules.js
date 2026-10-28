// What the backend accepts for uploads, for fast feedback before anything is sent. The backend
// stays the authority (it also checks the real file type), and its errors are shown as they come.

const MB = 1024 * 1024;

/** Allowed files per kind. No HEIC. */
export const MEDIA_RULES = [
  { kind: "image", types: ["image/jpeg", "image/png", "image/webp"], maxBytes: 10 * MB },
  { kind: "audio", types: ["audio/mpeg", "audio/mp4"], maxBytes: 20 * MB },
  { kind: "video", types: ["video/mp4"], maxBytes: 200 * MB },
  { kind: "pdf", types: ["application/pdf"], maxBytes: 10 * MB },
];

// Browsers disagree on the type of some files (m4a is often audio/x-m4a), so the extension
// decides when the reported type is not an allowed one.
const TYPE_BY_EXTENSION = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  mp3: "audio/mpeg",
  m4a: "audio/mp4",
  mp4: "video/mp4",
  pdf: "application/pdf",
};

const HEIC_PATTERN = /\.(heic|heif)$/i;

const extensionOf = (name) => name.split(".").pop().toLowerCase();

/** Value for an <input type="file" accept> that allows the given kinds. */
export const acceptFor = (kinds) =>
  MEDIA_RULES.filter((rule) => kinds.includes(rule.kind))
    .flatMap((rule) => rule.types)
    .join(",");

export const ALL_KINDS = MEDIA_RULES.map((rule) => rule.kind);
export const IMAGE_ONLY = ["image"];

const formatMb = (bytes) => `${Math.round((bytes / MB) * 10) / 10} MB`;

/**
 * Checks a chosen file against the upload rules.
 * @param {File} file
 * @param {string[]} [kinds] allowed kinds (default: all)
 * @returns {{ ok: true, kind: string, contentType: string } | { ok: false, message: string }}
 */
export function checkMediaFile(file, kinds = ALL_KINDS) {
  if (HEIC_PATTERN.test(file.name) || /heic|heif/i.test(file.type)) {
    return { ok: false, message: "HEIC photos aren't supported. Export it as JPEG or PNG first." };
  }
  const reported = (file.type || "").toLowerCase();
  const contentType = MEDIA_RULES.some((rule) => rule.types.includes(reported))
    ? reported
    : TYPE_BY_EXTENSION[extensionOf(file.name)];
  const rule = MEDIA_RULES.find((candidate) => candidate.types.includes(contentType));

  if (!rule || !kinds.includes(rule.kind)) {
    const allowed = MEDIA_RULES.filter((candidate) => kinds.includes(candidate.kind));
    const names = allowed.flatMap((candidate) => candidate.types.map(typeLabel)).join(", ");
    return { ok: false, message: `That file type isn't supported. Allowed: ${names}.` };
  }
  if (file.size <= 0) return { ok: false, message: "That file is empty." };
  if (file.size > rule.maxBytes) {
    return {
      ok: false,
      message: `That file is ${formatMb(file.size)}. The limit for ${rule.kind} files is ${formatMb(rule.maxBytes)}.`,
    };
  }
  return { ok: true, kind: rule.kind, contentType };
}

const LABELS = {
  "image/jpeg": "JPEG",
  "image/png": "PNG",
  "image/webp": "WebP",
  "audio/mpeg": "MP3",
  "audio/mp4": "M4A",
  "video/mp4": "MP4",
  "application/pdf": "PDF",
};
const typeLabel = (type) => LABELS[type];
