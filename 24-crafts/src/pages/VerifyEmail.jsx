import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Mail, RefreshCw } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "your email address";
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const resend = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/auth/verify-email/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Unable to resend the verification email.");
      setMessage("A fresh verification link is on its way.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout eyebrow="Talent Network / Verification" title={<>CHECK<br />YOUR<br />INBOX.</>} description="A verified email keeps your talent account secure and gives us a reliable way to help you recover access later.">
      <div className="text-center">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-amber-400/20 bg-amber-400/[0.07] text-amber-300"><Mail size={24} strokeWidth={1.5} /></div>
        <h2 className="text-xl font-semibold text-white">Verify your email</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/40">We sent a verification link to <span className="text-white/75">{email}</span>. Open it to verify your account.</p>
        {message && <p className="mt-5 border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-white/60">{message}</p>}
        <button type="button" disabled={loading} onClick={resend} className="mt-7 inline-flex items-center gap-2 border border-white/10 px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-white/70 transition hover:border-amber-400/30 hover:text-amber-300 disabled:opacity-50"><RefreshCw size={14} className={loading ? "animate-spin" : ""} />{loading ? "Sending…" : "Resend email"}</button>
        <div className="mt-8"><Link to="/login" className="text-xs text-amber-300/80 hover:text-amber-300">Back to sign in</Link></div>
      </div>
    </AuthLayout>
  );
}
