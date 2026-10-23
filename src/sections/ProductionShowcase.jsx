import ProductionCard from "../components/cards/ProductionCard";
import SectionHeading from "../components/ui/SectionHeading";

import productions from "../data/productions";

export default function ProductionShowcase() {
  return (
    <section
      id="productions"
      className="py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        
        <SectionHeading
          eyebrow="Production Showcase"
          title="Stories In Motion"
          subtitle="Explore cinematic productions crafted through collaboration."
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
  );
}