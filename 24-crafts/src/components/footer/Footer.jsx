import {
  Camera,
  Play,
  Briefcase,
  Mail,
} from "lucide-react";

const links = [
  "Home",
  "Crafts",
  "Talent Network",
  "Productions",
  "About",
  "Contact",
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 overflow-hidden">
      
      {/* Ambient */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.08),transparent_40%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20">
        
        {/* Top */}

        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* Brand */}

          <div>
            <h2 className="text-4xl font-black uppercase tracking-[0.3em] text-amber-400">
              24 Crafts
            </h2>

            <p className="mt-6 text-neutral-400 leading-relaxed max-w-md">
              A cinematic marketplace connecting filmmakers,
              artists, storytellers, and production professionals
              across all 24 crafts of cinema.
            </p>

            {/* Social */}

            <div className="flex items-center gap-5 mt-8">
              {[Camera, Play, Briefcase, Mail].map((Icon, index) => (
                <button
                  key={index}
                  className="
                    w-12 h-12 rounded-full
                    border border-white/10
                    bg-white/5
                    hover:border-amber-500/40
                    hover:bg-amber-500/10
                    transition-all duration-300
                    flex items-center justify-center
                  "
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}

          <div>
            <h3 className="text-white text-lg font-semibold uppercase tracking-[0.2em]">
              Navigation
            </h3>

            <div className="mt-8 flex flex-col gap-5">
              {links.map((item) => (
                <a
                  key={item}
                  href="/"
                  className="
                    text-neutral-400
                    hover:text-amber-400
                    transition-all duration-300
                    uppercase tracking-[0.18em]
                    text-sm
                  "
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Statement */}

          <div>
            <h3 className="text-white text-lg font-semibold uppercase tracking-[0.2em]">
              Storytelling First
            </h3>

            <div className="mt-8 space-y-5 text-neutral-400 leading-relaxed">
              <p>
                Cinema is collaboration.
              </p>

              <p>
                From screenplay to final color grading,
                every frame is shaped by artists.
              </p>

              <p>
                We exist to connect creators with the
                talent required to bring stories to life.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <p className="text-neutral-500 text-sm uppercase tracking-[0.18em]">
            © 2026 — 24 Crafts Of Cinema
          </p>

          <p className="text-neutral-600 text-xs uppercase tracking-[0.25em]">
            Built For Storytellers Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}