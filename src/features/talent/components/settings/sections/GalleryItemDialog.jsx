import { useRef, useState } from "react";
import { FileUp } from "lucide-react";
import { fieldErrors } from "@/lib/api";
import { ALL_KINDS, acceptFor, checkMediaFile } from "@/lib/mediaRules";
import {
  DESCRIPTION_MAX,
  EMPTY_GALLERY_DRAFT,
  TITLE_MAX,
  URL_MAX,
  toGalleryDraft,
  validateGalleryDraft,
} from "@/features/talent/api/galleryRules";
import CustomDropdown from "@/features/talent/components/settings/fields/CustomDropdown";
import SettingsError from "@/features/talent/components/settings/fields/SettingsError";
import SettingsField from "@/features/talent/components/settings/fields/SettingsField";
import SettingsModal from "@/features/talent/components/settings/fields/SettingsModal";

const FIELD_LABELS = {
  title: "Title",
  description: "Description",
  year: "Year",
  craft: "Craft",
  external_url: "Link",
};

const COPY = {
  file: { title: "Add a file", save: "Upload file" },
  link: { title: "Add a link", save: "Add link" },
  edit: { title: "Edit gallery item", save: "Save changes" },
};

/**
 * Add a file, add a link, or edit one item's text, year and craft.
 * @param {object} props
 * @param {"file" | "link" | "edit"} props.mode
 * @param {ReturnType<typeof import("@/features/talent/api/galleryAdapters").toGalleryItem>} [props.item] when editing
 * @param {{ value: string, label: string }[]} props.craftOptions the talent's own crafts
 * @param {(draft: object, file: File | null) => Promise<void>} props.onSubmit throws on failure
 */
export default function GalleryItemDialog({ mode, item, craftOptions, onClose, onSubmit }) {
  const [draft, setDraft] = useState(() => (item ? toGalleryDraft(item) : EMPTY_GALLERY_DRAFT));
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const input = useRef(null);
  const copy = COPY[mode];
  const update = (key, value) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const choose = (event) => {
    const chosen = event.target.files?.[0];
    event.target.value = "";
    if (!chosen) return;
    const checked = checkMediaFile(chosen, ALL_KINDS);
    setFileError(checked.ok ? "" : checked.message);
    setFile(checked.ok ? chosen : null);
    if (checked.ok && !draft.title.trim()) {
      update("title", chosen.name.replace(/\.[^.]+$/, "").slice(0, TITLE_MAX));
    }
  };

  const save = async () => {
    const found = validateGalleryDraft(draft, mode);
    if (mode === "file" && !file) found.file = fileError || "Choose a file to upload.";
    setErrors(found);
    if (Object.keys(found).length) return;
    setPending(true);
    setError(null);
    try {
      await onSubmit(draft, file);
    } catch (submitError) {
      setErrors(fieldErrors(submitError));
      setError(submitError);
      setPending(false);
    }
  };

  return (
    <SettingsModal
      eyebrow="Media management"
      title={copy.title}
      widthClass="max-w-2xl"
      saveLabel={copy.save}
      pending={pending}
      onClose={onClose}
      onSave={save}
    >
      <div className="mt-7 space-y-4">
        {mode === "file" && (
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
              File <span className="text-amber-400">*</span>
            </p>
            <button
              type="button"
              onClick={() => input.current?.click()}
              className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-4 text-left text-sm text-white/70 transition hover:border-amber-400/50"
            >
              <FileUp size={18} className="shrink-0 text-amber-300" />
              <span className="min-w-0 flex-1 truncate">{file ? file.name : "Choose a file"}</span>
            </button>
            <input
              ref={input}
              type="file"
              accept={acceptFor(ALL_KINDS)}
              className="sr-only"
              tabIndex={-1}
              aria-label="Choose a file to upload"
              onChange={choose}
            />
            <p className="mt-1.5 text-[11px] text-white/30">
              JPEG, PNG or WebP up to 10 MB · MP3 or M4A up to 20 MB · MP4 up to 200 MB · PDF up to
              10 MB
            </p>
            {(errors.file || fileError) && (
              <p role="alert" className="mt-1.5 text-[11px] text-red-300">
                {errors.file || fileError}
              </p>
            )}
          </div>
        )}
        {mode === "link" && (
          <SettingsField
            label="Link"
            required
            value={draft.url}
            onChange={(value) => update("url", value)}
            maxLength={URL_MAX}
            placeholder="https://www.youtube.com/watch?v=…"
            hint="YouTube, Vimeo, SoundCloud, Spotify, Instagram, Google Drive or any https link."
            error={errors.external_url}
          />
        )}
        <SettingsField
          label="Title"
          required
          value={draft.title}
          onChange={(value) => update("title", value)}
          maxLength={TITLE_MAX}
          placeholder="Name this work"
          error={errors.title}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <SettingsField
            label="Year"
            value={draft.year}
            onChange={(value) => update("year", value.replace(/\D/g, "").slice(0, 4))}
            inputMode="numeric"
            placeholder="2025"
            error={errors.year}
          />
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
              Craft
            </p>
            <CustomDropdown
              ariaLabel="Craft"
              value={draft.craft}
              options={[{ value: "", label: "No specific craft" }, ...craftOptions]}
              onChange={(value) => update("craft", value)}
            />
            {errors.craft && <p className="mt-1.5 text-[11px] text-red-300">{errors.craft}</p>}
          </div>
        </div>
        <SettingsField
          label="Description"
          value={draft.description}
          onChange={(value) => update("description", value)}
          multiline
          maxLength={DESCRIPTION_MAX}
          showCount
          placeholder="What is this work?"
          error={errors.description}
        />
        {mode !== "edit" && (
          <p className="text-[11px] leading-5 text-white/35">
            New work is reviewed before it appears on your public profile.
          </p>
        )}
      </div>
      {error && (
        <div className="mt-4">
          <SettingsError error={error} fieldLabels={FIELD_LABELS} />
        </div>
      )}
    </SettingsModal>
  );
}
