import { Loader2 } from "lucide-react";
import { userMessage } from "@/lib/api";
import { cn } from "@/lib/cn";
import TalentCard from "@/features/talent/components/discovery/TalentCard";
import DiscoveryEmptyState from "@/features/talent/components/discovery/DiscoveryEmptyState";
import DiscoveryError from "@/features/talent/components/discovery/DiscoveryError";

/**
 * Result grid for a useTalentSearch() result: loading, empty and error states, and "Load more".
 * @param {{ search: ReturnType<typeof import("@/features/talent/hooks/useTalentSearch").default>,
 *   paginate?: boolean, columns?: 3 | 4 }} props  `columns` at the widest breakpoint
 */
export default function TalentResults({ search, paginate = true, columns = 4 }) {
  const { status, results } = search;

  if (status === "error") return <DiscoveryError error={search.error} onRetry={search.retry} />;

  if (status === "loading" && results.length === 0) {
    return (
      <div role="status" className="mt-16 flex justify-center text-neutral-500">
        <Loader2 size={28} className="animate-spin" aria-hidden="true" />
        <span className="sr-only">Loading talent</span>
      </div>
    );
  }

  if (status === "ready" && results.length === 0) return <DiscoveryEmptyState />;

  return (
    <>
      <div
        aria-busy={status === "loading"}
        className={cn(
          "mt-7 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-opacity",
          columns === 4 && "xl:grid-cols-4",
          status === "loading" && "opacity-50",
        )}
      >
        {results.map((talent) => (
          <TalentCard key={talent.id} talent={talent} />
        ))}
      </div>

      {paginate && search.hasMore && (
        <div className="mt-10 flex flex-col items-center gap-3">
          {search.loadMoreError && (
            <p role="alert" className="text-sm text-red-300">
              {userMessage(search.loadMoreError)}
            </p>
          )}
          <button
            type="button"
            onClick={search.loadMore}
            disabled={search.loadingMore}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:border-amber-500/40 hover:text-amber-300 disabled:opacity-50"
          >
            {search.loadingMore && <Loader2 size={16} className="animate-spin" />}
            {search.loadingMore ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </>
  );
}
