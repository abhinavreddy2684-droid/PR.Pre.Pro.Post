import { cn } from "@/lib/cn";
/** Borderless text input; add border/padding through `className`. Accepts any <input> prop. */
export default function Input({ className = "", ...props }) {
  return (
    <input
      className={cn(
        "w-full bg-transparent outline-none text-sm placeholder:text-neutral-600",
        className,
      )}
      {...props}
    />
  );
}
