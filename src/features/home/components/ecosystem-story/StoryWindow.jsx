export default function StoryWindow({ children, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-[1.25rem] border border-white/[0.09] bg-[#090909] shadow-[0_28px_80px_rgba(0,0,0,0.34)] ${className}`}
    >
      <div className="flex h-9 items-center gap-1.5 border-b border-white/[0.07] px-3 sm:px-4">
        <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
        <span className="ml-2 text-[6px] uppercase tracking-[0.25em] text-neutral-700">
          pre pro post · ecosystem
        </span>
      </div>
      {children}
    </div>
  );
}
