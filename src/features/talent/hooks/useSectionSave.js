import { useState } from "react";
import useSavedFlash from "@/features/talent/hooks/useSavedFlash";

const SAVED_FLASH_MS = 1400;

/**
 * Pending / error / "Saved" state around one settings section's save. `run(save)` awaits the
 * async `save` and keeps its error for inline display; it resolves to true on success.
 */
export default function useSectionSave() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [saved, flashSaved] = useSavedFlash(SAVED_FLASH_MS);

  const run = async (save) => {
    setPending(true);
    setError(null);
    try {
      await save();
      flashSaved();
      return true;
    } catch (saveError) {
      setError(saveError);
      return false;
    } finally {
      setPending(false);
    }
  };

  return { pending, error, saved, run, clearError: () => setError(null) };
}
