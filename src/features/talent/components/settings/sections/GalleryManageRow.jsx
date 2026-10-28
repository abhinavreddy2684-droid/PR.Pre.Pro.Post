import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { useCatalog } from "@/catalog";
import { KIND_ICON } from "@/features/talent/components/gallery/kindIcons";
import StageBadge from "@/features/talent/components/media/StageBadge";
import StageNotes from "@/features/talent/components/media/StageNotes";
import UploadProgress from "@/features/talent/components/media/UploadProgress";

const ICON_BUTTON =
  "grid h-8 w-8 place-items-center rounded-full bg-white/[0.04] text-white/40 transition hover:bg-white/[0.1] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white/[0.04] disabled:hover:text-white/40";

/**
 * One row of the gallery manager: thumbnail, details, stage and reasons, then reorder, edit and
 * delete. `upload` is the in-tab transfer progress ({ phase, fraction }) when there is one.
 */
export default function GalleryManageRow({
  item,
  index,
  count,
  upload,
  busy,
  confirmingDelete,
  deleting,
  onMove,
  onEdit,
  onAskDelete,
  onCancelDelete,
  onDelete,
  onCancelUpload,
}) {
  const { enumLabel } = useCatalog();
  const Icon = KIND_ICON[item.kind] ?? KIND_ICON.image;
  const rejected = item.stage === "rejected";
  const kindLabel = item.isLink ? item.provider || "Link" : enumLabel("media_kinds", item.kind);
  const meta = [kindLabel, item.year, item.craftTitle].filter(Boolean).join(" · ");

  return (
    <li className="rounded-2xl bg-white/[0.025] p-3.5">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-amber-500/[0.08] text-amber-400">
          {item.thumbUrl ? (
            <img src={item.thumbUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <Icon size={18} aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white/80">{item.title}</p>
          <p className="mt-1 truncate text-xs text-white/35">{meta}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StageBadge stage={item.stage} />
            <span className="text-xs text-white/30">{item.likesCount} likes</span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            aria-label={`Move ${item.title} up`}
            title="Move up"
            disabled={busy || index === 0}
            onClick={() => onMove(-1)}
            className={ICON_BUTTON}
          >
            <ArrowUp size={14} />
          </button>
          <button
            type="button"
            aria-label={`Move ${item.title} down`}
            title="Move down"
            disabled={busy || index === count - 1}
            onClick={() => onMove(1)}
            className={ICON_BUTTON}
          >
            <ArrowDown size={14} />
          </button>
        </div>
      </div>

      {(upload || item.stage === "rejected" || item.stage === "failed") && (
        <div className="mt-3 space-y-2 pl-16">
          {upload && <UploadProgress phase={upload.phase} fraction={upload.fraction} />}
          <StageNotes
            stage={item.stage}
            moderationReason={item.moderationReason}
            moderationNote={item.moderationNote}
            failureReason={item.failureReason}
          />
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-end gap-2 pl-16">
        {upload ? (
          upload.phase === "uploading" && (
            <button
              type="button"
              onClick={onCancelUpload}
              className="rounded-full bg-white/[0.05] px-3 py-2 text-[10px] font-semibold text-white/60 hover:text-white"
            >
              Cancel upload
            </button>
          )
        ) : confirmingDelete ? (
          <>
            <span className="text-[11px] text-white/50">Delete this item?</span>
            <button
              type="button"
              onClick={onDelete}
              disabled={deleting}
              className="rounded-full bg-red-500/80 px-3 py-2 text-[10px] font-semibold text-white hover:bg-red-500 disabled:opacity-50"
            >
              {deleting ? "Deleting…" : "Delete"}
            </button>
            <button
              type="button"
              onClick={onCancelDelete}
              disabled={deleting}
              className="rounded-full bg-white/[0.05] px-3 py-2 text-[10px] font-semibold text-white/50 hover:text-white"
            >
              Keep
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onEdit}
              disabled={rejected}
              title={
                rejected
                  ? "Rejected items can't be edited. Delete it and add a new one."
                  : undefined
              }
              className="rounded-full bg-white/[0.05] px-3 py-2 text-[10px] font-semibold text-white/50 hover:bg-white/[0.09] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Edit
            </button>
            <button
              type="button"
              aria-label={`Delete ${item.title}`}
              onClick={onAskDelete}
              className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.04] text-white/25 hover:bg-amber-500 hover:text-black"
            >
              <Trash2 size={13} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
