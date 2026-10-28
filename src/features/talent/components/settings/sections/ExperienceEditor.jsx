import { useState } from "react";
import { fieldErrors } from "@/lib/api";
import CustomDropdown from "@/features/talent/components/settings/fields/CustomDropdown";
import SettingsError from "@/features/talent/components/settings/fields/SettingsError";
import SettingsField from "@/features/talent/components/settings/fields/SettingsField";
import SettingsModal from "@/features/talent/components/settings/fields/SettingsModal";
import {
  COMPANY_MAX,
  DESCRIPTION_MAX,
  EMPTY_EXPERIENCE,
  TITLE_MAX,
  toExperienceDraft,
  validateExperience,
} from "@/features/talent/components/settings/sections/experienceDraft";

const FIELD_LABELS = {
  title: "Title",
  company: "Company",
  start_year: "Start year",
  end_year: "End year",
  description: "Description",
  craft: "Craft",
};

/**
 * Add / edit one experience. `entry` is the API Experience, or null to add. `onSave(draft)`
 * does the request and throws on failure; `craftOptions` are the talent's own crafts.
 */
export default function ExperienceEditor({ entry, craftOptions, onClose, onSave }) {
  const [draft, setDraft] = useState(() => (entry ? toExperienceDraft(entry) : EMPTY_EXPERIENCE));
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const update = (key, value) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };
  const yearInput = (value) => value.replace(/\D/g, "").slice(0, 4);

  const save = async () => {
    const found = validateExperience(draft);
    setErrors(found);
    if (Object.keys(found).length) return;
    setPending(true);
    setError(null);
    try {
      await onSave(draft);
    } catch (saveError) {
      setErrors(fieldErrors(saveError));
      setError(saveError);
      setPending(false);
    }
  };

  return (
    <SettingsModal
      eyebrow="Experience & credits"
      title={entry ? "Edit experience" : "Add experience"}
      widthClass="max-w-2xl"
      saveLabel="Save experience"
      pending={pending}
      onClose={onClose}
      onSave={save}
    >
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <SettingsField
          label="Role / title"
          required
          value={draft.title}
          onChange={(value) => update("title", value)}
          maxLength={TITLE_MAX}
          placeholder="Director of Photography"
          error={errors.title}
        />
        <SettingsField
          label="Production / company"
          value={draft.company}
          onChange={(value) => update("company", value)}
          maxLength={COMPANY_MAX}
          placeholder="Feature Film Production"
          error={errors.company}
        />
        <SettingsField
          label="Start year"
          required
          value={draft.startYear}
          onChange={(value) => update("startYear", yearInput(value))}
          inputMode="numeric"
          placeholder="2021"
          error={errors.start_year}
        />
        <div>
          <SettingsField
            label="End year"
            value={draft.current ? "" : draft.endYear}
            onChange={(value) => update("endYear", yearInput(value))}
            inputMode="numeric"
            placeholder={draft.current ? "Present" : "2024"}
            disabled={draft.current}
            error={errors.end_year}
          />
          <label className="mt-2 inline-flex items-center gap-2 text-xs text-white/50">
            <input
              type="checkbox"
              checked={draft.current}
              onChange={(event) => update("current", event.target.checked)}
              className="accent-amber-500"
            />
            I still work here (shows as “Present”)
          </label>
        </div>
        <div className="sm:col-span-2">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
            Craft
          </p>
          <CustomDropdown
            ariaLabel="Craft"
            value={draft.craft}
            options={[{ value: "", label: "No specific craft" }, ...craftOptions]}
            onChange={(value) => update("craft", value)}
          />
          <p className="mt-1.5 text-[11px] text-white/30">
            Only crafts on your profile can be picked.
          </p>
          {errors.craft && <p className="mt-1.5 text-[11px] text-red-300">{errors.craft}</p>}
        </div>
      </div>
      <div className="mt-4">
        <SettingsField
          label="Description"
          value={draft.description}
          onChange={(value) => update("description", value)}
          multiline
          maxLength={DESCRIPTION_MAX}
          showCount
          placeholder="Describe your contribution."
          error={errors.description}
        />
      </div>
      {error && (
        <div className="mt-4">
          <SettingsError error={error} fieldLabels={FIELD_LABELS} />
        </div>
      )}
    </SettingsModal>
  );
}
