import { BriefcaseBusiness, ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionAction from "@/features/talent/components/owner/SectionAction";

export default function OwnerExperience({ talent, onManage }) {
  const entries = Array.isArray(talent.experiences) ? talent.experiences : [];
  const [start, setStart] = useState(0);
  const visible = entries.slice(start, start + 3);
  return (
    <section id="experience" className="mt-32 scroll-mt-24">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading
          eyebrow="02 / Experience"
          title="The Career Behind The Craft"
          subtitle={`A look at the experiences that shaped ${talent.name}'s professional journey.`}
        />
        <SectionAction onClick={onManage}>
          <Pencil size={13} />
          Manage experience
        </SectionAction>
      </div>
      <div
        className={`mt-10 grid gap-5 ${entries.length > 2 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}
      >
        {visible.map((entry, index) => (
          <motion.article
            key={`${entry.company}-${entry.period}-${index}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative min-h-[390px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10 transition-[border-color,box-shadow] duration-700 hover:border-amber-500/20 hover:shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
          >
            <div className="absolute inset-0 opacity-0 transition-all duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_55%)]" />
            <div className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
              <BriefcaseBusiness size={28} />
            </div>
            <div className="relative z-10">
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-amber-400">
                {entry.period}
              </p>
              <h3 className="mt-4 text-3xl font-black leading-tight text-white">{entry.title}</h3>
              <p className="mt-2 text-sm text-neutral-400">{entry.company}</p>
              <p className="mt-6 text-base leading-relaxed text-neutral-400">{entry.description}</p>
              <span className="mt-6 inline-flex w-fit rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-white/50">
                {entry.craft || talent.craft}
              </span>
            </div>
          </motion.article>
        ))}
      </div>
      {entries.length > 3 && (
        <div className="mt-8 flex justify-between">
          <p className="text-xs text-neutral-500">
            {start + 1}–{Math.min(start + 3, entries.length)} of {entries.length}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={!start}
              onClick={() => setStart((value) => Math.max(0, value - 1))}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/50 disabled:opacity-20"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              disabled={start >= entries.length - 3}
              onClick={() => setStart((value) => Math.min(entries.length - 3, value + 1))}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/50 disabled:opacity-20"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
