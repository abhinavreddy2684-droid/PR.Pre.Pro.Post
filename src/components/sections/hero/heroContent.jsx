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

export const MORPH_ICONS = [
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

export const ORBIT_LABELS = [
  "Direction",
  "Screenplay",
  "Editing",
  "Music",
  "VFX",
  "Acting",
  "Cinematography",
  "Production",
];

export const TICKER_ITEMS = [
  ...ORBIT_LABELS,
  "Sound Design",
  "Color Grading",
  "Direction",
  "Production Design",
  "Distribution",
  ...ORBIT_LABELS,
  "Sound Design",
  "Color Grading",
];

// Copy and the few class strings that differ between the home hero and the onboarding intro.
export const HERO_CONTENT = {
  home: {
    badge: "The Marketplace for Filmmakers",
    lines: ["WE", "BUILD", "CINEMA."],
    tagline: "Filmmakers • Artists • Producers",
    description: (
      <>
        A premium cinematic ecosystem{" "}
        <span className="font-medium text-white">
          connecting directors, writers, cinematographers, editors, musicians,
        </span>{" "}
        actors, VFX artists, and production professionals across all{" "}
        <span className="font-medium text-amber-300">24 crafts of cinema.</span>
      </>
    ),
    action: "Explore Talent",
    headlineSize: "text-7xl md:text-9xl lg:text-[10rem] xl:text-[11rem]",
    descriptionClass: "text-xl leading-[1.9] lg:text-[1.35rem]",
    actionsMargin: "mt-12",
    layoutPadding: "pt-32",
  },
  onboarding: {
    badge: "The Talent Network",
    lines: ["BUILD", "YOUR PLACE", "IN CINEMA."],
    tagline: "Filmmakers • Artists • Creators",
    description: (
      <>
        Join the Talent Network and define{" "}
        <span className="font-medium text-white">
          who you are, what you do, and where you create.
        </span>{" "}
        Build the rest of your professional profile as your work grows.
      </>
    ),
    action: "Begin Your Journey",
    headlineSize: "text-6xl md:text-8xl lg:text-[7rem] xl:text-[8rem]",
    descriptionClass: "text-base leading-8 lg:text-lg lg:leading-8",
    actionsMargin: "mt-8",
    layoutPadding: "pt-28 lg:pt-24",
  },
};
