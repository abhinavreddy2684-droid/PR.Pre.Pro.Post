import { Eye, EyeOff } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useCatalog } from "@/catalog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toTalentProfile } from "@/features/talent/api/talentAdapters";
import useMyTalent from "@/features/talent/hooks/useMyTalent";
import OwnerControls from "@/features/talent/components/owner/OwnerControls";
import OwnerExperience from "@/features/talent/components/owner/OwnerExperience";
import SettingsHint from "@/features/talent/components/owner/SettingsHint";
import { SETTINGS_DISABLED_REASON } from "@/features/talent/components/owner/ownerNotices";
import ProfileLoadState from "@/features/talent/components/profile/ProfileLoadState";
import TalentProfileHero from "@/features/talent/components/profile/TalentProfileHero";

/**
 * /talent/me (signed in): the owner's own profile from GET /api/talent/me. An account without a
 * finished talent profile is sent to onboarding. Gallery and availability return with the
 * settings and media work.
 */
export default function TalentOwnerProfilePage() {
  const { craftBySlug } = useCatalog();
  const { status, talent: data, error, retry } = useMyTalent();

  if (status === "noProfile" || (status === "ready" && !data.onboarding_completed)) {
    return <Navigate to="/talent/onboarding" replace />;
  }
  if (status !== "ready") return <ProfileLoadState error={error} onRetry={retry} />;

  const talent = toTalentProfile(data, craftBySlug);

  return (
    <div className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <Navbar />
      <OwnerControls />
      <main className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex items-center gap-2 text-sm text-neutral-500">
            {data.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
            {data.is_published
              ? "Your profile is published and appears in search."
              : "Your profile is hidden from search."}
          </p>
          <TalentProfileHero talent={talent}>
            {data.is_published && (
              <Link
                to={`/talent/${talent.id}`}
                className="mt-10 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_40px_rgba(245,158,11,0.25)] transition hover:-translate-y-0.5 hover:bg-amber-400"
              >
                <Eye size={16} />
                View public profile
              </Link>
            )}
            <SettingsHint />
          </TalentProfileHero>
          <OwnerExperience talent={talent} manageDisabledReason={SETTINGS_DISABLED_REASON} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
