import { useState } from "react";
import { useCatalog } from "@/catalog";
import { fieldErrors } from "@/lib/api";
import ChipInput from "@/features/talent/components/settings/fields/ChipInput";
import CustomDropdown from "@/features/talent/components/settings/fields/CustomDropdown";
import FloatingCard from "@/features/talent/components/settings/fields/FloatingCard";
import SaveButton from "@/features/talent/components/settings/fields/SaveButton";
import SettingsError from "@/features/talent/components/settings/fields/SettingsError";
import SettingsField from "@/features/talent/components/settings/fields/SettingsField";
import {
  BIO_MAX,
  GENRE_MAX_LENGTH,
  GENRES_MAX,
  PROFESSIONAL_NAME_MAX,
  YEARS_MAX,
  professionalChanges,
  toProfessionalDraft,
  validateProfessional,
} from "@/features/talent/components/settings/sections/professionalDraft";
import { updateMyTalent } from "@/features/talent/api/talentMeApi";
import useOwnerTalent from "@/features/talent/hooks/useOwnerTalent";
import useSectionSave from "@/features/talent/hooks/useSectionSave";

const FIELD_LABELS = {
  professional_name: "Professional name",
  bio: "Bio",
  city_id: "City",
  years_experience: "Experience",
  genres: "Genres",
};

/** Professional details: PATCH /api/talent/me with only the changed fields. */
export default function ProfessionalSettings() {
  const { talent, replace } = useOwnerTalent();
  const { states, stateBySlug } = useCatalog();
  const [draft, setDraft] = useState(() => toProfessionalDraft(talent));
  const [errors, setErrors] = useState({});
  const save = useSectionSave();
  const changes = professionalChanges(talent, draft);

  const update = (key, value) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key === "cityId" ? "city_id" : key]: undefined }));
  };

  const submit = async () => {
    const found = validateProfessional(draft);
    setErrors(found);
    if (Object.keys(found).length || !changes) return;
    await save.run(async () => {
      try {
        const updated = await updateMyTalent(changes);
        replace(updated);
        setDraft(toProfessionalDraft(updated));
      } catch (error) {
        setErrors(fieldErrors(error));
        throw error;
      }
    });
  };

  const stateOptions = states.map((state) => ({ value: state.slug, label: state.name }));
  const cityOptions = (stateBySlug(draft.state)?.cities ?? []).map((city) => ({
    value: city.id,
    label: city.name,
  }));

  return (
    <div className="space-y-5">
      <FloatingCard
        title="Professional identity"
        description="Keep the information recruiters see on your public talent profile accurate and current."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <SettingsField
            label="Professional name"
            required
            value={draft.professionalName}
            onChange={(value) => update("professionalName", value)}
            maxLength={PROFESSIONAL_NAME_MAX}
            placeholder="Your professional name"
            error={errors.professional_name}
          />
          <SettingsField
            label="Experience (years)"
            value={draft.years}
            onChange={(value) => update("years", value.replace(/\D/g, ""))}
            inputMode="numeric"
            maxLength={2}
            placeholder="e.g. 8"
            hint={`Whole years, 0 to ${YEARS_MAX}. Leave empty to hide.`}
            error={errors.years_experience}
          />
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
              State / Union Territory
            </p>
            <CustomDropdown
              ariaLabel="State"
              value={draft.state}
              options={stateOptions}
              placeholder="Select state"
              onChange={(value) => {
                setDraft((current) => ({ ...current, state: value, cityId: "" }));
                setErrors((current) => ({ ...current, city_id: undefined }));
              }}
            />
          </div>
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
              City
            </p>
            <CustomDropdown
              ariaLabel="City"
              value={draft.cityId}
              options={cityOptions}
              placeholder={draft.state ? "Select city" : "Select a state first"}
              disabled={!draft.state}
              onChange={(value) => update("cityId", value)}
            />
            {errors.city_id && <p className="mt-1.5 text-[11px] text-red-300">{errors.city_id}</p>}
          </div>
        </div>
        <div className="mt-5">
          <SettingsField
            label="Bio"
            value={draft.bio}
            onChange={(value) => update("bio", value)}
            multiline
            maxLength={BIO_MAX}
            showCount
            placeholder="Tell recruiters what defines your work."
            error={errors.bio}
          />
        </div>
      </FloatingCard>
      <FloatingCard
        title="Genres & specialities"
        description={`These tags help recruiters understand your range. Up to ${GENRES_MAX}.`}
      >
        <ChipInput
          label="Genre"
          values={draft.genres}
          onChange={(genres) => update("genres", genres)}
          maxItems={GENRES_MAX}
          maxLength={GENRE_MAX_LENGTH}
          placeholder="Add a genre or speciality"
        />
        {errors.genres && <p className="mt-2 text-[11px] text-red-300">{errors.genres}</p>}
      </FloatingCard>
      {save.error && <SettingsError error={save.error} fieldLabels={FIELD_LABELS} />}
      <div className="flex items-center justify-end gap-4">
        {!changes && !save.saved && <p className="text-xs text-white/30">No unsaved changes</p>}
        <SaveButton
          onClick={submit}
          saved={save.saved}
          pending={save.pending}
          disabled={!changes && !save.saved}
        />
      </div>
    </div>
  );
}
