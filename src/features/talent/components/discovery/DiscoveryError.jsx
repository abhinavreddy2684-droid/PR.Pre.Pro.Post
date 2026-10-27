import { userMessage } from "@/lib/api";

/** A failed search, with a retry. */
export default function DiscoveryError({ error, onRetry }) {
  return (
    <div
      role="alert"
      className="mt-8 rounded-2xl sm:rounded-3xl border border-red-400/20 bg-red-400/[0.05] p-10 sm:p-16 text-center"
    >
      <p className="text-lg sm:text-xl font-semibold">We couldn&apos;t load talent.</p>
      <p className="mt-3 text-sm sm:text-base text-neutral-400">{userMessage(error)}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm text-white transition hover:border-amber-500/40 hover:text-amber-300"
      >
        Try again
      </button>
    </div>
  );
}
