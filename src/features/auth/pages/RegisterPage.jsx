import { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import AuthLayout from "@/features/auth/components/AuthLayout";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { safeNextPath } from "@/features/auth/nextPath";

// A new account goes on to talent onboarding unless ?next= says otherwise.
const DEFAULT_AFTER_REGISTER = "/talent/onboarding";

/** Create an account (which signs in), then show the "check your inbox" notice. */
export default function RegisterPage() {
  const { status, register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rawNext = searchParams.get("next");
  const next = safeNextPath(rawNext, DEFAULT_AFTER_REGISTER);
  const [registering, setRegistering] = useState(false);

  // Someone already signed in has nothing to do here (but a fresh registration moves on below).
  if (status === "signedIn" && !registering) return <Navigate to={next} replace />;

  const handleSubmit = async (values) => {
    setRegistering(true);
    try {
      await register(values);
    } catch (error) {
      setRegistering(false);
      throw error;
    }
    navigate(`/verify-email?next=${encodeURIComponent(next)}`, { replace: true });
  };

  return (
    <AuthLayout
      eyebrow="Talent Network / Create account"
      title={
        <>
          YOUR
          <br />
          <span className="bg-gradient-to-r from-amber-300 via-amber-100 to-amber-500 bg-clip-text text-transparent">
            STORY
          </span>
          <br />
          STARTS.
        </>
      }
      description="Create your account and move straight into talent onboarding. You can shape the profile around your craft as your work grows."
      footer={
        <p className="text-center text-xs text-white/80">
          Already have an account?{" "}
          <Link
            to={rawNext ? `/login?next=${encodeURIComponent(next)}` : "/login"}
            className="font-medium text-amber-300 transition hover:text-amber-200"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <div className="mb-10">
        <p className="mb-2 text-[9px] uppercase tracking-[0.32em] text-amber-300/75">
          Scene 02 / Create
        </p>
        <h1 className="font-sans text-4xl font-black leading-none tracking-[-0.035em] text-white">
          CREATE ACCOUNT
        </h1>
        <p className="mt-3 text-sm text-white/65">Join the Talent Network.</p>
      </div>

      <RegisterForm onSubmit={handleSubmit} />
    </AuthLayout>
  );
}
