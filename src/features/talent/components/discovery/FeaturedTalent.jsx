import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import TalentResults from "@/features/talent/components/discovery/TalentResults";
import useTalentSearch from "@/features/talent/hooks/useTalentSearch";

const FEATURED_LIMIT = 6;

/** The first few published talents (GET /api/talent?limit=6) with a link to the full list. */
export default function FeaturedTalent() {
  const search = useTalentSearch({ limit: FEATURED_LIMIT });

  return (
    <>
      <TalentResults search={search} paginate={false} columns={3} />
      {search.status === "ready" && search.results.length > 0 && (
        <div className="mt-10 flex justify-center">
          <Link
            to="/talent"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:border-amber-500/40 hover:text-amber-300"
          >
            Explore the Talent Network
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </>
  );
}
