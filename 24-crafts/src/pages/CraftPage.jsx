import { useState } from "react";

import crafts from "../data/crafts";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import CraftModal from "../components/modals/CraftModal";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";

export default function CraftPage() {
  const [selectedCraft, setSelectedCraft] = useState(null);

  return (
    <>
      <Navbar />
      <section className="pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Cinema Disciplines" title="Explore The 24 Crafts" subtitle="Every cinematic department connected under one premium ecosystem." center />
          <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {crafts.map((craft) => (
              <Button
                key={craft.id}
                variant="secondary"
                onClick={() => setSelectedCraft(craft)}
                className="!rounded-[2rem] !p-8 !text-left !font-normal !tracking-normal min-h-64"
              >
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 text-sm uppercase tracking-[0.25em]">Craft {craft.id}</span>
                  <span className="text-white/10 text-5xl font-black">{String(craft.id).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-8 text-3xl font-bold">{craft.title}</h3>
                <p className="mt-5 text-neutral-400 leading-relaxed">{craft.description}</p>
              </Button>
            ))}
          </div>
        </div>
      </section>
      <CraftModal craft={selectedCraft} isOpen={!!selectedCraft} onClose={() => setSelectedCraft(null)} />
      <Footer />
    </>
  );
}
