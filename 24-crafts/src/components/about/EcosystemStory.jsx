import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  FileText,
  Layers3,
  MapPin,
  Play,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const chapters = [
  {
    id: "talent",
    label: "Talent",
    title: "Good work deserves to be discovered.",
    copy: "A home for cinema professionals to present their craft, body of work, and creative identity in one considered profile.",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    title: "Your work becomes the introduction.",
    copy: "Reels, credits, craft, experience, and selected work come together so the work speaks before the first conversation.",
  },
  {
    id: "search",
    label: "Discovery",
    title: "Recruiters search with intent.",
    copy: "Projects can move from a broad search to a focused shortlist using the details that actually matter to a production.",
  },
  {
    id: "match",
    label: "Match",
    title: "The right people rise to the surface.",
    copy: "Talent and project requirements meet through craft, experience, location, availability, and creative fit.",
  },
  {
    id: "connect",
    label: "Connection",
    title: "Discovery becomes collaboration.",
    copy: "The journey ends where filmmaking begins — with the right people finding each other and moving the work forward.",
  },
];

const craftNames = ["Screenplay", "Direction", "Cinematography", "Editing", "Sound", "Music"];

function FilmGrain() {
  return <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(rgba(255,255,255,0.7)_0.5px,transparent_0.5px)] [background-size:4px_4px]" />;
}

function Window({ children, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0a0a] shadow-[0_24px_70px_rgba(0,0,0,0.28)] ${className}`}>
      <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.07] px-3">
        <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
        <span className="ml-2 text-[6px] uppercase tracking-[0.22em] text-neutral-700">pre pro post</span>
      </div>
      {children}
    </div>
  );
}

function TalentScene() {
  return (
    <div className="grid grid-cols-[0.8fr_1.2fr] gap-3">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#19130c] to-[#080808] p-4">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="relative flex aspect-[4/5] items-end rounded-xl border border-white/[0.08] bg-[radial-gradient(circle_at_50%_30%,rgba(245,158,11,.22),transparent_25%),linear-gradient(145deg,#21170c,#0a0a09_65%)] p-3">
          <div className="absolute left-1/2 top-[25%] h-12 w-12 -translate-x-1/2 rounded-full border border-amber-300/25 bg-amber-200/[0.07]" />
          <div className="absolute bottom-[11%] left-1/2 h-20 w-24 -translate-x-1/2 rounded-t-[40px] border border-white/[0.08] bg-black/40" />
          <div className="relative flex w-full items-center justify-between text-[6px] uppercase tracking-[0.2em] text-neutral-600"><span>PROFILE</span><span>CRAFT</span></div>
          <div className="absolute bottom-3 left-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/60"><Play size={10} className="ml-0.5 fill-current text-amber-300" /></div>
        </div>
      </div>
      <div className="space-y-2">
        <Window>
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[7px] uppercase tracking-[0.2em] text-amber-400">CINEMATOGRAPHY</p>
                <p className="mt-1.5 text-sm font-medium text-white">A craft, presented with context.</p>
              </div>
              <BadgeCheck size={15} className="text-amber-400" />
            </div>
            <div className="mt-4 flex items-center gap-2 text-[7px] text-neutral-600"><MapPin size={10} /> Location · Availability</div>
            <div className="mt-4 h-px bg-white/[0.07]" />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {["Selected work", "Credits", "Specialties", "Experience"].map((item) => <div key={item} className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-2"><p className="text-[6px] uppercase tracking-[0.15em] text-neutral-700">{item}</p><div className="mt-2 h-1 w-2/3 rounded-full bg-white/10" /></div>)}
            </div>
          </div>
        </Window>
        <div className="grid grid-cols-3 gap-2">
          {["REEL", "CREDITS", "CRAFT"].map((item) => <div key={item} className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-2 py-2.5 text-center text-[6px] uppercase tracking-[0.16em] text-neutral-600">{item}</div>)}
        </div>
      </div>
    </div>
  );
}

function PortfolioScene() {
  return (
    <div className="space-y-3">
      <Window>
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
            <div className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-400/[0.05]"><Camera size={13} className="text-amber-400" /></div><div><p className="text-[7px] uppercase tracking-[0.18em] text-amber-400">SELECTED WORK</p><p className="mt-1 text-[9px] text-neutral-300">A visual body of work</p></div></div>
            <span className="rounded-full border border-white/10 px-2 py-1 text-[6px] uppercase tracking-[0.16em] text-neutral-600">VIEW REEL</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              "from-amber-950 via-stone-900 to-black",
              "from-stone-800 via-neutral-950 to-black",
              "from-orange-950 via-stone-900 to-black",
            ].map((gradient, index) => <div key={index} className={`relative aspect-[4/3] overflow-hidden rounded-xl border border-white/[0.07] bg-gradient-to-br ${gradient}`}><div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_30%,rgba(245,158,11,.18),transparent_24%)]" /><span className="absolute bottom-2 left-2 text-[6px] uppercase tracking-[0.14em] text-white/35">0{index + 1}</span></div>)}
          </div>
        </div>
      </Window>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3"><p className="text-[6px] uppercase tracking-[0.18em] text-neutral-700">CRAFT PROFILE</p><div className="mt-2 flex flex-wrap gap-1.5">{craftNames.map((name) => <span key={name} className="rounded-full border border-white/[0.07] px-2 py-1 text-[6px] text-neutral-500">{name}</span>)}</div></div>
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3"><p className="text-[6px] uppercase tracking-[0.18em] text-neutral-700">WORK CONTEXT</p><div className="mt-3 space-y-2"><div className="h-1 w-full rounded-full bg-white/[0.07]" /><div className="h-1 w-4/5 rounded-full bg-white/[0.07]" /><div className="h-1 w-3/5 rounded-full bg-amber-400/20" /></div></div>
      </div>
    </div>
  );
}

function SearchScene() {
  const candidates = ["Cinematography", "Production Design", "Editing"];
  return (
    <div className="space-y-3">
      <Window>
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-2 rounded-xl border border-amber-400/15 bg-black/50 px-3 py-2.5"><Search size={13} className="text-amber-400" /><span className="text-[8px] text-neutral-500">Find talent by craft, location, experience...</span><div className="ml-auto h-6 w-6 rounded-lg bg-amber-400/[0.08]" /></div>
          <div className="mt-2 flex flex-wrap gap-1.5">{["Craft", "Location", "Experience", "Availability"].map((filter) => <span key={filter} className="rounded-full border border-white/[0.07] px-2.5 py-1 text-[6px] uppercase tracking-[0.14em] text-neutral-600">{filter}</span>)}</div>
        </div>
      </Window>
      <div className="grid grid-cols-3 gap-2">
        {candidates.map((name, index) => <motion.div key={name} animate={{ y: [0, -2, 0] }} transition={{ duration: 3.5, delay: index * 0.3, repeat: Infinity, ease: "easeInOut" }} className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-3"><div className="h-12 rounded-lg border border-white/[0.06] bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,.18),transparent_26%),linear-gradient(135deg,#1c140b,#080808)]" /><div className="mt-2 flex items-center gap-1"><span className="text-[7px] text-neutral-300">{name}</span><BadgeCheck size={9} className="text-amber-400" /></div><div className="mt-1 h-1 w-2/3 rounded-full bg-white/[0.07]" /><div className="mt-3 flex items-center justify-between text-[6px] uppercase tracking-[0.12em] text-neutral-700"><span>View profile</span><ArrowRight size={9} /></div></motion.div>)}
      </div>
    </div>
  );
}

function MatchScene() {
  return (
    <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
        <p className="text-[6px] uppercase tracking-[0.2em] text-neutral-700">PROJECT BRIEF</p>
        <p className="mt-2 text-xs font-medium text-white">A new production needs a visual voice.</p>
        <div className="mt-3 space-y-2 text-[7px] text-neutral-600"><span className="block">Craft · Cinematography</span><span className="block">Location · Mumbai</span><span className="block">Experience · Feature work</span></div>
      </div>
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/30 bg-black shadow-[0_0_55px_rgba(245,158,11,.12)]"><motion.div animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute inset-2 rounded-full bg-amber-400/10" /><Sparkles size={17} className="relative text-amber-300" /></div>
      <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.08] to-black p-4">
        <p className="text-[6px] uppercase tracking-[0.2em] text-amber-400">CREATIVE FIT</p>
        <p className="mt-2 text-xs font-medium text-white">The shortlist takes shape.</p>
        <div className="mt-3 space-y-2"><div className="flex items-center gap-2 text-[7px] text-neutral-500"><Check size={10} className="text-amber-400" />Craft aligned</div><div className="flex items-center gap-2 text-[7px] text-neutral-500"><Check size={10} className="text-amber-400" />Location aligned</div><div className="flex items-center gap-2 text-[7px] text-neutral-500"><Check size={10} className="text-amber-400" />Brief aligned</div></div>
      </div>
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.2 }} className="absolute left-[29%] right-[29%] top-1/2 h-px origin-left bg-gradient-to-r from-amber-400/20 via-amber-400/50 to-amber-400/20" />
    </div>
  );
}

function ConnectScene() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.08] via-black to-black p-5 sm:p-6">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="relative text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/30 bg-black shadow-[0_0_50px_rgba(245,158,11,.12)]"><BriefcaseBusiness size={20} className="text-amber-300" /></div>
        <p className="mt-4 text-[7px] uppercase tracking-[0.25em] text-amber-400">DISCOVER · MATCH · CONNECT</p>
        <p className="mx-auto mt-2 max-w-sm text-xl font-semibold tracking-tight text-white sm:text-2xl">The right introduction can change a production.</p>
        <p className="mx-auto mt-2 max-w-md text-[9px] leading-relaxed text-neutral-500">A talent finds an opportunity. A recruiter finds the right craft. The work moves forward.</p>
      </div>
      <div className="relative mt-6 grid grid-cols-3 gap-2 border-t border-white/[0.07] pt-4 text-center"><div><Users size={13} className="mx-auto text-neutral-600" /><p className="mt-2 text-[6px] uppercase tracking-[0.15em] text-neutral-700">Talent</p></div><div><Sparkles size={13} className="mx-auto text-amber-400" /><p className="mt-2 text-[6px] uppercase tracking-[0.15em] text-neutral-700">Gateway</p></div><div><BriefcaseBusiness size={13} className="mx-auto text-neutral-600" /><p className="mt-2 text-[6px] uppercase tracking-[0.15em] text-neutral-700">Production</p></div></div>
    </div>
  );
}

function Scene({ id }) {
  if (id === "talent") return <TalentScene />;
  if (id === "portfolio") return <PortfolioScene />;
  if (id === "search") return <SearchScene />;
  if (id === "match") return <MatchScene />;
  return <ConnectScene />;
}

export default function EcosystemStory() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const chapter = chapters[step];

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => setStep((value) => (value + 1) % chapters.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const move = (amount) => setStep((value) => (value + amount + chapters.length) % chapters.length);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[#060606] shadow-[0_30px_100px_rgba(0,0,0,0.38)]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <FilmGrain />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,158,11,0.085),transparent_38%)]" />
      <div className="relative z-10 p-4 sm:p-5 lg:p-6">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
          <div><div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_9px_rgba(245,158,11,.7)]" /><p className="text-[7px] uppercase tracking-[0.28em] text-amber-500">THE GATEWAY</p></div><p className="mt-1 text-[8px] text-neutral-700">A story of discovery, told through the work</p></div>
          <span className="text-[7px] uppercase tracking-[0.2em] text-neutral-700">{String(step + 1).padStart(2, "0")} / 05</span>
        </div>

        <div className="mt-4 flex gap-1">
          {chapters.map((item, index) => <button key={item.id} type="button" aria-label={`Open ${item.label} chapter`} onClick={() => setStep(index)} className="group flex-1"><div className="h-0.5 overflow-hidden rounded-full bg-white/[0.07]"><motion.div className="h-full bg-amber-400" initial={false} animate={{ width: index < step ? "100%" : index === step ? "100%" : "0%" }} transition={{ duration: 0.35 }} /></div><span className={`mt-1.5 hidden text-[6px] uppercase tracking-[0.12em] sm:block ${index === step ? "text-amber-400" : "text-neutral-700"}`}>{item.label}</span></button>)}
        </div>

        <div className="mt-5 flex items-start justify-between gap-3">
          <div><p className="text-[7px] uppercase tracking-[0.22em] text-amber-400">0{step + 1} · {chapter.label}</p><h3 className="mt-2 max-w-[480px] text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl">{chapter.title}</h3><p className="mt-2 max-w-[500px] text-[9px] leading-relaxed text-neutral-500 sm:text-[10px]">{chapter.copy}</p></div>
          <div className="flex shrink-0 gap-1.5"><button type="button" aria-label="Previous chapter" onClick={() => move(-1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-neutral-600 transition hover:border-amber-400/30 hover:text-amber-300"><ChevronLeft size={13} /></button><button type="button" aria-label="Next chapter" onClick={() => move(1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-neutral-600 transition hover:border-amber-400/30 hover:text-amber-300"><ChevronRight size={13} /></button></div>
        </div>

        <div className="mt-5 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div key={chapter.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.38, ease: "easeOut" }}>
              <Scene id={chapter.id} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4"><div className="flex items-center gap-2 text-[6px] uppercase tracking-[0.18em] text-neutral-700"><span className={`h-1.5 w-1.5 rounded-full ${paused ? "bg-neutral-700" : "bg-amber-400/60"}`} />{paused ? "Paused" : "Playing"}</div><button type="button" onClick={() => move(1)} className="group flex items-center gap-2 text-[7px] uppercase tracking-[0.18em] text-neutral-600 transition hover:text-amber-300">Continue <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" /></button></div>
      </div>
    </div>
  );
}
