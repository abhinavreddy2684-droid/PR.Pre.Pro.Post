import { Heart } from "lucide-react";
import { userMessage } from "@/lib/api";
import { cn } from "@/lib/cn";

/**
 * Heart with the like count. Shows "Unlike" once the viewer's own like is known; before that it
 * offers "Like". The count is the only thing the API tells us up front.
 */
export default function LikeButton({ item, likes }) {
  const liked = likes.liked(item.id);
  const pending = likes.pendingId === item.id;
  const error = likes.errorFor(item.id);

  return (
    <div>
      <button
        type="button"
        onClick={() => likes.toggle(item)}
        disabled={!likes.ready || pending}
        aria-pressed={liked}
        aria-label={`${liked ? "Unlike" : "Like"} ${item.title}`}
        className={cn(
          "inline-flex min-h-10 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition disabled:opacity-60",
          liked
            ? "bg-amber-500 text-black hover:bg-amber-400"
            : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white",
        )}
      >
        <Heart size={14} fill={liked ? "currentColor" : "none"} aria-hidden="true" />
        <span aria-live="polite">{likes.countFor(item)}</span>
      </button>
      {error && (
        <p role="alert" className="mt-2 text-[11px] text-red-300">
          {userMessage(error)}
        </p>
      )}
    </div>
  );
}
