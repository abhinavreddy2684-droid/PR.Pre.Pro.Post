/** "PR" badge, wordmark and the "Talent onboarding" caption shown in the onboarding headers. */
export default function OnboardingBrand() {
  return (
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
  );
}
