import { useEffect, useRef, useState } from "react";

/**
 * Boolean that turns true when `flash()` is called and back to false after `durationMs`.
 * The timer is cleared on unmount and restarted on repeated calls.
 * @returns {[boolean, () => void]}
 */
export default function useSavedFlash(durationMs) {
  const [saved, setSaved] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const flash = () => {
    window.clearTimeout(timer.current);
    setSaved(true);
    timer.current = window.setTimeout(() => setSaved(false), durationMs);
  };

  return [saved, flash];
}
