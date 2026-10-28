import { ExternalLink } from "lucide-react";
import { KIND_ICON } from "@/features/talent/components/gallery/kindIcons";

const LINK_CLASS =
  "inline-flex items-center gap-2 rounded-full bg-black/55 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-xl transition hover:bg-amber-500 hover:text-black";

function Placeholder({ kind, children }) {
  const Icon = KIND_ICON[kind] ?? KIND_ICON.image;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-neutral-800 to-neutral-950 text-white/25">
      <Icon size={44} strokeWidth={1.2} aria-hidden="true" />
      {children}
    </div>
  );
}

/**
 * The picture, player or link of one gallery item, inside a 16:11 frame. Files play or open from
 * their signed URL (which expires; the list is refetched before that); links open the external
 * site in a new tab.
 * @param {{ item: ReturnType<typeof import("@/features/talent/api/galleryAdapters").toGalleryItem> }} props
 */
export default function GalleryVisual({ item }) {
  let content;
  if (item.isLink) {
    content = (
      <Placeholder kind="link">
        {item.externalUrl && (
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
          >
            Open on {item.provider} <ExternalLink size={12} aria-hidden="true" />
          </a>
        )}
      </Placeholder>
    );
  } else if (item.kind === "image" && (item.thumbUrl || item.fileUrl)) {
    content = (
      <a
        href={item.fileUrl ?? item.thumbUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${item.title} full size`}
        className="absolute inset-0"
      >
        <img
          src={item.thumbUrl ?? item.fileUrl}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      </a>
    );
  } else if (item.kind === "video" && item.fileUrl) {
    content = (
      <video
        src={item.fileUrl}
        controls
        playsInline
        preload="metadata"
        aria-label={item.title}
        className="absolute inset-0 h-full w-full bg-black object-contain"
      />
    );
  } else if (item.kind === "audio" && item.fileUrl) {
    content = (
      <Placeholder kind="audio">
        <audio
          src={item.fileUrl}
          controls
          preload="none"
          aria-label={item.title}
          className="w-[85%]"
        />
      </Placeholder>
    );
  } else if (item.kind === "pdf" && item.fileUrl) {
    content = (
      <Placeholder kind="pdf">
        <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          Open PDF <ExternalLink size={12} aria-hidden="true" />
        </a>
      </Placeholder>
    );
  } else {
    content = <Placeholder kind={item.kind} />;
  }

  return <div className="relative aspect-[16/11] overflow-hidden bg-neutral-900">{content}</div>;
}
