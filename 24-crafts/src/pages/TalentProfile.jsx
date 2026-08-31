import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Play,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Button from "../components/ui/Button";
import talents from "../data/talents";

const portfolioItems = [
  { title: "Featured work", role: "Lead performance", type: "Featured", year: "2026" },
  { title: "Studio session", role: "Studio artist", type: "Session", year: "2025" },
  { title: "Live performance", role: "Live performer", type: "Performance", year: "2025" },
  { title: "Recent production", role: "Featured talent", type: "Production", year: "2024" },
];

function getProfileContent(talent) {
  const years = Number.parseInt(talent.experience, 10) || 6;
  const currentYear = 2026;

  return {
    credits: [
      { year: currentYear, title: "Recent screen production", role: talent.role || talent.craft, format: "Feature / Production" },
      { year: currentYear - 1, title: "Independent collaboration", role: talent.craft, format: "Selected credit" },
      { year: currentYear - 2, title: "Studio & commercial work", role: talent.role || talent.craft, format: "Professional credit" },
    ],
    milestones: [
      { year: currentYear - years, title: "The first frame", copy: `Started building a focused professional practice in ${talent.craft.toLowerCase()}.` },
      { year: currentYear - Math.max(1, Math.floor(years * 0.55)), title: "The frame expands", copy: "Developed a broader body of work across collaborative, studio and production environments." },
      { year: currentYear, title: "The next story", copy: "Active in the Talent Network and available for the right projects and creative collaborations." },
    ],
  };
}

function ProductionSchedule({ talent }) {
  const [cursor, setCursor] = useState(() => new Date());
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(cursor),
    [cursor],
  );

  const statusForDay = (day) => {
    if (isCurrentMonth && day < today.getDate()) return "past";
    if (talent.availability !== "Available") return day % 5 === 0 ? "limited" : "booked";
    if (day % 9 === 0 || day % 13 === 0) return "booked";
    if (day % 5 === 0) return "limited";
    return "available";
  };

  const shiftMonth = (offset) => setCursor((date) => new Date(date.getFullYear(), date.getMonth() + offset, 1));

  return (
    <section className="relative mt-28 border-y border-white/[0.08] py-12 sm:py-16">
      <div className="absolute left-0 top-0 h-px w-32 bg-amber-400/70" />
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-amber-400">05 / Production schedule</p>
          <h2 className="mt-5 max-w-md text-4xl font-semibold tracking-tight sm:text-5xl">Know when the next scene can begin.</h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/45">
            A simple day-by-day view of availability, designed around the rhythm of production rather than a generic booking interface.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3 text-[10px] uppercase tracking-[0.14em] text-white/45">
            <span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.45)]" /> Available</span>
            <span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full border border-white/45" /> Limited</span>
            <span className="inline-flex items-center gap-2"><i className="h-px w-3 bg-white/25" /> Booked</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
            <div className="flex items-center gap-3">
              <CalendarDays size={17} className="text-amber-300" />
              <p className="text-lg font-medium tracking-wide">{monthLabel}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => shiftMonth(-1)} aria-label="Previous month" className="grid h-10 w-10 place-items-center border border-white/10 text-white/50 transition hover:border-amber-400/40 hover:text-amber-200"><ChevronLeft size={16} /></button>
              <button onClick={() => shiftMonth(1)} aria-label="Next month" className="grid h-10 w-10 place-items-center border border-white/10 text-white/50 transition hover:border-amber-400/40 hover:text-amber-200"><ChevronRight size={16} /></button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-x-2 gap-y-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <span key={`${day}-${index}`} className="pb-2 text-center text-[9px] uppercase tracking-[0.15em] text-white/25">{day}</span>
            ))}
            {Array.from({ length: firstDay }).map((_, index) => <span key={`blank-${index}`} />)}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const status = statusForDay(day);
              const isToday = isCurrentMonth && day === today.getDate();
              return (
                <div
                  key={day}
                  className={`group relative flex min-h-14 flex-col justify-between border-t px-2 pt-2 transition-colors sm:min-h-16 sm:px-3 ${
                    status === "available" ? "border-amber-400/40 bg-amber-400/[0.045]" :
                    status === "limited" ? "border-white/20 bg-white/[0.018]" :
                    status === "booked" ? "border-white/[0.07] bg-white/[0.008]" :
                    "border-white/[0.04]"
                  } ${isToday ? "border-t-amber-200 bg-amber-400/[0.09]" : ""}`}
                >
                  <span className={`text-xs ${status === "past" || status === "booked" ? "text-white/25" : "text-white/80"}`}>{day}</span>
                  <span className={`mb-2 h-1 w-full ${status === "available" ? "bg-amber-300/85" : status === "limited" ? "border border-white/35" : status === "booked" ? "bg-white/10" : "bg-transparent"}`} />
                  {isToday && <span className="absolute right-2 top-2 text-[8px] uppercase tracking-widest text-amber-300">Today</span>}
                </div>
              );
            })}
          </div>
        </div>
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

  const { credits, milestones } = getProfileContent(talent);

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

          {/* Work sequence — projects behave as frames in an edit, not a card grid. */}
          <section id="work" className="relative mt-32 scroll-mt-24">
            <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-amber-400/60 via-white/[0.08] to-transparent lg:block" />
            <div className="pl-0 lg:pl-10">
              <div className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-8 md:flex-row md:items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-amber-400">01 / Opening sequence</p>
                  <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">The work speaks<br />before the words.</h2>
                </div>
                <p className="max-w-xs text-sm leading-6 text-white/40">A sequence of frames from the work that gives this profile its real voice.</p>
              </div>

              <div className="mt-10">
                {portfolioItems.map((item, index) => (
                  <article key={item.title} className="group relative grid gap-0 border-b border-white/[0.08] py-7 lg:grid-cols-[90px_1fr_0.9fr] lg:items-center lg:py-10">
                    <div className="flex items-center gap-4 lg:block">
                      <span className="font-mono text-sm text-amber-300/80">0{index + 1}</span>
                      <span className="lg:mt-3 block text-[9px] uppercase tracking-[0.18em] text-white/25">{item.year}</span>
                    </div>
                    <div className="relative min-h-[230px] overflow-hidden border border-white/[0.09] bg-neutral-950 sm:min-h-[300px]">
                      <img src={talent.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-85" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <span className="absolute left-5 top-5 border border-white/10 bg-black/35 px-3 py-2 text-[9px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm">{item.type}</span>
                      <button aria-label={`Play ${item.title}`} className="absolute bottom-5 left-5 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white text-black transition-transform group-hover:scale-110"><Play size={15} fill="currentColor" /></button>
                    </div>
                    <div className="flex flex-col justify-center py-6 lg:px-10">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-amber-300/65">{item.role}</p>
                      <h3 className="mt-3 text-2xl font-medium transition-colors group-hover:text-amber-100 sm:text-3xl">{item.title}</h3>
                      <div className="mt-6 flex items-center gap-3 text-xs text-white/35">
                        <span className="h-px w-8 bg-amber-400/50" /> View frame
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Credit roll — continuous editorial metadata. */}
          <section className="mt-28 border-y border-white/[0.08] py-16 sm:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-amber-400">02 / Credit roll</p>
                <h2 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">Selected<br /><span className="text-white/30">Credits</span></h2>
              </div>
              <div className="border-t border-white/[0.08]">
                {credits.map((credit) => (
                  <article key={`${credit.year}-${credit.title}`} className="group grid gap-4 border-b border-white/[0.08] py-7 transition-colors hover:border-amber-400/35 sm:grid-cols-[90px_1fr_auto] sm:items-center">
                    <p className="font-mono text-sm text-amber-300/80">{credit.year}</p>
                    <div>
                      <h3 className="text-xl font-medium transition-colors group-hover:text-amber-100">{credit.title}</h3>
                      <p className="mt-1 text-sm text-white/35">{credit.role}</p>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">{credit.format}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Dossier — production-document language instead of a profile card. */}
          <section className="mt-28">
            <div className="flex items-end justify-between gap-8 border-b border-white/[0.08] pb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-amber-400">03 / Talent dossier</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">The professional details.</h2>
              </div>
              <span className="hidden text-[9px] uppercase tracking-[0.24em] text-white/25 sm:block">Pre Pro Post / Talent file</span>
            </div>

            <div className="mt-2">
              {[
                ["Primary craft", talent.craft],
                ["Specialties", talent.role || talent.genres.join(" · ")],
                ["Based in", talent.location],
                ["Experience", talent.experience],
                ["Network status", talent.availability],
              ].map(([label, value], index) => (
                <div key={label} className="grid border-b border-white/[0.08] py-6 transition-colors hover:bg-white/[0.018] sm:grid-cols-[80px_0.8fr_1.2fr] sm:items-baseline sm:gap-6 sm:px-5">
                  <span className="font-mono text-[10px] text-amber-300/70">0{index + 1}</span>
                  <span className="mt-2 text-[9px] uppercase tracking-[0.22em] text-white/30 sm:mt-0">{label}</span>
                  <span className="mt-3 text-xl font-medium text-white/90 sm:mt-0 sm:text-2xl">{value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Journey — scroll-like progression without enclosing UI. */}
          <section className="relative mt-28">
            <div className="absolute left-0 top-0 h-px w-28 bg-amber-400/70" />
            <div className="pt-10">
              <p className="text-[10px] uppercase tracking-[0.32em] text-amber-400">04 / The journey</p>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Every body of work has a beginning, a build and what comes next.</h2>
            </div>

            <div className="mt-16">
              {milestones.map((milestone, index) => (
                <article key={milestone.year} className="group relative grid gap-5 border-t border-white/[0.08] py-10 md:grid-cols-[0.55fr_0.45fr_1fr] md:items-start">
                  <span className="absolute left-0 top-0 h-px w-14 bg-amber-300 opacity-0 transition-opacity group-hover:opacity-100" />
                  <p className="font-mono text-lg text-amber-300/80">{milestone.year}</p>
                  <h3 className="text-2xl font-medium">{milestone.title}</h3>
                  <p className="max-w-xl text-sm leading-7 text-white/40">{milestone.copy}</p>
                  <span className="absolute right-0 top-10 hidden text-[10px] text-white/15 md:block">0{index + 1}</span>
                </article>
              ))}
            </div>
          </section>

          <ProductionSchedule talent={talent} />

          {/* Final frame — deliberately minimal, not another CTA card. */}
          <section className="relative mt-28 min-h-[440px] overflow-hidden border-y border-white/[0.08]">
            <img src={talent.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.12] grayscale" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/90 to-[#090909]/65" />
            <div className="relative flex min-h-[440px] flex-col items-center justify-center px-6 text-center">
              <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400">Final frame</p>
              <h2 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight sm:text-7xl">Ready for the next story?</h2>
              <p className="mt-5 text-sm uppercase tracking-[0.24em] text-white/45">{talent.name} / {talent.craft}</p>
              <Button className="mt-10 inline-flex items-center gap-3">Start a conversation <ArrowRight size={17} /></Button>
              <p className="mt-12 text-[9px] uppercase tracking-[0.32em] text-white/20">Pre Pro Post / End of profile</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
