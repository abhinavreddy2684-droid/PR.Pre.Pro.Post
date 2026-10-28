import { Clock } from "lucide-react";

/** Placeholder for a settings section the backend cannot support yet, with the reason. */
export default function SectionUnavailable({ reason, children }) {
  return (
    <div className="space-y-5">
      <div
        role="status"
        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-xs leading-5 text-white/55"
      >
        <Clock size={15} className="mt-0.5 shrink-0 text-amber-400" />
        <p>{reason}.</p>
      </div>
      {children && (
        <div aria-disabled="true" className="pointer-events-none select-none opacity-40">
          {children}
        </div>
      )}
    </div>
  );
}
