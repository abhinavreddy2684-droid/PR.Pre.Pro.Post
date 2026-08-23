import { motion } from "framer-motion";
import { Clapperboard, Film } from "lucide-react";

import SectionHeading from "../components/ui/SectionHeading";

const craftNodes = [
  { label: "Screenplay", className: "left-[8%] top-[18%]" },
  { label: "Cinematography", className: "right-[7%] top-[15%]" },
  { label: "Editing", className: "left-[5%] top-[46%]" },
  { label: "Sound", className: "right-[5%] top-[43%]" },
  { label: "Music", className: "left-[14%] bottom-[17%]" },
  { label: "VFX", className: "right-[13%] bottom-[18%]" },
  { label: "Acting", className: "left-[35%] bottom-[7%]" },
  { label: "Direction", className: "right-[34%] bottom-[7%]" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-20 sm:py-24 lg:py-28 px-6"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div>
          <SectionHeading
            eyebrow="About The Ecosystem"
            title={
              <>
                A Gateway Into
                <br />
                The World Of
                <br />
                Filmmaking.
              </>
            }
          />

          <div className="mt-8 space-y-6 text-neutral-400 text-lg leading-relaxed">
            <p>
              24 Crafts of Cinema is more than a portfolio platform.
              It is a creative ecosystem designed to bridge filmmakers
              with elite cinema talent.
            </p>

            <p>
              From screenplay and cinematography to editing,
              sound design, VFX, music composition, acting,
              and production management — every craft exists
              under one cinematic network.
            </p>

            <p>
              Built with a storytelling-first philosophy, the platform
              empowers collaboration, production partnerships, and artistic discovery.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.16),transparent_52%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.025)_50%,transparent_100%)]" />

            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-40" aria-hidden="true">
              <defs>
                <linearGradient id="about-network-line" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(245,158,11,0.05)" />
                  <stop offset="50%" stopColor="rgba(245,158,11,0.55)" />
                  <stop offset="100%" stopColor="rgba(245,158,11,0.05)" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="29" fill="none" stroke="url(#about-network-line)" strokeWidth="0.25" strokeDasharray="1.5 2.5" />
              <circle cx="50" cy="50" r="39" fill="none" stroke="url(#about-network-line)" strokeWidth="0.18" strokeDasharray="1 3" />
              <path d="M50 50 L18 20 M50 50 L82 18 M50 50 L14 50 M50 50 L86 47 M50 50 L23 81 M50 50 L78 80 M50 50 L40 91 M50 50 L61 91" stroke="url(#about-network-line)" strokeWidth="0.22" />
            </svg>

            <motion.div
              animate={{ scale: [1, 1.025, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-amber-500/30 bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_70px_rgba(245,158,11,0.12)]"
            >
              <Film size={24} className="text-amber-400 mb-3" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400">24 Crafts</span>
              <span className="mt-1 text-xs text-white/80">One Ecosystem</span>
            </motion.div>

            {craftNodes.map((node, index) => (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className={`absolute ${node.className} px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border border-white/10 bg-black/55 backdrop-blur-md text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-neutral-300 whitespace-nowrap`}
              >
                {node.label}
              </motion.div>
            ))}

            <div className="absolute left-1/2 bottom-5 -translate-x-1/2 flex items-center gap-2 text-[9px] uppercase tracking-[0.28em] text-neutral-600 whitespace-nowrap">
              <Clapperboard size={12} />
              Every frame starts with collaboration
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
