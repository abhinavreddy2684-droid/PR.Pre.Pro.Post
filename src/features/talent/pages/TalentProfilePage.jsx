import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { getTalentById } from "@/features/talent/data";
import PublicGallery from "@/features/talent/components/profile/PublicGallery";
import PublicExperience from "@/features/talent/components/profile/PublicExperience";
import PublicAvailability from "@/features/talent/components/profile/PublicAvailability";
import TalentProfileHero from "@/features/talent/components/profile/TalentProfileHero";
import TalentNotFound from "@/features/talent/components/profile/TalentNotFound";
import { scrollToId } from "@/lib/scroll";

export default function TalentProfilePage() {
  const { talentId } = useParams();
  const talent = getTalentById(talentId);
  if (!talent) return <TalentNotFound />;
  return (
    <div className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <Navbar />
      <main className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          <Link
            to={`/talent?craft=${encodeURIComponent(talent.craftSlug)}`}
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-amber-400"
          >
            <ArrowLeft size={16} /> Back to {talent.craft}
          </Link>
          <TalentProfileHero talent={talent}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button className="inline-flex items-center gap-3">
                Hire Talent <ArrowRight size={18} />
              </Button>
              <Button variant="secondary" onClick={() => scrollToId("work")}>
                View Portfolio
              </Button>
            </div>
          </TalentProfileHero>
          <PublicGallery talent={talent} />
          <PublicExperience talent={talent} />
          <PublicAvailability />
        </div>
      </main>
      <Footer />
    </div>
  );
}
