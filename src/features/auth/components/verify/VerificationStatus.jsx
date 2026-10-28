/** Icon, caption and heading block used by every state of the verify-email page. */
export default function VerificationStatus({ icon: Icon, eyebrow, heading, children }) {
  return (
    <>
      <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-amber-400/20 bg-amber-400/[0.07] text-amber-300">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <p className="mb-2 text-[9px] uppercase tracking-[0.32em] text-amber-300/70">{eyebrow}</p>
      <h1 className="font-sans text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">
        {heading}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/65">{children}</p>
    </>
  );
}
