import { getOwnerTalent } from "@/features/talent/data/ownerTalent";
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

export function getInitialSettings() {
  const talent = getOwnerTalent() || {};
  const stored = readStoredSettings();
  return {
    professional: {
      name: stored?.professional?.name ?? talent.name ?? "",
      location: stored?.professional?.location ?? talent.location ?? "",
      experience: stored?.professional?.experience ?? talent.experience ?? "",
      bio: stored?.professional?.bio ?? talent.bio ?? "",
    },
    crafts: {
      primary: stored?.crafts?.primary ?? talent.craft ?? "",
      supporting: stored?.crafts?.supporting ?? [],
      genres: stored?.crafts?.genres ?? talent.genres ?? [],
    },
    media: stored?.media ?? talent.media ?? FALLBACK_MEDIA,
    experiences: stored?.experiences ?? talent.experiences ?? [],
    availability: stored?.availability ?? {},
    notifications: { ...DEFAULT_NOTIFICATIONS, ...(stored?.notifications || {}) },
  };
}
