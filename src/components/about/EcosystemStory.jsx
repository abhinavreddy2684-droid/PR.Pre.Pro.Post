import { motion } from "framer-motion";
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
    kicker: "01 · THE PROBLEM",
    title: "Great talent exists. Being discovered is the challenge.",
    copy: "Filmmakers already have the craft, the experience, and the work. What they need is a place where that work can be discovered on its own merit.",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    kicker: "02 · THE GATEWAY",
    title: "The portfolio becomes the introduction.",
    copy: "A filmmaker brings their craft into one considered profile — selected work, reel, credits, experience, location, and availability — so the work can speak before the first conversation.",
  },
  {
    id: "recruiter",
    label: "Recruiter",
    kicker: "03 · THE SEARCH",
    title: "A recruiter arrives with a production brief.",
    copy: "Instead of relying on scattered contacts, the recruiter searches the ecosystem for the craft, experience, location, and availability the production actually needs.",
  },
  {
    id: "discovery",
    label: "Discovery",
    kicker: "04 · THE DISCOVERY",
    title: "The right work comes into focus.",
    copy: "Profiles become meaningful because the recruiter can evaluate the actual work and context behind the craft — not just a name in a contact list.",
  },
  {
    id: "connection",
    label: "Connection",
    kicker: "05 · THE OUTCOME",
    title: "Discovery becomes a real opportunity.",
    copy: "The talent gets a genuine chance to be discovered. The recruiter finds the right craft for the production. Both sides can move toward the work.",
  },
];

const crafts = ["Screenplay", "Direction", "Cinematography", "Editing", "Sound", "Music", "VFX", "Production"];

function FilmGrain() {
  return <div className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:radial-gradient(rgba(255,255,255,0.8)_0.5px,transparent_0.5px)] [background-size:4px_4px]" />;
}

function StoryWindow({ children, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-[1.25rem] border border-white/[0.09] bg-[#090909] shadow-[0_28px_80px_rgba(0,0,0,0.34)] ${className}`}>
      <div className="flex h-9 items-center gap-1.5 border-b border-white/[0.07] px-3 sm:px-4">
        <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
        <span className="ml-2 text-[6px] uppercase tracking-[0.25em] text-neutral-700">pre pro post · ecosystem</span>
      </div>
      {children}
    </div>
  );
}

function Person({ active = false }) {
  return (
    <div className="relative h-14 w-10 sm:h-16 sm:w-12">
      <div className={`absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 rounded-full border ${active ? "border-amber-300/45 bg-amber-300/10" : "border-white/10 bg-white/[0.025]"}`} />
      <div className={`absolute bottom-0 left-1/2 h-8 w-9 -translate-x-1/2 rounded-t-[1rem] border ${active ? "border-amber-300/25 bg-amber-300/[0.07]" : "border-white/10 bg-white/[0.025]"}`} />
    </div>
  );
}

function TalentScene() {
  return (
    <div className="grid h-full grid-cols-[0.8fr_1.2fr] gap-3 sm:gap-4">
      <div className="relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[1.25rem] border border-white/[0.08] bg-[radial-gradient(circle_at_50%_24%,rgba(245,158,11,.18),transparent_26%),linear-gradient(145deg,#1a1209,#080808_68%)] p-4 sm:min-h-[360px] sm:p-5">
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-400/[0.08] blur-3xl" />
        <div className="relative mx-auto mb-auto mt-10 flex items-end gap-2 sm:gap-3">
          <Person />
          <motion.div animate={{ y: [0, -7, 0], opacity: [0.75, 1, 0.75] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}><Person active /></motion.div>
          <Person />
        </div>
        <div className="relative border-t border-white/[0.08] pt-4">
          <p className="text-[7px] uppercase tracking-[0.25em] text-amber-400">FILMMAKERS</p>
          <p className="mt-2 text-base font-medium leading-tight text-white sm:text-lg">The work is already there.</p>
          <p className="mt-2 text-[8px] leading-relaxed text-neutral-500 sm:text-[9px]">The missing piece is discoverability.</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <StoryWindow className="flex-1">
          <div className="p-4 sm:p-5">
            <p className="text-[7px] uppercase tracking-[0.24em] text-neutral-600">THE OLD JOURNEY</p>
            <div className="mt-4 space-y-3">
              {["Who do I know?", "Who can I trust?", "Where do I find the right craft?"].map((line, index) => (
                <motion.div key={line} initial={{ opacity: 0.35 }} animate={{ opacity: [0.35, 0.8, 0.35] }} transition={{ duration: 3, delay: index * 0.4, repeat: Infinity }} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.018] px-3 py-3">
                  <span className="text-[8px] text-neutral-700">0{index + 1}</span>
                  <span className="text-[9px] text-neutral-400 sm:text-[10px]">{line}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </StoryWindow>
        <div className="rounded-[1.25rem] border border-amber-400/15 bg-amber-400/[0.035] p-4 sm:p-5">
          <p className="text-[7px] uppercase tracking-[0.24em] text-amber-400">THE IDEA</p>
          <p className="mt-2 text-sm font-medium text-white sm:text-base">Build the gateway around the work.</p>
        </div>
      </div>
    </div>
  );
}

function PortfolioScene() {
  return (
    <div className="space-y-3 sm:space-y-4">
      <StoryWindow>
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
            <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/[0.05]"><Camera size={17} className="text-amber-400" /></div><div><p className="text-[7px] uppercase tracking-[0.22em] text-amber-400">THE PORTFOLIO</p><p className="mt-1 text-sm text-neutral-200 sm:text-base">A professional identity built around the work.</p></div></div>
            <BadgeCheck size={17} className="text-amber-400" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {["SCREENPLAY", "CINEMATOGRAPHY", "EDITING"].map((label, index) => (
              <motion.div key={label} animate={{ y: [0, -3, 0] }} transition={{ duration: 4.5, delay: index * 0.3, repeat: Infinity, ease: "easeInOut" }} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/[0.08] bg-[linear-gradient(135deg,#21170c,#090909)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_28%,rgba(245,158,11,.22),transparent_25%)]" />
                <div className="absolute inset-x-3 bottom-3 h-px bg-white/10" />
                <span className="absolute bottom-4 left-3 text-[6px] uppercase tracking-[0.16em] text-white/45">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </StoryWindow>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.018] p-4 sm:p-5"><p className="text-[7px] uppercase tracking-[0.22em] text-neutral-600">CRAFT</p><div className="mt-3 flex flex-wrap gap-1.5">{crafts.map((craft) => <span key={craft} className="rounded-full border border-white/[0.07] px-2.5 py-1.5 text-[7px] text-neutral-500">{craft}</span>)}</div></div>
        <div className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.018] p-4 sm:p-5"><p className="text-[7px] uppercase tracking-[0.22em] text-neutral-600">PROFILE CONTEXT</p><div className="mt-3 space-y-2.5 text-[8px] text-neutral-500"><div className="flex items-center gap-2"><MapPin size={11} className="text-amber-400/70" />Location</div><div className="flex items-center gap-2"><Play size={11} className="text-amber-400/70" />Reel & selected work</div><div className="flex items-center gap-2"><Check size={11} className="text-amber-400/70" />Experience & availability</div></div></div>
      </div>
    </div>
  );
}

function RecruiterScene() {
  return (
    <div className="space-y-3 sm:space-y-4">
      <StoryWindow>
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 rounded-xl border border-amber-400/20 bg-black/55 px-3 py-3 sm:px-4 sm:py-3.5"><Search size={16} className="text-amber-400" /><span className="text-[9px] text-neutral-400 sm:text-[10px]">Find the right craft for a feature production...</span><span className="ml-auto hidden rounded-lg bg-amber-400 px-3 py-1.5 text-[7px] font-semibold text-black sm:block">SEARCH</span></div>
          <div className="mt-3 flex flex-wrap gap-2">{["Cinematography", "Mumbai", "Feature experience", "Available"].map((filter) => <span key={filter} className="rounded-full border border-amber-400/15 bg-amber-400/[0.035] px-2.5 py-1.5 text-[7px] uppercase tracking-[0.12em] text-amber-200/60">{filter}</span>)}</div>
        </div>
      </StoryWindow>
      <div className="grid grid-cols-3 gap-3">
        {["CRAFT FIT", "WORK", "AVAILABILITY"].map((label, index) => (
          <motion.div key={label} animate={{ y: [0, -4, 0], opacity: [0.78, 1, 0.78] }} transition={{ duration: 4.2, delay: index * 0.35, repeat: Infinity, ease: "easeInOut" }} className="rounded-[1.25rem] border border-white/[0.08] bg-[#090909] p-3 sm:p-4">
            <div className="mb-3 flex h-16 items-center justify-center rounded-xl border border-white/[0.06] bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,.17),transparent_28%),linear-gradient(135deg,#1b1309,#070707)] sm:h-20"><Users size={19} className="text-neutral-600" /></div>
            <p className="text-[7px] uppercase tracking-[0.16em] text-neutral-500">{label}</p>
            <div className="mt-2 h-1 rounded-full bg-white/[0.07]" /><div className="mt-2 h-1 w-2/3 rounded-full bg-amber-400/15" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DiscoveryScene() {
  return (
    <div className="relative grid min-h-[320px] grid-cols-[1fr_auto_1fr] items-center gap-2 sm:min-h-[370px] sm:gap-5">
      <div className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.018] p-4 sm:p-5">
        <p className="text-[7px] uppercase tracking-[0.22em] text-neutral-600">PROJECT BRIEF</p>
        <p className="mt-3 text-sm font-medium leading-snug text-white sm:text-base">A production needs a visual voice.</p>
        <div className="mt-4 space-y-2.5 text-[8px] text-neutral-500 sm:text-[9px]"><span className="block">Craft · Cinematography</span><span className="block">Location · Mumbai</span><span className="block">Experience · Feature work</span></div>
      </div>
      <div className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
        <motion.div animate={{ scale: [0.8, 1.45, 0.8], opacity: [0.25, 0.05, 0.25] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 rounded-full bg-amber-400/20" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute inset-1 rounded-full border border-dashed border-amber-400/30" />
        <Sparkles size={22} className="relative text-amber-300" />
      </div>
      <div className="rounded-[1.25rem] border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.08] to-black p-4 sm:p-5">
        <p className="text-[7px] uppercase tracking-[0.22em] text-amber-400">DISCOVERED</p>
        <p className="mt-3 text-sm font-medium leading-snug text-white sm:text-base">The work makes the shortlist meaningful.</p>
        <div className="mt-4 space-y-2.5"><div className="flex items-center gap-2 text-[8px] text-neutral-500"><Check size={11} className="text-amber-400" />Craft aligned</div><div className="flex items-center gap-2 text-[8px] text-neutral-500"><Check size={11} className="text-amber-400" />Experience aligned</div><div className="flex items-center gap-2 text-[8px] text-neutral-500"><Check size={11} className="text-amber-400" />Availability aligned</div></div>
      </div>
      <motion.div animate={{ scaleX: [0.2, 1, 0.2], opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute left-[25%] right-[25%] top-1/2 h-px origin-center bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
    </div>
  );
}

function ConnectionScene() {
  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-[1.5rem] border border-amber-400/20 bg-[radial-gradient(circle_at_50%_42%,rgba(245,158,11,.12),transparent_30%),linear-gradient(135deg,#0d0b08,#060606)] p-5 sm:min-h-[370px] sm:p-7">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-400/[0.08] blur-3xl" />
      <div className="relative flex h-full flex-col items-center justify-center text-center">
        <div className="relative flex items-center gap-8 sm:gap-14">
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2"><div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]"><Users size={20} className="text-neutral-500" /></div><span className="text-[7px] uppercase tracking-[0.18em] text-neutral-600">Talent</span></motion.div>
          <div className="relative h-px w-20 overflow-hidden bg-white/10 sm:w-28"><motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} className="h-full w-1/2 bg-amber-400" /></div>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 3.5, delay: 0.4, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2"><div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/[0.05] shadow-[0_0_45px_rgba(245,158,11,.1)]"><BriefcaseBusiness size={20} className="text-amber-300" /></div><span className="text-[7px] uppercase tracking-[0.18em] text-amber-400">Production</span></motion.div>
        </div>
        <p className="mt-9 text-[7px] uppercase tracking-[0.28em] text-amber-400">DISCOVER · MATCH · CONNECT</p>
        <h4 className="mt-3 max-w-md text-xl font-semibold tracking-tight text-white sm:text-3xl">The right introduction can change a production.</h4>
        <p className="mt-3 max-w-lg text-[9px] leading-relaxed text-neutral-500 sm:text-[10px]">The talent gets a genuine opportunity to be discovered. The recruiter finds the right craft. Pre Pro Post becomes the gateway between them.</p>
      </div>
    </div>
  );
}

function Scene({ id }) {
  if (id === "talent") return <TalentScene />;
  if (id === "portfolio") return <PortfolioScene />;
  if (id === "recruiter") return <RecruiterScene />;
  if (id === "discovery") return <DiscoveryScene />;
  return <ConnectionScene />;
}

export default function EcosystemStory() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = chapters[step];

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => {
      setStep((value) => (value + 1) % chapters.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const move = (direction) => {
    setStep((value) => (value + direction + chapters.length) % chapters.length);
  };

  return (
    <div className="relative min-h-[760px] overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[#060606] shadow-[0_0_100px_rgba(245,158,11,0.07)] sm:min-h-[800px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <FilmGrain />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,.08),transparent_38%),linear-gradient(180deg,rgba(255,255,255,.018),transparent_32%)]" />

      <div className="relative z-10 flex min-h-[760px] flex-col p-4 sm:min-h-[800px] sm:p-5 lg:p-6">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
          <div>
            <p className="text-[8px] uppercase tracking-[0.32em] text-amber-400">THE GATEWAY</p>
            <p className="mt-1 text-[9px] text-neutral-600">How Pre Pro Post brings discovery to filmmaking</p>
          </div>
          <div className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[7px] uppercase tracking-[0.2em] text-neutral-600">{String(step + 1).padStart(2, "0")} / 05</div>
        </div>

        <div className="mt-4 flex gap-1.5">
          {chapters.map((chapter, index) => (
            <button key={chapter.id} type="button" aria-label={`Show ${chapter.label} chapter`} onClick={() => setStep(index)} className="group flex-1">
              <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div className="h-full rounded-full bg-amber-400" initial={false} animate={{ width: index < step ? "100%" : index === step ? "100%" : "0%" }} transition={{ duration: 0.4 }} />
              </div>
              <span className={`mt-1 hidden text-[6px] uppercase tracking-[0.16em] sm:block ${index === step ? "text-amber-400" : "text-neutral-700"}`}>{chapter.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-[8px] uppercase tracking-[0.24em] text-amber-400">{current.kicker}</p>
            <h3 className="mt-2 text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl lg:text-[1.7rem]">{current.title}</h3>
            <p className="mt-2 max-w-2xl text-[9px] leading-relaxed text-neutral-500 sm:text-[10px]">{current.copy}</p>
          </div>
          <div className="flex shrink-0 gap-1.5">
            <button type="button" onClick={() => move(-1)} aria-label="Previous chapter" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-neutral-500 transition hover:border-amber-400/30 hover:text-amber-300"><ChevronLeft size={14} /></button>
            <button type="button" onClick={() => move(1)} aria-label="Next chapter" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-neutral-500 transition hover:border-amber-400/30 hover:text-amber-300"><ChevronRight size={14} /></button>
          </div>
        </div>

        <div className="relative mt-6 flex-1 min-h-0">
          {chapters.map((chapter, index) => (
            <div key={chapter.id} className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out ${index === step ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-3 opacity-0"}`} aria-hidden={index !== step}>
              <Scene id={chapter.id} />
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
          <div className="flex items-center gap-2 text-[7px] uppercase tracking-[0.2em] text-neutral-700"><span className={`h-1.5 w-1.5 rounded-full ${paused ? "bg-neutral-700" : "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,.7)]"}`} />{paused ? "Paused — explore the story" : "Story in motion"}</div>
          <button type="button" onClick={() => move(1)} className="group flex items-center gap-2 text-[8px] uppercase tracking-[0.18em] text-neutral-500 transition hover:text-amber-300">Continue <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" /></button>
        </div>
      </div>
    </div>
  );
}
