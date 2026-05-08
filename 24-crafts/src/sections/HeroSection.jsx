
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

const floatingIcons = [
  {
    Icon: Camera,
    position: "left-[3%] top-[12%]",
    size: "w-16 h-16",
    icon: 24,
    duration: 18,
  },

  {
    Icon: Music,
    position: "left-[9%] top-[40%]",
    size: "w-20 h-20",
    icon: 30,
    duration: 22,
  },

  {
    Icon: Film,
    position: "left-[18%] bottom-[14%]",
    size: "w-14 h-14",
    icon: 20,
    duration: 20,
  },

  {
    Icon: PenTool,
    position: "left-[24%] top-[18%]",
    size: "w-12 h-12",
    icon: 18,
    duration: 24,
  },

  {
    Icon: Clapperboard,
    position: "left-[28%] bottom-[8%]",
    size: "w-18 h-18",
    icon: 24,
    duration: 26,
  },

  {
    Icon: Palette,
    position: "left-[34%] bottom-[30%]",
    size: "w-12 h-12",
    icon: 18,
    duration: 21,
  },
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
  const [activeIcon, setActiveIcon] =
    useState(0);

  const heroRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) =>
        prev === morphIcons.length - 1
          ? 0
          : prev + 1
      );
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  // MOUSE MOVEMENT

  useEffect(() => {
    const hero = heroRef.current;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();

      const x =
        ((e.clientX - rect.left) / rect.width -
          0.5) *
        50;

      const y =
        ((e.clientY - rect.top) /
          rect.height -
          0.5) *
        50;

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

    hero.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      hero.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#040404]
      "
    >
      {/* BASE */}

      <div className="absolute inset-0 bg-black" />

      {/* AMBIENT GLOW */}

      <div
        className="
          absolute
          left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[1200px] h-[1200px]
          rounded-full
          bg-amber-500/10
          blur-[180px]
        "
      />

      {/* LIGHT SHAFT */}

      <div
        className="
          absolute
          top-[-20%]
          left-[10%]
          w-[520px]
          h-[160%]
          rotate-[22deg]
          bg-gradient-to-b
          from-amber-400/10
          to-transparent
          blur-3xl
        "
      />

      {/* FILM GRAIN */}

      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      {/* SCANLINES */}

      <div
        className="
          absolute inset-0
          opacity-10
          bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.04)_50%)]
          bg-[length:100%_4px]
        "
      />

      {/* SIDE FILM STRIPS */}

      <div
        className="
          absolute left-0 top-0 bottom-0
          hidden lg:flex
          w-12
          border-r border-white/10
          flex-col items-center
          opacity-20
        "
      >
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="
              mt-4
              w-6 h-4
              border border-white/30
              rounded-sm
            "
          />
        ))}
      </div>

      <div
        className="
          absolute right-0 top-0 bottom-0
          hidden lg:flex
          w-12
          border-l border-white/10
          flex-col items-center
          opacity-20
        "
      >
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="
              mt-4
              w-6 h-4
              border border-white/30
              rounded-sm
            "
          />
        ))}
      </div>

      {/* LEFT ICON ECOSYSTEM */}

      {/* <div className="absolute inset-0 hidden lg:block pointer-events-none">
        {floatingIcons.map((item, index) => {
          const Icon = item.Icon;

          return (
            <motion.div
              key={index}
              animate={{
                y: [0, -12, 0],
                rotate: [0, 4, -4, 0],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`
                hero-parallax
                absolute
                ${item.position}
              `}
            >
              <div
                className="
                  absolute inset-0
                  rounded-full
                  bg-amber-500/10
                  blur-3xl
                  scale-150
                "
              />

              <div
                className={`
                  relative
                  ${item.size}
                  rounded-full
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  flex items-center justify-center
                  shadow-[0_0_60px_rgba(245,158,11,0.08)]
                `}
              >
                <Icon
                  size={item.icon}
                  strokeWidth={1.4}
                  className="text-amber-300/28"
                />
              </div>
            </motion.div>
          );
        })}
      </div> */}

      {/* MAIN LAYOUT */}

      <div
        className="
          relative z-20
          min-h-screen
          max-w-7xl
          mx-auto
          grid lg:grid-cols-[1fr_1fr]
          items-center
          gap-10
          px-6 lg:px-12
          pt-32 pb-20
        "
      >
        {/* LEFT CONTENT */}

        <div className="relative z-10 max-w-2xl">
          {/* LABEL */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              inline-flex items-center gap-3
              px-5 py-3
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              mb-10
            "
          >
            <div
              className="
                w-2 h-2 rounded-full
                bg-amber-400 animate-pulse
              "
            />

            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.35em]
                text-amber-300
              "
            >
              The Marketplace for Filmmakers
            </span>
          </motion.div>

          {/* TITLE */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 60,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="leading-[0.85] tracking-tight"
          >
            <span
              className="
                block
                text-6xl md:text-8xl lg:text-[9rem]
                font-black
                text-white
              "
            >
              WE
            </span>

            <span
              className="
                block
                text-6xl md:text-8xl lg:text-[9rem]
                font-black
                bg-gradient-to-r
                from-amber-300
                via-amber-100
                to-amber-500
                text-transparent
                bg-clip-text
              "
            >
              BUILD
            </span>

            <span
              className="
                block
                text-6xl md:text-8xl lg:text-[9rem]
                font-black
                text-white
              "
            >
              CINEMA.
            </span>
          </motion.h1>

          {/* RULE */}

          <div className="flex items-center gap-5 mt-10 mb-8">
            <div
              className="
                w-24 h-px
                bg-gradient-to-r
                from-amber-500
                to-transparent
              "
            />

            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.35em]
                text-white/35
              "
            >
              Filmmakers • Artists • Producers
            </span>
          </div>

          {/* SUBTEXT */}

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.3,
            }}
            className="
              text-lg
              leading-[2]
              text-white/55
              max-w-lg
            "
          >
            A premium cinematic ecosystem{" "}

            <span
              className="
                text-white
                font-medium
              "
            >
              connecting directors,
              writers, cinematographers,
              editors, musicians,
            </span>{" "}

            actors, VFX artists,
            and production professionals
            across all{" "}

            <span
              className="
                text-amber-300
                font-medium
              "
            >
              24 crafts of cinema.
            </span>
          </motion.p>

          {/* BUTTONS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
            }}
            className="
              mt-12
              flex flex-col sm:flex-row
              gap-5
            "
          >
            <Button>
              Explore Crafts
            </Button>

            <Button variant="secondary">
              Enter Talent Network
            </Button>
          </motion.div>
        </div>

        {/* RIGHT LENS */}

        <div
          className="
            hero-lens
            relative
            hidden lg:flex
            items-center justify-center
          "
        >
          <div className="relative w-[560px] h-[560px]">
            {/* CINEMATIC LIGHT */}

            <div
              className="
                absolute left-1/2 top-1/2
                -translate-x-1/2 -translate-y-1/2
                w-[420px] h-[420px]
                rounded-full
                bg-amber-500/10
                blur-[120px]
              "
            />

            {/* DECORATION LINES */}

            <div
              className="
                absolute
                left-[-80px]
                right-[-80px]
                top-1/2
                h-px
                bg-gradient-to-r
                from-transparent
                via-amber-500/20
                to-transparent
              "
            />

            <div
              className="
                absolute
                top-[-80px]
                bottom-[-80px]
                left-1/2
                w-px
                bg-gradient-to-b
                from-transparent
                via-amber-500/20
                to-transparent
              "
            />

            {/* OUTER RING */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 120,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute inset-0
                rounded-full
                border border-white/[0.04]
              "
            />

            {/* MIDDLE RING */}

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 80,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute inset-[70px]
                rounded-full
                border border-amber-500/[0.08]
              "
            />

            {/* INNER RING */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 55,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute inset-[150px]
                rounded-full
                border border-amber-500/[0.14]
              "
            />

            {/* ORBIT LABELS */}

            {orbitLabels.map((label, index) => {
              const angle =
                (index / orbitLabels.length) *
                Math.PI *
                2;

              const radius = 235;

              const x = Math.cos(angle) * radius;

              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={label}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 6 + index,
                    repeat: Infinity,
                  }}
                  className="
                    absolute
                    -translate-x-1/2 -translate-y-1/2
                    px-3 py-2
                    border border-white/10
                    bg-black/40
                    backdrop-blur-xl
                    text-[10px]
                    uppercase
                    tracking-[0.22em]
                    text-amber-300/70
                    whitespace-nowrap
                    shadow-[0_0_30px_rgba(245,158,11,0.06)]
                  "
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                >
                  {label}
                </motion.div>
              );
            })}

            {/* CENTER CORE */}

            <div
              className="
                absolute left-1/2 top-1/2
                -translate-x-1/2 -translate-y-1/2
                w-[240px] h-[240px]
                rounded-full
                border border-amber-500/20
                bg-black/40
                backdrop-blur-2xl
                flex items-center justify-center
                shadow-[0_0_120px_rgba(245,158,11,0.12)]
              "
            >
              {/* GLOW */}

              <motion.div
                animate={{
                  opacity: [0.2, 0.55, 0.2],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
                className="
                  absolute inset-0
                  rounded-full
                  bg-amber-500/10
                  blur-3xl
                "
              />

              {/* MORPH ICON */}

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIcon}
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                    filter: "blur(12px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.4,
                    filter: "blur(18px)",
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="absolute text-amber-300"
                >
                  {(() => {
                    const Icon = morphIcons[activeIcon];

                    return (
                      <Icon
                        size={88}
                        strokeWidth={1.4}
                        className=""
                      />
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CINEMATIC TICKER */}

      <div
        className="
          absolute bottom-0 left-0 right-0
          border-t border-white/5
          bg-black/50
          backdrop-blur-2xl
          overflow-hidden
          py-5
          z-30
        "
      >
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
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
              className="
                flex items-center gap-5
                px-10
                text-[11px]
                uppercase
                tracking-[0.35em]
                text-white/45
                whitespace-nowrap
                border-r border-white/5
              "
            >
              <span className="text-amber-400 text-xs">
                ✦
              </span>

              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

