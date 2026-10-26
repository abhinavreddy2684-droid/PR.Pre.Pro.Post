import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { getCities, getStates } from "@/catalog";
import StepFrame from "@/features/talent/components/onboarding/StepFrame";
import CustomSelect from "@/features/talent/components/onboarding/CustomSelect";

export default function LocationStep({ profile, updateProfile, onContinue }) {
  const states = useMemo(() => getStates(), []);
  const cities = getCities(profile.state);
  const canContinue = Boolean(profile.state && profile.city);

  const selectState = (value) => {
    updateProfile("state", value);
    updateProfile("city", "");
  };

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
        <CustomSelect label="Country" value="India" disabled options={["India"]} />

        <CustomSelect
          label="State / Union Territory"
          value={profile.state}
          placeholder="Select state"
          options={states}
          onChange={selectState}
        />

        <CustomSelect
          label="City"
          value={profile.city}
          placeholder={profile.state ? "Select city" : "Select state first"}
          options={cities}
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
