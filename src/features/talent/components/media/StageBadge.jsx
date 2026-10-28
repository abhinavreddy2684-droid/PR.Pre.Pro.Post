import { useCatalog } from "@/catalog";
import { cn } from "@/lib/cn";

const STAGE_STYLES = {
  uploading: "bg-sky-400/15 text-sky-200",
  processing: "bg-sky-400/15 text-sky-200",
  under_review: "bg-amber-400/15 text-amber-200",
  live: "bg-emerald-400/15 text-emerald-200",
  hidden: "bg-white/10 text-white/60",
  failed: "bg-red-400/15 text-red-200",
  rejected: "bg-red-400/15 text-red-200",
};

/** Pill with a gallery stage's label from the `gallery_stages` bootstrap enum. */
export default function StageBadge({ stage, className = "" }) {
  const { enumLabel } = useCatalog();
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
        STAGE_STYLES[stage] ?? "bg-white/10 text-white/60",
        className,
      )}
    >
      {enumLabel("gallery_stages", stage)}
    </span>
  );
}
