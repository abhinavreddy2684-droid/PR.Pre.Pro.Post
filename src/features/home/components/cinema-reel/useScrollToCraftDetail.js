import { useEffect, useState } from "react";

const LG_BREAKPOINT_PX = 1024;
const TOP_GAP_MOBILE_PX = 12;
const TOP_GAP_DESKTOP_PX = 16;

// Scrolls so the detail card sits vertically centred in the space below the navbar.
function scrollCardIntoView(card) {
  if (!card) return;

  const cardRect = card.getBoundingClientRect();
  const cardTop = cardRect.top + window.scrollY;
  const cardBottom = cardTop + cardRect.height;
  const navbarHeight = document.querySelector("nav")?.getBoundingClientRect().height ?? 0;
  const topGap = window.innerWidth < LG_BREAKPOINT_PX ? TOP_GAP_MOBILE_PX : TOP_GAP_DESKTOP_PX;
  const dynamicOffset = Math.max(window.innerHeight - navbarHeight - topGap * 2, 0);

  const targetScroll = Math.max(
    (cardTop + cardBottom - dynamicOffset) / 2 - navbarHeight - topGap,
    0,
  );

  window.scrollTo({ top: targetScroll, behavior: "smooth" });
}

/**
 * Returns a function that, once called, smooth-scrolls the element in `cardRef` to the centre of
 * the viewport after the next render has been laid out (two animation frames).
 * @param {{ current: HTMLElement | null }} cardRef
 * @returns {() => void}
 */
export default function useScrollToCraftDetail(cardRef) {
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!pending) return undefined;

    let innerFrame;
    const outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => {
        scrollCardIntoView(cardRef.current);
        setPending(false);
      });
    });

    return () => {
      cancelAnimationFrame(outerFrame);
      cancelAnimationFrame(innerFrame);
    };
  }, [pending, cardRef]);

  return () => setPending(true);
}
