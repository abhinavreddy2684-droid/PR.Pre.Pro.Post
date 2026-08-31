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
import { useEffect, useMemo, useRef, useState } from "react";

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

function WorkReel({ talent }) {
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);
  const drag = useRef(null);
  const frameHeight = 235;
  const cycleHeight = portfolioItems.length * frameHeight;

  const updatePull = (clientY) => {
    if (!drag.current) return;
    const delta = clientY - drag.current.y;
    const nextOffset = drag.current.offset + delta;

    setOffset(nextOffset);

    // Every frame-height of film pulled through the gate reveals the next work.
    const travelled = Math.floor(Math.abs(delta) / frameHeight);
    const direction = delta >= 0 ? -1 : 1;
    const next = ((drag.current.index + direction * travelled) % portfolioItems.length + portfolioItems.length) % portfolioItems.length;
    setActive(next);
  };

  return (
    <section id="work" className="relative mt-32 scroll-mt-24">
      <div className="flex flex-col gap-6 border-b border-white/[0.08] pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-amber-400">01 / Work reel</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Pull the film.<br />Reveal the work.</h2>
        </div>
        <p className="max-w-xs text-sm leading-6 text-white/40">A physical film-strip interaction. Pull downward and let each frame pass through the viewing gate.</p>
      </div>

      <div className="relative mt-10 min-h-[760px] overflow-hidden border-y border-white/[0.08] bg-[radial-gradient(circle_at_50%_18%,rgba(245,158,11,0.09),transparent_30%)]">
        {/* The reel head: decorative, but clearly establishes the cinema language. */}
        <div className="pointer-events-none absolute left-1/2 top-[-155px] h-[330px] w-[330px] -translate-x-1/2 rounded-full border-[14px] border-white/[0.09] bg-[#0c0c0c] shadow-[0_0_90px_rgba(245,158,11,0.08)]">
          <div className="absolute inset-8 rounded-full border border-amber-300/20" />
          <div className="absolute inset-16 rounded-full border border-white/[0.08]" />
          <div className="absolute inset-[115px] rounded-full border border-amber-300/35 bg-[#090909]" />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <span
              key={angle}
              className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08] bg-[#090909]"
              style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-96px)` }}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute left-1/2 top-[125px] h-12 w-[210px] -translate-x-1/2 border-x border-white/[0.1] bg-[#090909]" />

        {/* Pull handle and film strip */}
        <div
          className="absolute inset-x-0 bottom-0 top-[125px] cursor-grab select-none touch-none active:cursor-grabbing"
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            drag.current = { y: event.clientY, offset, index: active };
          }}
          onPointerMove={(event) => updatePull(event.clientY)}
          onPointerUp={() => { drag.current = null; }}
          onPointerCancel={() => { drag.current = null; }}
        >
          <div className="absolute left-1/2 top-0 h-full w-[290px] -translate-x-1/2 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-6 bg-[#080808]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-6 bg-[#080808]" />

            <div
              className="absolute left-1/2 w-[270px] -translate-x-1/2 transition-transform duration-75 ease-linear"
              style={{ transform: `translateX(-50%) translateY(${((offset % cycleHeight) + cycleHeight) % cycleHeight - cycleHeight}px)` }}
            >
              {[...portfolioItems, ...portfolioItems].map((item, index) => {
                const originalIndex = index % portfolioItems.length;
                const isActive = originalIndex === active;
                return (
                  <div key={`${index}-${item.title}`} className="relative h-[235px] border-b border-black bg-[#111] px-6 py-4">
                    {/* sprocket holes */}
                    <div className="absolute inset-y-0 left-1 flex flex-col justify-around py-2">
                      {Array.from({ length: 6 }).map((_, hole) => <span key={hole} className="h-5 w-3 rounded-[2px] bg-[#090909] ring-1 ring-white/[0.04]" />)}
                    </div>
                    <div className="absolute inset-y-0 right-1 flex flex-col justify-around py-2">
                      {Array.from({ length: 6 }).map((_, hole) => <span key={hole} className="h-5 w-3 rounded-[2px] bg-[#090909] ring-1 ring-white/[0.04]" />)}
                    </div>

                    <div className={`relative h-full overflow-hidden border transition-all duration-300 ${isActive ? "border-amber-300/80 shadow-[0_0_35px_rgba(245,158,11,0.16)]" : "border-white/[0.12]"}`}>
                      <img src={talent.image} alt="" draggable={false} className={`h-full w-full object-cover transition-all duration-500 ${isActive ? "scale-100 opacity-100" : "scale-95 opacity-55 grayscale-[0.25]"}`} />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/15" />
                      <span className="absolute left-3 top-3 font-mono text-[9px] tracking-[0.18em] text-white/45">FRAME {String(originalIndex + 1).padStart(2, "0")}</span>
                      <div className="absolute inset-x-4 bottom-4">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-amber-200/80">{item.year} / {item.type}</p>
                        <p className="mt-1 text-lg font-medium">{item.title}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Viewing gate: the one frame currently being revealed. */}
            <div className="pointer-events-none absolute inset-x-3 top-1/2 z-40 h-[235px] -translate-y-1/2 border border-amber-300/70 shadow-[0_0_0_2px_rgba(9,9,9,0.9),0_0_45px_rgba(245,158,11,0.12)]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-[#090909] px-4 py-2 text-[9px] uppercase tracking-[0.22em] text-amber-200">Viewing gate</div>
          </div>

          <div className="absolute bottom-8 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-3">
            <span className="h-10 w-16 rounded-b-full border border-amber-300/45 border-t-0 bg-[#111] shadow-[0_10px_25px_rgba(0,0,0,0.4)]" />
            <span className="text-[9px] uppercase tracking-[0.28em] text-white/40">Pull down to advance</span>
            <span className="text-lg text-amber-300">↓</span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-[#090909] to-transparent" />

        <div className="pointer-events-none absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
          <p className="text-[9px] uppercase tracking-[0.28em] text-white/25">Now showing</p>
          <p className="mt-3 text-2xl font-medium">{portfolioItems[active].title}</p>
          <p className="mt-1 text-sm text-white/40">{portfolioItems[active].role}</p>
        </div>

        <div className="pointer-events-none absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 text-right lg:block">
          <p className="font-mono text-[11px] text-amber-300/70">{String(active + 1).padStart(2, "0")} / {String(portfolioItems.length).padStart(2, "0")}</p>
          <p className="mt-3 max-w-[170px] text-xs leading-6 text-white/30">Pull the physical strip, not a carousel.</p>
        </div>
      </div>
    </section>
  );
}

function CreditRoll({ credits }) {
  const repeated = [...credits, ...credits, ...credits];
  return (
    <section className="mt-28 border-y border-white/[0.08] py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-amber-400">02 / Credit roll</p>
          <h2 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">Selected<br /><span className="text-white/30">Credits</span></h2>
          <p className="mt-7 max-w-xs text-sm leading-6 text-white/40">A living credit roll that keeps moving while the work behind it stays in view.</p>
        </div>
        <div className="relative h-[430px] overflow-hidden border-y border-white/[0.08] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
          <div className="credit-roll">
            {repeated.map((credit, index) => (
              <article key={`${index}-${credit.year}-${credit.title}`} className="grid gap-3 border-b border-white/[0.08] py-7 sm:grid-cols-[90px_1fr_auto] sm:items-center">
                <p className="font-mono text-sm text-amber-300/80">{credit.year}</p>
                <div>
                  <h3 className="text-xl font-medium">{credit.title}</h3>
                  <p className="mt-1 text-sm text-white/35">{credit.role}</p>
                </div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">{credit.format}</p>
              </article>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-amber-300/70 shadow-[0_0_18px_rgba(252,211,77,0.35)]" />
        </div>
      </div>
    </section>
  );
}

function ExperienceTimeline({ milestones }) {
  const [visible, setVisible] = useState([]);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setVisible((current) => current.includes(index) ? current : [...current, index]);
        }
      });
    }, { threshold: 0.35 });

    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative mt-28">
      <div className="absolute left-0 top-0 h-px w-28 bg-amber-400/70" />
      <div className="pt-10">
        <p className="text-[10px] uppercase tracking-[0.32em] text-amber-400">04 / The journey</p>
        <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Moments fall into place and become a career.</h2>
      </div>

      <div className="relative mt-16">
        <div className="absolute bottom-0 left-[18px] top-0 w-px bg-gradient-to-b from-amber-400/60 via-white/15 to-transparent md:left-1/2" />
        {milestones.map((milestone, index) => {
          const show = visible.includes(index);
          return (
            <article
              key={milestone.year}
              ref={(node) => { refs.current[index] = node; }}
              data-index={index}
              className={`relative grid gap-5 py-16 transition-all duration-1000 md:grid-cols-[1fr_80px_1fr] md:items-center ${show ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"}`}
            >
              <div className={index % 2 === 0 ? "md:text-right md:pr-12" : "md:order-3 md:pl-12"}>
                <h3 className="text-2xl font-medium">{milestone.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/40">{milestone.copy}</p>
              </div>
              <div className="relative z-10 flex h-10 items-center justify-center md:order-2">
                <span className={`h-4 w-4 rounded-full border border-amber-300 bg-[#090909] transition-all duration-700 ${show ? "scale-100 shadow-[0_0_28px_rgba(252,211,77,0.55)]" : "scale-0"}`} />
              </div>
              <p className={`font-mono text-lg text-amber-300/80 ${index % 2 === 0 ? "md:pl-12" : "md:order-1 md:pr-12 md:text-right"}`}>{milestone.year}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

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

      <style>{`\n        @keyframes creditRoll { from { transform: translateY(0); } to { transform: translateY(-33.333%); } }\n        .credit-roll { animation: creditRoll 18s linear infinite; }\n        .credit-roll:hover { animation-play-state: paused; }\n      `}</style>\n\n      <main className="px-6 pb-24 pt-32">
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

          <WorkReel talent={talent} />\n\n          <CreditRoll credits={credits} />\n\n          {/* Dossier — production-document language instead of a profile card. */}
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

          <ExperienceTimeline milestones={milestones} />\n\n          <ProductionSchedule talent={talent} />

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
