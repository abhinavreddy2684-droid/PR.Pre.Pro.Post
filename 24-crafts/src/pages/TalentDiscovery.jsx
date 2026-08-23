import { useMemo, useState } from "react";
import { ArrowLeft, MapPin, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import TalentCard from "../components/cards/TalentCard";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import talents from "../data/talents";

const formatCraft = (craft) => {
  if (!craft) return "Talent Network";
  if (craft === "Playback Singing") return "Playback Singers";
  return craft;
};

export default function TalentDiscovery() {
  const [searchParams] = useSearchParams();
  const craft = searchParams.get("craft");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All locations");
  const [availability, setAvailability] = useState("Any availability");

  const craftTalents = useMemo(
    () => (craft ? talents.filter((talent) => talent.craft === craft) : talents),
    [craft],
  );

  const locations = [
    "All locations",
    ...new Set(craftTalents.map((talent) => talent.location.split(",")[0])),
  ];

  const filteredTalents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return craftTalents.filter((talent) => {
      const searchableFields = [
        talent.name,
        talent.location,
        talent.craft,
        talent.role,
        talent.bio,
        ...talent.genres,
      ].filter(Boolean);

      const matchesSearch = !query || searchableFields.some((value) => value.toLowerCase().includes(query));
      const matchesLocation = location === "All locations" || talent.location.startsWith(location);
      const matchesAvailability = availability === "Any availability" || talent.availability === availability;

      return matchesSearch && matchesLocation && matchesAvailability;
    });
  }, [availability, craftTalents, location, search]);

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <Navbar />

      <main className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/#cinema-reel" className="inline-flex min-h-11 items-center gap-2 text-sm text-neutral-500 hover:text-amber-400 transition-colors">
            <ArrowLeft size={16} />
            Back to CinemaReel
          </Link>

          <div className="mt-7 sm:mt-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8">
            <div className="max-w-3xl">
              <p className="uppercase tracking-[0.28em] text-[10px] sm:text-xs text-amber-400">Explore talent</p>
              <h1 className="mt-3 sm:mt-4 text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">{formatCraft(craft)}</h1>
              <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-neutral-400 leading-relaxed">
                Discover skilled professionals, explore their work, and find the right creative talent for your next production.
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm text-neutral-500">
              <Sparkles size={16} className="text-amber-400" />
              {filteredTalents.length} talent profiles
            </div>
          </div>

          <div className="mt-7 sm:mt-12 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-3 sm:p-4">
            <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
              <label className="flex min-h-12 items-center gap-3 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 px-4 sm:px-5 py-3">
                <Search size={18} className="text-neutral-500 shrink-0" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={`Search ${formatCraft(craft).toLowerCase()} by name, craft or location`}
                />
              </label>

              <label className="flex min-h-12 items-center gap-3 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 px-4 py-3">
                <MapPin size={18} className="text-amber-400 shrink-0" />
                <Select value={location} onChange={(event) => setLocation(event.target.value)} className="w-full lg:min-w-40">
                  {locations.map((item) => (
                    <option key={item} value={item} className="bg-neutral-950">{item}</option>
                  ))}
                </Select>
              </label>

              <label className="flex min-h-12 items-center gap-3 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 px-4 py-3">
                <SlidersHorizontal size={18} className="text-amber-400 shrink-0" />
                <Select value={availability} onChange={(event) => setAvailability(event.target.value)} className="w-full lg:min-w-40">
                  <option value="Any availability" className="bg-neutral-950">Any availability</option>
                  <option value="Available" className="bg-neutral-950">Available</option>
                  <option value="On request" className="bg-neutral-950">On request</option>
                </Select>
              </label>
            </div>
          </div>

          <div className="mt-7 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredTalents.map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))}
          </div>

          {filteredTalents.length === 0 && (
            <div className="mt-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-10 sm:p-16 text-center">
              <p className="text-lg sm:text-xl font-semibold">No talent matches your filters.</p>
              <p className="mt-3 text-sm sm:text-base text-neutral-500">Try a different search or broaden your filters.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
