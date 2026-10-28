import { useState } from "react";
import { useCatalog } from "@/catalog";
import { userMessage } from "@/lib/api";
import { nextAvailability } from "@/lib/availability";
import { setMyAvailability } from "@/features/talent/api/talentMeApi";
import AvailabilityLegend from "@/features/talent/components/calendar/AvailabilityLegend";
import AvailabilityMonth from "@/features/talent/components/calendar/AvailabilityMonth";
import FloatingCard from "@/features/talent/components/settings/fields/FloatingCard";
import SaveButton from "@/features/talent/components/settings/fields/SaveButton";
import SettingsError from "@/features/talent/components/settings/fields/SettingsError";
import useOwnerTalent from "@/features/talent/hooks/useOwnerTalent";
import useSectionSave from "@/features/talent/hooks/useSectionSave";

/**
 * The next 90 days. Clicking a day cycles Available -> Tentative -> Unavailable; changed days
 * are sent together with PUT /api/talent/me/availability ("available" clears a day), then the
 * window is fetched again because the PUT answers 204.
 */
export default function AvailabilitySettings() {
  const { availability } = useOwnerTalent();
  const { enumLabel } = useCatalog();
  const [changes, setChanges] = useState({});
  const save = useSectionSave();
  const changedKeys = new Set(Object.keys(changes));
  const saved = (key) => availability.days[key] ?? "available";
  const statusFor = (key) => changes[key] ?? saved(key);

  const cycle = (key) => {
    const next = nextAvailability(statusFor(key));
    setChanges((current) => {
      const rest = { ...current };
      delete rest[key];
      return next === saved(key) ? rest : { ...rest, [key]: next };
    });
  };

  const submit = () =>
    save.run(async () => {
      await setMyAvailability(Object.entries(changes).map(([date, status]) => ({ date, status })));
      await availability.reload();
      setChanges({});
    });

  if (availability.status === "loading") {
    return <p className="text-sm text-white/40">Loading your calendar…</p>;
  }
  if (availability.status === "error") {
    return (
      <div className="space-y-3">
        <p role="alert" className="text-sm text-red-300">
          {userMessage(availability.error)}
        </p>
        <button
          type="button"
          onClick={availability.retry}
          className="rounded-full bg-white/5 px-4 py-2 text-xs text-white/70 hover:text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  const count = changedKeys.size;
  return (
    <div className="space-y-5">
      <FloatingCard
        title="Next 90 days"
        description="Every day is Available unless you mark it. Click a day to cycle Available, Tentative and Unavailable, then save."
      >
        <div className="mx-auto max-w-[420px] rounded-[1.75rem] bg-black/20 p-5 sm:p-6">
          <AvailabilityMonth
            first={availability.first}
            last={availability.last}
            statusFor={statusFor}
            labelFor={(status) => enumLabel("availability_statuses", status)}
            onDayClick={cycle}
            changedKeys={changedKeys}
          />
          <AvailabilityLegend className="mt-5" />
        </div>
      </FloatingCard>
      {save.error && <SettingsError error={save.error} />}
      <div className="flex items-center justify-end gap-4">
        {count > 0 && (
          <>
            <p className="text-xs text-white/40">
              {count} unsaved {count === 1 ? "day" : "days"}
            </p>
            <button
              type="button"
              onClick={() => setChanges({})}
              disabled={save.pending}
              className="text-xs font-semibold text-white/50 hover:text-white"
            >
              Discard
            </button>
          </>
        )}
        <SaveButton
          onClick={submit}
          saved={save.saved}
          pending={save.pending}
          disabled={count === 0 && !save.saved}
        />
      </div>
    </div>
  );
}
