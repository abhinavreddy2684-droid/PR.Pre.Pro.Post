import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

import productions from "../data/productions";

import ProductionCard from "../components/cards/ProductionCard";
import SectionHeading from "../components/ui/SectionHeading";

export default function Productions() {
  return (
    <>
      <Navbar />

      <section className="pt-40 pb-32 px-6">
        
        <div className="max-w-7xl mx-auto">
          
          <SectionHeading
            eyebrow="Cinema Showcase"
            title="Featured Productions"
            subtitle="A curated collection of cinematic projects crafted through collaboration."
            center
          />

          <div className="mt-20 grid lg:grid-cols-3 gap-8">
            {productions.map((production) => (
              <ProductionCard
                key={production.title}
                production={production}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}