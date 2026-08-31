import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, MapPin, Search, Upload, UserRound } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import HeroSection from "../sections/HeroSection";
import Button from "../components/ui/Button";
import crafts from "../data/crafts";
import indiaLocations from "../data/indiaLocations";

const steps = [
  { number: "01", label: "Identity" },
  { number: "02", label: "Craft" },
  { number: "03", label: "Location" },
];

const initialProfile = {
  fullName: "",
  professionalName: "",
  photo: "",
  primaryCraft: "",
  supportingCrafts: [],
  state: "",
  city: "",
};

export default function TalentOnboarding() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState(initialProfile);
  const navigate = useNavigate();

  const updateProfile = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const toggleSupportingCraft = (craft) => {
    setProfile((current) => ({
      ...current,
      supportingCrafts: current.supportingCrafts.includes(craft)
        ? current.supportingCrafts.filter((item) => item !== craft)
        : [...current.supportingCrafts, craft],
    }));
  };

  if (step === 0) {
    return <HeroSection variant="onboarding" onPrimaryAction={() => setStep(1)} />;
  }

  if (step === 4) {
    return <Completion profile={profile} onEnter={() => navigate("/talent")} />;
  }

  return (
    <OnboardingShell
      step={step}
      profile={profile}
      onBack={() => setStep((current) => (current === 1 ? 0 : current - 1))}
    >
      <AnimatePresence mode="wait">
        {step === 1 && (
          <IdentityStep
            key="identity"
            profile={profile}
            updateProfile={updateProfile}
            onContinue={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <CraftStep
            key="craft"
            profile={profile}
            updateProfile={updateProfile}
            toggleSupportingCraft={toggleSupportingCraft}
            onContinue={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <LocationStep
            key="location"
            profile={profile}
            updateProfile={updateProfile}
            onContinue={() => setStep(4)}
          />
        )}
      </AnimatePresence>
    </OnboardingShell>
  );
}

function OnboardingShell({ step, profile, onBack, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040404] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(245,158,11,0.13),transparent_32%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[22%] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-amber-500/[0.035] blur-[140px]" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full border border-amber-400/30 bg-amber-500/[0.07] text-sm tracking-wide text-amber-300">
            PR
          </div>
          <div>
            <p className="font-['Bebas_Neue'] text-2xl tracking-[0.24em] text-white sm:text-3xl">
              PRE PRO POST
            </p>
            <p className="mt-0.5 text-[9px] uppercase tracking-[0.34em] text-amber-300/55">
              Talent onboarding
            </p>
          </div>
        </div>

        <p className="hidden text-[10px] uppercase tracking-[0.3em] text-white/30 sm:block">
          Build your place in cinema
        </p>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-108px)] max-w-7xl flex-col px-6 pb-10 sm:px-10 lg:px-14">
        <div className="mb-8 grid grid-cols-3 gap-2 border-y border-white/[0.07] py-4 sm:mb-10 sm:gap-5">
          {steps.map((item, index) => {
            const isActive = step === index + 1;
            const isComplete = step > index + 1;

            return (
              <div key={item.number} className="min-w-0">
                <div className="mb-2 flex items-center gap-2">
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[9px] font-semibold ${
                    isComplete
                      ? "border-amber-400 bg-amber-400 text-black"
                      : isActive
                        ? "border-amber-400/70 text-amber-300"
                        : "border-white/10 text-white/25"
                  }`}>
                    {isComplete ? <Check size={12} /> : item.number}
                  </span>
                  <span className={`truncate text-[9px] uppercase tracking-[0.22em] sm:text-[10px] ${
                    isActive ? "text-white/80" : "text-white/25"
                  }`}>
                    {item.label}
                  </span>
                </div>
                <div className="h-px overflow-hidden bg-white/[0.06]">
                  <motion.div
                    initial={false}
                    animate={{ width: isComplete ? "100%" : isActive ? "58%" : "0%" }}
                    className="h-full bg-amber-400"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-1 flex-col">
          {children}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-white/[0.07] pt-5">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/35 transition-colors hover:text-amber-300"
          >
            <ArrowLeft size={15} />
            Back
          </button>

          <p className="text-[9px] uppercase tracking-[0.28em] text-white/20">
            {String(step).padStart(2, "0")} / 03
          </p>
        </div>
      </main>
    </div>
  );
}

function StepFrame({ eyebrow, title, description, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-6"
    >
      <div className="max-w-3xl">
        <p className="text-[10px] uppercase tracking-[0.35em] text-amber-300">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-5xl font-black leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
          {description}
        </p>
      </div>

      <div className="mt-10">{children}</div>
    </motion.section>
  );
}

function IdentityStep({ profile, updateProfile, onContinue }) {
  const inputRef = useRef(null);
  const canContinue = profile.fullName.trim().length > 1;

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    updateProfile("photo", URL.createObjectURL(file));
  };

  return (
    <StepFrame
      eyebrow="01 — Identity"
      title={<>WHO ARE<br />YOU?</>}
      description="Start with the name you want the cinema world to know you by. Your profile photo is optional — you can add or change it later."
    >
      <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="group relative mx-auto flex aspect-[4/5] w-full max-w-[290px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-dashed border-white/15 bg-white/[0.025] text-center transition-all hover:border-amber-400/50 hover:bg-amber-500/[0.04]"
        >
          {profile.photo ? (
            <img src={profile.photo} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <>
              <span className="grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-amber-300">
                <UserRound size={28} strokeWidth={1.4} />
              </span>
              <span className="mt-5 text-sm font-medium text-white/75">Add a profile photo</span>
              <span className="mt-2 text-xs text-white/30">Optional — you can do this later</span>
            </>
          )}
          <span className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-black/60 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/65 opacity-0 backdrop-blur-xl transition-opacity group-hover:opacity-100">
            <Upload size={13} />
            {profile.photo ? "Change photo" : "Choose photo"}
          </span>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
        </button>

        <div className="space-y-5">
          <Field
            label="Full name"
            required
            value={profile.fullName}
            onChange={(event) => updateProfile("fullName", event.target.value)}
            placeholder="Enter your full name"
            autoFocus
          />
          <Field
            label="Professional name"
            optional
            value={profile.professionalName}
            onChange={(event) => updateProfile("professionalName", event.target.value)}
            placeholder="The name you are professionally known by"
          />

          <div className="pt-3">
            <Button disabled={!canContinue} onClick={onContinue} className="inline-flex items-center gap-3 disabled:cursor-not-allowed disabled:opacity-35">
              Continue
              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </div>
    </StepFrame>
  );
}

function CraftStep({ profile, updateProfile, toggleSupportingCraft, onContinue }) {
  const [query, setQuery] = useState("");
  const canContinue = Boolean(profile.primaryCraft);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredCrafts = normalizedQuery
    ? crafts.filter((craft) => craft.title.toLowerCase().includes(normalizedQuery))
    : crafts;

  const primaryOptions = filteredCrafts;
  const supportingCraftOptions = filteredCrafts.filter((craft) => craft.title !== profile.primaryCraft);

  return (
    <StepFrame
      eyebrow="02 — Craft"
      title={<>WHAT DO YOU<br />BRING TO CINEMA?</>}
      description="Choose the craft that leads your professional identity. Then add any supporting crafts that complete the picture."
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-5 sm:p-7">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
        <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-amber-400/[0.07]" />
        <div className="pointer-events-none absolute -right-12 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full border border-amber-400/[0.09]" />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300">Find your frame</p>
              <p className="mt-2 text-sm leading-6 text-white/40">Search across the crafts of cinema, then build your combination.</p>
            </div>

            <label className="group flex w-full max-w-md items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-3 transition-colors focus-within:border-amber-400/45 lg:w-[360px]">
              <Search size={17} className="text-white/30 transition-colors group-focus-within:text-amber-300" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a craft..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
              />
            </label>
          </div>

          <div className="grid gap-7 lg:grid-cols-[1fr_1.15fr]">
            <section className="rounded-[1.6rem] border border-amber-400/15 bg-gradient-to-br from-amber-500/[0.07] to-transparent p-5 sm:p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">Primary craft</p>
                  <p className="mt-2 text-xs text-amber-300/70">Choose exactly one</p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-amber-400/20 bg-amber-500/[0.08] text-[10px] text-amber-300">01</span>
              </div>

              <div className="mb-5 min-h-[56px] rounded-2xl border border-white/[0.07] bg-black/25 px-4 py-3">
                <p className="text-[9px] uppercase tracking-[0.22em] text-white/25">Your lead frame</p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {profile.primaryCraft || "Choose your primary craft"}
                </p>
              </div>

              <CraftGroup
                options={primaryOptions}
                selected={profile.primaryCraft}
                onSelect={(title) => {
                  updateProfile("primaryCraft", title);
                  if (profile.supportingCrafts.includes(title)) {
                    updateProfile("supportingCrafts", profile.supportingCrafts.filter((item) => item !== title));
                  }
                }}
              />
            </section>

            <section className="relative overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-black/20 p-5 sm:p-6">
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-400/70 via-amber-400/15 to-transparent" />
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">Supporting crafts</p>
                  <p className="mt-2 text-xs text-white/35">Choose as many as genuinely support your work</p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-[10px] text-white/45">
                  {String(profile.supportingCrafts.length).padStart(2, "0")}
                </span>
              </div>

              <CraftGroup
                options={supportingCraftOptions}
                selected={profile.supportingCrafts}
                multiple
                onSelect={toggleSupportingCraft}
              />
            </section>
          </div>

          {filteredCrafts.length === 0 && (
            <p className="py-4 text-center text-sm text-white/35">No crafts match “{query}”.</p>
          )}

          <div className="flex items-center justify-between gap-5 border-t border-white/[0.07] pt-5">
            <p className="text-xs text-white/30">
              {profile.primaryCraft
                ? `Primary: ${profile.primaryCraft}`
                : "Select one primary craft to continue"}
            </p>
            <Button disabled={!canContinue} onClick={onContinue} className="inline-flex shrink-0 items-center gap-3 disabled:cursor-not-allowed disabled:opacity-35">
              Continue
              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </div>
    </StepFrame>
  );
}

function CraftGroup({ options, selected, multiple = false, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((craft, index) => {
        const isSelected = multiple ? selected.includes(craft.title) : selected === craft.title;

        return (
          <motion.button
            key={craft.id}
            type="button"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(index * 0.015, 0.18) }}
            onClick={() => onSelect(craft.title)}
            aria-pressed={isSelected}
            className={`rounded-full border px-4 py-2.5 text-sm transition-all duration-200 ${
              isSelected
                ? "border-amber-400 bg-amber-400 text-black shadow-[0_0_28px_rgba(245,158,11,0.16)]"
                : "border-white/10 bg-white/[0.025] text-white/55 hover:border-amber-400/35 hover:text-white/85"
            }`}
          >
            {craft.title}
          </motion.button>
        );
      })}
    </div>
  );
}

function LocationStep({ profile, updateProfile, onContinue }) {
  const states = useMemo(() => Object.keys(indiaLocations), []);
  const cities = profile.state ? indiaLocations[profile.state] : [];
  const canContinue = Boolean(profile.state && profile.city);

  const selectState = (value) => {
    updateProfile("state", value);
    updateProfile("city", "");
  };

  return (
    <StepFrame
      eyebrow="03 — Location"
      title={<>WHERE ARE YOU<br />LOCATED?</>}
      description="Your location is structured to keep the Talent Network consistent and searchable. India is currently the first supported country."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <CustomSelect
          label="Country"
          value="India"
          disabled
          options={["India"]}
        />

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
        <Button disabled={!canContinue} onClick={onContinue} className="inline-flex items-center gap-3 disabled:cursor-not-allowed disabled:opacity-35">
          Finish onboarding
          <ArrowRight size={17} />
        </Button>
      </div>
    </StepFrame>
  );
}

function CustomSelect({ label, value, options, placeholder = "Select an option", disabled = false, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-white/35">{label}</p>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className={`flex min-h-[76px] w-full items-center justify-between rounded-[1.35rem] border px-5 text-left transition-all ${
          open
            ? "border-amber-400/55 bg-amber-500/[0.05] shadow-[0_0_30px_rgba(245,158,11,0.06)]"
            : "border-white/10 bg-white/[0.025] hover:border-white/20"
        } ${disabled ? "cursor-not-allowed opacity-45" : ""}`}
      >
        <span className={value ? "text-base font-medium text-white" : "text-sm text-white/30"}>{value || placeholder}</span>
        <ChevronDown size={18} className={`text-amber-300 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 z-30 mt-2 max-h-72 overflow-y-auto rounded-[1.35rem] border border-amber-400/20 bg-[#0b0a08]/95 p-2 shadow-2xl backdrop-blur-2xl"
          >
            {options.map((option) => {
              const active = option === value;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange?.(option);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                    active
                      ? "bg-amber-400 text-black"
                      : "text-white/65 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {option}
                  {active && <Check size={15} />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, required, optional, ...props }) {
  return (
    <label className="block">
      <span className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/40">
        {label}
        {required && <span className="text-amber-300">*</span>}
        {optional && <span className="text-white/20">(optional)</span>}
      </span>
      <input
        className="w-full border-b border-white/15 bg-transparent px-0 py-4 text-xl text-white outline-none transition-colors placeholder:text-white/20 focus:border-amber-400"
        {...props}
      />
    </label>
  );
}

function Completion({ profile, onEnter }) {
  const displayName = profile.professionalName || profile.fullName;

  return (
    <div className="relative flex min-h-screen items-center overflow-hidden bg-[#040404] px-6 text-white sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(245,158,11,0.16),transparent_28%)]" />
      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto mb-8 grid h-16 w-16 place-items-center rounded-full border border-amber-400/40 bg-amber-500/[0.08] text-amber-300">
            <Check size={30} />
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300">Talent onboarding complete</p>
          <h1 className="mt-5 text-6xl font-black leading-[0.82] tracking-tight sm:text-8xl lg:text-[10rem]">
            YOU&apos;RE IN.
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-white/45">
            Your place in the Talent Network starts here. Your profile and portfolio can grow with your work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-10 grid max-w-3xl gap-px overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/10 text-left sm:grid-cols-3"
        >
          <SummaryItem label="Talent" value={displayName} />
          <SummaryItem label="Primary craft" value={profile.primaryCraft} />
          <SummaryItem label="Location" value={`${profile.city}, ${profile.state}`} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.5 }}
          className="mt-10"
        >
          <Button onClick={onEnter} className="inline-flex items-center gap-3">
            Enter Talent Network
            <ArrowRight size={17} />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="bg-[#080808] px-6 py-6">
      <p className="text-[9px] uppercase tracking-[0.24em] text-white/30">{label}</p>
      <p className="mt-3 truncate text-sm font-medium text-white/80">{value}</p>
    </div>
  );
}
