import { Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { userMessage } from "@/lib/api";

/** Full profile page while it loads, or when loading failed (with a retry). */
export default function ProfileLoadState({ error, onRetry }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <main className="px-6 pb-24 pt-40 text-center">
        {error ? (
          <div role="alert">
            <h1 className="text-4xl font-black sm:text-5xl">We couldn&apos;t load this profile</h1>
            <p className="mt-4 text-neutral-400">{userMessage(error)}</p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-8 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm text-white transition hover:border-amber-500/40 hover:text-amber-300"
            >
              Try again
            </button>
          </div>
        ) : (
          <div role="status" className="flex justify-center text-neutral-500">
            <Loader2 size={32} className="animate-spin" aria-hidden="true" />
            <span className="sr-only">Loading profile</span>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
