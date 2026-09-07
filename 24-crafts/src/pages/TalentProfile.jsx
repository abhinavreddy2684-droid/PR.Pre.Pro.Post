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

const mediaIcon = {
  Video: Video,
  Audio: Music2,
  Image: ImageIcon,
};

function MediaCard({ item, talent }) {
  const Icon = mediaIcon[item.type];

  return (
    <article className="group overflow-hidden border border-white/[0.08] bg-white/[0.018] transition duration-300 hover:border-white/[0.16] hover:bg-white/[0.028]">
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
        <img
          src={talent.image}
          alt=""
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2 border border-white/10 bg-black/55 px-3 py-1.5 backdrop-blur-sm">
          <Icon size={12} className="text-amber-300" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/70">{item.type}</span>
        </div>
        {item.type === "Video" && (
          <span className="absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/45 backdrop-blur-sm">
            <Play size={13} fill="currentColor" className="ml-0.5 text-white" />
          </span>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-5">
          <div>
            <h3 className="text-lg font-medium tracking-tight text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/40">{item.description}</p>
          </div>
          <span className="shrink-0 pt-1 font-mono text-[10px] text-white/25">{item.year}</span>
        </div>
        <div className="mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-4 text-xs text-white/40">
          <Heart size={14} />
          <span>{item.likes} likes</span>
        </div>
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

  const filteredMedia = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return [...mediaSeed]
      .filter((item) => type === "All" || item.type === type)
      .filter((item) => !normalizedQuery || `${item.title} ${item.description}`.toLowerCase().includes(normalizedQuery))
      .sort((a, b) => sort === "Latest" ? b.year - a.year || b.id - a.id : a.year - b.year || a.id - b.id);
  }, [query, type, sort]);

  const visibleMedia = filteredMedia.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMedia.length;

  return (
    <section id="work" className="mt-32 scroll-mt-24">
      <div className="border-b border-white/[0.08] pb-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-amber-400">01 / My gallery</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">The work speaks first.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/40">
              Performances, recordings and moments from {talent.name}&apos;s professional work.
            </p>
          </div>
          <label className="group flex w-full max-w-sm items-center gap-3 border-b border-white/15 py-3 transition-colors focus-within:border-amber-400/60">
            <Search size={16} className="shrink-0 text-white/30 transition-colors group-focus-within:text-amber-300" />
            <input
              value={query}
              onChange={(event) => { setQuery(event.target.value); setVisibleCount(6); }}
              placeholder="Search media"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
            />
          </label>
        </div>

        <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {["All", "Video", "Audio", "Image"].map((option) => (
              <button
                key={option}
                onClick={() => { setType(option); setVisibleCount(6); }}
                className={`px-4 py-2 text-[10px] uppercase tracking-[0.18em] transition ${type === option ? "bg-amber-400 text-black" : "border border-white/10 text-white/45 hover:border-white/20 hover:text-white/75"}`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-white/35">
            <span className="uppercase tracking-[0.16em]">Sort</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(event) => { setSort(event.target.value); setVisibleCount(6); }}
                className="appearance-none border border-white/10 bg-[#0c0c0c] py-2 pl-3 pr-9 text-xs text-white/70 outline-none transition hover:border-white/20"
              >
                <option>Latest</option>
                <option>Oldest</option>
              </select>
              <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/35" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {visibleMedia.map((item) => <MediaCard key={item.id} item={item} talent={talent} />)}
      </div>

      {visibleMedia.length === 0 && (
        <div className="border-y border-white/[0.08] py-20 text-center">
          <p className="text-sm text-white/40">No media matches your search.</p>
        </div>
      )}

      <div className="mt-12 flex flex-col items-center gap-4">
        {hasMore && (
          <button
            onClick={() => setVisibleCount((count) => count + 6)}
            className="border border-white/15 px-7 py-3 text-[10px] uppercase tracking-[0.22em] text-white/60 transition hover:border-amber-400/50 hover:text-amber-200"
          >
            More
          </button>
        )}
        <label className="group inline-flex cursor-pointer items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/35 transition hover:text-amber-300">
          <Upload size={14} />
          Upload media
          <input
            type="file"
            accept="image/*,video/*,audio/*"
            className="sr-only"
            onChange={(event) => setUploadName(event.target.files?.[0]?.name || "")}
          />
        </label>
        {uploadName && <p className="text-xs text-white/30">Selected: {uploadName}</p>}
      </div>
    </section>
  );
}

function Experience({ talent }) {
  const experienceYears = Number.parseInt(talent.experience, 10) || 6;
  const currentYear = new Date().getFullYear();
  const entries = [
    {
      period: `${currentYear - 1} — Present`,
      title: talent.role || talent.craft,
      company: "Independent / Production Projects",
      description: `Working across ${talent.craft.toLowerCase()} projects for feature films, original productions and collaborative work.`,
    },
    {
      period: `${currentYear - Math.max(3, Math.floor(experienceYears * 0.65))} — ${currentYear - 1}`,
      title: talent.role || talent.craft,
      company: "Studio & Production Work",
      description: "Built a wider professional body of work through studio sessions, productions and live collaborations.",
    },
    {
      period: `${currentYear - experienceYears} — ${currentYear - Math.max(3, Math.floor(experienceYears * 0.65))}`,
      title: "Early professional work",
      company: "Independent",
      description: `Established a professional practice in ${talent.craft.toLowerCase()} and began building a consistent portfolio of work.`,
    },
  ];

  return (
    <section className="mt-32 scroll-mt-24" id="experience">
      <div className="border-b border-white/[0.08] pb-8">
        <p className="text-[10px] uppercase tracking-[0.32em] text-amber-400">02 / Experience</p>
        <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Professional experience.</h2>
      </div>

      <div className="mt-2">
        {entries.map((entry, index) => (
          <article key={`${entry.period}-${entry.title}`} className="grid gap-4 border-b border-white/[0.08] py-8 sm:grid-cols-[150px_1fr] sm:gap-10 sm:py-10">
            <p className="font-mono text-xs text-amber-300/75">{entry.period}</p>
            <div className="grid gap-3 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
              <div>
                <h3 className="text-xl font-medium tracking-tight">{entry.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/30">{entry.company}</p>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-white/40">{entry.description}</p>
            </div>
            <span className="hidden font-mono text-[9px] text-white/15 sm:block">0{index + 1}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Availability() {
  const [cursor, setCursor] = useState(() => new Date());
  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(cursor),
    [cursor],
  );

  const days = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const date = new Date(year, month, day);
      const weekday = date.getDay();
      const score = (day * 7 + weekday * 3) % 11;
      return { day, weekday, score };
    });
  }, [cursor]);

  const statusLabel = (score) => score >= 8 ? "Available" : score >= 5 ? "Limited" : "Booked";
  const statusClass = (score) => score >= 8
    ? "bg-amber-300/90 shadow-[0_0_12px_rgba(252,211,77,0.18)]"
    : score >= 5
      ? "bg-amber-300/35"
      : "bg-white/[0.08]";

  const shiftMonth = (offset) => setCursor((date) => new Date(date.getFullYear(), date.getMonth() + offset, 1));

  return (
    <section id="availability" className="mt-32 border-y border-white/[0.08] py-16 scroll-mt-24 sm:py-20">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-amber-400">03 / Availability</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Find an open window.</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/40">
            A quick visual read of when this talent is available for projects. Select a day to check its current status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => shiftMonth(-1)} aria-label="Previous month" className="grid h-10 w-10 place-items-center border border-white/10 text-white/45 transition hover:border-amber-400/40 hover:text-amber-200"><ChevronLeft size={16} /></button>
          <span className="min-w-32 text-center text-sm font-medium">{monthLabel}</span>
          <button onClick={() => shiftMonth(1)} aria-label="Next month" className="grid h-10 w-10 place-items-center border border-white/10 text-white/45 transition hover:border-amber-400/40 hover:text-amber-200"><ChevronRight size={16} /></button>
        </div>
      </div>

      <div className="mt-12 overflow-x-auto pb-2">
        <div className="min-w-[680px]">
          <div className="mb-3 grid grid-cols-7 gap-2 text-[9px] uppercase tracking-[0.16em] text-white/20">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day}>{day}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay() }).map((_, index) => <span key={`blank-${index}`} />)}
            {days.map(({ day, score }) => (
              <button
                key={day}
                title={`${monthLabel} ${day} — ${statusLabel(score)}`}
                className="group relative h-16 border border-white/[0.06] bg-white/[0.012] p-2 text-left transition hover:-translate-y-0.5 hover:border-amber-300/40 hover:bg-white/[0.025]"
              >
                <span className="font-mono text-[10px] text-white/35">{day}</span>
                <span className={`absolute bottom-2 left-2 right-2 h-1 ${statusClass(score)}`} />
                <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 whitespace-nowrap border border-white/10 bg-[#111] px-3 py-2 text-[9px] uppercase tracking-[0.12em] text-white/60 group-hover:block">
                  {statusLabel(score)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[9px] uppercase tracking-[0.16em] text-white/30">
        <span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-sm bg-amber-300/90" /> Available</span>
        <span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-sm bg-amber-300/35" /> Limited</span>
        <span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-sm bg-white/[0.08]" /> Booked</span>
      </div>
    </section>
  );
}

export default function TalentProfile() {
  const { talentId } = useParams();
  const talent = talents.find((item) => String(item.id) === talentId);

  if (!talent) {
    return (
      <div className="min-h-screen bg-[#090909] text-white">
        <Navbar />
        <main className="px-6 pb-24 pt-40">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400">Talent profile</p>
            <h1 className="mt-4 text-4xl font-bold">Profile not found</h1>
            <Link to="/talent" className="mt-8 inline-flex items-center gap-2 text-amber-400"><ArrowLeft size={16} /> Back to talent</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#090909] text-white">
      <Navbar />

      <main className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          <Link to={`/talent?craft=${encodeURIComponent(talent.craft)}`} className="inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-amber-400">
            <ArrowLeft size={16} /> Back to {talent.craft}
          </Link>

          {/* Opening frame — intentionally preserves the approved hero. */}
          <section className="mt-10 grid items-stretch gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="relative min-h-[560px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-neutral-900">
              <img src={talent.image} alt={talent.name} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              <span className="absolute bottom-6 left-6 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-black">{talent.availability}</span>
            </div>

            <div className="flex flex-col justify-center py-4 lg:py-10">
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400">{talent.craft}</p>
              <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">{talent.name}</h1>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-400">
                <span className="inline-flex items-center gap-2"><MapPin size={16} /> {talent.location}</span>
                <span className="inline-flex items-center gap-2"><Star size={16} className="text-amber-400" /> 4.9 rating</span>
                <span className="inline-flex items-center gap-2"><BriefcaseBusiness size={16} /> {talent.experience}</span>
              </div>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">{talent.bio}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {talent.genres.map((genre) => <span key={genre} className="rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">{genre}</span>)}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button className="inline-flex items-center gap-3">Hire Talent <ArrowRight size={18} /></Button>
                <Button variant="secondary" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" })}>View Portfolio</Button>
              </div>
            </div>
          </section>

          <Gallery talent={talent} />
          <Experience talent={talent} />
          <Availability />
        </div>
      </main>

      <Footer />
    </div>
  );
}
