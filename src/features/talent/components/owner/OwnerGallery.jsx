import { Upload } from "lucide-react";
import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { MEDIA_SEED } from "@/features/talent/data";
import OwnerMediaCard from "@/features/talent/components/owner/OwnerMediaCard";
import OwnerMediaEditor from "@/features/talent/components/owner/OwnerMediaEditor";
import GalleryToolbar from "@/features/talent/components/profile/GalleryToolbar";
import useMediaFilters from "@/features/talent/hooks/useMediaFilters";
import { mediaTypeFromFile } from "@/lib/media";

export default function OwnerGallery({ talent }) {
  const [media, setMedia] = useState(Array.isArray(talent.media) ? talent.media : MEDIA_SEED);
  const [editing, setEditing] = useState(null);
  const gallery = useMediaFilters(media);
  const upload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setMedia((items) => [
      {
        id: Date.now(),
        title: file.name.replace(/\.[^.]+$/, ""),
        description: "New portfolio work. Add a description and metadata.",
        type: mediaTypeFromFile(file),
        year: new Date().getFullYear(),
        likes: 0,
      },
      ...items,
    ]);
  };
  return (
    <section id="work" className="mt-32 scroll-mt-24">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="01 / My Gallery"
          title="The Work Speaks First"
          subtitle={`Performances, recordings and moments from ${talent.name}'s professional work.`}
        />
        <label className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_40px_rgba(245,158,11,0.25)] transition hover:-translate-y-0.5 hover:bg-amber-400">
          <Upload size={17} />
          Upload Your Work
          <input
            type="file"
            accept="image/*,video/*,audio/*"
            className="sr-only"
            onChange={upload}
          />
        </label>
      </div>
      <GalleryToolbar
        type={gallery.type}
        onTypeChange={gallery.setType}
        query={gallery.query}
        onQueryChange={gallery.setQuery}
        sort={gallery.sort}
        onSortChange={gallery.setSort}
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gallery.visible.map((item) => (
          <OwnerMediaCard
            key={item.id}
            item={item}
            talent={talent}
            onEdit={setEditing}
            onDelete={(selected) =>
              setMedia((items) => items.filter((item) => item.id !== selected.id))
            }
          />
        ))}
      </div>
      {gallery.hasMore && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={gallery.showMore}
            className="rounded-full bg-white/5 px-7 py-3 text-xs font-semibold text-white/60 hover:bg-white/10 hover:text-white"
          >
            More
          </button>
        </div>
      )}
      {editing && (
        <OwnerMediaEditor
          item={editing}
          onClose={() => setEditing(null)}
          onSave={(next) => {
            setMedia((items) => items.map((item) => (item.id === next.id ? next : item)));
            setEditing(null);
          }}
        />
      )}
    </section>
  );
}
