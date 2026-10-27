import { useCatalog } from "@/catalog";
import { fieldErrors, userMessage } from "@/lib/api";

const FIELD_LABELS = {
  full_name: "Full name",
  professional_name: "Professional name",
  city_id: "City",
  primary: "Primary craft",
  supporting: "Supporting crafts",
};

/** Why submitting onboarding failed: the API message, field errors and missing items. */
export default function OnboardingError({ error }) {
  const { enumLabel } = useCatalog();
  const fields = Object.entries(fieldErrors(error)).filter(([field]) => FIELD_LABELS[field]);
  const missing = Array.isArray(error?.details?.missing) ? error.details.missing : [];

  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-400/20 bg-red-400/[0.06] px-5 py-4 text-sm text-red-100"
    >
      <p>{userMessage(error)}</p>
      {(fields.length > 0 || missing.length > 0) && (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-red-100/80">
          {fields.map(([field, message]) => (
            <li key={field}>
              {FIELD_LABELS[field]}: {message}
            </li>
          ))}
          {missing.map((item) => (
            <li key={item}>{enumLabel("completeness_items", item)}</li>
          ))}
        </ul>
      )}
      <p className="mt-2 text-xs text-red-100/60">
        Your answers are kept. Fix the problem (use Back to change earlier steps) and finish again.
      </p>
    </div>
  );
}
