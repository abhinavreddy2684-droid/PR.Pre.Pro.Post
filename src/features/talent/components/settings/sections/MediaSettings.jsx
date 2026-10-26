import { Image, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import SaveButton from "@/features/talent/components/settings/fields/SaveButton";
import FloatingCard from "@/features/talent/components/settings/fields/FloatingCard";
import CustomDropdown from "@/features/talent/components/settings/fields/CustomDropdown";
import MediaEditor from "@/features/talent/components/settings/sections/MediaEditor";
import useSavedFlash from "@/features/talent/hooks/useSavedFlash";

export default function MediaSettings({ settings, onSave }) {
  const [media, setMedia] = useState(settings);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Latest");
  const [saved, flashSaved] = useSavedFlash(1200);
  const filtered = useMemo(
    () =>
      [...media]
        .filter((item) => filter === "All" || item.type === filter)
        .filter(
          (item) =>
            !query.trim() ||
            `${item.title} ${item.description}`.toLowerCase().includes(query.trim().toLowerCase()),
        )
        .sort((a, b) =>
          sort === "Latest" ? Number(b.year) - Number(a.year) : Number(a.year) - Number(b.year),
        ),
    [media, filter, query, sort],
  );
  const persist = (next) => {
    setMedia(next);
    onSave(next);
    flashSaved();
  };
  const upload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const type = file.type.startsWith("video")
      ? "Video"
      : file.type.startsWith("audio")
        ? "Audio"
        : "Image";
    persist([
      {
        id: `media-${Date.now()}`,
        title: file.name.replace(/\.[^.]+$/, ""),
        description: "New portfolio work.",
        type,
        year: new Date().getFullYear(),
      },
      ...media,
    ]);
    event.target.value = "";
  };
  return (
    <div className="space-y-6">
      <FloatingCard
        title="Portfolio media"
        description="Manage the work that appears in your public gallery. Search and filter your collection as it grows."
      >
        <label className="flex w-full items-center gap-3 rounded-full bg-white/[0.045] px-4 py-3">
          <Search size={16} className="text-white/25" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search media"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
          />
        </label>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-2">
            {["All", "Video", "Audio", "Image"].map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
                className={`rounded-full px-3.5 py-2.5 text-xs font-semibold transition ${filter === item ? "bg-amber-500 text-black" : "bg-white/[0.04] text-white/45 hover:bg-white/[0.08] hover:text-white"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="ml-auto w-full sm:w-44">
            <CustomDropdown
              value={sort}
              options={[
                { value: "Latest", label: "Latest first" },
                { value: "Oldest", label: "Oldest first" },
              ]}
              onChange={setSort}
            />
          </div>
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-xs font-bold text-black transition hover:bg-amber-400">
            <Plus size={15} /> Upload media
            <input
              type="file"
              accept="image/*,video/*,audio/*"
              className="sr-only"
              onChange={upload}
            />
          </label>
        </div>
        <p className="mt-5 text-xs text-white/25">
          Showing {filtered.length} of {media.length} media item{media.length === 1 ? "" : "s"}.
        </p>
        <div className="mt-5 space-y-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group flex items-center gap-4 rounded-2xl bg-white/[0.025] p-3.5 transition hover:bg-white/[0.045]"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-500/[0.08] text-amber-400">
                <Image size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white/80">{item.title}</p>
                <p className="mt-1 truncate text-xs text-white/30">
                  {item.type} · {item.year}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditing(item)}
                className="rounded-full bg-white/[0.05] px-3 py-2 text-[10px] font-semibold text-white/45 opacity-70 transition group-hover:opacity-100 hover:bg-white/[0.1] hover:text-white"
              >
                Edit
              </button>
              <button
                aria-label={`Delete ${item.title}`}
                type="button"
                onClick={() => persist(media.filter((entry) => entry.id !== item.id))}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.04] text-white/25 transition hover:bg-amber-500 hover:text-black"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-white/30">
              No media matches your search or filter.
            </div>
          )}
        </div>
      </FloatingCard>
      <div className="rounded-2xl bg-amber-500/[0.035] p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-400">
          Visibility
        </p>
        <p className="mt-2 text-xs leading-5 text-white/35">
          Your uploaded media is public to people exploring the talent network.
        </p>
      </div>
      <div className="flex justify-end">
        <SaveButton onClick={() => onSave(media)} saved={saved} />
      </div>
      {editing && (
        <MediaEditor
          item={editing}
          onClose={() => setEditing(null)}
          onSave={(item) => {
            persist(media.map((entry) => (entry.id === item.id ? item : entry)));
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
