import { useEffect, useEffectEvent } from "react";

export const POLL_INTERVAL_MS = 2500;

/**
 * Runs `poll` every 2.5 s while `active`, one run at a time (the next starts after the previous
 * settles). Stops when `active` turns false and on unmount; `poll` is told to stop through the
 * AbortSignal it receives.
 * @param {boolean} active
 * @param {(signal: AbortSignal) => Promise<void>} poll
 */
export default function usePolling(active, poll) {
  const run = useEffectEvent(poll);

  useEffect(() => {
    if (!active) return undefined;
    const controller = new AbortController();
    let timer;
    const tick = async () => {
      try {
        await run(controller.signal);
      } catch {
        // A failed poll is retried on the next tick; the data on screen stays as it was.
      }
      if (!controller.signal.aborted) timer = setTimeout(tick, POLL_INTERVAL_MS);
    };
    timer = setTimeout(tick, POLL_INTERVAL_MS);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [active]);
}
