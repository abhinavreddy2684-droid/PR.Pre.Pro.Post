import SectionHeading from "../components/ui/SectionHeading";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-20 sm:py-24 lg:py-28 px-6"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div>
          <SectionHeading
            eyebrow="About The Ecosystem"
            title={
              <>
                A Gateway Into
                <br />
                The World Of
                <br />
                Filmmaking.
              </>
            }
          />

          <div className="mt-8 space-y-6 text-neutral-400 text-lg leading-relaxed">
            <p>
              24 Crafts of Cinema is more than a portfolio platform.
              It is a creative ecosystem designed to bridge filmmakers
              with elite cinema talent.
            </p>

            <p>
              From screenplay and cinematography to editing,
              sound design, VFX, music composition, acting,
              and production management — every craft exists
              under one cinematic network.
            </p>

            <p>
              Built with a storytelling-first philosophy, the platform
              empowers collaboration, production partnerships, and artistic discovery.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-gradient-to-br from-neutral-900 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.18),transparent_55%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
