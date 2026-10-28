import { Link, Navigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Clapperboard } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import AuthLayout from "@/features/auth/components/AuthLayout";
import LoginForm from "@/features/auth/components/LoginForm";
import { safeNextPath } from "@/features/auth/nextPath";

/** Sign in, then continue to `?next=` (same-origin paths only) or the owner profile. */
export default function LoginPage() {
  const { status, login } = useAuth();
  const [searchParams] = useSearchParams();
  const rawNext = searchParams.get("next");
  const next = safeNextPath(rawNext);

  // Also covers a successful submit: the session flips to signed in and we move on.
  if (status === "signedIn") return <Navigate to={next} replace />;

  return (
    <AuthLayout
      eyebrow="Talent Network / Authentication"
      title={
        <>
          <span className="block text-white">WELCOME</span>
          <span className="block bg-gradient-to-r from-amber-300 via-amber-100 to-amber-500 bg-clip-text text-transparent">
            BACK.
          </span>
        </>
      }
      description="Your work, your craft, your place in cinema. Sign in to continue building your professional presence."
      footer={
        <div className="flex items-center justify-between gap-4">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/80">
            New to Pre Pro Post?
          </span>
          <Link
            to={rawNext ? `/register?next=${encodeURIComponent(next)}` : "/register"}
            className="group flex items-center gap-2 text-xs font-medium text-amber-300 transition hover:text-amber-200"
          >
            Create an account
            <ArrowRight size={13} className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      }
    >
      <div className="mb-11 flex items-start justify-between gap-5">
        <div>
          <p className="mb-2 text-[9px] uppercase tracking-[0.32em] text-amber-300/80">
            Scene 01 / Access
          </p>
          <h1 className="font-sans text-4xl font-black leading-none tracking-[-0.035em] text-white">
            SIGN IN
          </h1>
          <p className="mt-3 text-sm text-white/70">Continue to your talent profile.</p>
        </div>
        <div
          className="hidden h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.025] text-white/45 sm:grid"
          aria-hidden="true"
        >
          <Clapperboard size={17} strokeWidth={1.3} />
        </div>
      </div>

      <LoginForm onSubmit={login} />

      <div className="mt-9 flex items-center justify-between text-[8px] uppercase tracking-[0.22em] text-white/40">
        <span>PPP / Talent Network</span>
        <span>Auth 01</span>
      </div>
    </AuthLayout>
  );
}
