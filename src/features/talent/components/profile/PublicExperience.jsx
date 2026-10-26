import { BriefcaseBusiness, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function PublicExperience({ talent }) {
  const entries = Array.isArray(talent.experiences) ? talent.experiences : [];
  const [start, setStart] = useState(0);
  if (!entries.length) return null;
  const hasCarousel = entries.length > 3;
  const visible = hasCarousel ? entries.slice(start, start + 3) : entries;
  const canPrev = start > 0;
  const canNext = start < entries.length - 3;
  const gridClass =
    entries.length === 1
      ? "grid grid-cols-1"
      : entries.length === 2
        ? "grid gap-5 md:grid-cols-2"
        : "grid gap-5 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="experience" className="mt-32 scroll-mt-24">
      <SectionHeading
        eyebrow="02 / Experience"
        title="The Career Behind The Craft"
        subtitle={`A look at the experiences that shaped ${talent.name}'s professional journey.`}
      />
      <div className={`relative mt-10 ${gridClass}`}>
        {visible.map((entry, index) => (
          <motion.article
            key={`${entry.company}-${entry.period}-${index}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative min-h-[390px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_55%)] opacity-0 transition duration-700 group-hover:opacity-100" />
            <div className="absolute right-6 top-5 text-6xl font-black text-white/5">
              0{start + index + 1}
            </div>
            <div className="relative flex h-full flex-col">
              <div className="grid h-16 w-16 place-items-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                <BriefcaseBusiness size={28} />
              </div>
              <div className="relative mt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-400">
                  {entry.period || "Professional chapter"}
                </p>
                <h3 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white">
                  {entry.title || talent.role || talent.craft}
                </h3>
                <p className="mt-2 text-sm font-medium text-neutral-400">
                  {entry.company || "Independent / Production"}
                </p>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400">
                  {entry.description ||
                    "Professional work contributing to cinematic productions and creative collaborations."}
                </p>
                <div className="mt-auto pt-8">
                  <span className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-white/50">
                    {entry.craft || talent.craft}
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      {hasCarousel && (
        <div className="mt-8 flex items-center justify-between">
          <p className="text-xs text-neutral-500">
            {start + 1}–{Math.min(start + 3, entries.length)} of {entries.length} experiences
          </p>
          <div className="flex gap-2">
            <button
              disabled={!canPrev}
              onClick={() => setStart((value) => Math.max(0, value - 1))}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-white/60 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              disabled={!canNext}
              onClick={() => setStart((value) => Math.min(entries.length - 3, value + 1))}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/5 text-white/60 transition hover:bg-amber-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
