/** Shown when no talent matches the current filters. */
export default function DiscoveryEmptyState() {
  return (
    <div className="mt-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-10 sm:p-16 text-center">
      <p className="text-lg sm:text-xl font-semibold">No talent matches your filters.</p>
      <p className="mt-3 text-sm sm:text-base text-neutral-500">
        Try a different search or broaden your filters.
      </p>
    </div>
  );
}
