import { useEffect, useEffectEvent } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Open dialogs, oldest first. Only the top-most one reacts to Escape and Tab.
const openDialogs = [];

/**
 * Keyboard behaviour for a modal dialog rendered while the component is mounted:
 * focus moves into the dialog and returns to the previous element when it closes, Tab stays
 * inside it, and Escape calls `onClose` (only for the top-most dialog when several are open).
 *
 * The element in `ref` should have tabIndex={-1} so it can take focus; give it
 * style={{ outline: "none" }} so the container itself never shows a focus ring.
 * @param {{ current: HTMLElement | null }} ref
 * @param {() => void} onClose
 */
export default function useDialog(ref, onClose) {
  const handleClose = useEffectEvent(onClose);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;

    const previouslyFocused = document.activeElement;
    dialog.focus({ preventScroll: true });
    openDialogs.push(dialog);

    const onKeyDown = (event) => {
      if (openDialogs[openDialogs.length - 1] !== dialog) return;

      if (event.key === "Escape") {
        handleClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = [...dialog.querySelectorAll(FOCUSABLE)];
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const outside = !dialog.contains(document.activeElement) || document.activeElement === dialog;
      if (event.shiftKey && (outside || document.activeElement === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (outside || document.activeElement === last)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      openDialogs.splice(openDialogs.indexOf(dialog), 1);
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [ref]);
}
