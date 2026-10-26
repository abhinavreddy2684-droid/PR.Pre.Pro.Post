import { useEffect, useEffectEvent } from "react";

/**
 * Calls `onOutside` when a mousedown lands outside the element held by `ref`.
 * @param {{ current: HTMLElement | null }} ref
 * @param {(event: MouseEvent) => void} onOutside
 */
export default function useClickOutside(ref, onOutside) {
  const handleOutside = useEffectEvent(onOutside);

  useEffect(() => {
    const onMouseDown = (event) => {
      if (!ref.current?.contains(event.target)) handleOutside(event);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [ref]);
}
