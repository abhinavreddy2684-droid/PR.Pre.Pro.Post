import { ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useCatalog } from "@/catalog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TalentDirectory from "@/features/talent/components/discovery/TalentDirectory";
import formatCraftHeading from "@/features/talent/components/discovery/formatCraftHeading";

/** /talent, optionally narrowed to one craft with ?craft=<slug>. */
export default function TalentDiscoveryPage() {
  const [searchParams] = useSearchParams();
  const { craftBySlug } = useCatalog();
  const craftSlug = searchParams.get("craft") || "";
  const heading = formatCraftHeading(craftSlug && (craftBySlug(craftSlug)?.title ?? craftSlug));

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

          <div className="mt-7 sm:mt-10 max-w-3xl">
            <p className="uppercase tracking-[0.28em] text-[10px] sm:text-xs text-amber-400">
              Explore talent
            </p>
            <h1 className="mt-3 sm:mt-4 text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
              {heading}
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-neutral-400 leading-relaxed">
              Discover skilled professionals, explore their work, and find the right creative talent
              for your next production.
            </p>
          </div>

          {/* Remount on a new ?craft= so the other filters start fresh too. */}
          <TalentDirectory key={craftSlug} heading={heading} craft={craftSlug} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
