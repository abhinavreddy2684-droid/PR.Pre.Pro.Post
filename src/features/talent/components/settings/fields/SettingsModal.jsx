import { useRef } from "react";
import { X } from "lucide-react";
import useDialog from "@/hooks/useDialog";

/**
 * Centered editor dialog used inside the settings panel: eyebrow + title header, content, and a
 * Cancel / Save footer. `widthClass` sets the card width (e.g. "max-w-lg").
 */
export default function SettingsModal({
  eyebrow,
  title,
  widthClass,
  saveLabel,
  onClose,
  onSave,
  children,
}) {
  const dialogRef = useRef(null);
  useDialog(dialogRef, onClose);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabIndex={-1}
      style={{ outline: "none" }}
      className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-5 backdrop-blur-sm"
    >
      <div
        className={`w-full ${widthClass} rounded-3xl bg-[#111] p-6 shadow-2xl ring-1 ring-white/10 sm:p-8`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-400">
              {eyebrow}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-white">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/50 hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </div>
        {children}
        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-5 py-2.5 text-xs font-semibold text-white/50 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="rounded-full bg-amber-500 px-6 py-2.5 text-xs font-bold text-black"
          >
            {saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
