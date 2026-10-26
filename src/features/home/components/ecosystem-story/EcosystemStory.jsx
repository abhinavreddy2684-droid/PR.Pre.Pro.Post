import { useState } from "react";
import { ArrowRight } from "lucide-react";
import useAutoAdvance from "@/hooks/useAutoAdvance";
import { pad2 } from "@/lib/format";
import { CHAPTERS, STORY_INTERVAL_MS } from "@/features/home/components/ecosystem-story/chapters";
import StoryControls from "@/features/home/components/ecosystem-story/StoryControls";
import StoryProgress from "@/features/home/components/ecosystem-story/StoryProgress";
import FilmGrain from "@/features/home/components/ecosystem-story/FilmGrain";
import StoryScene from "@/features/home/components/ecosystem-story/scenes/StoryScene";

export default function EcosystemStory() {
  const [paused, setPaused] = useState(false);
  const [step, setStep] = useAutoAdvance(CHAPTERS.length, STORY_INTERVAL_MS, paused);
  const current = CHAPTERS[step];

  const move = (direction) => {
    setStep((value) => (value + direction + CHAPTERS.length) % CHAPTERS.length);
  };

  return (
    <div
      className="relative min-h-[760px] overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[#060606] shadow-[0_0_100px_rgba(245,158,11,0.07)] sm:min-h-[800px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <FilmGrain />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,.08),transparent_38%),linear-gradient(180deg,rgba(255,255,255,.018),transparent_32%)]" />

      <div className="relative z-10 flex min-h-[760px] flex-col p-4 sm:min-h-[800px] sm:p-5 lg:p-6">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
          <div>
            <p className="text-[8px] uppercase tracking-[0.32em] text-amber-400">THE GATEWAY</p>
            <p className="mt-1 text-[9px] text-neutral-600">
              How Pre Pro Post brings discovery to filmmaking
            </p>
          </div>
          <div className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[7px] uppercase tracking-[0.2em] text-neutral-600">
            {pad2(step + 1)} / {pad2(CHAPTERS.length)}
          </div>
        </div>

        <StoryProgress step={step} onSelect={setStep} />

        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-[8px] uppercase tracking-[0.24em] text-amber-400">
              {current.kicker}
            </p>
            <h3 className="mt-2 text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl lg:text-[1.7rem]">
              {current.title}
            </h3>
            <p className="mt-2 max-w-2xl text-[9px] leading-relaxed text-neutral-500 sm:text-[10px]">
              {current.copy}
            </p>
          </div>
          <StoryControls onPrevious={() => move(-1)} onNext={() => move(1)} />
        </div>

        <div className="relative mt-6 flex-1 min-h-0">
          {CHAPTERS.map((chapter, index) => (
            <div
              key={chapter.id}
              className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out ${index === step ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-3 opacity-0"}`}
              aria-hidden={index !== step}
            >
              <StoryScene id={chapter.id} />
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
          <div className="flex items-center gap-2 text-[7px] uppercase tracking-[0.2em] text-neutral-700">
            <span
              className={`h-1.5 w-1.5 rounded-full ${paused ? "bg-neutral-700" : "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,.7)]"}`}
            />
            {paused ? "Paused — explore the story" : "Story in motion"}
          </div>
          <button
            type="button"
            onClick={() => move(1)}
            className="group flex items-center gap-2 text-[8px] uppercase tracking-[0.18em] text-neutral-500 transition hover:text-amber-300"
          >
            Continue{" "}
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
