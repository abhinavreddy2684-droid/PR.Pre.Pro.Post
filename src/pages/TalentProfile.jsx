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
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
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

function UploadControl({ prominent = false, onChange }) {
  return (
    <label className={`group inline-flex cursor-pointer items-center justify-center gap-3 rounded-full font-semibold transition-all duration-300 ${prominent ? "min-h-12 bg-amber-500 px-6 py-3 text-sm text-black shadow-[0_0_40px_rgba(245,158,11,0.25)] hover:-translate-y-0.5 hover:bg-amber-400" : "bg-white/5 px-5 py-3 text-xs text-white/70 hover:bg-white/[0.08] hover:text-white"}`}>
      <Upload size={prominent ? 17 : 14} />
      <span>{prominent ? "Upload Your Work" : "Upload media"}</span>
      <input type="file" accept="image/*,video/*,audio/*" className="sr-only" onChange={onChange} />
    </label>
  );
}

function MediaCard({ item, talent }) {
  const Icon = mediaIcon[item.type];
  return (
    <motion.article initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} whileHover={{ y: -6 }} className="group relative overflow-hidden rounded-[2rem] bg-white/[0.03] shadow-[0_20px_70px_rgba(0,0,0,0.22)]">
      <div className="relative aspect-[16/11] overflow-hidden bg-neutral-900">
        <img src={item.image || talent.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 backdrop-blur-xl"><Icon size={12} className="text-amber-400" /><span className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/75">{item.type}</span></div>
        <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-2 text-[9px] text-white/50 backdrop-blur-xl">{item.year}</span>
        {item.type === "Video" && <span className="absolute bottom-5 left-5 grid h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur-xl transition group-hover:bg-amber-500 group-hover:text-black"><Play size={15} fill="currentColor" /></span>}
        <span className="absolute bottom-5 right-5 rounded-full bg-black/40 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-white/60 backdrop-blur-xl">View work</span>
      </div>
      <div className="p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div><h3 className="text-lg font-bold tracking-tight text-white">{item.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-400">{item.description}</p></div><span className="text-xs font-bold text-white/15">{String(item.id).padStart(2, "0")}</span></div><div className="mt-6 flex items-center justify-between"><span className="text-[10px] uppercase tracking-[0.18em] text-white/25">{talent.craft}</span><span className="inline-flex items-center gap-1.5 text-xs text-white/35"><Heart size={13} />{item.likes}</span></div></div>
    </motion.article>
  );
}

function Gallery({ talent }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("Latest");
  const [visibleCount, setVisibleCount] = useState(6);
  const [uploadName, setUploadName] = useState("");
  const media = Array.isArray(talent.media) ? talent.media : mediaSeed;
  const filtered = useMemo(() => [...media].filter((item) => type === "All" || item.type === type).filter((item) => !query.trim() || `${item.title} ${item.description}`.toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => sort === "Latest" ? b.year - a.year || b.id - a.id : a.year - b.year || a.id - b.id), [media, type, query, sort]);
  const visible = filtered.slice(0, visibleCount);
  const handleUpload = (event) => setUploadName(event.target.files?.[0]?.name || "");

  return (
    <section id="work" className="mt-32 scroll-mt-24">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><SectionHeading eyebrow="01 / My Gallery" title="The Work Speaks First" subtitle={`Performances, recordings and moments from ${talent.name}'s professional work.`} />{media.length > 0 && <UploadControl prominent onChange={handleUpload} />}</div>
      {media.length > 0 ? <>
        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex flex-wrap gap-2">{["All", "Video", "Audio", "Image"].map((option) => <button key={option} onClick={() => { setType(option); setVisibleCount(6); }} className={`rounded-full px-4 py-2.5 text-xs font-semibold transition ${type === option ? "bg-amber-500 text-black" : "bg-white/5 text-white/45 hover:bg-white/10 hover:text-white"}`}>{option}</button>)}</div><div className="flex flex-col gap-4 sm:flex-row sm:items-center"><label className="flex w-full items-center gap-3 border-b border-white/10 py-2.5 sm:w-64"><Search size={16} className="text-white/30" /><input value={query} onChange={(e) => { setQuery(e.target.value); setVisibleCount(6); }} placeholder="Search media" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25" /></label><div className="relative"><select value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none rounded-full bg-white/5 py-2.5 pl-4 pr-9 text-xs text-white/70"><option>Latest</option><option>Oldest</option></select><ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/35" /></div></div></div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{visible.map((item, index) => <MediaCard key={item.id} item={{ ...item, id: index + 1 }} talent={talent} />)}</div>
        {visible.length === 0 && <div className="mt-10 rounded-[2rem] bg-white/[0.03] py-20 text-center text-sm text-neutral-400">No media matches your search.</div>}
        <div className="mt-10 flex flex-col items-center gap-3">{visibleCount < filtered.length && <button onClick={() => setVisibleCount((count) => count + 6)} className="rounded-full bg-white/5 px-7 py-3 text-xs font-semibold text-white/60 hover:bg-white/10 hover:text-white">More</button>}{uploadName && <p className="text-xs text-neutral-500">Selected: {uploadName}</p>}</div>
      </> : <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10 rounded-[2rem] bg-white/[0.03] p-12 text-center sm:p-20"><div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-amber-500/10 text-amber-400"><Upload size={30} /></div><h3 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl">Put your work in the frame.</h3><p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-400">Add performances, images, recordings or behind-the-scenes moments so producers can experience your work before they reach out.</p><div className="mt-8"><UploadControl prominent onChange={handleUpload} /></div>{uploadName && <p className="mt-4 text-xs text-neutral-500">Selected: {uploadName}</p>}</motion.div>}
    </section>
  );
}

function Experience({ talent }) {
  const entries = Array.isArray(talent.experiences) ? talent.experiences : [];
  const [start, setStart] = useState(0);
  if (!entries.length) return null;
  const hasCarousel = entries.length > 3;
  const visible = hasCarousel ? entries.slice(start, start + 3) : entries;
  const canPrev = start > 0;
  const canNext = start < entries.length - 3;
  const gridClass = entries.length === 1
    ? "grid grid-cols-1"
    : entries.length === 2
      ? "grid gap-5 md:grid-cols-2"
      : "grid gap-5 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="experience" className="mt-32 scroll-mt-24">
      <SectionHeading eyebrow="02 / Experience" title="The Career Behind The Craft" subtitle={`A look at the experiences that shaped ${talent.name}'s professional journey.`} />
      <div className={`relative mt-10 ${gridClass}`}>
        {visible.map((entry, index) => <motion.article key={`${entry.company}-${entry.period}-${index}`} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.1 }} whileHover={{ y: -8 }} className="group relative min-h-[390px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_55%)] opacity-0 transition duration-700 group-hover:opacity-100" />
          <div className="absolute right-6 top-5 text-6xl font-black text-white/5">0{start + index + 1}</div>
          <div className="relative flex h-full flex-col"><div className="grid h-16 w-16 place-items-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400"><BriefcaseBusiness size={28} /></div><div className="relative mt-10"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-400">{entry.period || "Professional chapter"}</p><h3 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white">{entry.title || talent.role || talent.craft}</h3><p className="mt-2 text-sm font-medium text-neutral-400">{entry.company || "Independent / Production"}</p><p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400">{entry.description || "Professional work contributing to cinematic productions and creative collaborations."}</p><div className="mt-auto pt-8"><span className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-white/50">{entry.craft || talent.craft}</span></div></div></div>
        </motion.article>)}
      </div>
      {hasCarousel && <div className="mt-8 flex items-center justify-between"><p className="text-xs text-neutral-500">{start + 1}–{Math.min(start + 3, entries.length)} of {entries.length} experiences</p><div className="flex gap-2"><button disabled={!canPrev} onClick={() => setStart((value) => Math.max(0, value - 1))} className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-white/60 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"><ChevronLeft size={17} /></button><button disabled={!canNext} onClick={() => setStart((value) => Math.min(entries.length - 3, value + 1))} className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-white/60 transition hover:bg-amber-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"><ChevronRight size={17} /></button></div></div>}
    </section>
  );
}

function Availability() {
  const [cursor, setCursor] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const monthLabel = useMemo(() => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(cursor), [cursor]);
  const { firstDay, daysInMonth } = useMemo(() => { const year = cursor.getFullYear(); const month = cursor.getMonth(); return { firstDay: new Date(year, month, 1).getDay(), daysInMonth: new Date(year, month + 1, 0).getDate() }; }, [cursor]);
  const getStatus = (day) => { const date = new Date(cursor.getFullYear(), cursor.getMonth(), day); const today = new Date(); today.setHours(0, 0, 0, 0); if (date < today) return "unavailable"; const score = (day * 7 + date.getDay() * 3) % 12; return score >= 9 ? "available" : score >= 6 ? "tentative" : "unavailable"; };
  const meta = { available: { label: "Available", dot: "bg-amber-500", text: "text-amber-400" }, tentative: { label: "Tentative", dot: "bg-emerald-400", text: "text-emerald-400" }, unavailable: { label: "Unavailable", dot: "bg-white/20", text: "text-white/30" } };
  const shift = (offset) => { setCursor((date) => new Date(date.getFullYear(), date.getMonth() + offset, 1)); setSelectedDay(null); };
  return (
    <section id="availability" className="mt-32 scroll-mt-24"><div className="flex flex-col gap-10 rounded-[2rem] bg-white/[0.03] p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12"><div className="max-w-xl"><SectionHeading eyebrow="03 / Availability" title="Find A Day That Works" subtitle="Yellow is open, green needs confirmation, and muted dates are unavailable." /><div className="mt-7 flex flex-wrap gap-5 text-xs font-semibold text-neutral-400"><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-amber-500" /> Open</span><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-emerald-400" /> Tentative</span><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-white/20" /> Unavailable</span></div>{selectedDay && <p className="mt-5 text-sm text-neutral-400">{monthLabel} {selectedDay} · <span className={meta[getStatus(selectedDay)].text}>{meta[getStatus(selectedDay)].label}</span></p>}</div><div className="w-full max-w-[400px] rounded-[2rem] bg-black/25 p-5 sm:p-6"><div className="flex items-center justify-between"><button onClick={() => shift(-1)} aria-label="Previous month" className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"><ChevronLeft size={16} /></button><p className="text-sm font-bold text-white">{monthLabel}</p><button onClick={() => shift(1)} aria-label="Next month" className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"><ChevronRight size={16} /></button></div><div className="mt-5 grid grid-cols-7 gap-1 text-center text-[9px] font-semibold uppercase tracking-wider text-white/25">{["S","M","T","W","T","F","S"].map((day, i) => <span key={`${day}-${i}`} className="py-1">{day}</span>)}</div><div className="mt-1 grid grid-cols-7 gap-1">{Array.from({ length: firstDay }).map((_, i) => <span key={`blank-${i}`} className="h-9" />)}{Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => { const status = getStatus(day); const isSelected = selectedDay === day; return <button key={day} disabled={status === "unavailable"} onClick={() => setSelectedDay(day)} title={status === "unavailable" ? "Unavailable — already booked" : meta[status].label} className={`group relative h-9 rounded-xl text-xs font-semibold transition ${status === "available" ? "text-amber-300 hover:bg-amber-500/10" : status === "tentative" ? "text-emerald-300 hover:bg-emerald-400/10" : "cursor-not-allowed text-white/15 line-through decoration-white/20"} ${isSelected ? "bg-white/10 ring-1 ring-white/20" : ""}`}><span>{day}</span><span className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${meta[status].dot}`} />{status === "unavailable" && <span className="pointer-events-none absolute inset-0 grid place-items-center text-xs text-white/20 opacity-0 transition group-hover:opacity-100">×</span>}</button>})}</div></div></div></section>
  );
}

export default function TalentProfile() {
  const { talentId } = useParams();
  const talent = talents.find((item) => String(item.id) === talentId);
  if (!talent) return <div className="min-h-screen bg-[#050505] text-white"><Navbar /><main className="px-6 pb-24 pt-40 text-center"><h1 className="text-5xl font-black">Profile not found</h1><Link to="/talent" className="mt-8 inline-flex items-center gap-2 text-amber-400"><ArrowLeft size={16} /> Back to talent</Link></main><Footer /></div>;
  return <div className="min-h-screen overflow-hidden bg-[#050505] text-white"><Navbar /><main className="px-6 pb-24 pt-32"><div className="mx-auto max-w-7xl"><Link to={`/talent?craft=${encodeURIComponent(talent.craft)}`} className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-amber-400"><ArrowLeft size={16} /> Back to {talent.craft}</Link><section className="mt-10 grid items-stretch gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"><motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative min-h-[560px] overflow-hidden rounded-[2.5rem] bg-neutral-900"><img src={talent.image} alt={talent.name} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" /><span className="absolute bottom-6 left-6 rounded-full bg-amber-500 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-black">{talent.availability}</span></motion.div><motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="flex flex-col justify-center py-4 lg:py-10"><p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">{talent.craft}</p><h1 className="mt-5 text-5xl font-black leading-none tracking-tight md:text-7xl">{talent.name}</h1><div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-base text-neutral-400"><span className="inline-flex items-center gap-2"><MapPin size={16} /> {talent.location}</span><span className="inline-flex items-center gap-2"><Star size={16} className="text-amber-400" /> 4.9 rating</span><span className="inline-flex items-center gap-2"><BriefcaseBusiness size={16} /> {talent.experience}</span></div><p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">{talent.bio}</p><div className="mt-8 flex flex-wrap gap-2">{talent.genres.map((genre) => <span key={genre} className="rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">{genre}</span>)}</div><div className="mt-10 flex flex-wrap gap-4"><Button className="inline-flex items-center gap-3">Hire Talent <ArrowRight size={18} /></Button><Button variant="secondary" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" })}>View Portfolio</Button></div></motion.div></section><Gallery talent={talent} /><Experience talent={talent} /><Availability /></div></main><Footer /></div>;
}
