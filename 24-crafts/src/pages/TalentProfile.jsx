import { ArrowLeft, ArrowRight, BriefcaseBusiness, MapPin, Play, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Button from "../components/ui/Button";
import MediaButton from "../components/ui/MediaButton";
import talents from "../data/talents";

const portfolioItems = [
  "Featured work",
  "Studio session",
  "Live performance",
  "Recent production",
];

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
                <Button variant="secondary" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}>
                  View Portfolio
                </Button>
              </div>
            </div>
          </section>

          <section className="mt-20 grid lg:grid-cols-[1.45fr_0.55fr] gap-8 items-start">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <p className="uppercase tracking-[0.25em] text-xs text-amber-400">Portfolio</p>
                  <h2 className="mt-3 text-3xl md:text-4xl font-bold">Selected work</h2>
                </div>
                <p className="text-sm text-neutral-500">A glimpse into the work behind the profile.</p>
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-5">
                {portfolioItems.map((item) => (
                  <MediaButton key={item} className="aspect-video">
                    <img src={talent.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <span className="absolute left-4 bottom-4 flex items-center gap-3 text-sm font-medium">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-black">
                        <Play size={14} fill="currentColor" />
                      </span>
                      {item}
                    </span>
                  </MediaButton>
                ))}
              </div>
            </div>

            <aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
              <p className="uppercase tracking-[0.25em] text-xs text-amber-400">Profile details</p>
              <div className="mt-8 space-y-7">
                <div>
                  <p className="text-xs text-neutral-600 uppercase tracking-[0.18em]">Craft</p>
                  <p className="mt-2 text-neutral-200">{talent.craft}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600 uppercase tracking-[0.18em]">Specialty</p>
                  <p className="mt-2 text-neutral-200">{talent.role || talent.genres.join(" · ")}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600 uppercase tracking-[0.18em]">Location</p>
                  <p className="mt-2 text-neutral-200">{talent.location}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600 uppercase tracking-[0.18em]">Experience</p>
                  <p className="mt-2 text-neutral-200">{talent.experience}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600 uppercase tracking-[0.18em]">Availability</p>
                  <p className="mt-2 text-neutral-200">{talent.availability}</p>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
