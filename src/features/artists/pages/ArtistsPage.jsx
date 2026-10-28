import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import { TalentDirectory } from "@/features/talent";

/** /artists: the same searchable, paginated talent list as /talent, under its own heading. */
export default function ArtistsPage() {
  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <Navbar />

      <main className="pt-32 sm:pt-40 pb-24 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Talent Network"
            title="Cinema Professionals"
            subtitle="Directors, writers, editors, actors, cinematographers, composers, and creators."
            center
          />
          <TalentDirectory heading="Cinema Professionals" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
