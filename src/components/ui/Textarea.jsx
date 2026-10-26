import { cn } from "@/lib/cn";
/** Bordered multi-line input. Accepts any <textarea> prop. */
export default function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={cn(
        "w-full px-6 py-5 rounded-2xl border border-white/10 bg-black/30 text-white outline-none focus:border-amber-500/40",
        className,
      )}
      {...props}
    />
  );
}
