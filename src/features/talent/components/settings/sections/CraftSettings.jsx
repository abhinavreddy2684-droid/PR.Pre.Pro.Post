import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useCatalog } from "@/catalog";
import SaveButton from "@/features/talent/components/settings/fields/SaveButton";
import FloatingCard from "@/features/talent/components/settings/fields/FloatingCard";
import CustomDropdown from "@/features/talent/components/settings/fields/CustomDropdown";
import SettingsError from "@/features/talent/components/settings/fields/SettingsError";
import { setMyCrafts } from "@/features/talent/api/talentMeApi";
import useOwnerTalent from "@/features/talent/hooks/useOwnerTalent";
import useSectionSave from "@/features/talent/hooks/useSectionSave";

const FIELD_LABELS = { primary: "Primary craft", supporting: "Supporting crafts" };

const toDraft = (talent) => ({
  primary: talent.crafts.find((craft) => craft.is_primary)?.slug ?? "",
  supporting: talent.crafts.filter((craft) => !craft.is_primary).map((craft) => craft.slug),
});

const sameSet = (a, b) => a.length === b.length && a.every((item) => b.includes(item));

/** Crafts: PUT /api/talent/me/crafts with the primary and supporting slugs. */
export default function CraftSettings() {
  const { talent, replace } = useOwnerTalent();
  const { crafts, craftBySlug } = useCatalog();
  const [draft, setDraft] = useState(() => toDraft(talent));
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("supporting");
  const save = useSectionSave();
  const before = toDraft(talent);
  const changed = draft.primary !== before.primary || !sameSet(draft.supporting, before.supporting);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return needle ? crafts.filter((craft) => craft.title.toLowerCase().includes(needle)) : crafts;
  }, [crafts, query]);
  const isPrimary = (slug) => draft.primary === slug;
  const isSupporting = (slug) => draft.supporting.includes(slug);
  const selectCraft = (slug) => {
    if (mode === "primary") {
      setDraft((current) => ({
        primary: slug,
        supporting: current.supporting.filter((item) => item !== slug),
      }));
      return;
    }
    if (slug === draft.primary) return;
    setDraft((current) => ({
      ...current,
      supporting: current.supporting.includes(slug)
        ? current.supporting.filter((item) => item !== slug)
        : [...current.supporting, slug],
    }));
  };
  const submit = () =>
    save.run(async () => {
      const updated = await setMyCrafts(draft);
      replace(updated);
      setDraft(toDraft(updated));
    });
  const options = [
    { value: "primary", label: "Primary craft" },
    { value: "supporting", label: "Supporting craft" },
  ];
  return (
    <div className="space-y-6">
      <FloatingCard
        title="Craft focus"
        description="Choose whether you are assigning the next craft as your primary craft or as a supporting craft."
      >
        <div className="mx-auto max-w-[360px] rounded-full bg-white/[0.055] p-1">
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              aria-pressed={mode === "primary"}
              onClick={() => setMode("primary")}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${mode === "primary" ? "bg-amber-500 text-black shadow-[0_4px_20px_rgba(245,158,11,.12)]" : "text-white/35 hover:text-white/65"}`}
            >
              Primary
            </button>
            <button
              type="button"
              aria-pressed={mode === "supporting"}
              onClick={() => setMode("supporting")}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${mode === "supporting" ? "bg-amber-500 text-black shadow-[0_4px_20px_rgba(245,158,11,.12)]" : "text-white/35 hover:text-white/65"}`}
            >
              Supporting
            </button>
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-amber-500/[0.06] p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-amber-400">Primary</p>
            <p className="mt-2 text-lg font-bold text-white">
              {craftBySlug(draft.primary)?.title || "Not selected"}
            </p>
            <p className="mt-1 text-xs text-white/30">
              The craft recruiters discover you through first.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.035] p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">Supporting</p>
            <p className="mt-2 text-lg font-bold text-white">
              {draft.supporting.length} craft{draft.supporting.length === 1 ? "" : "s"}
            </p>
            <p className="mt-1 text-xs text-white/30">Additional crafts shown on your profile.</p>
          </div>
        </div>
      </FloatingCard>
      <div className="px-1">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-400">
              Craft library
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
              Choose your crafts
            </h2>
          </div>
          <label className="flex w-full items-center gap-3 rounded-full bg-white/[0.045] px-4 py-3">
            <Search size={15} className="shrink-0 text-white/25" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search crafts"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
            />
          </label>
        </div>
        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            {mode === "primary" ? "Select one primary craft" : "Select any supporting crafts"}
          </p>
          <div className="w-44">
            <CustomDropdown value={mode} options={options} onChange={setMode} />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {filtered.map((craft) => {
            const primary = isPrimary(craft.slug);
            const supporting = isSupporting(craft.slug);
            return (
              <button
                type="button"
                key={craft.slug}
                aria-pressed={primary || supporting}
                onClick={() => selectCraft(craft.slug)}
                className={`rounded-full px-4 py-2.5 text-xs font-semibold transition ${primary ? "bg-amber-500 text-black shadow-[0_0_24px_rgba(245,158,11,.13)]" : supporting ? "bg-white/[0.11] text-white ring-1 ring-amber-500/30" : "bg-white/[0.035] text-white/50 hover:-translate-y-0.5 hover:bg-white/[0.07] hover:text-white"}`}
              >
                {craft.title}
                {primary && (
                  <span className="ml-2 text-[9px] uppercase tracking-wider opacity-60">
                    Primary
                  </span>
                )}
                {supporting && !primary && (
                  <span className="ml-2 text-[9px] uppercase tracking-wider text-amber-400">
                    Support
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-2xl bg-white/[0.025] p-8 text-center text-sm text-white/30">
            No crafts match “{query}”.
          </div>
        )}
      </div>
      {save.error && <SettingsError error={save.error} fieldLabels={FIELD_LABELS} />}
      <div className="flex items-center justify-end gap-4">
        {!changed && !save.saved && <p className="text-xs text-white/30">No unsaved changes</p>}
        <SaveButton
          onClick={submit}
          saved={save.saved}
          pending={save.pending}
          disabled={(!changed && !save.saved) || !draft.primary}
        />
      </div>
    </div>
  );
}
