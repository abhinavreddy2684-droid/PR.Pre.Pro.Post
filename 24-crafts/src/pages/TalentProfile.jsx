import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
  Play,
  Star,
  X,
} from "lucide-react";
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
      <div className="min-h-screen bg-[#040404] text-white">
        <Navbar />
        <main className="px-6 pt-40 pb-24">
          <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-neutral-950 p-10 text-center md:p-14">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-400">Talent Profile</p>
            <h1 className="mt-5 text-4xl font-black tracking-tight">Profile not found</h1>
            <Link
              to="/talent"
              className="mt-8 inline-flex items-center gap-2 text-amber-400 transition-colors hover:text-amber-300"
            >
              <ArrowLeft size={16} /> Back to Talent Network
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      <Navbar />

      <main className="relative overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.07),transparent_38%)]" />

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-neutral-950">
          {/* Header */}
          <section className="relative overflow-hidden border-b border-white/10 p-8 sm:p-10 md:p-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_45%)]" />

            <div className="relative flex items-start justify-between gap-6">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-400">
                  {talent.craft}
                </p>

                <h1 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
                  {talent.name}
                </h1>

                <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-400 sm:text-lg">
                  {talent.bio}
                </p>
              </div>

              <Link
                to={`/talent?craft=${encodeURIComponent(talent.craft)}`}
                aria-label="Close talent profile"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:border-amber-500/40 hover:bg-white/10 sm:h-14 sm:w-14"
              >
                <X size={20} />
              </Link>
            </div>

            <div className="relative mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-400">
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-amber-400" />
                {talent.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <Star size={16} className="text-amber-400" />
                4.9 rating
              </span>
              <span className="inline-flex items-center gap-2">
                <BriefcaseBusiness size={16} className="text-amber-400" />
                {talent.experience}
              </span>
            </div>
          </section>

          {/* Body */}
          <section className="grid gap-10 border-b border-white/10 p-8 sm:p-10 md:grid-cols-2 md:p-14">
            <div>
              <div className="mb-8 flex items-center gap-3">
                <BriefcaseBusiness className="text-amber-400" />
                <h2 className="text-2xl font-bold">Specialties</h2>
              </div>

              <div className="space-y-4">
                {(talent.role ? [talent.role, ...talent.genres] : talent.genres).map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-neutral-300"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div>
              <div className="mb-8 flex items-center gap-3">
                <Star className="text-amber-400" />
                <h2 className="text-2xl font-bold">Profile Details</h2>
              </div>

              <div className="space-y-7">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">Craft</p>
                  <p className="mt-2 text-neutral-200">{talent.craft}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">Location</p>
                  <p className="mt-2 text-neutral-200">{talent.location}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">Experience</p>
                  <p className="mt-2 text-neutral-200">{talent.experience}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-600">Availability</p>
                  <p className="mt-2 text-neutral-200">{talent.availability}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio */}
          <section className="border-b border-white/10 p-8 sm:p-10 md:p-14">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-amber-400">Portfolio</p>
                <h2 className="mt-3 text-3xl font-bold md:text-4xl">Selected Work</h2>
              </div>
              <p className="max-w-md text-sm text-neutral-500">
                A glimpse into the work behind the profile.
              </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {portfolioItems.map((item) => (
                <MediaButton key={item} className="aspect-video">
                  <img
                    src={talent.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-65 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <span className="absolute bottom-4 left-4 flex items-center gap-3 text-sm font-medium">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-black">
                      <Play size={14} fill="currentColor" />
                    </span>
                    {item}
                  </span>
                </MediaButton>
              ))}
            </div>
          </section>

          {/* Footer */}
          <div className="flex flex-col gap-5 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <p className="text-sm text-neutral-500">Interested in working with {talent.name}?</p>
              <p className="mt-1 text-neutral-300">Connect with this talent for your next production.</p>
            </div>

            <Button className="inline-flex shrink-0 items-center justify-center gap-3">
              Hire Talent
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
