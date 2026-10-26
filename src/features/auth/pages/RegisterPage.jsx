import { Link } from "react-router-dom";
import AuthLayout from "@/features/auth/components/AuthLayout";
import RegisterForm from "@/features/auth/components/RegisterForm";

/** @param {{ onSubmit?: (values: { email: string, password: string }) => Promise<void> }} props */
export default function RegisterPage({ onSubmit }) {
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
          <Link to="/login" className="font-medium text-amber-300 transition hover:text-amber-200">
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

      <RegisterForm onSubmit={onSubmit} />
    </AuthLayout>
  );
}
