import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCrafts } from "@/catalog";
import CraftDetailDesktop from "@/features/home/components/cinema-reel/CraftDetailDesktop";
import CraftDetailMobile from "@/features/home/components/cinema-reel/CraftDetailMobile";
import CraftReel from "@/features/home/components/cinema-reel/CraftReel";
import useScrollToCraftDetail from "@/features/home/components/cinema-reel/useScrollToCraftDetail";

// The reel opens on the second craft (Screenplay).
const DEFAULT_CRAFT_INDEX = 1;

export default function CinemaReel() {
  const navigate = useNavigate();
  const crafts = getCrafts();
  const [activeCraft, setActiveCraft] = useState(crafts[DEFAULT_CRAFT_INDEX]);
  const detailSectionRef = useRef(null);
  const scrollToDetail = useScrollToCraftDetail(detailSectionRef);

  const handleCraftSelect = (craft) => {
    setActiveCraft(craft);
    scrollToDetail();
  };

  const exploreTalent = () => {
    navigate(`/talent?craft=${encodeURIComponent(activeCraft.title)}`);
  };

  return (
    <section id="cinema-reel" className="relative overflow-hidden bg-neutral-950 text-neutral-100">
      <header className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-400">CinemaReel</p>
        <h2 className="mt-4 text-5xl md:text-7xl font-extrabold tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
          You Dream We Build.
        </h2>
        <p className="mt-6 text-lg md:text-2xl text-neutral-400 font-light leading-relaxed">
          The bridge between visionary filmmakers and the industry&apos;s elite talent. Select a
          craft below to discover the talent behind every frame across our 24-craft network.
        </p>
      </header>

      <CraftReel crafts={crafts} activeCraftId={activeCraft.id} onSelect={handleCraftSelect} />

      <section
        ref={detailSectionRef}
        aria-live="polite"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16 md:pt-20 md:pb-20"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] rounded-full bg-amber-500/[0.05] blur-[140px] pointer-events-none" />

        <CraftDetailMobile
          key={`mobile-${activeCraft.id}`}
          craft={activeCraft}
          onExplore={exploreTalent}
        />

        <CraftDetailDesktop craft={activeCraft} onExplore={exploreTalent} />
      </section>
    </section>
  );
}
