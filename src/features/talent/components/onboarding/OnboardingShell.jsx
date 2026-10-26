import { ArrowLeft } from "lucide-react";
import { pad2 } from "@/lib/format";
import OnboardingBrand from "@/components/layout/OnboardingBrand";
import OnboardingProgress from "@/features/talent/components/onboarding/OnboardingProgress";
import { ONBOARDING_STEPS } from "@/features/talent/components/onboarding/steps";

export default function OnboardingShell({ step, onBack, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040404] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(245,158,11,0.13),transparent_32%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[22%] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-amber-500/[0.035] blur-[140px]" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
        <OnboardingBrand />

        <p className="hidden text-[10px] uppercase tracking-[0.3em] text-white/30 sm:block">
          Build your place in cinema
        </p>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-108px)] max-w-7xl flex-col px-6 pb-10 sm:px-10 lg:px-14">
        <OnboardingProgress step={step} />

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

          <p className="text-[9px] uppercase tracking-[0.28em] text-white/20">
            {pad2(step)} / {pad2(ONBOARDING_STEPS.length)}
          </p>
        </div>
      </main>
    </div>
  );
}
