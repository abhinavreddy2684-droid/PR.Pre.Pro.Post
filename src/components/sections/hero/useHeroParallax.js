import { useEffect } from "react";
import gsap from "gsap";

// How far (px) the lens drifts for a full-width mouse sweep, and in the opposite direction.
const PARALLAX_RANGE_PX = 50;
const LENS_COUNTER_FACTOR = -0.3;

/**
 * Nudges the ".hero-lens" element against the pointer while it moves over the hero.
 * Tweens are scoped to the hero and reverted on unmount.
 * @param {{ current: HTMLElement | null }} heroRef
 */
export default function useHeroParallax(heroRef) {
  useEffect(() => {
    const hero = heroRef.current;
    const ctx = gsap.context(() => {}, hero);

    ctx.add("onMouseMove", (event) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * PARALLAX_RANGE_PX;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * PARALLAX_RANGE_PX;

      gsap.to(".hero-lens", {
        x: x * LENS_COUNTER_FACTOR,
        y: y * LENS_COUNTER_FACTOR,
        duration: 2,
        ease: "power3.out",
      });
    });

    hero.addEventListener("mousemove", ctx.onMouseMove);
    return () => {
      hero.removeEventListener("mousemove", ctx.onMouseMove);
      ctx.revert();
    };
  }, [heroRef]);
}
