import { Images } from "lucide-react";
import { userMessage } from "@/lib/api";
import { useCatalog } from "@/catalog";
import SectionHeading from "@/components/ui/SectionHeading";
import { GALLERY_MAX_ITEMS } from "@/features/talent/api/galleryRules";
import { toGalleryItem } from "@/features/talent/api/galleryAdapters";
import GalleryCard from "@/features/talent/components/gallery/GalleryCard";
import GalleryFailures from "@/features/talent/components/gallery/GalleryFailures";
import StageBadge from "@/features/talent/components/media/StageBadge";
import StageNotes from "@/features/talent/components/media/StageNotes";
import UploadProgress from "@/features/talent/components/media/UploadProgress";
import SectionAction from "@/features/talent/components/owner/SectionAction";
import useOwnerTalent from "@/features/talent/hooks/useOwnerTalent";

/**
 * The owner's gallery as visitors will see it, plus each item's stage (uploading, in review,
 * live, rejected ...) and why it was refused. Managing happens in settings.
 */
export default function OwnerGallery({ talent, onManage }) {
  const { gallery } = useOwnerTalent();
  const { craftBySlug } = useCatalog();

  return (
    <section id="work" className="mt-32 scroll-mt-24">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="01 / My Gallery"
          title="The Work Speaks First"
          subtitle={`Performances, recordings and moments from ${talent.name}'s professional work. New work is reviewed before it appears publicly.`}
        />
        <div className="flex items-center gap-4">
          {gallery.status === "ready" && (
            <p className="text-xs text-white/45">
              {gallery.slotsUsed} of {GALLERY_MAX_ITEMS} slots used
            </p>
          )}
          <SectionAction onClick={onManage}>
            <Images size={13} />
            Manage gallery
          </SectionAction>
        </div>
      </div>

      <div className="mt-8">
        <GalleryFailures failures={gallery.failures} onDismiss={gallery.dismissFailure} />
      </div>

      {gallery.status === "loading" && (
        <p className="mt-10 text-sm text-neutral-500">Loading your gallery…</p>
      )}
      {gallery.status === "error" && (
        <div role="alert" className="mt-10 space-y-3 text-sm text-red-300">
          <p>{userMessage(gallery.error)}</p>
          <button
            type="button"
            onClick={gallery.retry}
            className="rounded-full bg-white/5 px-4 py-2 text-xs text-white/70 hover:text-white"
          >
            Try again
          </button>
        </div>
      )}
      {gallery.status === "ready" && gallery.items.length === 0 && (
        <p className="mt-10 rounded-[2rem] bg-white/[0.03] p-8 text-sm text-neutral-400">
          Your gallery is empty. Add a file or a link from Manage gallery.
        </p>
      )}
      {gallery.status === "ready" && gallery.items.length > 0 && (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gallery.items.map((entry) => {
            const item = toGalleryItem(entry, craftBySlug);
            const upload = gallery.uploads[item.id];
            return (
              <GalleryCard
                key={item.id}
                item={item}
                badge={<StageBadge stage={item.stage} className="backdrop-blur-xl" />}
                footer={
                  <div className="space-y-3">
                    {upload && <UploadProgress phase={upload.phase} fraction={upload.fraction} />}
                    <StageNotes
                      stage={item.stage}
                      moderationReason={item.moderationReason}
                      moderationNote={item.moderationNote}
                      failureReason={item.failureReason}
                    />
                    <p className="text-xs text-white/35">{item.likesCount} likes</p>
                  </div>
                }
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
