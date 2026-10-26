import { Bell, BriefcaseBusiness, CalendarDays, FileText, Image, UserRound } from "lucide-react";

/** Settings sections in menu order. `eyebrow` is the small label above the section title. */
export const SETTINGS_SECTIONS = [
  {
    id: "professional",
    eyebrow: "Profile",
    icon: UserRound,
    label: "Professional details",
    description: "Name, bio, location and profile information",
  },
  {
    id: "crafts",
    eyebrow: "Profile",
    icon: BriefcaseBusiness,
    label: "Crafts",
    description: "Manage your primary and supporting crafts",
  },
  {
    id: "media",
    eyebrow: "Portfolio",
    icon: Image,
    label: "Media management",
    description: "Upload, edit and organise your public work",
  },
  {
    id: "experience",
    eyebrow: "Career",
    icon: FileText,
    label: "Experience & credits",
    description: "Manage your professional history and credits",
  },
  {
    id: "calendar",
    eyebrow: "Availability",
    icon: CalendarDays,
    label: "Availability calendar",
    description: "Manage the next 90 days of availability",
  },
  {
    id: "notifications",
    eyebrow: "Account",
    icon: Bell,
    label: "Notifications",
    description: "Choose what you want to hear about",
  },
];
