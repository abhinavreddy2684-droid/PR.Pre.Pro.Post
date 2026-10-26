import { ChevronDown, Search, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { MEDIA_SEED } from "@/features/talent/data";
import UploadControl from "@/features/talent/components/profile/UploadControl";
import PublicMediaCard from "@/features/talent/components/profile/PublicMediaCard";

export default function PublicGallery({ talent }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("Latest");
  const [visibleCount, setVisibleCount] = useState(6);
  const [uploadName, setUploadName] = useState("");
  const media = Array.isArray(talent.media) ? talent.media : MEDIA_SEED;
  const filtered = useMemo(
    () =>
      [...media]
        .filter((item) => type === "All" || item.type === type)
        .filter(
          (item) =>
            !query.trim() ||
            `${item.title} ${item.description}`.toLowerCase().includes(query.trim().toLowerCase()),
        )
        .sort((a, b) =>
          sort === "Latest" ? b.year - a.year || b.id - a.id : a.year - b.year || a.id - b.id,
        ),
    [media, type, query, sort],
  );
  const visible = filtered.slice(0, visibleCount);
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
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {["All", "Video", "Audio", "Image"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setType(option);
                    setVisibleCount(6);
                  }}
                  className={`rounded-full px-4 py-2.5 text-xs font-semibold transition ${type === option ? "bg-amber-500 text-black" : "bg-white/5 text-white/45 hover:bg-white/10 hover:text-white"}`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <label className="flex w-full items-center gap-3 border-b border-white/10 py-2.5 sm:w-64">
                <Search size={16} className="text-white/30" />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setVisibleCount(6);
                  }}
                  placeholder="Search media"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
                />
              </label>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none rounded-full bg-white/5 py-2.5 pl-4 pr-9 text-xs text-white/70"
                >
                  <option>Latest</option>
                  <option>Oldest</option>
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/35"
                />
              </div>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((item, index) => (
              <PublicMediaCard key={item.id} item={{ ...item, id: index + 1 }} talent={talent} />
            ))}
          </div>
          {visible.length === 0 && (
            <div className="mt-10 rounded-[2rem] bg-white/[0.03] py-20 text-center text-sm text-neutral-400">
              No media matches your search.
            </div>
          )}
          <div className="mt-10 flex flex-col items-center gap-3">
            {visibleCount < filtered.length && (
              <button
                onClick={() => setVisibleCount((count) => count + 6)}
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
