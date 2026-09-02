import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Film,
  Image as ImageIcon,
  MapPin,
  Music2,
  Play,
  Star,
  Video,
  X,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Button from "../components/ui/Button";
import talents from "../data/talents";

const workItems = [
  { type: "video", title: "Featured Performance", project: "The Last Frame", year: "2025" },
  { type: "audio", title: "Original Soundtrack", project: "Project X", year: "2024" },
  { type: "image", title: "Live Performance", project: "Studio Sessions", year: "2024" },
  { type: "video", title: "Recent Production", project: "Midnight Stories", year: "2023" },
];

const experienceItems = [
  { year: "2025", title: "The Last Frame", role: "Playback Singer", kind: "Feature Film" },
  { year: "2024", title: "Project X", role: "Lead Vocalist", kind: "Original Soundtrack" },
  { year: "2023", title: "Midnight Stories", role: "Playback Singer", kind: "Feature Film" },
  { year: "2022", title: "Studio Sessions", role: "Vocalist", kind: "Live Production" },
];

const statusForDay = (day) => {
  if ([5, 12, 21, 27].includes(day)) return "booked";
  if ([8, 16, 24].includes(day)) return "partial";
  if ([3, 14, 19, 28].includes(day)) return "tentative";
  return "available";
};

const statusLabel = {
  available: "Available",
  partial: "Partially available",
  booked: "Working",
  tentative: "Tentative",
};

const statusDescription = {
  available: "Open for bookings",
  partial: "Available for part of the day",
  booked: "Already committed to a project",
  tentative: "Schedule is being held",
};

function getCalendarDays(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const leading = first.getDay();
  const total = last.getDate();
  const days = [];

  for (let i = 0; i < leading; i += 1) days.push(null);
  for (let day = 1; day <= total; day += 1) days.push(day);
  return days;
}

function MediaArtwork({ type, image }) {
  if (type === "image") {
    return <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />;
  }

  if (type === "audio") {
    return (
      <div className="absolute inset-0 flex flex-col justify-end bg-neutral-900 p-7">
        <div className="mb-10 flex items-end gap-1 opacity-80">
          {[18, 32, 24, 44, 29, 52, 34, 42, 25, 38, 20, 48, 30, 40, 23, 34, 18, 45, 28, 36].map((height, index) => (
            <span key={index} className="w-1 rounded-full bg-amber-400/70" style={{ height }} />
          ))}
        </div>
        <Music2 size={28} className="text-amber-400" />
      </div>
    );
  }

  return (
    <>
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-[1.03]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
    </>
  );
}

export default function TalentProfile() {
  const { talentId } = useParams();
  const talent = talents.find((item) => String(item.id) === talentId);
  const [monthDate, setMonthDate] = useState(new Date(2026, 8, 1));
  const [selectedDay, setSelectedDay] = useState(3);

  const days = useMemo(() => getCalendarDays(monthDate), [monthDate]);
  const monthName = monthDate.toLocaleString("en-US", { month: "long" });
  const selectedStatus = statusForDay(selectedDay);

  if (!talent) {
    return (
      <div className="min-h-screen bg-[#040404] text-white"><Navbar /><main className="px-6 pt-40 pb-24"><div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-neutral-950 p-10 text-center md:p-14"><p className="text-xs uppercase tracking-[0.35em] text-amber-400">Talent Profile</p><h1 className="mt-5 text-4xl font-black tracking-tight">Profile not found</h1><Link to="/talent" className="mt-8 inline-flex items-center gap-2 text-amber-400"><ArrowLeft size={16} /> Back to Talent Network</Link></div></main><Footer /></div>
    );
  }

  const previousMonth = () => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1));
  const nextMonth = () => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1));

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <Navbar />
      <main className="px-4 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-6xl">
          <Link to={`/talent?craft=${encodeURIComponent(talent.craft)}`} className="inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-amber-400"><ArrowLeft size={16} /> Back to {talent.craft}</Link>

          <section className="mt-8 grid overflow-hidden rounded-[2.5rem] border border-white/10 bg-neutral-950 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[520px] overflow-hidden bg-neutral-900"><img src={talent.image} alt={talent.name} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" /><span className="absolute bottom-6 left-6 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-black">{talent.availability}</span></div>
            <div className="flex flex-col justify-center p-8 sm:p-12 md:p-14"><p className="text-xs uppercase tracking-[0.35em] text-amber-400">{talent.craft}</p><h1 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">{talent.name}</h1><div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-400"><span className="inline-flex items-center gap-2"><MapPin size={16} /> {talent.location}</span><span className="inline-flex items-center gap-2"><Star size={16} className="text-amber-400" /> 4.9 rating</span><span className="inline-flex items-center gap-2"><BriefcaseBusiness size={16} /> {talent.experience}</span></div><p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400">{talent.bio}</p><div className="mt-8 flex flex-wrap gap-2">{talent.genres.map((genre) => <span key={genre} className="rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">{genre}</span>)}</div><div className="mt-10"><Button className="inline-flex items-center gap-3">Hire Talent <ArrowRight size={18} /></Button></div></div>
          </section>

          <section id="work" className="mt-28">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs uppercase tracking-[0.3em] text-amber-400">01 / Work</p><h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Selected work</h2></div><p className="max-w-md text-sm leading-relaxed text-neutral-500">A focused selection of work that gives you a sense of the talent behind the profile.</p></div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {workItems.map((item, index) => <article key={item.title} className={`${index === 0 ? "md:col-span-2" : ""} group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 ${index === 0 ? "aspect-[2.1/1]" : "aspect-[1.45/1]"}`}><MediaArtwork type={item.type} image={talent.image} /><div className="absolute inset-x-0 bottom-0 p-6 sm:p-8"><div className="flex items-end justify-between gap-5"><div><p className="text-xs uppercase tracking-[0.22em] text-amber-400">{item.year} · {item.project}</p><h3 className="mt-2 text-2xl font-semibold">{item.title}</h3></div><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-black/40 backdrop-blur"><Play size={15} fill="currentColor" /></span></div></div></article>)}
            </div>
          </section>

          <section className="mt-28 border-t border-white/10 pt-16">
            <div className="flex items-end justify-between gap-6"><div><p className="text-xs uppercase tracking-[0.3em] text-amber-400">At a glance</p><h2 className="mt-3 text-3xl font-bold">Experience in numbers</h2></div></div>
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 border-y border-white/10 py-8 sm:grid-cols-4"><div><p className="text-3xl font-semibold">{talent.experience.split(" ")[0]}</p><p className="mt-1 text-xs uppercase tracking-[0.18em] text-neutral-500">Years experience</p></div><div><p className="text-3xl font-semibold">42</p><p className="mt-1 text-xs uppercase tracking-[0.18em] text-neutral-500">Projects</p></div><div><p className="text-3xl font-semibold">18</p><p className="mt-1 text-xs uppercase tracking-[0.18em] text-neutral-500">Feature films</p></div><div><p className="text-3xl font-semibold">6</p><p className="mt-1 text-xs uppercase tracking-[0.18em] text-neutral-500">Languages</p></div></div>
          </section>

          <section className="mt-28">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs uppercase tracking-[0.3em] text-amber-400">02 / Experience</p><h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Selected credits</h2></div><p className="max-w-md text-sm text-neutral-500">A concise history of the projects that shaped the talent's work.</p></div>
            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">{experienceItems.map((item) => <div key={item.title} className="grid gap-4 py-7 sm:grid-cols-[100px_1fr_auto] sm:items-center"><p className="text-sm font-medium text-amber-400">{item.year}</p><div><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-1 text-sm text-neutral-500">{item.role} · {item.kind}</p></div><Film className="hidden text-neutral-700 sm:block" size={22} /></div>)}</div>
          </section>

          <section className="mt-28 border-t border-white/10 pt-16">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div><p className="text-xs uppercase tracking-[0.3em] text-amber-400">03 / Availability</p><h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Find a day to work together.</h2><p className="mt-5 max-w-md text-sm leading-7 text-neutral-500">See when {talent.name} is open for new projects. Select a date for the schedule details.</p><div className="mt-9 space-y-3 text-sm text-neutral-400"><p className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Available</p><p className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full border border-amber-400/70" /> Partially available</p><p className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-neutral-600" /> Working</p><p className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full border border-neutral-500" /> Tentative</p></div></div>
              <div className="rounded-3xl border border-white/10 bg-neutral-950 p-5 sm:p-7"><div className="flex items-center justify-between"><button type="button" onClick={previousMonth} aria-label="Previous month" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-neutral-400 transition hover:border-white/20 hover:text-white"><ChevronLeft size={18} /></button><div className="text-center"><p className="text-xs uppercase tracking-[0.2em] text-neutral-600">Availability</p><p className="mt-1 text-lg font-semibold">{monthName} {monthDate.getFullYear()}</p></div><button type="button" onClick={nextMonth} aria-label="Next month" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-neutral-400 transition hover:border-white/20 hover:text-white"><ChevronRight size={18} /></button></div>
                <div className="mt-7 grid grid-cols-7 text-center text-xs uppercase tracking-wider text-neutral-600">{["S","M","T","W","T","F","S"].map((day, index) => <span key={`${day}-${index}`} className="py-2">{day}</span>)}</div>
                <div className="grid grid-cols-7 gap-y-2 text-center">{days.map((day, index) => day ? <button type="button" key={day} onClick={() => setSelectedDay(day)} aria-label={`${monthName} ${day}, ${statusLabel[statusForDay(day)]}`} className={`relative mx-auto grid h-10 w-10 place-items-center rounded-full text-sm transition ${selectedDay === day ? "bg-amber-400 font-semibold text-black" : "text-neutral-300 hover:bg-white/5"}`}><span>{day}</span>{selectedDay !== day && <span className={`absolute bottom-1 h-1 w-1 rounded-full ${statusForDay(day) === "available" ? "bg-amber-400" : statusForDay(day) === "partial" ? "border border-amber-400" : statusForDay(day) === "booked" ? "bg-neutral-600" : "border border-neutral-500"}`} />}</button> : <span key={`empty-${index}`} className="h-10" />)}</div>
                <div className="mt-7 border-t border-white/10 pt-6"><div className="flex items-center gap-3"><CalendarDays size={17} className="text-amber-400" /><p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{monthName} {selectedDay}</p></div><div className="mt-3 flex items-end justify-between gap-5"><div><p className="text-xl font-semibold">{statusLabel[selectedStatus]}</p><p className="mt-1 text-sm text-neutral-500">{statusDescription[selectedStatus]}</p></div>{selectedStatus !== "booked" && <Button className="shrink-0">Hire Talent</Button>}</div></div>
              </div>
            </div>
          </section>

          <section className="mt-28 border-t border-white/10 pt-14"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm text-neutral-500">Ready to work with {talent.name}?</p><p className="mt-1 text-neutral-300">Start a conversation around your next production.</p></div><Button className="inline-flex shrink-0 items-center justify-center gap-3">Hire Talent <ArrowRight size={18} /></Button></div></section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
