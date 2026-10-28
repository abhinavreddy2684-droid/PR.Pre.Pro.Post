import { useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useCatalog } from "@/catalog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useRefetchBefore from "@/hooks/useRefetchBefore";
import { toTalentProfile } from "@/features/talent/api/talentAdapters";
import usePublicTalent from "@/features/talent/hooks/usePublicTalent";
import PublicExperience from "@/features/talent/components/profile/PublicExperience";
import ProfileLoadState from "@/features/talent/components/profile/ProfileLoadState";
import TalentProfileHero from "@/features/talent/components/profile/TalentProfileHero";
import TalentNotFound from "@/features/talent/components/profile/TalentNotFound";

// No availability section: the backend only exposes a talent's own calendar. The gallery
// returns with the media work.
/** /talent/:talentId, the public profile from GET /api/talent/{id}. */
export default function TalentProfilePage() {
  const { talentId } = useParams();
  const { craftBySlug } = useCatalog();
  const { status, talent: data, error, retry, reload } = usePublicTalent(talentId);
  const refreshProfile = useCallback(() => reload().catch(() => {}), [reload]);
  // The photo's signed URL expires; fetch the profile again before it does.
  useRefetchBefore(data?.avatar?.expires_at, refreshProfile);

  if (status === "notFound") return <TalentNotFound />;
  if (status !== "ready") return <ProfileLoadState error={error} onRetry={retry} />;

  const talent = toTalentProfile(data, craftBySlug);

  return (
    <div className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <Navbar />
      <main className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          <Link
            to={
              talent.primaryCraft
                ? `/talent?craft=${encodeURIComponent(talent.primaryCraft.slug)}`
                : "/talent"
            }
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-amber-400"
          >
            <ArrowLeft size={16} /> Back to {talent.primaryCraft?.title ?? "Talent Network"}
          </Link>
          <TalentProfileHero talent={talent} />
          <PublicExperience talent={talent} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
