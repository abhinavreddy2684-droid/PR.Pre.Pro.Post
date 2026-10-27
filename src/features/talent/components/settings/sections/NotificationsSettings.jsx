import FloatingCard from "@/features/talent/components/settings/fields/FloatingCard";
import SectionUnavailable from "@/features/talent/components/settings/SectionUnavailable";
import { NOTIFICATIONS_DISABLED_REASON } from "@/features/talent/components/owner/ownerNotices";

const ROWS = [
  { key: "opportunities", title: "New opportunities", body: "Relevant hiring activity." },
  {
    key: "profileActivity",
    title: "Profile activity",
    body: "When recruiters interact with your profile or work.",
  },
  {
    key: "platformUpdates",
    title: "Platform updates",
    body: "Product changes and important service announcements.",
  },
];

/** Notification preferences. The backend has no notifications API yet, so this is read-only. */
export default function NotificationsSettings() {
  return (
    <SectionUnavailable reason={NOTIFICATIONS_DISABLED_REASON}>
      <FloatingCard
        title="What should reach you?"
        description="Control the activity that matters to your work."
      >
        <div className="space-y-2">
          {ROWS.map((row) => (
            <div key={row.key} className="flex items-center gap-4 rounded-2xl bg-white/[0.025] p-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white/75">{row.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/30">{row.body}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked="false"
                aria-label={row.title}
                disabled
                tabIndex={-1}
                className="relative h-7 w-12 shrink-0 rounded-full bg-white/10"
              >
                <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white/60" />
              </button>
            </div>
          ))}
        </div>
      </FloatingCard>
    </SectionUnavailable>
  );
}
