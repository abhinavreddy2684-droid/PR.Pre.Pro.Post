import { readStoredSettings } from "@/features/talent/data/settingsStorage";

const FALLBACK_MEDIA = [
  {
    id: "media-1",
    title: "Featured performance",
    description: "A live vocal performance recorded during a recent production session.",
    type: "Video",
    year: 2026,
  },
  {
    id: "media-2",
    title: "Studio session",
    description: "A studio recording session focused on an intimate cinematic vocal arrangement.",
    type: "Audio",
    year: 2026,
  },
  {
    id: "media-3",
    title: "Behind the performance",
    description: "A quiet look at the preparation behind a feature-film recording.",
    type: "Image",
    year: 2025,
  },
];

export const DEFAULT_NOTIFICATIONS = {
  opportunities: true,
  profileActivity: true,
  platformUpdates: false,
};

// The settings panel is not reachable until it is wired to the API; it no longer seeds from a
// mock owner talent.
export function getInitialSettings() {
  const stored = readStoredSettings();
  return {
    professional: {
      name: stored?.professional?.name ?? "",
      location: stored?.professional?.location ?? "",
      experience: stored?.professional?.experience ?? "",
      bio: stored?.professional?.bio ?? "",
    },
    crafts: {
      primary: stored?.crafts?.primary ?? "",
      supporting: stored?.crafts?.supporting ?? [],
      genres: stored?.crafts?.genres ?? [],
    },
    media: stored?.media ?? FALLBACK_MEDIA,
    experiences: stored?.experiences ?? [],
    availability: stored?.availability ?? {},
    notifications: { ...DEFAULT_NOTIFICATIONS, ...(stored?.notifications || {}) },
  };
}
