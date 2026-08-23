import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Clapperboard,
  FileText,
  Layers3,
  MapPin,
  Music2,
  Play,
  Scissors,
  Search,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const crafts = [
  { name: "Screenplay", icon: FileText, tone: "from-amber-500/30 via-amber-900/10 to-black" },
  { name: "Direction", icon: Clapperboard, tone: "from-orange-500/25 via-stone-900/20 to-black" },
  { name: "Cinematography", icon: Camera, tone: "from-yellow-500/20 via-neutral-900/20 to-black" },
  { name: "Editing", icon: Scissors, tone: "from-amber-400/20 via-zinc-900/30 to-black" },
  { name: "Music", icon: Music2, tone: "from-orange-400/20 via-neutral-900/20 to-black" },
  { name: "Acting", icon: Users, tone: "from-yellow-400/20 via-stone-900/20 to-black" },
];

const chapters = [
  {
    id: "world",
    kicker: "01 / THE WORLD",
    title: "24 crafts. One cinematic ecosystem.",
    description: "Filmmaking is never one discipline. It is a constellation of specialists whose work becomes one story.",
  },
  {
    id: "craft",
    kicker: "02 / THE CRAFTS",
    title: "Every craft has a place in the story.",
    description: "From the first page of a screenplay to the final frame, every specialist can be discovered through the same cinematic network.",
  },
  {
    id: "talent",
    kicker: "03 / THE TALENT",
    title: "Turn your work into a discoverable identity.",
    description: "Profiles are built around real work — credits, reels, skills, location, availability and the proof behind the craft.",
  },
  {
    id: "recruiter",
    kicker: "04 / THE SEARCH",
    title: "Recruiters search for the exact fit.",
    description: "Instead of searching through disconnected contacts, recruiters can narrow the field by craft, location, experience, budget and availability.",
  },
  {
    id: "match",
    kicker: "05 / THE MATCH",
    title: "Discovery becomes a confident match.",
    description: "The right people rise to the surface because the platform understands both sides of the brief — talent and project.",
  },
  {
    id: "ecosystem",
    kicker: "06 / THE ECOSYSTEM",
    title: "From brief to collaboration.",
    description: "Pre Pro Post becomes the cinematic layer connecting people, portfolios, projects and production opportunities.",
  },
];

function FilmGrain() {
  return <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(rgba(255,255,255,0.45)_0.6px,transparent_0.6px)] [background-size:5px_5px]" />;
}

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2">
      <p className="text-[7px] uppercase tracking-[0.2em] text-neutral-600">{label}</p>
      <p className="mt-1 text-[11px] font-medium text-neutral-200">{value}</p>
    </div>
  );
}

function CraftTile({ craft, active = false }) {
  const Icon = craft.icon;
  return (
    <motion.div
      layout
      className={`relative overflow-hidden rounded-2xl border ${active ? "border-amber-400/45" : "border-white/[0.08]"} bg-gradient-to-br ${craft.tone} p-3`}
    >
      <div className="absolute right-2 top-2 h-10 w-10 rounded-full bg-amber-400/[0.05] blur-xl" />
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/35">
        <Icon size={16} className={active ? "text-amber-300" : "text-neutral-500"} />
      </div>
      <p className="relative mt-3 text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-300">{craft.name}</p>
      <p className="relative mt-1 text-[8px] leading-relaxed text-neutral-600">Discoverable craft profile</p>
    </motion.div>
  );
}

function WorldStep() {
  return (
    <div className="grid grid-cols-[1.1fr_0.9fr] gap-3 sm:gap-4">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0b0b] p-4 sm:p-5">
        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-400/25 bg-amber-400/[0.06]">
            <span className="text-lg font-semibold text-amber-300">24</span>
          </div>
          <div>
            <p className="text-[8px] uppercase tracking-[0.2em] text-amber-400">CINEMA CRAFTS</p>
            <p className="mt-1 text-[11px] text-neutral-300">One network, many disciplines.</p>
          </div>
        </div>
        <div className="mt-5 h-px bg-gradient-to-r from-amber-400/30 via-white/10 to-transparent" />
        <div className="mt-5 grid grid-cols-2 gap-2">
          <MiniMetric label="Talent" value="Discoverable" />
          <MiniMetric label="Recruiters" value="Searchable" />
          <MiniMetric label="Portfolios" value="Work-first" />
          <MiniMetric label="Connection" value="Direct" />
        </div>
        <div className="mt-4 flex items-center gap-2 text-[8px] uppercase tracking-[0.18em] text-neutral-600">
          <CircleDot size={11} className="text-amber-500/70" />
          The gateway into filmmaking
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {crafts.slice(0, 4).map((craft, index) => <CraftTile key={craft.name} craft={craft} active={index === 0} />)}
      </div>
    </div>
  );
}

function CraftStep() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {crafts.slice(0, 3).map((craft, index) => <CraftTile key={craft.name} craft={craft} active={index === 1} />)}
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-r from-amber-400/[0.07] via-black to-black p-4 sm:p-5">
        <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="relative flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-400/25 bg-black/50">
            <Camera size={20} className="text-amber-300" />
          </div>
          <div className="min-w-0">
            <p className="text-[8px] uppercase tracking-[0.22em] text-amber-400">CINEMATOGRAPHY</p>
            <p className="mt-1 text-sm font-medium text-white">Visual language becomes a profile.</p>
            <p className="mt-2 max-w-lg text-[9px] leading-relaxed text-neutral-500">Reels, credits, specialties, equipment and experience give recruiters context before the conversation even begins.</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Feature Films", "Commercials", "Music Videos", "OTT", "Documentary"].map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[7px] uppercase tracking-[0.12em] text-neutral-500">{item}</span>)}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {crafts.slice(3).map((craft) => <CraftTile key={craft.name} craft={craft} />)}
      </div>
    </div>
  );
}

function TalentStep() {
  return (
    <div className="grid grid-cols-[0.82fr_1.18fr] gap-3 sm:gap-4">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-amber-950/30 via-[#11100d] to-black p-4">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-amber-400/10 to-transparent" />
        <div className="relative flex aspect-[4/5] items-end overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_50%_28%,rgba(245,158,11,.3),transparent_22%),linear-gradient(145deg,#33200d,#12100d_48%,#050505)] p-3">
          <div className="absolute left-1/2 top-[22%] h-16 w-16 -translate-x-1/2 rounded-full border border-amber-300/30 bg-amber-200/10 shadow-[0_0_45px_rgba(245,158,11,.14)]" />
          <div className="absolute bottom-[10%] left-1/2 h-24 w-28 -translate-x-1/2 rounded-t-[48px] border border-white/10 bg-black/50" />
          <div className="relative flex w-full items-center justify-between text-[7px] uppercase tracking-[0.15em] text-neutral-500"><span>REEL</span><span>8+ YRS</span></div>
          <div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/60"><Play size={12} className="ml-0.5 fill-current text-amber-300" /></div>
        </div>
        <div className="mt-3 flex items-center justify-between"><span className="text-[8px] uppercase tracking-[0.18em] text-neutral-500">Talent identity</span><BadgeCheck size={14} className="text-amber-400" /></div>
      </div>

      <div className="space-y-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
          <div className="flex items-start justify-between gap-3">
            <div><p className="text-sm font-semibold text-white">Aarav Mehta</p><p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-amber-400">Cinematographer</p></div>
            <BadgeCheck size={16} className="text-amber-400" />
          </div>
          <div className="mt-3 flex items-center gap-2 text-[8px] text-neutral-500"><MapPin size={11} /> Mumbai, Maharashtra</div>
          <div className="mt-3 grid grid-cols-2 gap-2"><MiniMetric label="Projects" value="42+" /><MiniMetric label="Rating" value="4.9 / 5" /></div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
          <p className="text-[8px] uppercase tracking-[0.2em] text-neutral-600">PORTFOLIO SIGNALS</p>
          <div className="mt-3 space-y-2">
            {["Feature Films", "Commercials", "Low-light cinematography", "ARRI / RED / Sony"].map((item, index) => <div key={item} className="flex items-center gap-2 text-[9px] text-neutral-400"><CheckCircle2 size={12} className={index === 0 ? "text-amber-400" : "text-neutral-700"} />{item}</div>)}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="h-14 rounded-xl border border-white/10 bg-[linear-gradient(135deg,#2d1d0c,#090909)]" />
          <div className="h-14 rounded-xl border border-white/10 bg-[linear-gradient(135deg,#19150e,#050505)]" />
          <div className="h-14 rounded-xl border border-white/10 bg-[linear-gradient(135deg,#3a2410,#0a0907)]" />
        </div>
      </div>
    </div>
  );
}

function RecruiterStep() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-3">
        <div className="flex items-center gap-2 rounded-xl border border-amber-400/20 bg-black/50 px-3 py-2.5">
          <Search size={14} className="text-amber-400" />
          <span className="text-[9px] text-neutral-400">Search cinematographers for a feature film...</span>
          <span className="ml-auto rounded-lg bg-amber-400 px-2 py-1 text-[7px] font-semibold text-black">SEARCH</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {["Cinematography", "Mumbai", "5+ Years", "Available", "₹1L–₹3L"].map((item) => <span key={item} className="rounded-full border border-amber-400/15 bg-amber-400/[0.04] px-2.5 py-1 text-[7px] uppercase tracking-[0.12em] text-amber-200/70">{item}</span>)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {["Aarav Mehta", "Ishita Rao", "Kabir Nair", "Maya Thomas"].map((name, index) => (
          <div key={name} className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-3">
            <div className="flex gap-3">
              <div className="h-11 w-11 shrink-0 rounded-xl border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,.25),transparent_30%),linear-gradient(135deg,#21170d,#070707)]" />
              <div className="min-w-0"><div className="flex items-center gap-1"><p className="truncate text-[10px] font-medium text-neutral-200">{name}</p><BadgeCheck size={10} className="shrink-0 text-amber-400" /></div><p className="mt-1 text-[7px] uppercase tracking-[0.15em] text-neutral-600">Cinematographer</p><div className="mt-2 flex items-center gap-1 text-[7px] text-neutral-500"><Star size={9} className="fill-amber-400 text-amber-400" />{(4.7 + index * 0.05).toFixed(1)}</div></div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[7px] text-neutral-600"><span>{index + 8} yrs experience</span><ArrowRight size={11} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatchStep() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
        <p className="text-[7px] uppercase tracking-[0.2em] text-neutral-600">PROJECT BRIEF</p>
        <p className="mt-2 text-xs font-medium text-white">Feature Film / Mumbai</p>
        <div className="mt-3 space-y-2 text-[8px] text-neutral-500"><span className="block">Visual tone · Atmospheric</span><span className="block">Experience · 5+ years</span><span className="block">Availability · October</span></div>
      </div>
      <motion.div animate={{ scale: [1, 1.08, 1], rotate: [0, 3, 0] }} transition={{ duration: 2.6, repeat: Infinity }} className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/[0.08] shadow-[0_0_45px_rgba(245,158,11,.18)]"><Sparkles size={18} className="text-amber-300" /></motion.div>
      <div className="rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-400/[0.08] to-black p-4">
        <div className="flex items-center justify-between"><p className="text-[7px] uppercase tracking-[0.2em] text-amber-400">BEST MATCH</p><span className="text-lg font-semibold text-amber-300">92%</span></div>
        <p className="mt-2 text-xs font-medium text-white">Aarav Mehta</p>
        <p className="mt-1 text-[8px] text-neutral-500">Cinematographer · 42 projects</p>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10"><motion.div initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ duration: 1 }} className="h-full rounded-full bg-amber-400" /></div>
      </div>
      <div className="col-span-3 mt-1 grid grid-cols-3 gap-2"><MiniMetric label="Craft fit" value="Excellent" /><MiniMetric label="Location" value="Matched" /><MiniMetric label="Availability" value="Aligned" /></div>
    </div>
  );
}

function EcosystemStep() {
  const flow = [
    ["01", "Brief", FileText],
    ["02", "Discover", Search],
    ["03", "Portfolio", Play],
    ["04", "Match", Sparkles],
    ["05", "Connect", BriefcaseBusiness],
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.08] via-black to-black p-5 text-center">
        <p className="text-[8px] uppercase tracking-[0.25em] text-amber-400">THE GATEWAY</p>
        <p className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">People → portfolios → projects.</p>
        <p className="mx-auto mt-2 max-w-md text-[9px] leading-relaxed text-neutral-500">A single cinematic layer for discovery, hiring and collaboration across the full ecosystem.</p>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {flow.map(([number, label, Icon], index) => (
          <div key={label} className="relative rounded-xl border border-white/10 bg-white/[0.025] p-2.5 text-center">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/[0.05]"><Icon size={13} className="text-amber-400" /></div>
            <p className="mt-2 text-[6px] uppercase tracking-[0.18em] text-neutral-700">{number}</p>
            <p className="mt-1 text-[8px] text-neutral-300">{label}</p>
            {index < flow.length - 1 && <ArrowRight size={10} className="absolute -right-2 top-7 z-10 text-neutral-700" />}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 text-[7px] uppercase tracking-[0.2em] text-neutral-700"><Layers3 size={11} className="text-amber-500/60" />One ecosystem, built around the work</div>
    </div>
  );
}

function StepContent({ id }) {
  switch (id) {
    case "world": return <WorldStep />;
    case "craft": return <CraftStep />;
    case "talent": return <TalentStep />;
    case "recruiter": return <RecruiterStep />;
    case "match": return <MatchStep />;
    default: return <EcosystemStep />;
  }
}

export default function EcosystemStory() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = chapters[step];

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => setStep((value) => (value + 1) % chapters.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const go = (direction) => setStep((value) => (value + direction + chapters.length) % chapters.length);

  return (
    <div
      className="relative min-h-[680px] overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[#070707] shadow-[0_0_100px_rgba(245,158,11,0.08)] sm:min-h-[720px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <FilmGrain />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(245,158,11,0.12),transparent_34%),radial-gradient(circle_at_10%_80%,rgba(120,70,20,0.08),transparent_28%)]" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-amber-400/[0.035] blur-3xl" />

      <div className="relative z-10 flex h-full min-h-[680px] flex-col p-4 sm:min-h-[720px] sm:p-5 lg:p-6">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
          <div>
            <p className="text-[8px] uppercase tracking-[0.3em] text-amber-500">THE ECOSYSTEM</p>
            <p className="mt-1 text-[9px] text-neutral-600">A six-chapter journey through Pre Pro Post</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 text-[7px] uppercase tracking-[0.18em] text-neutral-600">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,.7)]" />
            {String(step + 1).padStart(2, "0")} / 06
          </div>
        </div>

        <div className="mt-4 flex gap-1.5">
          {chapters.map((chapter, index) => (
            <button key={chapter.id} type="button" aria-label={`Go to chapter ${index + 1}`} onClick={() => setStep(index)} className="group flex-1">
              <div className={`h-1 overflow-hidden rounded-full bg-white/[0.06] ${index === step ? "bg-amber-400/20" : ""}`}>
                <motion.div className="h-full rounded-full bg-amber-400" initial={false} animate={{ width: index < step ? "100%" : index === step ? "70%" : "0%" }} transition={{ duration: 0.45 }} />
              </div>
              <span className={`mt-1 hidden text-[6px] uppercase tracking-[0.12em] sm:block ${index === step ? "text-amber-400" : "text-neutral-700"}`}>{chapter.kicker.replace(/^0\d \/ /, "")}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-[8px] uppercase tracking-[0.24em] text-amber-400">{current.kicker}</p>
            <h3 className="mt-2 text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl">{current.title}</h3>
            <p className="mt-2 max-w-lg text-[9px] leading-relaxed text-neutral-500 sm:text-[10px]">{current.description}</p>
          </div>
          <div className="flex shrink-0 gap-1.5">
            <button type="button" onClick={() => go(-1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-neutral-500 transition hover:border-amber-400/30 hover:text-amber-300"><ChevronLeft size={14} /></button>
            <button type="button" onClick={() => go(1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-neutral-500 transition hover:border-amber-400/30 hover:text-amber-300"><ChevronRight size={14} /></button>
          </div>
        </div>

        <div className="relative mt-5 flex-1">
          <AnimatePresence mode="wait">
            <motion.div key={current.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: "easeOut" }}>
              <StepContent id={current.id} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
          <div className="flex items-center gap-2 text-[7px] uppercase tracking-[0.18em] text-neutral-700">
            <CircleDot size={10} className={paused ? "text-neutral-700" : "text-amber-500/60"} />
            {paused ? "Paused — explore the chapter" : "Auto-playing story"}
          </div>
          <button type="button" onClick={() => go(1)} className="group flex items-center gap-2 text-[8px] uppercase tracking-[0.18em] text-neutral-500 transition hover:text-amber-300">
            Next chapter <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
