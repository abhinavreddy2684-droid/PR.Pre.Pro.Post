import { FileText, Image as ImageIcon, Link2, Music2, Video } from "lucide-react";

/** Icon per gallery item kind (the API's media kinds, and "link"). */
export const KIND_ICON = {
  image: ImageIcon,
  audio: Music2,
  video: Video,
  pdf: FileText,
  link: Link2,
};
