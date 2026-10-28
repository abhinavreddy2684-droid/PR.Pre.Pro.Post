import { useCatalog } from "@/catalog";
import SectionHeading from "@/components/ui/SectionHeading";
import { userMessage } from "@/lib/api";
import { toGalleryItem } from "@/features/talent/api/galleryAdapters";
import GalleryCard from "@/features/talent/components/gallery/GalleryCard";
import LikeButton from "@/features/talent/components/gallery/LikeButton";
import useGalleryLikes from "@/features/talent/hooks/useGalleryLikes";
import usePublicGallery from "@/features/talent/hooks/usePublicGallery";

/** A talent's approved work (GET /api/talent/{id}/gallery) with like counts. Hidden when empty. */
export default function PublicGallery({ talentId, talentName }) {
  const { craftBySlug } = useCatalog();
  const { status, items, error, retry } = usePublicGallery(talentId);
  const likes = useGalleryLikes();

  if (status === "loading") return null;
  if (status === "ready" && items.length === 0) return null;

  return (
    <section id="work" className="mt-32 scroll-mt-24">
      <SectionHeading
        eyebrow="01 / The Work"
        title="The Work Speaks First"
        subtitle={`Performances, recordings and moments from ${talentName}'s professional work.`}
      />
      {status === "error" ? (
        <div role="alert" className="mt-10 space-y-3 text-sm text-red-300">
          <p>{userMessage(error)}</p>
          <button
            type="button"
            onClick={retry}
            className="rounded-full bg-white/5 px-4 py-2 text-xs text-white/70 hover:text-white"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((entry) => {
            const item = toGalleryItem(entry, craftBySlug);
            return (
              <GalleryCard
                key={item.id}
                item={item}
                footer={<LikeButton item={item} likes={likes} />}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
