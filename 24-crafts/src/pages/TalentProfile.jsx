import {
  ArrowLeft,
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Film,
  MapPin,
  Play,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Button from "../components/ui/Button";
import talents from "../data/talents";

const portfolioItems = [
  { title: "Featured work", role: "Lead performance", type: "Featured" },
  { title: "Studio session", role: "Studio artist", type: "Session" },
  { title: "Live performance", role: "Live performer", type: "Performance" },
  { title: "Recent production", role: "Featured talent", type: "Production" },
];

function getProfileContent(talent) {
  const years = Number.parseInt(talent.experience, 10) || 6;
  const currentYear = 2026;

  return {
    credits: [
      {
        year: currentYear,
        title: "Recent screen production",
        role: talent.role || talent.craft,
        format: "Feature / Production",
      },
      {
        year: currentYear - 1,
        title: "Independent collaboration",
        role: talent.craft,
        format: "Selected credit",
      },
      {
        year: currentYear - 2,
        title: "Studio & commercial work",
        role: talent.role || talent.craft,
        format: "Professional credit",
      },
    ],
    milestones: [
      {
        year: currentYear - years,
        title: "Professional journey begins",
        copy: `Started building a focused practice in ${talent.craft.toLowerCase()}.`,
      },
      {
        year: currentYear - Math.max(1, Math.floor(years * 0.55)),
        title: "Expanded the body of work",
        copy: "Developed experience across collaborative, studio and production environments.",
      },
      {
        year: currentYear,
        title: "Active in the Talent Network",
        copy: "Available for the right projects and creative collaborations.",
      },
    ],
  };
}

function AvailabilityCalendar({ talent }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(today);

  const statusForDay = (day) => {
    if (day < today.getDate()) return "past";
    if (talent.availability !== "Available") return day % 5 === 0 ? "limited" : "booked";
    if (day % 9 === 0 || day % 13 === 0) return "booked";
    if (day % 5 === 0) return "limited";
    return "available";
  };

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 sm:p-7">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="uppercase tracking-[0.28em] text-[10px] text-amber-400">Availability</p>
          <h3 className="mt-2 text-2xl font-semibold">Production calendar</h3>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-full border border-amber-400/20 bg-amber-500/[0.06] text-amber-300">
          <CalendarDays size={18} />
        </span>
      </div>

      <div className="mt-6 rounded-[1.4rem] border border-white/[0.07] bg-black/20 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-white/90">{monthLabel}</p>
          <span className="rounded-full border border-amber-400/20 bg-amber-500/[0.07] px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-amber-300">
            {talent.availability}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-1.5 text-center">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <span key={`${day}-${index}`} className="pb-1 text-[9px] uppercase text-white/25">
              {day}
            </span>
          ))}

          {Array.from({ length: firstDay }).map((_, index) => (
            <span key={`blank-${index}`} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const status = statusForDay(day);
            const isToday = day === today.getDate();

            return (
              <span
                key={day}
                className={`grid aspect-square place-items-center rounded-lg border text-[10px] transition-colors ${
                  status === "available"
                    ? "border-amber-400/35 bg-amber-400/[0.09] text-amber-200"
                    : status === "limited"
                      ? "border-white/20 bg-white/[0.04] text-white/70"
                      : status === "booked"
                        ? "border-transparent bg-white/[0.025] text-white/20 line-through"
                        : "border-transparent text-white/15"
                } ${isToday ? "ring-1 ring-amber-300/80" : ""}`}
              >
                {day}
              </span>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-white/35">
        <span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-amber-300" /> Available</span>
        <span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full border border-white/40" /> Limited</span>
        <span className="inline-flex items-center gap-2"><i className="h-px w-2 bg-white/20" /> Booked</span>
      </div>
    </section>
  );
}

function ProfessionalSnapshot({ talent }) {
  const items = [
    ["Primary craft", talent.craft],
    ["Specialties", talent.role || talent.genres.join(" · ")],
    ["Based in", talent.location],
    ["Experience", talent.experience],
  ];

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 sm:p-7">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="uppercase tracking-[0.28em] text-[10px] text-amber-400">Professional profile</p>
          <h3 className="mt-2 text-2xl font-semibold">At a glance</h3>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/60">
          <Award size={18} />
        </span>
      </div>

      <div className="mt-7 grid gap-3">
        {items.map(([label, value], index) => (
          <div key={label} className="group flex items-center justify-between gap-5 rounded-2xl border border-white/[0.06] bg-black/10 px-4 py-4 transition-colors hover:border-amber-400/20">
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/30">{label}</span>
            <span className={`text-right text-sm ${index === 0 ? "font-medium text-white" : "text-white/70"}`}>{value}</span>
          </div>
        ))}
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
        <main className="pt-40 pb-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-amber-400 uppercase tracking-[0.3em] text-xs">Talent profile</p>
            <h1 className="mt-4 text-4xl font-bold">Profile not found</h1>
            <Link to="/talent" className="inline-flex mt-8 items-center gap-2 text-amber-400">
              <ArrowLeft size={16} /> Back to talent
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { credits, milestones } = getProfileContent(talent);

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <Navbar />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            to={`/talent?craft=${encodeURIComponent(talent.craft)}`}
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to {talent.craft}
          </Link>

          {/* Hero intentionally retained as the established talent-profile visual. */}
          <section className="mt-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-stretch">
            <div className="relative min-h-[560px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-neutral-900">
              <img src={talent.image} alt={talent.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              <span className="absolute left-6 bottom-6 px-4 py-2 rounded-full bg-amber-400 text-black text-xs font-bold uppercase tracking-[0.16em]">
                {talent.availability}
              </span>
            </div>

            <div className="flex flex-col justify-center py-4 lg:py-10">
              <p className="uppercase tracking-[0.35em] text-xs text-amber-400">{talent.craft}</p>
              <h1 className="mt-5 text-5xl md:text-7xl font-black tracking-tight">{talent.name}</h1>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-400">
                <span className="inline-flex items-center gap-2"><MapPin size={16} /> {talent.location}</span>
                <span className="inline-flex items-center gap-2"><Star size={16} className="text-amber-400" /> 4.9 rating</span>
                <span className="inline-flex items-center gap-2"><BriefcaseBusiness size={16} /> {talent.experience}</span>
              </div>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">{talent.bio}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {talent.genres.map((genre) => (
                  <span key={genre} className="rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
                    {genre}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button className="inline-flex items-center gap-3">
                  Hire Talent
                  <ArrowRight size={18} />
                </Button>
                <Button variant="secondary" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                  View Portfolio
                </Button>
              </div>
            </div>
          </section>

          {/* Editorial portfolio — work is the visual proof of the profile. */}
          <section id="work" className="mt-24 scroll-mt-24">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="uppercase tracking-[0.28em] text-[10px] text-amber-400">Portfolio</p>
                <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">Selected work</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-neutral-500 sm:text-right">A focused selection of work that gives context to the talent behind the profile.</p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-12">
              {portfolioItems.map((item, index) => {
                const featured = index === 0;
                return (
                  <article
                    key={item.title}
                    className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950 ${
                      featured ? "min-h-[430px] lg:col-span-7" : "min-h-[205px] lg:col-span-5"
                    }`}
                  >
                    <img
                      src={talent.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-black/10" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <div className="flex items-end justify-between gap-5">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.24em] text-amber-300/75">{item.type}</p>
                          <h3 className={`mt-2 font-semibold ${featured ? "text-3xl" : "text-xl"}`}>{item.title}</h3>
                          <p className="mt-1 text-sm text-white/45">{item.role}</p>
                        </div>
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-black transition-transform group-hover:scale-105">
                          <Play size={15} fill="currentColor" />
                        </span>
                      </div>
                    </div>
                    {featured && (
                      <span className="absolute right-6 top-6 rounded-full border border-amber-300/20 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-amber-200 backdrop-blur-md">
                        Featured
                      </span>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          {/* Professional proof and hiring context. */}
          <section className="mt-24 grid gap-8 xl:grid-cols-[1.35fr_0.65fr]">
            <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="uppercase tracking-[0.28em] text-[10px] text-amber-400">Selected credits</p>
                  <h2 className="mt-3 text-3xl font-semibold">The work behind the name</h2>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-amber-400/20 bg-amber-500/[0.06] text-amber-300">
                  <Film size={19} />
                </span>
              </div>

              <div className="mt-8 divide-y divide-white/[0.07]">
                {credits.map((credit, index) => (
                  <article key={`${credit.year}-${credit.title}`} className="group grid gap-4 py-6 first:pt-0 sm:grid-cols-[90px_1fr_auto] sm:items-center">
                    <p className="font-mono text-sm text-amber-300/75">{credit.year}</p>
                    <div>
                      <h3 className="text-lg font-medium text-white transition-colors group-hover:text-amber-200">{credit.title}</h3>
                      <p className="mt-1 text-sm text-white/40">{credit.role}</p>
                    </div>
                    <span className="text-xs text-white/30 sm:text-right">{credit.format}</span>
                    {index < credits.length - 1 && <span className="hidden" />}
                  </article>
                ))}
              </div>
            </section>

            <ProfessionalSnapshot talent={talent} />
          </section>

          <section className="mt-8 grid gap-8 xl:grid-cols-[1.35fr_0.65fr]">
            <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-500/[0.055] via-white/[0.02] to-transparent p-6 sm:p-8">
              <div className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-amber-400/[0.08]" />
              <div className="relative">
                <p className="uppercase tracking-[0.28em] text-[10px] text-amber-400">Experience</p>
                <h2 className="mt-3 text-3xl font-semibold">The journey so far</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
                  A concise view of the professional path behind {talent.name}.
                </p>

                <div className="mt-9 space-y-0">
                  {milestones.map((milestone, index) => (
                    <article key={milestone.year} className="relative grid gap-4 border-l border-amber-400/20 py-6 pl-7 first:pt-0 last:pb-0 sm:grid-cols-[100px_1fr]">
                      <span className="absolute -left-[5px] top-7 h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_16px_rgba(252,211,77,0.45)] first:top-1" />
                      <p className="text-sm font-medium text-amber-200/80">{milestone.year}</p>
                      <div>
                        <h3 className="text-lg font-medium">{milestone.title}</h3>
                        <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">{milestone.copy}</p>
                      </div>
                      {index === 0 && <span className="sr-only">Journey begins</span>}
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <AvailabilityCalendar talent={talent} />
          </section>

          <section className="mt-10 flex flex-col gap-5 rounded-[2rem] border border-amber-400/15 bg-amber-500/[0.045] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <p className="uppercase tracking-[0.25em] text-[10px] text-amber-300">Ready to collaborate?</p>
              <h2 className="mt-3 text-2xl font-semibold">Bring {talent.name} into your next production.</h2>
            </div>
            <Button className="inline-flex shrink-0 items-center justify-center gap-3">
              Start a conversation <ArrowRight size={17} />
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
