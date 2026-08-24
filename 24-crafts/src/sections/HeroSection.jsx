import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import gsap from "gsap";

import {
  Aperture,
  AudioWaveform,
  Camera,
  Clapperboard,
  Film,
  Mic2,
  MonitorPlay,
  Music,
  Palette,
  PenTool,
  Scissors,
  Sparkles,
  Theater,
  Video,
} from "lucide-react";

import Button from "../components/ui/Button";

const morphIcons = [
  Camera,
  Music,
  Film,
  Clapperboard,
  PenTool,
  Scissors,
  Mic2,
  Sparkles,
  Aperture,
  MonitorPlay,
  Palette,
  AudioWaveform,
  Theater,
  Video,
];

const orbitLabels = [
  "Direction",
  "Screenplay",
  "Editing",
  "Music",
  "VFX",
  "Acting",
  "Cinematography",
  "Production",
];

export default function HeroSection() {
  const [activeIcon, setActiveIcon] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) =>
        prev === morphIcons.length - 1 ? 0 : prev + 1
      );
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 50;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 50;

      gsap.to(".hero-parallax", {
        x,
        y,
        duration: 1.8,
        ease: "power3.out",
      });

      gsap.to(".hero-lens", {
        x: x * -0.3,
        y: y * -0.3,
        duration: 2,
        ease: "power3.out",
      });
    };

    hero.addEventListener("mousemove", handleMouseMove);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#040404]"
    >
      {/* BASE */}
      <div className="absolute inset-0 bg-black" />

      {/* AMBIENT GLOW */}
      <div
        className="absolute left-1/2 top-1/2 h-[1400px] w-[1400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[200px]"
      />

      {/* LIGHT SHAFT */}
      <div
        className="absolute left-[10%] top-[-20%] h-[160%] w-[520px] rotate-[22deg] bg-gradient-to-b from-amber-400/10 to-transparent blur-3xl"
      />

      {/* FILM GRAIN */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-[0.03]" />

      {/* SCANLINES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.04)_50%)] bg-[length:100%_4px] opacity-10" />

      {/* SIDE FILM STRIPS */}
      <div className="absolute bottom-0 left-0 top-0 hidden w-12 flex-col items-center border-r border-white/10 opacity-20 lg:flex">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="mt-4 h-4 w-6 rounded-sm border border-white/30" />
        ))}
      </div>

      <div className="absolute bottom-0 right-0 top-0 hidden w-12 flex-col items-center border-l border-white/10 opacity-20 lg:flex">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="mt-4 h-4 w-6 rounded-sm border border-white/30" />
        ))}
      </div>

      {/* MAIN LAYOUT */}
      <div className="relative z-20 mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 items-center gap-4 px-8 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 xl:px-16">
        {/* LEFT CONTENT */}
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10 inline-flex items-center gap-3 border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-xl"
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-amber-300">
              The Marketplace for Filmmakers
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="leading-[0.82] tracking-tight"
          >
            <span className="block text-7xl font-black text-white md:text-9xl lg:text-[10rem] xl:text-[11rem]">
              WE
            </span>
            <span className="block bg-gradient-to-r from-amber-300 via-amber-100 to-amber-500 bg-clip-text text-7xl font-black text-transparent md:text-9xl lg:text-[10rem] xl:text-[11rem]">
              BUILD
            </span>
            <span className="block text-7xl font-black text-white md:text-9xl lg:text-[10rem] xl:text-[11rem]">
              CINEMA.
            </span>
          </motion.h1>

          <div className="mb-8 mt-10 flex items-center gap-5">
            <div className="h-px w-28 bg-gradient-to-r from-amber-500 to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/35">
              Filmmakers • Artists • Producers
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl text-xl leading-[1.9] text-white/55 lg:text-[1.35rem]"
          >
            A premium cinematic ecosystem{" "}
            <span className="font-medium text-white">
              connecting directors, writers, cinematographers, editors, musicians,
            </span>{" "}
            actors, VFX artists, and production professionals across all{" "}
            <span className="font-medium text-amber-300">
              24 crafts of cinema.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-col gap-5 sm:flex-row"
          >
            <Button>Explore Crafts</Button>
            <Button variant="secondary">Enter Talent Network</Button>
          </motion.div>
        </div>

        {/* RIGHT LENS */}
        <div className="hero-lens relative hidden items-center justify-center lg:flex">
          <div className="relative h-[640px] w-[640px]">
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[130px]" />

            <div className="absolute left-[-80px] right-[-80px] top-1/2 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            <div className="absolute bottom-[-80px] left-1/2 top-[-80px] w-px bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-white/[0.04]"
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[80px] rounded-full border border-amber-500/[0.08]"
            />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[170px] rounded-full border border-amber-500/[0.14]"
            />

            {orbitLabels.map((label, index) => {
              const angle = (index / orbitLabels.length) * Math.PI * 2;
              const radius = 270;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={label}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6 + index, repeat: Infinity }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-white/10 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-amber-300/70 shadow-[0_0_30px_rgba(245,158,11,0.06)] backdrop-blur-xl"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                >
                  {label}
                </motion.div>
              );
            })}

            <div className="absolute left-1/2 top-1/2 flex h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-amber-500/20 bg-black/40 shadow-[0_0_140px_rgba(245,158,11,0.12)] backdrop-blur-2xl">
              <motion.div
                animate={{ opacity: [0.2, 0.55, 0.2], scale: [1, 1.08, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-amber-500/10 blur-3xl"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIcon}
                  initial={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.4, filter: "blur(18px)" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute text-amber-300"
                >
                  {(() => {
                    const Icon = morphIcons[activeIcon];
                    return <Icon size={100} strokeWidth={1.4} />;
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CINEMATIC TICKER */}
      <div className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden border-t border-white/5 bg-black/50 py-5 backdrop-blur-2xl">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex w-max"
        >
          {[
            ...orbitLabels,
            "Sound Design",
            "Color Grading",
            "Direction",
            "Production Design",
            "Distribution",
            ...orbitLabels,
            "Sound Design",
            "Color Grading",
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-5 whitespace-nowrap border-r border-white/5 px-10 text-[11px] uppercase tracking-[0.35em] text-white/45"
            >
              <span className="text-xs text-amber-400">✦</span>
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
