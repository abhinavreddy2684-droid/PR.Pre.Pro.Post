import { X } from "lucide-react";

/** Uploads that failed after they were accepted (storage refused, connection lost ...). */
export default function GalleryFailures({ failures, onDismiss }) {
  if (failures.length === 0) return null;
  return (
    <ul className="space-y-2" aria-label="Upload problems">
      {failures.map((failure) => (
        <li
          key={failure.key}
          role="alert"
          className="flex items-start justify-between gap-3 rounded-2xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-xs leading-5 text-red-100"
        >
          <p>
            “{failure.title}” was not uploaded. {failure.message}
          </p>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => onDismiss(failure.key)}
            className="shrink-0 text-red-100/60 transition hover:text-red-100"
          >
            <X size={14} />
          </button>
        </li>
      ))}
    </ul>
  );
}
