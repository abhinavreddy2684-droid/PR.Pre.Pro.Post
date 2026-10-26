/** Joins the truthy class names with single spaces: cn("a", cond && "b") -> "a b". */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
