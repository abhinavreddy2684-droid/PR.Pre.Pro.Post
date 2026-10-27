import { useCatalog } from "@/catalog";
import { fieldErrors, userMessage } from "@/lib/api";

/**
 * Why a settings save failed: the API message, field errors for the fields in `fieldLabels`, and
 * the missing items of a 400 profile_incomplete (a published profile must keep them).
 * @param {{ error: unknown, fieldLabels?: Record<string, string> }} props
 */
export default function SettingsError({ error, fieldLabels = {} }) {
  const { enumLabel } = useCatalog();
  const fields = Object.entries(fieldErrors(error)).filter(([field]) => fieldLabels[field]);
  const missing = Array.isArray(error?.details?.missing) ? error.details.missing : [];

  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-xs leading-5 text-red-100"
    >
      <p>{userMessage(error)}</p>
      {(fields.length > 0 || missing.length > 0) && (
        <ul className="mt-1.5 list-disc space-y-0.5 pl-5 text-red-100/80">
          {fields.map(([field, message]) => (
            <li key={field}>
              {fieldLabels[field]}: {message}
            </li>
          ))}
          {missing.map((item) => (
            <li key={item}>{enumLabel("completeness_items", item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
