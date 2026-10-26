import { ArrowRight, BriefcaseBusiness, Clapperboard, Layers3 } from "lucide-react";
import Button from "@/components/ui/Button";
import { pad2 } from "@/lib/format";

/** Craft detail card shown from the lg breakpoint up. */
export default function CraftDetailDesktop({ craft, onExplore }) {
  return (
    <div className="relative z-10 hidden lg:block rounded-[2.5rem] border border-white/10 bg-white/[0.025] overflow-hidden shadow-2xl animate-fade-in-up">
      <div className="relative p-8 md:p-14 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.13),transparent_45%)] pointer-events-none" />
        <div className="relative max-w-4xl">
          <p className="uppercase tracking-[0.35em] text-xs text-amber-400">
            Cinema Craft · {pad2(craft.id)}
          </p>
          <h3 className="mt-5 text-5xl md:text-7xl font-black tracking-tight">{craft.title}</h3>
          <p className="mt-7 text-lg md:text-xl text-neutral-400 leading-relaxed max-w-3xl">
            {craft.description}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4">
            <BriefcaseBusiness className="text-amber-400" />
            <h4 className="text-2xl font-bold">Find Talent</h4>
          </div>
          <p className="mt-6 text-neutral-400 leading-relaxed">
            Explore professionals in this craft, review their work, and discover the right talent
            for your next project.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {craft.talentTypes.map((talentType) => (
              <span
                key={talentType}
                className="px-3 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-neutral-300"
              >
                {talentType}
              </span>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4">
            <Clapperboard className="text-amber-400" />
            <h4 className="text-2xl font-bold">Built for Production</h4>
          </div>
          <p className="mt-6 text-neutral-400 leading-relaxed">
            Browse structured, searchable talent profiles instead of relying on static resumes or
            scattered referrals.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Layers3 className="text-amber-400" size={20} />
            <span className="text-sm uppercase tracking-[0.2em] text-neutral-500">
              Discover · Evaluate · Hire
            </span>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-black/20">
        <div>
          <p className="text-sm text-neutral-500">Explore available talent in {craft.title}.</p>
          <p className="mt-2 text-xs text-neutral-600">
            Profiles are currently powered by mock marketplace data.
          </p>
        </div>
        <Button onClick={onExplore} className="flex items-center justify-center gap-3 shrink-0">
          Explore Talent <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
