import { useCallback, useEffect, useState } from "react";
import { availabilityWindow } from "@/lib/availability";
import { dateKey, startOfToday } from "@/lib/calendar";
import { getMyAvailability } from "@/features/talent/api/talentMeApi";

/**
 * The owner's availability for the 90-day window (GET /api/talent/me/availability).
 * `days` maps "YYYY-MM-DD" to "tentative" | "unavailable"; any other day is available.
 */
export default function useMyAvailability() {
  const [today] = useState(startOfToday);
  const { first, last } = availabilityWindow(today);
  const start = dateKey(first);
  const end = dateKey(last);
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ attempt: -1, days: {}, error: null });

  const load = useCallback(
    async () =>
      Object.fromEntries(
        (await getMyAvailability(start, end)).map((entry) => [entry.date, entry.status]),
      ),
    [start, end],
  );

  useEffect(() => {
    let active = true;
    load().then(
      (days) => active && setResult({ attempt, days, error: null }),
      (error) => active && setResult({ attempt, days: {}, error }),
    );
    return () => {
      active = false;
    };
  }, [load, attempt]);

  /** Refetch quietly after a save (the PUT returns 204 with no body). */
  const reload = useCallback(async () => {
    const days = await load();
    setResult((current) => ({ ...current, days, error: null }));
  }, [load]);

  let status = "ready";
  if (result.attempt !== attempt) status = "loading";
  else if (result.error) status = "error";

  return {
    status,
    days: result.days,
    error: result.error,
    today,
    first,
    last,
    retry: () => setAttempt((value) => value + 1),
    reload,
  };
}
