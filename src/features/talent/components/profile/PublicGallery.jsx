import { Upload } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { MEDIA_SEED } from "@/features/talent/data";
import UploadControl from "@/features/talent/components/profile/UploadControl";
import PublicMediaCard from "@/features/talent/components/profile/PublicMediaCard";
import GalleryToolbar from "@/features/talent/components/profile/GalleryToolbar";
import useMediaFilters from "@/features/talent/hooks/useMediaFilters";

export default function PublicGallery({ talent }) {
  const [uploadName, setUploadName] = useState("");
  const media = Array.isArray(talent.media) ? talent.media : MEDIA_SEED;
  const gallery = useMediaFilters(media);
  const handleUpload = (event) => setUploadName(event.target.files?.[0]?.name || "");

  return (
    <section id="work" className="mt-32 scroll-mt-24">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="01 / My Gallery"
          title="The Work Speaks First"
          subtitle={`Performances, recordings and moments from ${talent.name}'s professional work.`}
        />
        {media.length > 0 && <UploadControl prominent onChange={handleUpload} />}
      </div>
      {media.length > 0 ? (
        <>
          <GalleryToolbar
            type={gallery.type}
            onTypeChange={gallery.setType}
            query={gallery.query}
            onQueryChange={gallery.setQuery}
            sort={gallery.sort}
            onSortChange={gallery.setSort}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gallery.visible.map((item, index) => (
              <PublicMediaCard key={item.id} item={{ ...item, id: index + 1 }} talent={talent} />
            ))}
          </div>
          {gallery.visible.length === 0 && (
            <div className="mt-10 rounded-[2rem] bg-white/[0.03] py-20 text-center text-sm text-neutral-400">
              No media matches your search.
            </div>
          )}
          <div className="mt-10 flex flex-col items-center gap-3">
            {gallery.hasMore && (
              <button
                type="button"
                onClick={gallery.showMore}
                className="rounded-full bg-white/5 px-7 py-3 text-xs font-semibold text-white/60 hover:bg-white/10 hover:text-white"
              >
                More
              </button>
            )}
            {uploadName && <p className="text-xs text-neutral-500">Selected: {uploadName}</p>}
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-[2rem] bg-white/[0.03] p-12 text-center sm:p-20"
        >
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-amber-500/10 text-amber-400">
            <Upload size={30} />
          </div>
          <h3 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl">
            Put your work in the frame.
          </h3>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-400">
            Add performances, images, recordings or behind-the-scenes moments so producers can
            experience your work before they reach out.
          </p>
          <div className="mt-8">
            <UploadControl prominent onChange={handleUpload} />
          </div>
          {uploadName && <p className="mt-4 text-xs text-neutral-500">Selected: {uploadName}</p>}
        </motion.div>
      )}
    </section>
  );
}
