import { ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import { pad2 } from "@/lib/format";
import { steps } from "@/features/talent/components/onboarding/steps";

export default function OnboardingShell({ step, onBack, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040404] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(245,158,11,0.13),transparent_32%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[22%] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-amber-500/[0.035] blur-[140px]" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full border border-amber-400/30 bg-amber-500/[0.07] text-sm tracking-wide text-amber-300">
            PR
          </div>
          <div>
            <p className="font-['Bebas_Neue'] text-2xl tracking-[0.24em] text-white sm:text-3xl">
              PRE PRO POST
            </p>
            <p className="mt-0.5 text-[9px] uppercase tracking-[0.34em] text-amber-300/55">
              Talent onboarding
            </p>
          </div>
        </div>

        <p className="hidden text-[10px] uppercase tracking-[0.3em] text-white/30 sm:block">
          Build your place in cinema
        </p>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-108px)] max-w-7xl flex-col px-6 pb-10 sm:px-10 lg:px-14">
        <div className="mb-8 grid grid-cols-3 gap-2 border-y border-white/[0.07] py-4 sm:mb-10 sm:gap-5">
          {steps.map((item, index) => {
            const isActive = step === index + 1;
            const isComplete = step > index + 1;

            return (
              <div key={item.number} className="min-w-0">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[9px] font-semibold ${
                      isComplete
                        ? "border-amber-400 bg-amber-400 text-black"
                        : isActive
                          ? "border-amber-400/70 text-amber-300"
                          : "border-white/10 text-white/25"
                    }`}
                  >
                    {isComplete ? <Check size={12} /> : item.number}
                  </span>
                  <span
                    className={`truncate text-[9px] uppercase tracking-[0.22em] sm:text-[10px] ${
                      isActive ? "text-white/80" : "text-white/25"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <div className="h-px overflow-hidden bg-white/[0.06]">
                  <motion.div
                    initial={false}
                    animate={{ width: isComplete ? "100%" : isActive ? "58%" : "0%" }}
                    className="h-full bg-amber-400"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-1 flex-col">{children}</div>

        <div className="mt-8 flex items-center justify-between border-t border-white/[0.07] pt-5">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/35 transition-colors hover:text-amber-300"
          >
            <ArrowLeft size={15} />
            Back
          </button>

          <p className="text-[9px] uppercase tracking-[0.28em] text-white/20">{pad2(step)} / 03</p>
        </div>
      </main>
    </div>
  );
}
