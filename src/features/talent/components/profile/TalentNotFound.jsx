import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/** Shown at /talent/:talentId when the API has no published talent with that id (404). */
export default function TalentNotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <main className="px-6 pb-24 pt-40 text-center">
        <h1 className="text-5xl font-black">Profile not found</h1>
        <Link to="/talent" className="mt-8 inline-flex items-center gap-2 text-amber-400">
          <ArrowLeft size={16} /> Back to talent
        </Link>
      </main>
      <Footer />
    </div>
  );
}
