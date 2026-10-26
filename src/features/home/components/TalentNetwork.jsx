import { ArtistCard, getArtists } from "@/features/artists";
import SectionHeading from "@/components/ui/SectionHeading";

export default function TalentNetwork() {
  return (
    <section id="talent" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Talent Network"
          title="Featured Artists"
          subtitle="Connect with elite professionals across all cinematic disciplines."
        />

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getArtists().map((artist) => (
            <ArtistCard key={artist.name} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
}
