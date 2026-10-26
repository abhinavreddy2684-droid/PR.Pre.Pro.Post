import { useMemo } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TalentMarketplaceCard from "@/features/talent/components/discovery/TalentMarketplaceCard";
import DiscoveryFilters from "@/features/talent/components/discovery/DiscoveryFilters";
import DiscoveryEmptyState from "@/features/talent/components/discovery/DiscoveryEmptyState";
import formatCraftHeading from "@/features/talent/components/discovery/formatCraftHeading";
import useTalentFilters from "@/features/talent/hooks/useTalentFilters";
import { getTalents } from "@/features/talent/data";

export default function TalentDiscoveryPage() {
  const talents = getTalents();
  const [searchParams] = useSearchParams();
  const craft = searchParams.get("craft");
  const heading = formatCraftHeading(craft);

  const craftTalents = useMemo(
    () => (craft ? talents.filter((talent) => talent.craft === craft) : talents),
    [craft, talents],
  );
  const filters = useTalentFilters(craftTalents);
  const filteredTalents = filters.filtered;

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <Navbar />

      <main className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/#cinema-reel"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-neutral-500 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to CinemaReel
          </Link>

          <div className="mt-7 sm:mt-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8">
            <div className="max-w-3xl">
              <p className="uppercase tracking-[0.28em] text-[10px] sm:text-xs text-amber-400">
                Explore talent
              </p>
              <h1 className="mt-3 sm:mt-4 text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
                {heading}
              </h1>
              <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-neutral-400 leading-relaxed">
                Discover skilled professionals, explore their work, and find the right creative
                talent for your next production.
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm text-neutral-500">
              <Sparkles size={16} className="text-amber-400" />
              {filteredTalents.length} talent profiles
            </div>
          </div>

          <DiscoveryFilters
            heading={heading}
            search={filters.search}
            onSearchChange={filters.setSearch}
            location={filters.location}
            locations={filters.locations}
            onLocationChange={filters.setLocation}
            availability={filters.availability}
            onAvailabilityChange={filters.setAvailability}
          />

          <div className="mt-7 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredTalents.map((talent) => (
              <TalentMarketplaceCard key={talent.id} talent={talent} />
            ))}
          </div>

          {filteredTalents.length === 0 && <DiscoveryEmptyState />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
