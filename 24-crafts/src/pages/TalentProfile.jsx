import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
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
import { useEffect, useMemo, useRef, useState } from "react";

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
    <article className="group relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#111111] shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition duration-500 hover:-translate-y-1 hover:border-amber-300/25 hover:shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
      <div className="relative aspect-[16/11] overflow-hidden bg-neutral-900">
        <img src={item.image || talent.image} alt="" className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 backdrop-blur-xl">
          <Icon size={12} className="text-amber-300" />
          <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/75">{item.type}</span>
        </div>
        <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-2 font-mono text-[9px] text-white/50 backdrop-blur-xl">{item.year}</span>
        {item.type === "Video" && <span className="absolute bottom-5 left-5 grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 group-hover:scale-105 group-hover:bg-amber-300 group-hover:text-black"><Play size={15} fill="currentColor" className="ml-0.5" /></span>}
        <div className="absolute inset-x-5 bottom-5 flex justify-end"><span className="rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-white/55 backdrop-blur-xl">View work</span></div>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0"><h3 className="truncate text-[19px] font-medium tracking-tight text-white">{item.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-white/40">{item.description}</p></div>
          <span className="mt-1 shrink-0 font-mono text-[10px] text-white/25">#{String(item.id).padStart(2, "0")}</span>
        </div>
        <div className="mt-6 flex items-center justify-between"><span className="text-[9px] uppercase tracking-[0.18em] text-white/25">{talent.craft}</span><span className="inline-flex items-center gap-1.5 text-xs text-white/35 transition-colors group-hover:text-white/55"><Heart size={13} />{item.likes}</span></div>
      </div>
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
    const q = query.trim().toLowerCase();
    return [...media].filter((item) => type === "All" || item.type === type).filter((item) => !q || `${item.title} ${item.description}`.toLowerCase().includes(q)).sort((a, b) => sort === "Latest" ? b.year - a.year || b.id - a.id : a.year - b.year || a.id - b.id);
  }, [media, query, type, sort]);
  const visibleMedia = filteredMedia.slice(0, visibleCount);
  const handleUpload = (event) => setUploadName(event.target.files?.[0]?.name || "");
  const UploadControl = ({ prominent = false }) => <label className={`group inline-flex cursor-pointer items-center justify-center gap-3 rounded-full transition duration-300 ${prominent ? "min-h-14 bg-amber-300 px-7 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(252,211,77,0.12)] hover:-translate-y-0.5 hover:bg-amber-200 hover:shadow-[0_18px_50px_rgba(252,211,77,0.18)]" : "border border-white/12 bg-white/[0.035] px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white/70 hover:border-amber-300/35 hover:bg-white/[0.06] hover:text-amber-200"}`}><Upload size={prominent ? 17 : 14} /><span>{prominent ? "Upload Your Work" : "Upload media"}</span><input type="file" accept="image/*,video/*,audio/*" className="sr-only" onChange={handleUpload} /></label>;

  return (
    <section id="work" className="mt-32 scroll-mt-24">
      <div className="border-b border-white/[0.08] pb-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-[10px] uppercase tracking-[0.32em] text-amber-400">01 / My gallery</p><h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">The work speaks first.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-white/40">Performances, recordings and moments from {talent.name}&apos;s professional work.</p></div>{hasUploadedMedia && <UploadControl prominent />}</div>
        {hasUploadedMedia && <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex flex-wrap items-center gap-2">{["All", "Video", "Audio", "Image"].map((option) => <button key={option} onClick={() => { setType(option); setVisibleCount(6); }} className={`rounded-full px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] transition ${type === option ? "bg-amber-300 text-black" : "border border-white/10 bg-white/[0.015] text-white/45 hover:border-white/20 hover:text-white/75"}`}>{option}</button>)}</div><div className="flex flex-col gap-4 sm:flex-row sm:items-center"><label className="group flex w-full max-w-sm items-center gap-3 border-b border-white/15 py-2.5 transition-colors focus-within:border-amber-400/60 sm:w-64"><Search size={16} className="shrink-0 text-white/30" /><input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(6); }} placeholder="Search media" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25" /></label><div className="flex items-center gap-3 text-xs text-white/35"><span className="uppercase tracking-[0.16em]">Sort</span><div className="relative"><select value={sort} onChange={(event) => { setSort(event.target.value); setVisibleCount(6); }} className="appearance-none rounded-full border border-white/10 bg-[#0c0c0c] py-2.5 pl-4 pr-9 text-xs text-white/70 outline-none"><option>Latest</option><option>Oldest</option></select><ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/35" /></div></div></div></div>}
      </div>
      {hasUploadedMedia ? <><div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">{visibleMedia.map((item) => <MediaCard key={item.id} item={item} talent={talent} />)}</div>{visibleMedia.length === 0 && <div className="mt-10 rounded-[28px] border border-white/[0.08] bg-white/[0.018] py-20 text-center"><p className="text-sm text-white/40">No media matches your search.</p></div>}<div className="mt-12 flex flex-col items-center gap-4">{visibleCount < filteredMedia.length && <button onClick={() => setVisibleCount((count) => count + 6)} className="rounded-full border border-white/15 px-7 py-3 text-[10px] uppercase tracking-[0.22em] text-white/60 transition hover:border-amber-400/50 hover:text-amber-200">More</button>}<UploadControl />{uploadName && <p className="text-xs text-white/30">Selected: {uploadName}</p>}</div></> : <div className="mt-10 rounded-[32px] border border-dashed border-amber-300/25 bg-gradient-to-br from-amber-300/[0.06] via-white/[0.018] to-transparent px-6 py-20 text-center sm:px-10 sm:py-28"><div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-amber-300/25 bg-amber-300/[0.08]"><Upload size={28} className="text-amber-300" /></div><p className="mt-7 text-[10px] uppercase tracking-[0.34em] text-amber-300/75">Your gallery is waiting</p><h3 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Put your work in the frame.</h3><p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/40">Add performances, images, recordings or behind-the-scenes moments so producers can experience your work before they reach out.</p><div className="mt-9 flex flex-col items-center gap-4"><UploadControl prominent />{uploadName && <p className="text-xs text-white/35">Selected: {uploadName}</p>}</div></div>}
    </section>
  );
}

function Experience({ talent }) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const experienceYears = Number.parseInt(talent.experience, 10) || 6;
  const currentYear = new Date().getFullYear();
  const entries = [
    { period: `${currentYear - 1} — Present`, title: talent.role || talent.craft, company: "Independent / Production Projects", description: `Working across ${talent.craft.toLowerCase()} projects for feature films, original productions and collaborative work.` },
    { period: `${currentYear - Math.max(3, Math.floor(experienceYears * 0.65))} — ${currentYear - 1}`, title: talent.role || talent.craft, company: "Studio & Production Work", description: "Built a wider professional body of work through studio sessions, productions and live collaborations." },
    { period: `${currentYear - experienceYears} — ${currentYear - Math.max(3, Math.floor(experienceYears * 0.65))}`, title: "Early professional work", company: "Independent", description: `Established a professional practice in ${talent.craft.toLowerCase()} and began building a consistent portfolio of work.` },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const observer = new IntersectionObserver((entriesObserved) => {
      entriesObserved.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setActiveIndex((current) => Math.max(current, index));
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    const cards = section.querySelectorAll("[data-experience-card]");
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="mt-32 scroll-mt-24" id="experience">
      <div className="border-b border-white/[0.08] pb-8"><p className="text-[10px] uppercase tracking-[0.32em] text-amber-400">02 / Experience</p><h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Professional experience.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-white/40">A concise look at the work, environments and productions that shaped the craft.</p></div>
      <div className="relative mt-12 pl-5 sm:pl-8">
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-gradient-to-b from-amber-300/50 via-white/10 to-transparent sm:left-[15px]" />
        <div className="space-y-5 sm:space-y-7">
          {entries.map((entry, index) => {
            const visible = activeIndex >= index;
            return <article key={`${entry.period}-${entry.title}`} data-experience-card data-index={index} className={`group relative rounded-[28px] border border-white/[0.09] bg-white/[0.035] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-all duration-700 ease-out sm:p-8 lg:p-9 ${visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"} hover:-translate-y-1 hover:border-amber-300/25 hover:bg-white/[0.055]`}>
              <span className={`absolute -left-[25px] top-9 h-3 w-3 rounded-full border-2 border-[#090909] bg-white/20 transition-all duration-500 sm:-left-[25px] ${visible ? "scale-100 bg-amber-300 shadow-[0_0_0_6px_rgba(252,211,77,0.08),0_0_24px_rgba(252,211,77,0.35)]" : "scale-75"}`} />
              <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
                <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-3"><span className="rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-3 py-1.5 font-mono text-[10px] text-amber-200/80">{entry.period}</span><span className="font-mono text-[9px] text-white/20">0{index + 1}</span></div><h3 className="mt-5 text-2xl font-medium tracking-tight text-white sm:text-3xl">{entry.title}</h3><p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/30">{entry.company}</p></div>
                <p className="max-w-xl text-sm leading-7 text-white/45 lg:pt-1">{entry.description}</p>
              </div>
              <div className="mt-8 h-px bg-gradient-to-r from-amber-300/20 via-white/[0.07] to-transparent transition-all duration-700 group-hover:from-amber-300/45" />
              <div className="mt-5 flex items-center justify-between text-[9px] uppercase tracking-[0.18em] text-white/20"><span>Professional chapter</span><span className="transition-colors group-hover:text-amber-300/60">{talent.craft}</span></div>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}

function Availability() {
  const [cursor, setCursor] = useState(() => new Date());
  const monthLabel = useMemo(() => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(cursor), [cursor]);
  const days = useMemo(() => { const year = cursor.getFullYear(); const month = cursor.getMonth(); const daysInMonth = new Date(year, month + 1, 0).getDate(); return Array.from({ length: daysInMonth }, (_, index) => { const day = index + 1; const date = new Date(year, month, day); const score = (day * 7 + date.getDay() * 3) % 11; return { day, score }; }); }, [cursor]);
  const statusLabel = (score) => score >= 8 ? "Available" : score >= 5 ? "Limited" : "Booked";
  const statusClass = (score) => score >= 8 ? "bg-amber-300/90" : score >= 5 ? "bg-amber-300/35" : "bg-white/[0.08]";
  const shiftMonth = (offset) => setCursor((date) => new Date(date.getFullYear(), date.getMonth() + offset, 1));
  return <section id="availability" className="mt-32 border-y border-white/[0.08] py-16 scroll-mt-24 sm:py-20"><div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-[10px] uppercase tracking-[0.32em] text-amber-400">03 / Availability</p><h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Find an open window.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-white/40">A quick visual read of when this talent is available for projects.</p></div><div className="flex items-center gap-2"><button onClick={() => shiftMonth(-1)} aria-label="Previous month" className="grid h-10 w-10 place-items-center border border-white/10 text-white/45 transition hover:border-amber-400/40 hover:text-amber-200"><ChevronLeft size={16} /></button><span className="min-w-32 text-center text-sm font-medium">{monthLabel}</span><button onClick={() => shiftMonth(1)} aria-label="Next month" className="grid h-10 w-10 place-items-center border border-white/10 text-white/45 transition hover:border-amber-400/40 hover:text-amber-200"><ChevronRight size={16} /></button></div></div><div className="mt-12 overflow-x-auto pb-2"><div className="min-w-[680px]"><div className="mb-3 grid grid-cols-7 gap-2 text-[9px] uppercase tracking-[0.16em] text-white/20">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day}>{day}</span>)}</div><div className="grid grid-cols-7 gap-2">{Array.from({ length: new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay() }).map((_, index) => <span key={`blank-${index}`} />)}{days.map(({ day, score }) => <button key={day} title={`${monthLabel} ${day} — ${statusLabel(score)}`} className="group relative h-16 border border-white/[0.06] bg-white/[0.012] p-2 text-left transition hover:-translate-y-0.5 hover:border-amber-300/40"><span className="font-mono text-[10px] text-white/35">{day}</span><span className={`absolute bottom-2 left-2 right-2 h-1 ${statusClass(score)}`} /></button>)}</div></div></div><div className="mt-7 flex flex-wrap items-center gap-6 text-[9px] uppercase tracking-[0.16em] text-white/30"><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-sm bg-amber-300/90" /> Available</span><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-sm bg-amber-300/35" /> Limited</span><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-sm bg-white/[0.08]" /> Booked</span></div></section>;
}

export default function TalentProfile() {
  const { talentId } = useParams();
  const talent = talents.find((item) => String(item.id) === talentId);
  if (!talent) return <div className="min-h-screen bg-[#090909] text-white"><Navbar /><main className="px-6 pb-24 pt-40"><div className="mx-auto max-w-4xl text-center"><p className="text-xs uppercase tracking-[0.3em] text-amber-400">Talent profile</p><h1 className="mt-4 text-4xl font-bold">Profile not found</h1><Link to="/talent" className="mt-8 inline-flex items-center gap-2 text-amber-400"><ArrowLeft size={16} /> Back to talent</Link></div></main><Footer /></div>;
  return <div className="min-h-screen overflow-hidden bg-[#090909] text-white"><Navbar /><main className="px-6 pb-24 pt-32"><div className="mx-auto max-w-7xl"><Link to={`/talent?craft=${encodeURIComponent(talent.craft)}`} className="inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-amber-400"><ArrowLeft size={16} /> Back to {talent.craft}</Link><section className="mt-10 grid items-stretch gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"><div className="relative min-h-[560px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-neutral-900"><img src={talent.image} alt={talent.name} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" /><span className="absolute bottom-6 left-6 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-black">{talent.availability}</span></div><div className="flex flex-col justify-center py-4 lg:py-10"><p className="text-xs uppercase tracking-[0.35em] text-amber-400">{talent.craft}</p><h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">{talent.name}</h1><div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-400"><span className="inline-flex items-center gap-2"><MapPin size={16} /> {talent.location}</span><span className="inline-flex items-center gap-2"><Star size={16} className="text-amber-400" /> 4.9 rating</span><span className="inline-flex items-center gap-2"><BriefcaseBusiness size={16} /> {talent.experience}</span></div><p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">{talent.bio}</p><div className="mt-8 flex flex-wrap gap-2">{talent.genres.map((genre) => <span key={genre} className="rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">{genre}</span>)}</div><div className="mt-10 flex flex-wrap gap-4"><Button className="inline-flex items-center gap-3">Hire Talent <ArrowRight size={18} /></Button><Button variant="secondary" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" })}>View Portfolio</Button></div></div></section><Gallery talent={talent} /><Experience talent={talent} /><Availability /></div></main><Footer /></div>;
}
