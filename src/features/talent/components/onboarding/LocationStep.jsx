import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCatalog } from "@/catalog";
import StepFrame from "@/features/talent/components/onboarding/StepFrame";
import LocationSelect from "@/features/talent/components/onboarding/LocationSelect";

export default function LocationStep({ profile, updateProfile, selectState, onContinue }) {
  const catalog = useCatalog();
  const toOption = (place) => ({ value: place.id, label: place.name });
  const stateOptions = catalog.states.map(toOption);
  const cityOptions = (catalog.stateById(profile.state)?.cities ?? []).map(toOption);
  const canContinue = Boolean(profile.state && profile.city);

  return (
    <StepFrame
      eyebrow="03 — Location"
      title={
        <>
          WHERE ARE YOU
          <br />
          LOCATED?
        </>
      }
      description="Your location is structured to keep the Talent Network consistent and searchable. India is currently the first supported country."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <LocationSelect
          label="Country"
          value="india"
          disabled
          options={[{ value: "india", label: "India" }]}
        />

        <LocationSelect
          label="State / Union Territory"
          value={profile.state}
          placeholder="Select state"
          options={stateOptions}
          onChange={selectState}
        />

        <LocationSelect
          label="City"
          value={profile.city}
          placeholder={profile.state ? "Select city" : "Select state first"}
          options={cityOptions}
          disabled={!profile.state}
          onChange={(value) => updateProfile("city", value)}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          disabled={!canContinue}
          onClick={onContinue}
          className="inline-flex items-center gap-3 disabled:cursor-not-allowed disabled:opacity-35"
        >
          Finish onboarding
          <ArrowRight size={17} />
        </Button>
      </div>
    </StepFrame>
  );
}
