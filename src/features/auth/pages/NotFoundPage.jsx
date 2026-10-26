import { Link, useLocation } from "react-router-dom";
import { AlertTriangle, ArrowLeft, ArrowRight } from "lucide-react";
import AuthLayout from "@/features/auth/components/AuthLayout";

/** Catch-all page for routes that do not exist. */
export default function NotFoundPage() {
  const { pathname } = useLocation();

  return (
    <AuthLayout
      eyebrow="Pre Pro Post / Something went wrong"
      title={
        <>
          WRONG
          <br />
          TURN.
        </>
      }
      description="The page you’re looking for isn’t available right now. You can return to the home page or head back to the Talent Network."
    >
      <div className="text-center">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-amber-400/20 bg-amber-400/[0.07] text-amber-300">
          <AlertTriangle size={25} strokeWidth={1.5} />
        </div>
        <p className="mb-2 text-[9px] uppercase tracking-[0.32em] text-amber-300/70">
          Scene 404 / Route unavailable
        </p>
        <h1 className="font-sans text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">
          PAGE NOT FOUND
        </h1>
        <p className="mt-3 break-all font-mono text-xs text-white/55">{pathname}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-black transition hover:-translate-y-px hover:bg-amber-400"
          >
            Home
            <ArrowRight size={14} className="transition group-hover:translate-x-1" />
          </Link>
          <Link
            to="/talent"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.14em] text-white/65 transition hover:-translate-y-px hover:border-amber-400/30 hover:bg-white/[0.05] hover:text-amber-300"
          >
            <ArrowLeft size={14} />
            Talent Network
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
