import { useCatalog } from "@/catalog";
import { cn } from "@/lib/cn";
import {
  AVAILABILITY_ORDER,
  DAY_STYLES,
} from "@/features/talent/components/calendar/availabilityStyles";

/** Dot + label for each availability status, labelled from bootstrap. */
export default function AvailabilityLegend({ className = "" }) {
  const { enumLabel } = useCatalog();
  return (
    <div className={cn("flex flex-wrap gap-4 text-[10px] font-semibold text-white/45", className)}>
      {AVAILABILITY_ORDER.map((status) => (
        <span key={status} className="inline-flex items-center gap-2">
          <i className={cn("h-2 w-2 rounded-full", DAY_STYLES[status].dot)} />
          {enumLabel("availability_statuses", status)}
        </span>
      ))}
    </div>
  );
}
