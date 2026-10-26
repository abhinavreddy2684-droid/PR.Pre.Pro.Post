import { Link, useSearchParams } from "react-router-dom";
import { Mail, RefreshCw } from "lucide-react";
import AuthLayout from "@/features/auth/components/AuthLayout";
import FormMessage from "@/features/auth/components/FormMessage";
import useAuthForm from "@/features/auth/hooks/useAuthForm";

const NO_ERRORS = () => ({});

/**
 * "Check your inbox" page. The address shown comes from the `?email=` query parameter.
 * @param {{ onResend?: (values: { email: string }) => Promise<void> }} props
 */
export default function VerifyEmailPage({ onResend }) {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const form = useAuthForm({
    initialValues: {},
    validate: NO_ERRORS,
    onSubmit: onResend && (() => onResend({ email })),
  });

  return (
    <AuthLayout
      eyebrow="Talent Network / Verification"
      title={
        <>
          CHECK
          <br />
          YOUR
          <br />
          INBOX.
        </>
      }
      description="A verified email keeps your talent account secure and gives us a reliable way to help you recover access later."
    >
      <div className="text-center">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-amber-400/20 bg-amber-400/[0.07] text-amber-300">
          <Mail size={24} strokeWidth={1.5} />
        </div>
        <p className="mb-2 text-[9px] uppercase tracking-[0.32em] text-amber-300/70">
          Scene 02 / Verification
        </p>
        <h1 className="font-sans text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">
          VERIFY YOUR EMAIL
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/65">
          We sent a verification link to{" "}
          <span className="text-white/90">{email || "your email address"}</span>. Open it to verify
          your account.
        </p>

        {form.message && (
          <div className="mt-6">
            <FormMessage kind={form.message.kind}>{form.message.text}</FormMessage>
          </div>
        )}

        <form onSubmit={form.handleSubmit} className="mt-8">
          <button
            type="submit"
            disabled={form.pending}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-white/70 transition hover:-translate-y-px hover:border-amber-400/30 hover:bg-white/[0.05] hover:text-amber-300 disabled:opacity-50"
          >
            <RefreshCw size={14} className={form.pending ? "animate-spin" : ""} />
            {form.pending ? "Sending…" : "Resend email"}
          </button>
        </form>

        <div className="mt-9">
          <Link
            to="/login"
            className="rounded-full px-3 py-1.5 text-xs text-amber-300/80 transition hover:bg-amber-400/[0.05] hover:text-amber-300"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
