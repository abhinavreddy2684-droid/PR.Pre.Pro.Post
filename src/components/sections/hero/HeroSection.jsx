import { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import OnboardingBrand from "@/components/layout/OnboardingBrand";
import HeroBackdrop from "@/components/sections/hero/HeroBackdrop";
import HeroHeadline from "@/components/sections/hero/HeroHeadline";
import HeroLens from "@/components/sections/hero/HeroLens";
import HeroTicker from "@/components/sections/hero/HeroTicker";
import { HERO_CONTENT } from "@/components/sections/hero/heroContent";
import useHeroParallax from "@/components/sections/hero/useHeroParallax";

/**
 * Full-screen hero. `variant="onboarding"` swaps the copy and shows the onboarding header;
 * its primary button then calls `onPrimaryAction` instead of opening the talent list.
 * @param {{ variant?: "home" | "onboarding", onPrimaryAction?: () => void }} props
 */
export default function HeroSection({ variant = "home", onPrimaryAction }) {
  const navigate = useNavigate();
  const isOnboarding = variant === "onboarding";
  const heroRef = useRef(null);
  useHeroParallax(heroRef);

  const content = isOnboarding ? HERO_CONTENT.onboarding : HERO_CONTENT.home;

  const handlePrimaryAction = () => {
    if (isOnboarding) {
      onPrimaryAction?.();
      return;
    }

    navigate("/talent");
  };

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen overflow-hidden bg-[#040404]">
      <HeroBackdrop />

      {isOnboarding && (
        <header className="absolute left-0 right-0 top-0 z-40 mx-auto flex max-w-[1600px] items-center justify-between px-8 py-7 lg:px-14 xl:px-16">
          <OnboardingBrand />
          <p className="hidden text-[10px] uppercase tracking-[0.3em] text-white/30 sm:block">
            Build your place in cinema
          </p>
        </header>
      )}

      {/* MAIN LAYOUT */}
      <div
        className={`relative z-20 mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 items-center gap-4 px-8 pb-20 ${content.layoutPadding} lg:grid-cols-[1.05fr_0.95fr] lg:px-14 xl:px-16`}
      >
        {/* LEFT CONTENT */}
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10 inline-flex items-center gap-3 border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-xl"
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-amber-300">
              {content.badge}
            </span>
          </motion.div>

          <HeroHeadline lines={content.lines} sizeClass={content.headlineSize} />

          <div className="mb-8 mt-10 flex items-center gap-5">
            <div className="h-px w-28 bg-gradient-to-r from-amber-500 to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/35">
              {content.tagline}
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`max-w-2xl text-white/55 ${content.descriptionClass}`}
          >
            {content.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`${content.actionsMargin} flex flex-col gap-5 sm:flex-row`}
          >
            <Button onClick={handlePrimaryAction}>{content.action}</Button>
            {!isOnboarding && (
              <Button variant="secondary" onClick={() => navigate("/talent/onboarding")}>
                Join Talent Network
              </Button>
            )}
          </motion.div>
        </div>

        <HeroLens />
      </div>

      <HeroTicker />
    </section>
  );
}
