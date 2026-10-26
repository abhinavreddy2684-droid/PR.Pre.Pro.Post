import { ArrowRight, BriefcaseBusiness, Clapperboard, Layers3 } from "lucide-react";
import Button from "@/components/ui/Button";
import { pad2 } from "@/lib/format";

/** Craft detail card shown below the lg breakpoint. */
export default function CraftDetailMobile({ craft, onExplore }) {
  return (
    <div className="relative z-10 lg:hidden overflow-hidden rounded-[1.75rem] border border-amber-500/15 bg-[#0b0b0b] shadow-[0_20px_70px_rgba(0,0,0,0.45)] animate-fade-in-up">
      <div className="relative px-5 pt-6 pb-7 border-b border-white/10 bg-gradient-to-br from-amber-500/[0.12] via-transparent to-transparent">
        <div className="flex items-center justify-between gap-4">
          <p className="uppercase tracking-[0.28em] text-[10px] font-semibold text-amber-400">
            Cinema Craft
          </p>
          <span className="font-mono text-xs text-amber-500/60">{pad2(craft.id)}</span>
        </div>
        <h3 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight leading-[0.95]">
          {craft.title}
        </h3>
        <p className="mt-5 text-sm sm:text-base text-neutral-400 leading-7">{craft.description}</p>
      </div>

      <div className="divide-y divide-white/10">
        <div className="px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <BriefcaseBusiness size={18} className="text-amber-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold">Find Talent</h4>
              <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-600">
                People behind the craft
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-neutral-400 leading-6">
            Explore professionals in this craft, review their work, and discover the right talent
            for your next project.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {craft.talentTypes.map((talentType) => (
              <span
                key={talentType}
                className="px-3 py-2 rounded-full border border-white/10 bg-white/[0.035] text-xs text-neutral-300"
              >
                {talentType}
              </span>
            ))}
          </div>
        </div>

        <div className="px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Clapperboard size={18} className="text-amber-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold">Built for Production</h4>
              <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-600">
                A searchable talent marketplace
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-neutral-400 leading-6">
            Browse structured, searchable talent profiles instead of relying on static resumes or
            scattered referrals.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <Layers3 className="text-amber-400" size={17} />
            <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              Discover · Evaluate · Hire
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 py-5 bg-black/40 border-t border-white/10">
        <p className="text-xs text-neutral-500 mb-4">
          Explore available talent in <span className="text-neutral-300">{craft.title}</span>.
        </p>
        <Button
          onClick={onExplore}
          className="w-full flex items-center justify-center gap-3 !px-5 !py-3.5"
        >
          Explore Talent <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
