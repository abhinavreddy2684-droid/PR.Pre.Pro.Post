import { useId } from "react";
import { cn } from "@/lib/cn";

const INPUT_CLASS =
  "w-full rounded-2xl bg-white/[0.035] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:bg-white/[0.055] focus:ring-1 focus:ring-amber-500/30";

/**
 * Labelled text input or textarea. `maxLength` with `showCount` adds a live counter; `error`
 * shows under the field. Other props (inputMode, type, ...) go to the input.
 */
export default function SettingsField({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
  maxLength,
  showCount = false,
  error,
  hint,
  required = false,
  ...props
}) {
  const id = useId();
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ");
  const inputProps = {
    id,
    value,
    onChange: (event) => onChange(event.target.value),
    placeholder,
    maxLength,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy || undefined,
    ...props,
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35"
      >
        <span>
          {label}
          {required && <span className="ml-1 text-amber-400">*</span>}
        </span>
        {showCount && maxLength && (
          <span
            aria-live="polite"
            className={cn("tracking-normal", value.length >= maxLength && "text-amber-400")}
          >
            {value.length} / {maxLength}
          </span>
        )}
      </label>
      {multiline ? (
        <textarea rows={5} {...inputProps} className={cn(INPUT_CLASS, "resize-none")} />
      ) : (
        <input {...inputProps} className={cn(INPUT_CLASS, error && "ring-1 ring-red-400/40")} />
      )}
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-[11px] text-white/30">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[11px] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
