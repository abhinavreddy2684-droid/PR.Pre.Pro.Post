import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";

const inputClass = "w-full rounded-full border border-white/[0.10] bg-black/45 px-5 py-3.5 text-sm text-white outline-none transition duration-300 placeholder:text-white/20 focus:border-amber-400/45 focus:bg-white/[0.035] focus:shadow-[0_0_0_1px_rgba(245,158,11,0.06)]";
const primaryButtonClass = "group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-amber-500 px-5 py-4 text-sm font-semibold text-black shadow-[0_0_40px_rgba(245,158,11,0.25)] transition duration-300 hover:-translate-y-px hover:bg-amber-400 hover:shadow-[0_0_45px_rgba(245,158,11,0.30)] disabled:cursor-not-allowed disabled:opacity-50";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const response = await fetch("/api/auth/password-reset", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Unable to send the reset email.");
      setSent(true);
    } catch (err) { setError(err.message || "Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <AuthLayout eyebrow="Talent Network / Account recovery" title={<>FIND<br /><span className="text-amber-400">YOUR</span><br />WAY BACK.</>} description="Enter the email attached to your account. We’ll send a secure link to create a new password.">
      {sent ? (
        <div className="text-center">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-amber-400/20 bg-amber-400/[0.07] text-amber-300"><CheckCircle2 size={30} strokeWidth={1.3} /></div>
          <p className="mb-2 text-[9px] uppercase tracking-[0.32em] text-amber-300/65">Scene 03 / Recovery</p>
          <h2 className="font-sans text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">CHECK YOUR INBOX</h2>
          <p className="mt-4 text-sm leading-6 text-white/60">If an account exists for <span className="text-white/85">{email}</span>, you’ll receive a reset link shortly.</p>
          <Link to="/login" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-black transition hover:-translate-y-px hover:bg-amber-400">Back to sign in <ArrowRight size={14} className="transition group-hover:translate-x-1" /></Link>
        </div>
      ) : (
        <>
          <div className="mb-10"><p className="mb-2 text-[9px] uppercase tracking-[0.32em] text-amber-300/65">Scene 03 / Recovery</p><h2 className="font-sans text-4xl font-black leading-none tracking-[-0.035em] text-white">RESET PASSWORD</h2><p className="mt-3 text-sm text-white/60">We’ll help you get back into your account.</p></div>
          {error && <div role="alert" className="mb-7 rounded-full border border-red-400/20 bg-red-400/[0.06] px-5 py-3 text-sm text-red-200">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-7">
            <label className="block"><span className="mb-3 block text-[9px] uppercase tracking-[0.25em] text-white/70">Email address</span><input className={inputClass} type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" required /></label>
            <button disabled={loading} className={primaryButtonClass}><span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-20deg] bg-white/20 transition duration-700 group-hover:translate-x-[380%]" /><span className="relative">{loading ? "Sending…" : "Send reset link"}</span><ArrowRight size={16} className="relative transition group-hover:translate-x-1" /></button>
          </form>
          <p className="mt-9 text-center text-xs text-white/65">Remembered your password? <Link to="/login" className="rounded-full px-2 py-1 text-amber-300/80 transition hover:bg-white/[0.05] hover:text-amber-300">Sign in</Link></p>
        </>
      )}
    </AuthLayout>
  );
}
