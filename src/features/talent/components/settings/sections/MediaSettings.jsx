import { FileUp, Link2 } from "lucide-react";
import { useState } from "react";
import { useCatalog } from "@/catalog";
import { isApiError, userMessage } from "@/lib/api";
import { toGalleryItem } from "@/features/talent/api/galleryAdapters";
import {
  GALLERY_MAX_ITEMS,
  galleryChanges,
  toGalleryFields,
} from "@/features/talent/api/galleryRules";
import GalleryFailures from "@/features/talent/components/gallery/GalleryFailures";
import FloatingCard from "@/features/talent/components/settings/fields/FloatingCard";
import SettingsError from "@/features/talent/components/settings/fields/SettingsError";
import GalleryItemDialog from "@/features/talent/components/settings/sections/GalleryItemDialog";
import GalleryManageRow from "@/features/talent/components/settings/sections/GalleryManageRow";
import useOwnerTalent from "@/features/talent/hooks/useOwnerTalent";

const ADD_BUTTON =
  "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition";

/**
 * Media management: add a file or a link, edit, delete and reorder the owner's gallery items.
 * Everything goes through useMyGallery (provided by the owner page), so the gallery on the
 * profile behind the dialog stays in step.
 */
export default function MediaSettings() {
  const { gallery, talent } = useOwnerTalent();
  const { craftBySlug } = useCatalog();
  // null: closed; { mode: "file" | "link" } adding; { mode: "edit", item } editing.
  const [dialog, setDialog] = useState(null);
  const [confirmingId, setConfirmingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState(null);
  const craftOptions = talent.crafts.map((craft) => ({ value: craft.slug, label: craft.title }));
  const items = gallery.items.map((entry) => toGalleryItem(entry, craftBySlug));

  const submit = async (draft, file) => {
    if (dialog.mode === "file") await gallery.addFile(file, toGalleryFields(draft));
    else if (dialog.mode === "link") {
      await gallery.addLink({ ...toGalleryFields(draft), external_url: draft.url.trim() });
    } else {
      const changes = galleryChanges(dialog.item, draft);
      if (changes) await gallery.update(dialog.item.id, changes);
    }
    setDialog(null);
  };

  const run = async (action) => {
    setBusy(true);
    setActionError(null);
    try {
      await action();
    } catch (error) {
      setActionError(error);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (item) => {
    setDeletingId(item.id);
    await run(async () => {
      await gallery.remove(item.id);
      setConfirmingId(null);
    });
    setDeletingId(null);
  };

  if (gallery.status === "loading") {
    return <p className="text-sm text-white/40">Loading your gallery…</p>;
  }
  if (gallery.status === "error") {
    return (
      <div className="space-y-3">
        <p role="alert" className="text-sm text-red-300">
          {userMessage(gallery.error)}
        </p>
        <button
          type="button"
          onClick={gallery.retry}
          className="rounded-full bg-white/5 px-4 py-2 text-xs text-white/70 hover:text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  const full = actionError && isApiError(actionError, "gallery_full");
  return (
    <div className="space-y-5">
      <FloatingCard
        title="Portfolio media"
        description="The work that appears in your public gallery, in this order. New work is reviewed before it goes public."
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-white/45">
            {gallery.slotsUsed} of {GALLERY_MAX_ITEMS} slots used
            <span className="text-white/25"> · rejected and failed items don&apos;t count</span>
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDialog({ mode: "file" })}
              className={`${ADD_BUTTON} bg-amber-500 text-black hover:bg-amber-400`}
            >
              <FileUp size={14} /> Add file
            </button>
            <button
              type="button"
              onClick={() => setDialog({ mode: "link" })}
              className={`${ADD_BUTTON} bg-white/[0.06] text-white/70 hover:text-white`}
            >
              <Link2 size={14} /> Add link
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <GalleryFailures failures={gallery.failures} onDismiss={gallery.dismissFailure} />
          {actionError && <SettingsError error={actionError} />}
          {full && (
            <p className="text-xs text-white/45">
              Delete an item to free a slot, then add the new one.
            </p>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-10 text-center text-xs text-white/30">
            Nothing here yet. Add a file or a link to start your gallery.
          </div>
        ) : (
          <ol className="mt-5 space-y-2" aria-label="Gallery items in display order">
            {items.map((item, index) => (
              <GalleryManageRow
                key={item.id}
                item={item}
                index={index}
                count={items.length}
                upload={gallery.uploads[item.id]}
                busy={busy}
                confirmingDelete={confirmingId === item.id}
                deleting={deletingId === item.id}
                onMove={(direction) => run(() => gallery.move(item.id, direction))}
                onEdit={() => setDialog({ mode: "edit", item })}
                onAskDelete={() => setConfirmingId(item.id)}
                onCancelDelete={() => setConfirmingId(null)}
                onDelete={() => remove(item)}
                onCancelUpload={() => gallery.cancelUpload(item.id)}
              />
            ))}
          </ol>
        )}
      </FloatingCard>

      {dialog && (
        <GalleryItemDialog
          mode={dialog.mode}
          item={dialog.item}
          craftOptions={craftOptions}
          onClose={() => setDialog(null)}
          onSubmit={submit}
        />
      )}
    </div>
  );
}
