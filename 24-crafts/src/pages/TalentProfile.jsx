import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Heart,
  Image as ImageIcon,
  MapPin,
  Music2,
  Play,
  Search,
  Star,
  Upload,
  Video,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Button from "../components/ui/Button";
import talents from "../data/talents";

const mediaSeed = [
  { id: 1, title: "Featured performance", description: "A live vocal performance recorded during a recent production session.", type: "Video", year: 2026, likes: 184 },
  { id: 2, title: "Studio session", description: "A studio recording session focused on an intimate cinematic vocal arrangement.", type: "Audio", year: 2026, likes: 127 },
  { id: 3, title: "Behind the performance", description: "A quiet look at the preparation behind a feature-film recording.", type: "Image", year: 2025, likes: 96 },
  { id: 4, title: "Live stage performance", description: "Captured during a live performance with a full ensemble and backing musicians.", type: "Video", year: 2025, likes: 241 },
  { id: 5, title: "Original soundtrack", description: "Original vocal work created for an independent short-film soundtrack.", type: "Audio", year: 2025, likes: 168 },
  { id: 6, title: "Recording day", description: "From the recording floor during a collaborative studio production.", type: "Image", year: 2024, likes: 82 },
  { id: 7, title: "Acoustic session", description: "An acoustic interpretation recorded for a small independent project.", type: "Video", year: 2024, likes: 113 },
  { id: 8, title: "Vocal arrangement", description: "Layered vocal arrangement prepared for a cinematic score.", type: "Audio", year: 2023, likes: 74 },
  { id: 9, title: "On set", description: "A production still from a day spent recording vocals for screen.", type: "Image", year: 2023, likes: 61 },
];

const mediaIcon = { Video, Audio: Music2, Image: ImageIcon };

function MediaCard({ item, talent }) {
  const Icon = mediaIcon[item.type];
  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#111111] shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition duration-500 hover:-translate-y-1 hover:border-amber-300/20 hover:shadow-[0_28px_90px_rgba(0,0,0,0.42)]">
      <div className="relative aspect-[16/11] overflow-hidden bg-neutral-900">
        <img src={item.image || talent.image} alt="" className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/35 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 backdrop-blur-xl"><Icon size={12} className="text-amber-300" /><span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/75">{item.type}</span></div>
        <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-2 font-mono text-[9px] text-white/50 backdrop-blur-xl">{item.year}</span>
        {item.type === "Video" && <span className="absolute bottom-5 left-5 grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 group-hover:scale-105 group-hover:bg-amber-300 group-hover:text-black"><Play size={15} fill="currentColor" className="ml-0.5" /></span>}
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-end"><span className="rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-white/55 backdrop-blur-xl">View work</span></div>
      </div>
      <div className="p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div className="min-w-0"><h3 className="truncate text-[19px] font-medium tracking-tight text-white">{item.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-white/40">{item.description}</p></div><span className="mt-1 shrink-0 font-mono text-[10px] text-white/25">#{String(item.id).padStart(2, "0")}</span></div><div className="mt-6 flex items-center justify-between"><span className="text-[9px] uppercase tracking-[0.18em] text-white/25">{talent.craft}</span><span className="inline-flex items-center gap-1.5 text-xs text-white/35 transition-colors group-hover:text-white/55"><Heart size={13} />{item.likes}</span></div></div>
    </article>
  );
}

function Gallery({ talent }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("Latest");
  const [visibleCount, setVisibleCount] = useState(6);
  const [uploadName, setUploadName] = useState("");
  const media = Array.isArray(talent.media) ? talent.media : mediaSeed;
  const hasUploadedMedia = media.length > 0;
  const filteredMedia = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return [...media].filter((item) => type === "All" || item.type === type).filter((item) => !normalizedQuery || `${item.title} ${item.description}`.toLowerCase().includes(normalizedQuery)).sort((a, b) => sort === "Latest" ? b.year - a.year || b.id - a.id : a.year - b.year || a.id - b.id);
  }, [media, query, type, sort]);
  const visibleMedia = filteredMedia.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMedia.length;
  const handleUpload = (event) => setUploadName(event.target.files?.[0]?.name || "");
  const UploadControl = ({ prominent = false }) => <label className={`group inline-flex cursor-pointer items-center justify-center gap-3 rounded-full transition duration-300 ${prominent ? "min-h-14 bg-amber-300 px-7 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(252,211,77,0.12)] hover:-translate-y-0.5 hover:bg-amber-200 hover:shadow-[0_18px_50px_rgba(252,211,77,0.18)]" : "border border-white/12 bg-white/[0.035] px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white/70 hover:border-amber-300/35 hover:bg-white/[0.06] hover:text-amber-200"}`}><Upload size={prominent ? 17 : 14} /><span>{prominent ? "Upload Your Work" : "Upload media"}</span><input type="file" accept="image/*,video/*,audio/*" className="sr-only" onChange={handleUpload} /></label>;

  return (
    <section id="work" className="relative mt-32 scroll-mt-24">
      <div className="pointer-events-none absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-amber-300/[0.035] blur-3xl" />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div><p className="text-[10px] uppercase tracking-[0.32em] text-amber-400">01 / My gallery</p><h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">The work speaks first.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-white/40">Performances, recordings and moments from {talent.name}&apos;s professional work.</p></div>
        {hasUploadedMedia && <UploadControl prominent />}
      </div>
      {hasUploadedMedia && <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex flex-wrap items-center gap-2">{["All", "Video", "Audio", "Image"].map((option) => <button key={option} onClick={() => { setType(option); setVisibleCount(6); }} className={`rounded-full px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] transition ${type === option ? "bg-amber-300 text-black" : "border border-white/10 bg-white/[0.015] text-white/45 hover:border-white/20 hover:text-white/75"}`}>{option}</button>)}</div><div className="flex flex-col gap-4 sm:flex-row sm:items-center"><label className="group flex w-full max-w-sm items-center gap-3 border-b border-white/10 py-2.5 transition-colors focus-within:border-amber-400/60 sm:w-64"><Search size={16} className="shrink-0 text-white/30" /><input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(6); }} placeholder="Search media" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25" /></label><div className="flex items-center gap-3 text-xs text-white/35"><span className="uppercase tracking-[0.16em]">Sort</span><div className="relative"><select value={sort} onChange={(event) => { setSort(event.target.value); setVisibleCount(6); }} className="appearance-none rounded-full border border-white/10 bg-[#0c0c0c] py-2.5 pl-4 pr-9 text-xs text-white/70 outline-none"><option>Latest</option><option>Oldest</option></select><ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/35" /></div></div></div></div>}
      {hasUploadedMedia ? <><div className="relative mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">{visibleMedia.map((item) => <MediaCard key={item.id} item={item} talent={talent} />)}</div>{visibleMedia.length === 0 && <div className="mt-10 rounded-[28px] bg-white/[0.018] py-20 text-center"><p className="text-sm text-white/40">No media matches your search.</p></div>}<div className="mt-12 flex flex-col items-center gap-4">{hasMore && <button onClick={() => setVisibleCount((count) => count + 6)} className="rounded-full border border-white/15 px-7 py-3 text-[10px] uppercase tracking-[0.22em] text-white/60 transition hover:border-amber-400/50 hover:text-amber-200">More</button>}<UploadControl />{uploadName && <p className="text-xs text-white/30">Selected: {uploadName}</p>}</div></> : <div className="mt-10 rounded-[32px] border border-dashed border-amber-300/25 bg-gradient-to-br from-amber-300/[0.06] via-white/[0.018] to-transparent px-6 py-20 text-center sm:px-10 sm:py-28"><div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-amber-300/25 bg-amber-300/[0.08]"><Upload size={28} className="text-amber-300" /></div><p className="mt-7 text-[10px] uppercase tracking-[0.34em] text-amber-300/75">Your gallery is waiting</p><h3 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Put your work in the frame.</h3><p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/40">Add performances, images, recordings or behind-the-scenes moments so producers can experience your work before they reach out.</p><div className="mt-9 flex flex-col items-center gap-4"><UploadControl prominent />{uploadName && <p className="text-xs text-white/35">Selected: {uploadName}</p>}</div></div>}
    </section>
  );
}

function Experience({ talent }) {
  const experienceYears = Number.parseInt(talent.experience, 10) || 6;
  const currentYear = new Date().getFullYear();
  const entries = [
    { period: `${currentYear - 1} — Present`, title: talent.role || talent.craft, company: "Independent / Production Projects", description: `Working across ${talent.craft.toLowerCase()} projects for feature films, original productions and collaborative work.` },
    { period: `${currentYear - Math.max(3, Math.floor(experienceYears * 0.65))} — ${currentYear - 1}`, title: talent.role || talent.craft, company: "Studio & Production Work", description: "Built a wider professional body of work through studio sessions, productions and live collaborations." },
    { period: `${currentYear - experienceYears} — ${currentYear - Math.max(3, Math.floor(experienceYears * 0.65))}`, title: "Early professional work", company: "Independent", description: `Established a professional practice in ${talent.craft.toLowerCase()} and began building a consistent portfolio of work.` },
  ];
  return (
    <section className="relative mt-32 scroll-mt-24" id="experience">
      <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-amber-300/[0.025] blur-3xl" />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] uppercase tracking-[0.32em] text-amber-400">02 / Experience</p><h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">The career behind the craft.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-white/40">A concise view of the chapters that shaped {talent.name}&apos;s professional work.</p></div><div className="shrink-0 pb-1"><span className="font-mono text-3xl tracking-tight text-amber-200">{String(experienceYears).padStart(2, "0")}+</span><span className="ml-2 text-[9px] uppercase tracking-[0.18em] text-white/30">years</span></div></div>
      <div className="mt-12 grid gap-5 lg:grid-cols-3">{entries.map((entry, index) => <article key={`${entry.period}-${entry.title}`} className={`group relative overflow-hidden rounded-[30px] bg-gradient-to-br from-white/[0.055] via-white/[0.025] to-transparent p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_100px_rgba(0,0,0,0.32)] ${index === 0 ? "ring-1 ring-amber-300/15" : "ring-1 ring-white/[0.06]"}`}><div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-amber-300/0 blur-3xl transition duration-700 group-hover:bg-amber-300/[0.07]" /><div className="relative flex h-full flex-col"><div className="flex items-center justify-between"><span className={`rounded-full px-3 py-1.5 font-mono text-[9px] ${index === 0 ? "bg-amber-300/10 text-amber-200" : "bg-white/[0.045] text-white/40"}`}>{entry.period}</span><span className="font-mono text-[10px] text-white/15">0{index + 1}</span></div><p className="mt-10 text-[9px] uppercase tracking-[0.22em] text-amber-300/60">{index === 0 ? "Current chapter" : "Professional chapter"}</p><h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{entry.title}</h3><p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-white/30">{entry.company}</p><p className="mt-6 flex-1 text-sm leading-7 text-white/40">{entry.description}</p><div className="mt-8 flex items-center justify-between"><span className="rounded-full bg-white/[0.035] px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-white/35">{talent.craft}</span><span className="text-[9px] uppercase tracking-[0.15em] text-white/15 transition group-hover:text-amber-300/60">View chapter</span></div></div></article>)}</div>
    </section>
  );
}

function Availability() {
  const [cursor, setCursor] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const monthLabel = useMemo(() => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(cursor), [cursor]);
  const days = useMemo(() => { const year = cursor.getFullYear(); const month = cursor.getMonth(); const firstDay = new Date(year, month, 1).getDay(); const daysInMonth = new Date(year, month + 1, 0).getDate(); return { firstDay, daysInMonth }; }, [cursor]);
  const getStatus = (day) => { const date = new Date(cursor.getFullYear(), cursor.getMonth(), day); const today = new Date(); today.setHours(0, 0, 0, 0); if (date < today) return "unavailable"; const score = (day * 7 + date.getDay() * 3) % 12; if (score >= 9) return "available"; if (score >= 6) return "tentative"; return "unavailable"; };
  const statusMeta = { available: { label: "Available", dot: "bg-amber-300", text: "text-amber-200", ring: "ring-amber-300/40" }, tentative: { label: "Tentative", dot: "bg-emerald-400", text: "text-emerald-300", ring: "ring-emerald-400/35" }, unavailable: { label: "Unavailable", dot: "bg-white/20", text: "text-white/30", ring: "ring-white/10" } };
  const shiftMonth = (offset) => { setCursor((date) => new Date(date.getFullYear(), date.getMonth() + offset, 1)); setSelectedDay(null); };
  const selectedStatus = selectedDay ? getStatus(selectedDay) : null;
  const selectedMeta = selectedStatus ? statusMeta[selectedStatus] : null;

  return (
    <section id="availability" className="relative mt-28 scroll-mt-24">
      <div className="pointer-events-none absolute inset-x-1/4 -top-16 h-56 rounded-full bg-amber-300/[0.025] blur-3xl" />
      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-white/[0.055] via-white/[0.025] to-amber-300/[0.025] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.22)] sm:p-10 lg:p-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-md lg:pb-2"><div className="flex items-center gap-3"><CalendarDays size={15} className="text-amber-300" /><p className="text-[10px] uppercase tracking-[0.3em] text-amber-400">03 / Availability</p></div><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Find a day that works.</h2><p className="mt-4 text-sm leading-6 text-white/40">Yellow is open, green needs confirmation, and muted dates are unavailable.</p><div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-[9px] uppercase tracking-[0.15em] text-white/35"><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-amber-300" /> Open</span><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-emerald-400" /> Tentative</span><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-white/20" /> Unavailable</span></div>{selectedMeta && <div className="mt-7 inline-flex items-center gap-3 rounded-full bg-black/20 px-4 py-2.5"><span className={`h-2 w-2 rounded-full ${selectedMeta.dot}`} /><span className="text-xs text-white/60">{monthLabel} {selectedDay}</span><span className={`text-[9px] uppercase tracking-[0.14em] ${selectedMeta.text}`}>{selectedMeta.label}</span></div>}</div>
          <div className="w-full max-w-[410px] rounded-[26px] bg-black/20 p-5 sm:p-6"><div className="flex items-center justify-between"><button type="button" onClick={() => shiftMonth(-1)} aria-label="Previous month" className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.035] text-white/40 transition hover:bg-white/[0.07] hover:text-white"><ChevronLeft size={15} /></button><div className="text-center"><p className="text-sm font-medium text-white/85">{monthLabel}</p><p className="mt-0.5 text-[8px] uppercase tracking-[0.2em] text-white/25">Select a date</p></div><button type="button" onClick={() => shiftMonth(1)} aria-label="Next month" className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.035] text-white/40 transition hover:bg-white/[0.07] hover:text-white"><ChevronRight size={15} /></button></div><div className="mt-5 grid grid-cols-7 gap-1 text-center text-[8px] uppercase tracking-[0.12em] text-white/25">{["S","M","T","W","T","F","S"].map((day, index) => <span key={`${day}-${index}`} className="py-1">{day}</span>)}</div><div className="mt-1 grid grid-cols-7 gap-1">{Array.from({ length: days.firstDay }).map((_, index) => <span key={`blank-${index}`} className="h-9" />)}{Array.from({ length: days.daysInMonth }, (_, index) => index + 1).map((day) => { const status = getStatus(day); const meta = statusMeta[status]; const selected = selectedDay === day; return <button key={day} type="button" disabled={status === "unavailable"} aria-label={`${monthLabel} ${day}: ${meta.label}`} title={status === "unavailable" ? "Unavailable — already booked" : `${meta.label}${status === "tentative" ? " — needs confirmation" : ""}`} onClick={() => setSelectedDay(day)} className={`group relative h-9 rounded-xl text-xs font-mono transition ${status === "available" ? "text-amber-100 hover:bg-amber-300/10 hover:text-amber-200" : status === "tentative" ? "text-emerald-200 hover:bg-emerald-400/10" : "cursor-not-allowed text-white/15 line-through decoration-white/20"} ${selected ? `bg-white/[0.07] ring-1 ${meta.ring}` : ""} disabled:hover:bg-transparent`}><span>{day}</span><span className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${meta.dot}`} />{status === "unavailable" && <span className="pointer-events-none absolute inset-0 grid place-items-center text-[11px] text-white/15 opacity-0 transition-opacity group-hover:opacity-100">×</span>}</button>; })}</div></div>
        </div>
      </div>
    </section>
  );
}

export default function TalentProfile() {
  const { talentId } = useParams();
  const talent = talents.find((item) => String(item.id) === talentId);
  if (!talent) return <div className="min-h-screen bg-[#090909] text-white"><Navbar /><main className="px-6 pb-24 pt-40"><div className="mx-auto max-w-4xl text-center"><p className="text-xs uppercase tracking-[0.3em] text-amber-400">Talent profile</p><h1 className="mt-4 text-4xl font-bold">Profile not found</h1><Link to="/talent" className="mt-8 inline-flex items-center gap-2 text-amber-400"><ArrowLeft size={16} /> Back to talent</Link></div></main><Footer /></div>;
  return <div className="min-h-screen overflow-hidden bg-[#090909] text-white"><Navbar /><main className="px-6 pb-24 pt-32"><div className="mx-auto max-w-7xl"><Link to={`/talent?craft=${encodeURIComponent(talent.craft)}`} className="inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-amber-400"><ArrowLeft size={16} /> Back to {talent.craft}</Link><section className="mt-10 grid items-stretch gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"><div className="relative min-h-[560px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-neutral-900"><img src={talent.image} alt={talent.name} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" /><span className="absolute bottom-6 left-6 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-black">{talent.availability}</span></div><div className="flex flex-col justify-center py-4 lg:py-10"><p className="text-xs uppercase tracking-[0.35em] text-amber-400">{talent.craft}</p><h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">{talent.name}</h1><div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-400"><span className="inline-flex items-center gap-2"><MapPin size={16} /> {talent.location}</span><span className="inline-flex items-center gap-2"><Star size={16} className="text-amber-400" /> 4.9 rating</span><span className="inline-flex items-center gap-2"><BriefcaseBusiness size={16} /> {talent.experience}</span></div><p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">{talent.bio}</p><div className="mt-8 flex flex-wrap gap-2">{talent.genres.map((genre) => <span key={genre} className="rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">{genre}</span>)}</div><div className="mt-10 flex flex-wrap gap-4"><Button className="inline-flex items-center gap-3">Hire Talent <ArrowRight size={18} /></Button><Button variant="secondary" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" })}>View Portfolio</Button></div></div></section><Gallery talent={talent} /><Experience talent={talent} /><Availability /></div></main><Footer /></div>;
}
