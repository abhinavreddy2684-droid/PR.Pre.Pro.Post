import { useState } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";

const MESSAGES = {
  uploaded: "Your photo was uploaded. It will appear on your profile after review.",
  failed:
    "Your profile is ready, but your photo could not be uploaded. Add it from Settings when you like.",
};

/** One-time notice after onboarding about the profile photo (`location.state.photo`). */
export default function PhotoNotice() {
  const { state } = useLocation();
  const [dismissed, setDismissed] = useState(false);
  const message = MESSAGES[state?.photo];
  if (!message || dismissed) return null;

  return (
    <div
      role="status"
      className="mb-8 flex items-start justify-between gap-4 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] px-5 py-4 text-sm text-amber-100"
    >
      <p>{message}</p>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => setDismissed(true)}
        className="shrink-0 text-amber-100/60 transition hover:text-amber-100"
      >
        <X size={16} />
      </button>
    </div>
  );
}
