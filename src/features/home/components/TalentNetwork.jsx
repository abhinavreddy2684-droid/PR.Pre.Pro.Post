import SectionHeading from "@/components/ui/SectionHeading";
import { FeaturedTalent } from "@/features/talent";

/** Home page strip of real talent profiles. */
export default function TalentNetwork() {
  return (
    <section id="talent" className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Talent Network"
          title="Featured Artists"
          subtitle="Connect with elite professionals across all cinematic disciplines."
        />
        <FeaturedTalent />
      </div>
    </section>
  );
}
