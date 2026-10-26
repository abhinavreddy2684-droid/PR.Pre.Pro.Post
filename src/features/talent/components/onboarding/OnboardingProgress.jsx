import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { ONBOARDING_STEPS } from "@/features/talent/components/onboarding/steps";

// Share of the bar filled for the step the user is on.
const ACTIVE_STEP_FILL = "58%";

/** Three-segment progress header; `step` is 1-3 while the form is showing. */
export default function OnboardingProgress({ step }) {
  return (
    <div className="mb-8 grid grid-cols-3 gap-2 border-y border-white/[0.07] py-4 sm:mb-10 sm:gap-5">
      {ONBOARDING_STEPS.map((item, index) => {
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
                animate={{ width: isComplete ? "100%" : isActive ? ACTIVE_STEP_FILL : "0%" }}
                className="h-full bg-amber-400"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
