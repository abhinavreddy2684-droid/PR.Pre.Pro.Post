import {
  Camera,
  Play,
  Briefcase,
  Mail,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const links = [
  { label: "Home", href: "/" },
  { label: "Crafts", href: "/#cinema-reel" },
  { label: "Talent Network", href: "/talent" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (event, href) => {
    const url = new URL(href, window.location.origin);

    if (location.pathname !== url.pathname) return;

    event.preventDefault();

    if (url.hash) {
      document.getElementById(url.hash.slice(1))?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      if (window.location.hash !== url.hash) {
        navigate(`${url.pathname}${url.hash}`);
      }
      return;
    }

    if (window.location.hash) {
      navigate(url.pathname);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.08),transparent_40%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-12 sm:py-14 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-[0.3em] text-amber-400">
              24 Crafts
            </h2>

            <p className="mt-4 sm:mt-5 text-neutral-400 leading-relaxed max-w-md">
              A cinematic marketplace connecting filmmakers,
              artists, storytellers, and production professionals
              across all 24 crafts of cinema.
            </p>

            <div className="flex items-center gap-4 mt-6">
              {[Camera, Play, Briefcase, Mail].map((Icon, index) => (
                <button
                  key={index}
                  className="w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:border-amber-500/40 hover:bg-amber-500/10 transition-all duration-300 flex items-center justify-center"
                >
                  <Icon size={17} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold uppercase tracking-[0.2em]">Navigation</h3>
            <div className="mt-5 flex flex-col gap-3.5">
              {links.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={(event) => handleNavigation(event, item.href)}
                  className="text-neutral-400 hover:text-amber-400 transition-all duration-300 uppercase tracking-[0.18em] text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold uppercase tracking-[0.2em]">Storytelling First</h3>
            <div className="mt-5 space-y-3.5 text-neutral-400 leading-relaxed">
              <p>Cinema is collaboration.</p>
              <p>From screenplay to final color grading, every frame is shaped by artists.</p>
              <p>We exist to connect creators with the talent required to bring stories to life.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm uppercase tracking-[0.18em]">© 2026 — 24 Crafts Of Cinema</p>
          <p className="text-neutral-600 text-xs uppercase tracking-[0.25em]">Built For Storytellers Worldwide</p>
        </div>
      </div>
    </footer>
  );
}
