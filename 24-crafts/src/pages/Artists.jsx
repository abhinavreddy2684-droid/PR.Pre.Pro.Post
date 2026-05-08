import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

import artists from "../data/artists";

import TalentCard from "../components/cards/TalentCard";
import SectionHeading from "../components/ui/SectionHeading";

export default function Artists() {
  return (
    <>
      <Navbar />

      <section className="pt-40 pb-32 px-6">
        
        <div className="max-w-7xl mx-auto">
          
          <SectionHeading
            eyebrow="Talent Network"
            title="Cinema Professionals"
            subtitle="Directors, writers, editors, actors, cinematographers, composers, and creators."
            center
          />

          <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist) => (
              <TalentCard
                key={artist.name}
                artist={artist}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}