import { ChevronDown, Search, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { MEDIA_SEED } from "@/features/talent/data";
import OwnerMediaCard from "@/features/talent/components/owner/OwnerMediaCard";
import OwnerMediaEditor from "@/features/talent/components/owner/OwnerMediaEditor";

export default function OwnerGallery({ talent }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("Latest");
  const [visibleCount, setVisibleCount] = useState(6);
  const [media, setMedia] = useState(Array.isArray(talent.media) ? talent.media : MEDIA_SEED);
  const [editing, setEditing] = useState(null);
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
  const upload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setMedia((items) => [
      {
        id: Date.now(),
        title: file.name.replace(/\.[^.]+$/, ""),
        description: "New portfolio work. Add a description and metadata.",
        type: file.type.startsWith("video")
          ? "Video"
          : file.type.startsWith("audio")
            ? "Audio"
            : "Image",
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
              onChange={(event) => {
                setQuery(event.target.value);
                setVisibleCount(6);
              }}
              placeholder="Search media"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
            />
          </label>
          <div className="relative">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
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
        {filtered.slice(0, visibleCount).map((item) => (
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
      {visibleCount < filtered.length && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisibleCount((count) => count + 6)}
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
