import { CalendarDays } from "lucide-react";
import { useCatalog } from "@/catalog";
import SectionHeading from "@/components/ui/SectionHeading";
import { userMessage } from "@/lib/api";
import AvailabilityLegend from "@/features/talent/components/calendar/AvailabilityLegend";
import AvailabilityMonth from "@/features/talent/components/calendar/AvailabilityMonth";
import SectionAction from "@/features/talent/components/owner/SectionAction";

/** Read-only view of the owner's next 90 days; editing happens in settings. */
export default function OwnerAvailability({ availability, onManage }) {
  const { enumLabel } = useCatalog();

  return (
    <section id="availability" className="mt-32 scroll-mt-24">
      <div className="flex flex-col gap-10 rounded-[2rem] bg-white/[0.03] p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
        <div className="max-w-xl">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow="03 / Availability"
              title="Your Next 90 Days"
              subtitle="Only you see this calendar. Days are available unless you mark them tentative or unavailable."
            />
            <SectionAction onClick={onManage}>
              <CalendarDays size={13} />
              Manage calendar
            </SectionAction>
          </div>
          <AvailabilityLegend className="mt-7 text-xs" />
        </div>
        <div className="w-full max-w-[400px] rounded-[2rem] bg-black/25 p-5 sm:p-6">
          {availability.status === "ready" && (
            <AvailabilityMonth
              first={availability.first}
              last={availability.last}
              statusFor={(key) => availability.days[key] ?? "available"}
              labelFor={(status) => enumLabel("availability_statuses", status)}
            />
          )}
          {availability.status === "loading" && (
            <p className="text-sm text-white/40">Loading your calendar…</p>
          )}
          {availability.status === "error" && (
            <div role="alert" className="space-y-3 text-sm text-red-300">
              <p>{userMessage(availability.error)}</p>
              <button
                type="button"
                onClick={availability.retry}
                className="rounded-full bg-white/5 px-4 py-2 text-xs text-white/70 hover:text-white"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
