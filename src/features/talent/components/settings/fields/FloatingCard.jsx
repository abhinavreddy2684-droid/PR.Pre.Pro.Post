export default function FloatingCard({ title, description, children, className = "" }) {
  return (
    <section
      className={`rounded-[1.75rem] bg-white/[0.025] p-5 shadow-[0_20px_70px_rgba(0,0,0,.12)] sm:p-6 ${className}`}
    >
      <h3 className="text-sm font-semibold text-white/85">{title}</h3>
      {description && (
        <p className="mt-1 max-w-2xl text-xs leading-5 text-white/30">{description}</p>
      )}
      <div className="mt-5">{children}</div>
    </section>
  );
}
