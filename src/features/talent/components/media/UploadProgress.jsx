/** Progress bar with a label for one upload: "Uploading 42%" then "Finishing…". */
export default function UploadProgress({ phase, fraction, label = "Uploading" }) {
  const finishing = phase === "confirming";
  const percent = finishing ? 100 : Math.round(fraction * 100);
  return (
    <div role="status" aria-live="polite">
      <p className="text-xs text-white/60">{finishing ? "Finishing…" : `${label} ${percent}%`}</p>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={label}
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"
      >
        <div
          className="h-full rounded-full bg-amber-400 transition-[width] duration-200"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
