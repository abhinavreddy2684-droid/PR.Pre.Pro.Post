import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  MapPin,
  Play,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";

const chapters = [
  {
    id: "talent",
    label: "Talent",
    title: "Talent wants to be discovered.",
    copy: "A filmmaker has the craft, the experience, and the work — but needs the right place for that work to be seen.",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    title: "Their work becomes their introduction.",
    copy: "They build a portfolio around the work: craft, selected projects, reel, credits, experience, location, and availability.",
  },
  {
    id: "search",
    label: "Recruiter",
    title: "A recruiter arrives with a real brief.",
    copy: "Instead of searching through disconnected contacts, the recruiter can look for the craft, experience, location, and availability the production actually needs.",
  },
  {
    id: "match",
    label: "Discovery",
    title: "The right talent comes into focus.",
    copy: "The project brief and the talent profile meet. The recruiter can see the work and decide whether the creative fit is right.",
  },
  {
    id: "connect",
    label: "Connection",
    title: "Discovery becomes an opportunity.",
    copy: "The talent gets a chance to be discovered. The recruiter finds someone worth speaking to. The gateway has done its job.",
  },
];

const craftNames = ["Screenplay", "Direction", "Cinematography", "Editing", "Sound", "Music"];

function FilmGrain() {
  return <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:radial-gradient(rgba(255,255,255,0.8)_0.5px,transparent_0.5px)] [background-size:4px_4px]" />;
}

function Window({ children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0a0a] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
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
    <div className="grid grid-cols-[0.78fr_1.22fr] gap-3 sm:gap-4">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#19130c] to-[#080808] p-4">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="relative flex aspect-[4/5] items-end overflow-hidden rounded-xl border border-white/[0.08] bg-[radial-gradient(circle_at_50%_28%,rgba(245,158,11,.24),transparent_25%),linear-gradient(145deg,#21170c,#090909_68%)] p-3">
          <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute left-1/2 top-[25%] h-12 w-12 -translate-x-1/2 rounded-full border border-amber-300/25 bg-amber-200/[0.07]" />
          <div className="absolute bottom-[11%] left-1/2 h-20 w-24 -translate-x-1/2 rounded-t-[40px] border border-white/[0.08] bg-black/40" />
          <div className="relative flex w-full items-center justify-between text-[6px] uppercase tracking-[0.2em] text-neutral-600"><span>FILMMAKER</span><span>CRAFT</span></div>
          <div className="absolute bottom-3 left-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/60"><Play size={10} className="ml-0.5 fill-current text-amber-300" /></div>
        </div>
        <p className="mt-3 text-[7px] uppercase tracking-[0.2em] text-neutral-600">A body of work waiting to be seen.</p>
      </div>
      <div className="space-y-3">
        <Window>
          <div className="p-4">
            <p className="text-[7px] uppercase tracking-[0.2em] text-amber-400">THE PROBLEM</p>
            <p className="mt-2 text-sm font-medium leading-snug text-white">Great talent can be hard to discover.</p>
            <p className="mt-2 text-[8px] leading-relaxed text-neutral-600">The work exists, but the right person may never see it.</p>
            <div className="mt-4 h-px bg-white/[0.07]" />
            <div className="mt-4 flex items-center gap-2 text-[7px] text-neutral-500"><Users size={12} className="text-amber-400" />A place built around cinematic craft.</div>
          </div>
        </Window>
        <div className="rounded-2xl border border-amber-400/15 bg-amber-400/[0.035] p-4">
          <p className="text-[7px] uppercase tracking-[0.2em] text-amber-400">THE INTENT</p>
          <p className="mt-2 text-xs leading-relaxed text-neutral-300">Make the talent easier to find without making the work feel ordinary.</p>
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
            <div className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-400/[0.05]"><Camera size={13} className="text-amber-400" /></div><div><p className="text-[7px] uppercase tracking-[0.18em] text-amber-400">PORTFOLIO</p><p className="mt-1 text-[9px] text-neutral-300">The work speaks first.</p></div></div>
            <BadgeCheck size={15} className="text-amber-400" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["from-amber-950 via-stone-900 to-black", "from-stone-800 via-neutral-950 to-black", "from-orange-950 via-stone-900 to-black"].map((gradient, index) => (
              <div key={index} className={`relative aspect-[4/3] overflow-hidden rounded-xl border border-white/[0.07] bg-gradient-to-br ${gradient}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_30%,rgba(245,158,11,.18),transparent_24%)]" />
                <span className="absolute bottom-2 left-2 text-[6px] uppercase tracking-[0.14em] text-white/35">SELECTED WORK 0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </Window>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3"><p className="text-[6px] uppercase tracking-[0.18em] text-neutral-700">CRAFT</p><div className="mt-2 flex flex-wrap gap-1.5">{craftNames.map((name) => <span key={name} className="rounded-full border border-white/[0.07] px-2 py-1 text-[6px] text-neutral-500">{name}</span>)}</div></div>
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3"><p className="text-[6px] uppercase tracking-[0.18em] text-neutral-700">CONTEXT</p><div className="mt-2 space-y-2 text-[7px] text-neutral-500"><div className="flex items-center gap-2"><MapPin size={10} /> Location</div><div>Experience</div><div>Availability</div></div></div>
      </div>
    </div>
  );
}

function SearchScene() {
  return (
    <div className="space-y-3">
      <Window>
        <div className="p-3 sm:p-4">
          <p className="mb-3 text-[7px] uppercase tracking-[0.2em] text-amber-400">RECRUITER SEARCH</p>
          <div className="flex items-center gap-2 rounded-xl border border-amber-400/15 bg-black/50 px-3 py-2.5"><Search size={13} className="text-amber-400" /><span className="text-[8px] text-neutral-500">Cinematographer for a feature...</span><span className="ml-auto rounded-lg bg-amber-400 px-2 py-1 text-[6px] font-semibold text-black">SEARCH</span></div>
          <div className="mt-2 flex flex-wrap gap-1.5">{["Cinematography", "Mumbai", "Feature experience", "Available"].map((filter) => <span key={filter} className="rounded-full border border-white/[0.07] px-2.5 py-1 text-[6px] uppercase tracking-[0.14em] text-neutral-600">{filter}</span>)}</div>
        </div>
      </Window>
      <div className="grid grid-cols-3 gap-2">
        {["CRAFT", "WORK", "FIT"].map((label, index) => <motion.div key={label} animate={{ y: [0, -2, 0] }} transition={{ duration: 4, delay: index * 0.25, repeat: Infinity, ease: "easeInOut" }} className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-3"><div className="h-12 rounded-lg border border-white/[0.06] bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,.18),transparent_26%),linear-gradient(135deg,#1c140b,#080808)]" /><p className="mt-2 text-[7px] uppercase tracking-[0.16em] text-neutral-500">{label}</p><div className="mt-2 h-1 w-2/3 rounded-full bg-white/[0.07]" /><div className="mt-2 h-1 w-1/2 rounded-full bg-white/[0.05]" /></motion.div>)}
      </div>
    </div>
  );
}

function MatchScene() {
  return (
    <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
        <p className="text-[6px] uppercase tracking-[0.2em] text-neutral-700">PROJECT BRIEF</p>
        <p className="mt-2 text-xs font-medium text-white">A production needs a visual voice.</p>
        <div className="mt-3 space-y-2 text-[7px] text-neutral-600"><span className="block">Craft · Cinematography</span><span className="block">Location · Mumbai</span><span className="block">Experience · Feature work</span></div>
      </div>
      <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="relative flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/30 bg-black shadow-[0_0_55px_rgba(245,158,11,.12)]"><Sparkles size={17} className="text-amber-300" /></motion.div>
      <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.08] to-black p-4">
        <p className="text-[6px] uppercase tracking-[0.2em] text-amber-400">SHORTLIST</p>
        <p className="mt-2 text-xs font-medium text-white">The work makes the decision clearer.</p>
        <div className="mt-3 space-y-2"><div className="flex items-center gap-2 text-[7px] text-neutral-500"><Check size={10} className="text-amber-400" />Craft aligned</div><div className="flex items-center gap-2 text-[7px] text-neutral-500"><Check size={10} className="text-amber-400" />Experience aligned</div><div className="flex items-center gap-2 text-[7px] text-neutral-500"><Check size={10} className="text-amber-400" />Availability aligned</div></div>
      </div>
      <div className="pointer-events-none absolute left-[29%] right-[29%] top-1/2 h-px bg-gradient-to-r from-amber-400/10 via-amber-400/50 to-amber-400/10" />
    </div>
  );
}

function ConnectScene() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.08] via-black to-black p-5 sm:p-7">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="relative text-center">
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/30 bg-black shadow-[0_0_50px_rgba(245,158,11,.12)]"><BriefcaseBusiness size={20} className="text-amber-300" /></motion.div>
        <p className="mt-4 text-[7px] uppercase tracking-[0.25em] text-amber-400">THE OUTCOME</p>
        <p className="mx-auto mt-2 max-w-sm text-xl font-semibold tracking-tight text-white sm:text-2xl">Both sides find what they were looking for.</p>
        <p className="mx-auto mt-2 max-w-md text-[9px] leading-relaxed text-neutral-500">Talent gets a genuine opportunity to be discovered. The recruiter finds the right craft for the production.</p>
      </div>
      <div className="relative mt-6 grid grid-cols-3 items-center gap-2 border-t border-white/[0.07] pt-4 text-center">
        <div><Users size={13} className="mx-auto text-neutral-600" /><p className="mt-2 text-[6px] uppercase tracking-[0.15em] text-neutral-700">Talent discovered</p></div>
        <div className="flex justify-center"><Sparkles size={15} className="text-amber-400" /></div>
        <div><BriefcaseBusiness size={13} className="mx-auto text-neutral-600" /><p className="mt-2 text-[6px] uppercase tracking-[0.15em] text-neutral-700">Right craft found</p></div>
      </div>
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
  const chapter = chapters[step];

  const goTo = (nextStep) => {
    setStep(Math.max(0, Math.min(chapters.length - 1, nextStep)));
  };

  return (
    <div className="relative min-h-[650px] overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[#070707] shadow-[0_0_100px_rgba(245,158,11,0.07)] sm:min-h-[690px]">
      <FilmGrain />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(245,158,11,0.1),transparent_36%),radial-gradient(circle_at_10%_80%,rgba(120,70,20,0.07),transparent_28%)]" />

      <div className="relative z-10 flex min-h-[650px] flex-col p-4 sm:min-h-[690px] sm:p-5 lg:p-6">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
          <div>
            <p className="text-[8px] uppercase tracking-[0.3em] text-amber-500">THE GATEWAY</p>
            <p className="mt-1 text-[9px] text-neutral-600">How talent and opportunity meet</p>
          </div>
          <div className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 text-[7px] uppercase tracking-[0.18em] text-neutral-600">{String(step + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}</div>
        </div>

        <div className="mt-4 flex gap-1.5">
          {chapters.map((item, index) => (
            <button key={item.id} type="button" onClick={() => goTo(index)} className="group flex-1" aria-label={`Show ${item.label} step`}>
              <div className={`h-1 rounded-full transition-colors ${index <= step ? "bg-amber-400/70" : "bg-white/[0.07]"}`} />
              <span className={`mt-1 hidden text-[6px] uppercase tracking-[0.13em] sm:block ${index === step ? "text-amber-400" : "text-neutral-700"}`}>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-5">
          <p className="text-[8px] uppercase tracking-[0.24em] text-amber-400">{String(step + 1).padStart(2, "0")} / {chapter.label}</p>
          <h3 className="mt-2 text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl">{chapter.title}</h3>
          <p className="mt-2 max-w-xl text-[9px] leading-relaxed text-neutral-500 sm:text-[10px]">{chapter.copy}</p>
        </div>

        <div className="relative mt-5 flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={chapter.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: "easeOut" }}>
              <Scene id={chapter.id} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
          <p className="text-[7px] uppercase tracking-[0.17em] text-neutral-700">Talent → Portfolio → Search → Match → Connect</p>
          <div className="flex gap-1.5">
            <button type="button" disabled={step === 0} onClick={() => goTo(step - 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-neutral-500 transition hover:border-amber-400/30 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-25"><ChevronLeft size={14} /></button>
            <button type="button" disabled={step === chapters.length - 1} onClick={() => goTo(step + 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-neutral-500 transition hover:border-amber-400/30 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-25"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
