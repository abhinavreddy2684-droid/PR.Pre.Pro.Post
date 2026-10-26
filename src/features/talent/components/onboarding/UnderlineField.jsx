export default function UnderlineField({ label, required, optional, ...props }) {
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
