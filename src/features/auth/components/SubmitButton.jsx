import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

/** Full-width amber submit button with a light sweep on hover. */
export default function SubmitButton({ pending, pendingLabel, children }) {
  return (
    <Button
      type="submit"
      disabled={pending}
      className="group relative mt-3 flex w-full items-center justify-center gap-3 overflow-hidden disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span
        className="absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-20deg] bg-white/20 transition duration-700 group-hover:translate-x-[380%]"
        aria-hidden="true"
      />
      <span className="relative">{pending ? pendingLabel : children}</span>
      <ArrowRight size={16} className="relative transition group-hover:translate-x-1" />
    </Button>
  );
}
