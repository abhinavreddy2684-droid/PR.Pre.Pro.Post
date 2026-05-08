import TestimonialCard from "../components/cards/TestimonialCard";
import SectionHeading from "../components/ui/SectionHeading";

import testimonials from "../data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        <SectionHeading
          eyebrow="Testimonials"
          title="Voices From Cinema"
          subtitle="Filmmakers, producers, and artists sharing their experiences."
          center
        />

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <TestimonialCard
              key={item.name}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}