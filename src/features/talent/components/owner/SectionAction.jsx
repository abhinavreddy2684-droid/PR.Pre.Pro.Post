/** Small pill action beside an owner section heading. */
export default function SectionAction({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/65 transition duration-300 hover:-translate-y-0.5 hover:bg-amber-500 hover:text-black hover:shadow-[0_0_28px_rgba(245,158,11,0.22)]"
    >
      {children}
    </button>
  );
}
