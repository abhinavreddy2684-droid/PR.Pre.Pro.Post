import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCatalog } from "@/catalog";
import { pad2 } from "@/lib/format";
import StepFrame from "@/features/talent/components/onboarding/StepFrame";
import CraftGroup from "@/features/talent/components/onboarding/CraftGroup";

export default function CraftStep({
  profile,
  selectPrimaryCraft,
  toggleSupportingCraft,
  onContinue,
}) {
  const [query, setQuery] = useState("");
  const canContinue = Boolean(profile.primaryCraft);
  const { crafts, craftBySlug } = useCatalog();
  const primaryTitle = craftBySlug(profile.primaryCraft)?.title;
  const normalizedQuery = query.trim().toLowerCase();
  const filteredCrafts = normalizedQuery
    ? crafts.filter((craft) => craft.title.toLowerCase().includes(normalizedQuery))
    : crafts;

  const supportingCraftOptions = filteredCrafts.filter(
    (craft) => craft.slug !== profile.primaryCraft,
  );

  return (
    <StepFrame
      eyebrow="02 — Craft"
      title={
        <>
          WHAT DO YOU
          <br />
          BRING TO CINEMA?
        </>
      }
      description="Choose the craft that leads your professional identity. Then add any supporting crafts that complete the picture."
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-5 sm:p-7">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
        <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-amber-400/[0.07]" />
        <div className="pointer-events-none absolute -right-12 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full border border-amber-400/[0.09]" />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300">
                Find your frame
              </p>
              <p className="mt-2 text-sm leading-6 text-white/40">
                Search across the crafts of cinema, then build your combination.
              </p>
            </div>

            <label className="group flex w-full max-w-md items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-3 transition-colors focus-within:border-amber-400/45 lg:w-[360px]">
              <Search
                size={17}
                className="text-white/30 transition-colors group-focus-within:text-amber-300"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a craft..."
                aria-label="Search a craft"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
              />
            </label>
          </div>

          <div className="grid gap-7 lg:grid-cols-[1fr_1.15fr]">
            <section className="rounded-[1.6rem] border border-amber-400/15 bg-gradient-to-br from-amber-500/[0.07] to-transparent p-5 sm:p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                    Primary craft
                  </p>
                  <p className="mt-2 text-xs text-amber-300/70">Choose exactly one</p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-amber-400/20 bg-amber-500/[0.08] text-[10px] text-amber-300">
                  01
                </span>
              </div>

              <div className="mb-5 min-h-[56px] rounded-2xl border border-white/[0.07] bg-black/25 px-4 py-3">
                <p className="text-[9px] uppercase tracking-[0.22em] text-white/25">
                  Your lead frame
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {primaryTitle || "Choose your primary craft"}
                </p>
              </div>

              <CraftGroup
                options={filteredCrafts}
                selected={profile.primaryCraft}
                onSelect={selectPrimaryCraft}
              />
            </section>

            <section className="relative overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-black/20 p-5 sm:p-6">
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-400/70 via-amber-400/15 to-transparent" />
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                    Supporting crafts
                  </p>
                  <p className="mt-2 text-xs text-white/35">
                    Choose as many as genuinely support your work
                  </p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-[10px] text-white/45">
                  {pad2(profile.supportingCrafts.length)}
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
              {primaryTitle ? `Primary: ${primaryTitle}` : "Select one primary craft to continue"}
            </p>
            <Button
              disabled={!canContinue}
              onClick={onContinue}
              className="inline-flex shrink-0 items-center gap-3 disabled:cursor-not-allowed disabled:opacity-35"
            >
              Continue
              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </div>
    </StepFrame>
  );
}
