import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import talents from "../data/talents";

const formatCraft = (craft) => {
  if (!craft) return "Talent";
  if (craft === "Playback Singing") return "Playback Singers";
  return `${craft}s`;
};

export default function TalentDiscovery() {
  const [searchParams] = useSearchParams();
  const craft = searchParams.get("craft") || "Playback Singing";
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All locations");
  const [availability, setAvailability] = useState("Any availability");

  const craftTalents = useMemo(
    () => talents.filter((talent) => talent.craft === craft),
    [craft]
  );

  const locations = [
    "All locations",
    ...new Set(craftTalents.map((talent) => talent.location.split(",")[0])),
  ];

  const filteredTalents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return craftTalents.filter((talent) => {
      const matchesSearch = !query || [
        talent.name,
        talent.location,
        talent.craft,
        talent.bio,
        ...talent.genres,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesLocation =
        location === "All locations" || talent.location.startsWith(location);

      const matchesAvailability =
        availability === "Any availability" || talent.availability === availability;

      return matchesSearch && matchesLocation && matchesAvailability;
    });
  }, [availability, craftTalents, location, search]);

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <Navbar />

      <main className="pt-32 pb-24">
        <section className="px-6">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/crafts"
              className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-amber-400 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to crafts
            </Link>

            <div className="mt-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-3xl">
                <p className="uppercase tracking-[0.35em] text-xs text-amber-400">
                  Discover the craft
                </p>
                <h1 className="mt-4 text-5xl md:text-7xl font-black tracking-tight">
                  {formatCraft(craft)}
                </h1>
                <p className="mt-6 text-lg text-neutral-400 leading-relaxed">
                  Discover skilled {craft.toLowerCase()} professionals, explore their work,
                  and find the right creative talent for your next production.
                </p>
              </div>

              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <Sparkles size={16} className="text-amber-400" />
                {filteredTalents.length} talent profiles
              </div>
            </div>

            <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-4">
              <div className="grid lg:grid-cols-[1fr_auto_auto] gap-3">
                <label className="flex items-center gap-3 rounded-2xl bg-black/40 border border-white/10 px-5 py-4">
                  <Search size={18} className="text-neutral-500 shrink-0" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={`Search ${formatCraft(craft).toLowerCase()} by name, genre or location`}
                    className="w-full bg-transparent outline-none text-sm placeholder:text-neutral-600"
                  />
                </label>

                <label className="flex items-center gap-3 rounded-2xl bg-black/40 border border-white/10 px-4 py-4">
                  <MapPin size={18} className="text-amber-400" />
                  <select
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    className="bg-transparent outline-none text-sm text-neutral-300 min-w-40"
                  >
                    {locations.map((item) => (
                      <option key={item} value={item} className="bg-neutral-950">
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex items-center gap-3 rounded-2xl bg-black/40 border border-white/10 px-4 py-4">
                  <SlidersHorizontal size={18} className="text-amber-400" />
                  <select
                    value={availability}
                    onChange={(event) => setAvailability(event.target.value)}
                    className="bg-transparent outline-none text-sm text-neutral-300 min-w-40"
                  >
                    <option className="bg-neutral-950">Any availability</option>
                    <option className="bg-neutral-950">Available</option>
                    <option className="bg-neutral-950">On request</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTalents.map((talent) => (
                <article
                  key={talent.id}
                  className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] hover:border-amber-500/30 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                    <img
                      src={talent.image}
                      alt={talent.name}
                      className="w-full h-full object-cover grayscale-[15%] group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-[0.18em] text-amber-300">
                      {talent.availability}
                    </span>
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                        {talent.craft}
                      </p>
                      <h2 className="mt-2 text-2xl font-bold">{talent.name}</h2>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                      <MapPin size={15} />
                      {talent.location}
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-neutral-500 line-clamp-2">
                      {talent.bio}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {talent.genres.map((genre) => (
                        <span
                          key={genre}
                          className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs text-neutral-400"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-neutral-500">{talent.experience} experience</span>
                      <button className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-amber-300 transition-colors">
                        View profile
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredTalents.length === 0 && (
              <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-16 text-center">
                <p className="text-xl font-semibold">No talent matches your filters.</p>
                <p className="mt-3 text-neutral-500">Try a different search or broaden your filters.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
