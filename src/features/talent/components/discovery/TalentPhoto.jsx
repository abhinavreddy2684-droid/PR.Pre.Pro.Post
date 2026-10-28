import { UserRound } from "lucide-react";
import { cn } from "@/lib/cn";

/** The talent's photo, or a neutral placeholder when they have none. Fills its parent. */
export default function TalentPhoto({ src, alt, className = "" }) {
  if (src) {
    return <img src={src} alt={alt} className={cn("h-full w-full object-cover", className)} />;
  }
  return (
    <div
      role="img"
      aria-label={`${alt} has no photo yet`}
      className="grid h-full w-full place-items-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-white/20"
    >
      <UserRound size={72} strokeWidth={1} />
    </div>
  );
}
