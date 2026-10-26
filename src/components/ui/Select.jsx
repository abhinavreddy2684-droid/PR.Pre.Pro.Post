import { cn } from "@/lib/cn";
/** Borderless <select>; pass <option>s as children. Accepts any <select> prop. */
export default function Select({ className = "", children, ...props }) {
  return (
    <select
      className={cn("bg-transparent outline-none text-sm text-neutral-300", className)}
      {...props}
    >
      {children}
    </select>
  );
}
