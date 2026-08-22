export default function CinemaReelCTAButton({ children = "Create Your Account" }) {
  return (
    <a
      href="/register"
      className="group inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-black font-bold text-base md:text-lg py-4 px-9 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(245,158,11,0.22)]"
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </a>
  );
}
