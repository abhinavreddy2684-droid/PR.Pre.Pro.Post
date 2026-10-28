import { motion } from "framer-motion";
import { useCatalog } from "@/catalog";
import GalleryVisual from "@/features/talent/components/gallery/GalleryVisual";

/**
 * One gallery item as a card. `badge` shows over the corner of the picture; `footer` goes under
 * the details (likes on the public gallery, stage and reasons on the owner's).
 * @param {{ item: ReturnType<typeof import("@/features/talent/api/galleryAdapters").toGalleryItem>,
 *   badge?: import("react").ReactNode, footer?: import("react").ReactNode }} props
 */
export default function GalleryCard({ item, badge, footer }) {
  const { enumLabel } = useCatalog();
  const kindLabel = item.isLink ? "Link" : enumLabel("media_kinds", item.kind);

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65 }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white/[0.03] shadow-[0_20px_70px_rgba(0,0,0,0.22)]"
    >
      <div className="relative">
        <GalleryVisual item={item} />
        <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white/75 backdrop-blur-xl">
          {kindLabel}
        </span>
        {item.year && (
          <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-black/40 px-3 py-2 text-[9px] text-white/60 backdrop-blur-xl">
            {item.year}
          </span>
        )}
        {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold tracking-tight text-white">{item.title}</h3>
        {item.description && (
          <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm leading-6 text-neutral-400">
            {item.description}
          </p>
        )}
        {item.craftTitle && (
          <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-white/35">
            {item.craftTitle}
          </p>
        )}
        {footer && <div className="mt-auto pt-5">{footer}</div>}
      </div>
    </motion.article>
  );
}
