import { useCatalog } from "@/catalog";

/**
 * Why an item or photo was refused: the moderation reason and note when rejected, or the failure
 * reason when processing failed. Labels come from bootstrap. Renders nothing for other stages.
 * @param {{ stage: string, moderationReason?: string, moderationNote?: string, failureReason?: string }} props
 */
export default function StageNotes({ stage, moderationReason, moderationNote, failureReason }) {
  const { enumLabel } = useCatalog();

  if (stage === "rejected") {
    return (
      <p className="text-xs leading-5 text-red-200">
        Not approved
        {moderationReason ? `: ${enumLabel("moderation_reasons", moderationReason)}` : ""}.
        {moderationNote ? ` ${moderationNote}` : ""}
      </p>
    );
  }
  if (stage === "failed") {
    return (
      <p className="text-xs leading-5 text-red-200">
        Processing failed
        {failureReason ? `: ${enumLabel("media_failure_reasons", failureReason)}` : ""}. Delete it
        and try another file.
      </p>
    );
  }
  return null;
}
