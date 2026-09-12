import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";

const inputClass = "w-full border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-amber-400/50 focus:bg-white/[0.045]";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Unable to send the reset email.");
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Talent Network / Account recovery"
      title={<>FIND<br />YOUR<br />WAY BACK.</>}
      description="Enter the email attached to your account. We’ll send a secure link to create a new password."
    >
      {sent ? (
        <div className="text-center">
          <CheckCircle2 className="mx-auto mb-6 text-amber-300" size={42} strokeWidth={1.3} />
          <h2 className="text-xl font-semibold text-white">Check your inbox</h2>
          <p className="mt-3 text-sm leading-6 text-white/40">If an account exists for <span className="text-white/75">{email}</span>, you’ll receive a reset link shortly.</p>
          <Link to="/login" className="mt-7 inline-flex items-center gap-2 bg-amber-400 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-black hover:bg-amber-300">Back to sign in <ArrowRight size={14} /></Link>
        </div>
      ) : (
        <>
          <div className="mb-7"><h2 className="text-xl font-semibold text-white">Reset password</h2><p className="mt-1 text-sm text-white/35">We’ll help you get back into your account.</p></div>
          {error && <div role="alert" className="mb-5 border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-200">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block"><span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/40">Email address</span><input className={inputClass} type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" required /></label>
            <button disabled={loading} className="group flex w-full items-center justify-center gap-3 bg-amber-400 px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:opacity-50">{loading ? "Sending…" : "Send reset link"}<ArrowRight size={16} className="transition group-hover:translate-x-1" /></button>
          </form>
          <p className="mt-7 text-center text-xs text-white/30">Remembered your password? <Link to="/login" className="text-amber-300/80 hover:text-amber-300">Sign in</Link></p>
        </>
      )}
    </AuthLayout>
  );
}
