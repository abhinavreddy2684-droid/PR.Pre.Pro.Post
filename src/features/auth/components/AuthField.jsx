import { useId } from "react";
import Input from "@/components/ui/Input";
import { cn } from "@/lib/cn";

const INPUT_CLASS =
  "rounded-full border border-white/[0.10] bg-black/45 px-5 py-3 text-white transition duration-300 placeholder:text-white/30 focus:border-amber-400/45 focus:bg-white/[0.035] focus:shadow-[0_0_0_1px_rgba(245,158,11,0.06)]";

/**
 * Labelled pill input with an inline error. Extra props go to the <input>.
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.error] message shown under the field; marks the input invalid
 * @param {import("react").ReactNode} [props.trailing] control placed inside the right edge
 */
export default function AuthField({ label, error, trailing, className = "", ...props }) {
  const errorId = useId();

  return (
    <div>
      <label className="block">
        <span className="mb-2.5 block text-[9px] uppercase tracking-[0.25em] text-white/85">
          {label}
        </span>
        <span className="relative block">
          <Input
            className={cn(
              INPUT_CLASS,
              trailing && "pr-14",
              error && "border-red-400/50",
              className,
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />
          {trailing && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2">{trailing}</span>
          )}
        </span>
      </label>
      {error && (
        <p id={errorId} className="mt-2 px-2 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
