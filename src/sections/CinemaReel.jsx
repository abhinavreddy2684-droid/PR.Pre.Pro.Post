import { useEffect, useRef, useState } from "react";
import { ArrowRight, BriefcaseBusiness, Clapperboard, Layers3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import crafts from "../data/crafts";
import Button from "../components/ui/Button";
import CinemaReelCraftButton from "../components/ui/CinemaReelCraftButton";

export default function CinemaReel() {
  const navigate = useNavigate();
  const [activeCraft, setActiveCraft] = useState(crafts[1]);
  const [shouldScrollToCraft, setShouldScrollToCraft] = useState(false);
  const detailSectionRef = useRef(null);

  useEffect(() => {
    if (!shouldScrollToCraft) return;

    const scrollToDetailCard = () => {
      const detailSection = detailSectionRef.current;
      if (!detailSection) return;

      const cardRect = detailSection.getBoundingClientRect();
      const cardTop = cardRect.top + window.scrollY;
      const cardBottom = cardTop + cardRect.height;
      const navbar = document.querySelector("nav");
      const navbarHeight = navbar?.getBoundingClientRect().height ?? 0;
      const topGap = window.innerWidth < 1024 ? 12 : 16;
      const dynamicOffset = Math.max(
        window.innerHeight - navbarHeight - (topGap * 2),
        0,
      );

      const targetScroll = Math.max(
        ((cardTop + cardBottom - dynamicOffset) / 2) - navbarHeight - topGap,
        0,
      );

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });

      setShouldScrollToCraft(false);
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToDetailCard);
    });
  }, [activeCraft, shouldScrollToCraft]);

  const handleCraftSelect = (craft) => {
    setActiveCraft(craft);
    setShouldScrollToCraft(true);
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
          The bridge between visionary filmmakers and the industry&apos;s elite talent.
          Select a craft below to discover the talent behind every frame across our 24-craft network.
        </p>
      </header>

      <section className="w-full relative py-12">
        <div className="w-full h-4 bg-black border-y border-neutral-800 flex justify-around items-center px-4 overflow-hidden">
          {[...Array(50)].map((_, index) => (
            <div key={`top-${index}`} className="w-3 h-2 bg-neutral-900 rounded-sm mx-1 shrink-0" />
          ))}
        </div>

        <div className="relative w-full bg-black py-6 overflow-x-auto whitespace-nowrap scrollbar-hide flex items-center px-8 space-x-6 snap-x snap-mandatory">
          {crafts.map((craft) => (
            <div key={craft.id} className="relative shrink-0 snap-center">
              <CinemaReelCraftButton
                craftId={craft.id}
                active={activeCraft.id === craft.id}
                onClick={() => handleCraftSelect(craft)}
                aria-label={`View details for ${craft.title}`}
                aria-pressed={activeCraft.id === craft.id}
              >
                {craft.title}
              </CinemaReelCraftButton>
            </div>
          ))}
        </div>

        <div className="w-full h-4 bg-black border-y border-neutral-800 flex justify-around items-center px-4 overflow-hidden">
          {[...Array(50)].map((_, index) => (
            <div key={`bottom-${index}`} className="w-3 h-2 bg-neutral-900 rounded-sm mx-1 shrink-0" />
          ))}
        </div>
      </section>

      <section
        ref={detailSectionRef}
        aria-live="polite"
        className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16 md:pt-20 md:pb-20"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] rounded-full bg-amber-500/[0.05] blur-[140px] pointer-events-none" />

        <div
          key={`mobile-${activeCraft.id}`}
          className="relative z-10 lg:hidden overflow-hidden rounded-[1.75rem] border border-amber-500/15 bg-[#0b0b0b] shadow-[0_20px_70px_rgba(0,0,0,0.45)] animate-fade-in-up"
        >
          <div className="relative px-5 pt-6 pb-7 border-b border-white/10 bg-gradient-to-br from-amber-500/[0.12] via-transparent to-transparent">
            <div className="flex items-center justify-between gap-4">
              <p className="uppercase tracking-[0.28em] text-[10px] font-semibold text-amber-400">Cinema Craft</p>
              <span className="font-mono text-xs text-amber-500/60">{String(activeCraft.id).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight leading-[0.95]">{activeCraft.title}</h3>
            <p className="mt-5 text-sm sm:text-base text-neutral-400 leading-7">{activeCraft.description}</p>
          </div>

          <div className="divide-y divide-white/10">
            <div className="px-5 py-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"><BriefcaseBusiness size={18} className="text-amber-400" /></div>
                <div><h4 className="text-lg font-bold">Find Talent</h4><p className="text-[11px] uppercase tracking-[0.14em] text-neutral-600">People behind the craft</p></div>
              </div>
              <p className="mt-4 text-sm text-neutral-400 leading-6">Explore professionals in this craft, review their work, and discover the right talent for your next project.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {activeCraft.talentTypes.map((talentType) => (
                  <span key={talentType} className="px-3 py-2 rounded-full border border-white/10 bg-white/[0.035] text-xs text-neutral-300">{talentType}</span>
                ))}
              </div>
            </div>

            <div className="px-5 py-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"><Clapperboard size={18} className="text-amber-400" /></div>
                <div><h4 className="text-lg font-bold">Built for Production</h4><p className="text-[11px] uppercase tracking-[0.14em] text-neutral-600">A searchable talent marketplace</p></div>
              </div>
              <p className="mt-4 text-sm text-neutral-400 leading-6">Browse structured, searchable talent profiles instead of relying on static resumes or scattered referrals.</p>
              <div className="mt-5 flex items-center gap-2"><Layers3 className="text-amber-400" size={17} /><span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">Discover · Evaluate · Hire</span></div>
            </div>
          </div>

          <div className="px-5 py-5 bg-black/40 border-t border-white/10">
            <p className="text-xs text-neutral-500 mb-4">Explore available talent in <span className="text-neutral-300">{activeCraft.title}</span>.</p>
            <Button onClick={exploreTalent} className="w-full flex items-center justify-center gap-3 !px-5 !py-3.5">Explore Talent <ArrowRight size={18} /></Button>
          </div>
        </div>

        <div className="relative z-10 hidden lg:block rounded-[2.5rem] border border-white/10 bg-white/[0.025] overflow-hidden shadow-2xl animate-fade-in-up">
          <div className="relative p-8 md:p-14 border-b border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.13),transparent_45%)] pointer-events-none" />
            <div className="relative max-w-4xl">
              <p className="uppercase tracking-[0.35em] text-xs text-amber-400">Cinema Craft · {String(activeCraft.id).padStart(2, "0")}</p>
              <h3 className="mt-5 text-5xl md:text-7xl font-black tracking-tight">{activeCraft.title}</h3>
              <p className="mt-7 text-lg md:text-xl text-neutral-400 leading-relaxed max-w-3xl">{activeCraft.description}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4"><BriefcaseBusiness className="text-amber-400" /><h4 className="text-2xl font-bold">Find Talent</h4></div>
              <p className="mt-6 text-neutral-400 leading-relaxed">Explore professionals in this craft, review their work, and discover the right talent for your next project.</p>
              <div className="mt-8 flex flex-wrap gap-2">{activeCraft.talentTypes.map((talentType) => <span key={talentType} className="px-3 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-neutral-300">{talentType}</span>)}</div>
            </div>

            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4"><Clapperboard className="text-amber-400" /><h4 className="text-2xl font-bold">Built for Production</h4></div>
              <p className="mt-6 text-neutral-400 leading-relaxed">Browse structured, searchable talent profiles instead of relying on static resumes or scattered referrals.</p>
              <div className="mt-8 flex items-center gap-3"><Layers3 className="text-amber-400" size={20} /><span className="text-sm uppercase tracking-[0.2em] text-neutral-500">Discover · Evaluate · Hire</span></div>
            </div>
          </div>

          <div className="p-8 md:p-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-black/20">
            <div><p className="text-sm text-neutral-500">Explore available talent in {activeCraft.title}.</p><p className="mt-2 text-xs text-neutral-600">Profiles are currently powered by mock marketplace data.</p></div>
            <Button onClick={exploreTalent} className="flex items-center justify-center gap-3 shrink-0">Explore Talent <ArrowRight size={18} /></Button>
          </div>
        </div>
      </section>
    </section>
  );
}
