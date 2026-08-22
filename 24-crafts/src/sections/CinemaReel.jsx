import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import crafts from "../data/crafts";
import Button from "../components/ui/Button";

export default function CinemaReel() {
  const navigate = useNavigate();
  const [activeCraft, setActiveCraft] = useState(crafts[0]);

  const exploreTalent = () => {
    navigate(`/talent?craft=${encodeURIComponent(activeCraft.title)}`);
  };

  return (
    <section className="relative py-24 bg-neutral-950 text-neutral-100 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06),transparent_55%)] pointer-events-none" />

      <header className="relative max-w-4xl mx-auto px-6 text-center">
        <p className="uppercase tracking-[0.35em] text-xs text-amber-400">CinemaReel</p>
        <h2 className="mt-4 text-5xl md:text-7xl font-black tracking-tight">Discover the craft behind every frame.</h2>
        <p className="mt-6 text-lg md:text-xl text-neutral-400 leading-relaxed">
          Select a craft to discover the professionals who bring that discipline to life.
        </p>
      </header>

      <div className="relative mt-16 overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-6 min-w-max snap-x snap-mandatory">
          {crafts.map((craft) => {
            const isActive = activeCraft.id === craft.id;

            return (
              <Button
                key={craft.id}
                variant={isActive ? "primary" : "secondary"}
                onClick={() => setActiveCraft(craft)}
                className={`snap-center shrink-0 w-64 h-36 !rounded-2xl !p-6 !text-left flex flex-col justify-between ${isActive ? "scale-[1.03]" : "opacity-70 hover:opacity-100"}`}
              >
                <span className="text-xs uppercase tracking-[0.25em] opacity-70">Craft {String(craft.id).padStart(2, "0")}</span>
                <span className="text-xl font-bold">{craft.title}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 pt-20 text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-amber-400">Craft {String(activeCraft.id).padStart(2, "0")}</p>
        <h3 className="mt-4 text-4xl md:text-6xl font-black tracking-tight">{activeCraft.title}</h3>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-neutral-400 leading-relaxed">{activeCraft.description}</p>

        <Button onClick={exploreTalent} className="mt-10 inline-flex items-center gap-3">
          Explore Talent
          <ArrowRight size={18} />
        </Button>
        <p className="mt-4 text-xs text-neutral-600">Browse professionals available in this craft.</p>
      </div>
    </section>
  );
}
