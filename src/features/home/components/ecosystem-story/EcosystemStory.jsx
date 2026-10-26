import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { pad2 } from "@/lib/format";
import { chapters } from "@/features/home/components/ecosystem-story/chapters";
import FilmGrain from "@/features/home/components/ecosystem-story/FilmGrain";
import Scene from "@/features/home/components/ecosystem-story/scenes/StoryScene";

export default function EcosystemStory() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = chapters[step];

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => {
      setStep((value) => (value + 1) % chapters.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const move = (direction) => {
    setStep((value) => (value + direction + chapters.length) % chapters.length);
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
            {pad2(step + 1)} / 05
          </div>
        </div>

        <div className="mt-4 flex gap-1.5">
          {chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              type="button"
              aria-label={`Show ${chapter.label} chapter`}
              onClick={() => setStep(index)}
              className="group flex-1"
            >
              <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-amber-400"
                  initial={false}
                  animate={{ width: index < step ? "100%" : index === step ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <span
                className={`mt-1 hidden text-[6px] uppercase tracking-[0.16em] sm:block ${index === step ? "text-amber-400" : "text-neutral-700"}`}
              >
                {chapter.label}
              </span>
            </button>
          ))}
        </div>

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
          <div className="flex shrink-0 gap-1.5">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous chapter"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-neutral-500 transition hover:border-amber-400/30 hover:text-amber-300"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next chapter"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-neutral-500 transition hover:border-amber-400/30 hover:text-amber-300"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="relative mt-6 flex-1 min-h-0">
          {chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out ${index === step ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-3 opacity-0"}`}
              aria-hidden={index !== step}
            >
              <Scene id={chapter.id} />
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
