import { useCallback, useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useCatalog } from "@/catalog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toTalentProfile } from "@/features/talent/api/talentAdapters";
import useMyTalent from "@/features/talent/hooks/useMyTalent";
import useMyGallery from "@/features/talent/hooks/useMyGallery";
import useMyAvailability from "@/features/talent/hooks/useMyAvailability";
import useMyAvatar from "@/features/talent/hooks/useMyAvatar";
import useRefetchBefore from "@/hooks/useRefetchBefore";
import { OwnerTalentContext } from "@/features/talent/hooks/ownerTalentContext";
import OwnerAvailability from "@/features/talent/components/owner/OwnerAvailability";
import OwnerControls from "@/features/talent/components/owner/OwnerControls";
import PhotoNotice from "@/features/talent/components/owner/PhotoNotice";
import OwnerGallery from "@/features/talent/components/owner/OwnerGallery";
import OwnerExperience from "@/features/talent/components/owner/OwnerExperience";
import SettingsHint from "@/features/talent/components/owner/SettingsHint";
import ProfileLoadState from "@/features/talent/components/profile/ProfileLoadState";
import TalentProfileHero from "@/features/talent/components/profile/TalentProfileHero";
import { AVATAR_IN_FLIGHT as AVATAR_REVIEW_STAGES } from "@/features/talent/hooks/useMyAvatar";
import TalentSettingsPanel from "@/features/talent/components/settings/TalentSettingsPanel";

/**
 * /talent/me (signed in): the owner's own profile from GET /api/talent/me. An account without a
 * finished talent profile is sent to onboarding. The settings panel edits it through the API and
 * puts the saved profile, availability, photo and gallery back here through OwnerTalentContext.
 */
export default function TalentOwnerProfilePage() {
  const { craftBySlug } = useCatalog();
  const { status, talent: data, error, retry, replace, reload } = useMyTalent();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsSection, setSettingsSection] = useState("professional");
  const availability = useMyAvailability();
  const gallery = useMyGallery();
  const avatar = useMyAvatar({ onAvatarChanged: () => reload().catch(() => {}) });
  const refreshProfile = useCallback(() => reload().catch(() => {}), [reload]);
  // The avatar's signed URLs expire; fetch the profile again before they do.
  useRefetchBefore(data?.avatar?.expires_at, refreshProfile);
  const ownerContext = useMemo(
    () => ({ talent: data, replace, reload, availability, avatar, gallery }),
    [data, replace, reload, availability, avatar, gallery],
  );
  const openSettings = (section = "professional") => {
    setSettingsSection(section);
    setSettingsOpen(true);
  };

  if (status === "noProfile" || (status === "ready" && !data.onboarding_completed)) {
    return <Navigate to="/talent/onboarding" replace />;
  }
  if (status !== "ready") return <ProfileLoadState error={error} onRetry={retry} />;

  const talent = toTalentProfile(data, craftBySlug);

  return (
    <OwnerTalentContext.Provider value={ownerContext}>
      <div className="min-h-screen overflow-hidden bg-[#050505] text-white">
        <Navbar />
        <OwnerControls onSettings={() => openSettings()} />
        <main className="px-6 pb-24 pt-32">
          <div className="mx-auto max-w-7xl">
            <PhotoNotice />
            <p className="inline-flex items-center gap-2 text-sm text-neutral-500">
              {data.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
              {data.is_published
                ? "Your profile is published and appears in search."
                : "Your profile is hidden from search."}
            </p>
            <TalentProfileHero
              talent={talent}
              photoNote={
                AVATAR_REVIEW_STAGES.includes(avatar.stage) ? "Photo in review" : undefined
              }
            >
              {data.is_published && (
                <Link
                  to={`/talent/${talent.id}`}
                  className="mt-10 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_40px_rgba(245,158,11,0.25)] transition hover:-translate-y-0.5 hover:bg-amber-400"
                >
                  <Eye size={16} />
                  View public profile
                </Link>
              )}
              <SettingsHint onOpen={() => openSettings()} />
            </TalentProfileHero>
            <OwnerGallery talent={talent} onManage={() => openSettings("media")} />
            <OwnerExperience talent={talent} onManage={() => openSettings("experience")} />
            <OwnerAvailability
              availability={availability}
              onManage={() => openSettings("calendar")}
            />
          </div>
        </main>
        <Footer />
        <TalentSettingsPanel
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          initialSection={settingsSection}
        />
      </div>
    </OwnerTalentContext.Provider>
  );
}
