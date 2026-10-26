import { Bell, BriefcaseBusiness, CalendarDays, FileText, Image, UserRound } from "lucide-react";
import { getOwnerTalent, readStoredSettings } from "@/features/talent/data";

export const sections = [
  {
    id: "professional",
    icon: UserRound,
    label: "Professional details",
    description: "Name, bio, location and profile information",
  },
  {
    id: "crafts",
    icon: BriefcaseBusiness,
    label: "Crafts",
    description: "Manage your primary and supporting crafts",
  },
  {
    id: "media",
    icon: Image,
    label: "Media management",
    description: "Upload, edit and organise your public work",
  },
  {
    id: "experience",
    icon: FileText,
    label: "Experience & credits",
    description: "Manage your professional history and credits",
  },
  {
    id: "calendar",
    icon: CalendarDays,
    label: "Availability calendar",
    description: "Manage the next 90 days of availability",
  },
  {
    id: "notifications",
    icon: Bell,
    label: "Notifications",
    description: "Choose what you want to hear about",
  },
];

const fallbackMedia = [
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

const defaultNotifications = { opportunities: true, profileActivity: true, platformUpdates: false };

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
    media: stored?.media ?? talent.media ?? fallbackMedia,
    experiences: stored?.experiences ?? talent.experiences ?? [],
    availability: stored?.availability ?? {},
    notifications: { ...defaultNotifications, ...(stored?.notifications || {}) },
  };
}
