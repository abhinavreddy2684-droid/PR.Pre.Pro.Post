import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import TalentSettingsPanel from "@/features/talent/components/settings/TalentSettingsPanel";
import { getOwnerTalent } from "@/features/talent/data";
import OwnerControls from "@/features/talent/components/owner/OwnerControls";
import OwnerGallery from "@/features/talent/components/owner/OwnerGallery";
import OwnerExperience from "@/features/talent/components/owner/OwnerExperience";
import OwnerAvailability from "@/features/talent/components/owner/OwnerAvailability";
import SettingsHint from "@/features/talent/components/owner/SettingsHint";
import TalentProfileHero from "@/features/talent/components/profile/TalentProfileHero";

export default function TalentOwnerProfilePage() {
  const talent = getOwnerTalent();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsSection, setSettingsSection] = useState("professional");
  const openSettings = (section = "professional") => {
    setSettingsSection(section);
    setSettingsOpen(true);
  };
  return (
    <div className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <Navbar />
      <OwnerControls onSettings={() => openSettings()} />
      <main className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          <Link
            to={`/talent?craft=${encodeURIComponent(talent.craft)}`}
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-amber-400"
          >
            <span>←</span> Back to {talent.craft}
          </Link>
          <TalentProfileHero talent={talent}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button className="inline-flex items-center gap-3">Preview public profile</Button>
              <Button variant="secondary" onClick={() => openSettings()}>
                Open settings
              </Button>
            </div>
            <SettingsHint onOpen={() => openSettings()} />
          </TalentProfileHero>
          <OwnerGallery talent={talent} />
          <OwnerExperience talent={talent} onManage={() => openSettings("experience")} />
          <OwnerAvailability onManage={() => openSettings("calendar")} />
        </div>
      </main>
      <Footer />
      <TalentSettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        initialSection={settingsSection}
      />
    </div>
  );
}
