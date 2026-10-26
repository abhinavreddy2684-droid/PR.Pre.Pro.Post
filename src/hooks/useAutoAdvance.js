import { useEffect, useState } from "react";

/**
 * Cycles an index through 0..count-1 every `intervalMs`, wrapping at the end.
 * Pausing stops the timer; the index is kept. Returns [index, setIndex] so callers
 * can also jump manually.
 * @param {number} count
 * @param {number} intervalMs
 * @param {boolean} [paused]
 * @returns {[number, import("react").Dispatch<import("react").SetStateAction<number>>]}
 */
export default function useAutoAdvance(count, intervalMs, paused = false) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % count),
      intervalMs,
    );
    return () => window.clearInterval(timer);
  }, [count, intervalMs, paused]);

  return [index, setIndex];
}
