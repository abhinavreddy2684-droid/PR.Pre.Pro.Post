import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Clapperboard } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";

const inputClass = "w-full rounded-lg border border-white/[0.10] bg-black/45 px-4 py-3.5 text-sm text-white outline-none transition duration-300 placeholder:text-white/20 focus:border-amber-400/45 focus:bg-white/[0.035] focus:shadow-[0_0_0_1px_rgba(245,158,11,0.06)]";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const next = new URLSearchParams(location.search).get("next") || "/talent/onboarding";
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault(); setError(""); setLoading(true);
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(form) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Unable to sign in. Please check your details.");
      if (data.emailVerified === false) { navigate(`/verify-email?email=${encodeURIComponent(form.email)}`); return; }
      sessionStorage.setItem("ppp_authenticated", "1");
      navigate(next);
    } catch (err) { setError(err.message || "Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  const handleGoogle = () => window.location.assign(`/api/auth/google?next=${encodeURIComponent(next)}`);

  return (
    <AuthLayout
      eyebrow="Talent Network / Authentication"
      title={<>WELCOME<br />BACK.</>}
      description="Your work, your craft, your place in cinema. Sign in to continue building your professional presence."
      footer={<div className="flex items-center justify-between gap-4"><span className="text-[10px] uppercase tracking-[0.18em] text-white/25">New to Pre Pro Post?</span><Link to={`/register?next=${encodeURIComponent(next)}`} className="group flex items-center gap-2 text-xs font-medium text-amber-300 transition hover:text-amber-200">Create an account <ArrowRight size={13} className="transition group-hover:translate-x-1" /></Link></div>}
    >
      <div className="mb-8 flex items-start justify-between gap-5">
        <div>
          <p className="mb-2 text-[9px] uppercase tracking-[0.32em] text-amber-300/55">Scene 01 / Access</p>
          <h2 className="font-['Bebas_Neue'] text-4xl leading-none tracking-[0.04em] text-white">SIGN IN</h2>
          <p className="mt-2 text-sm text-white/35">Continue to your talent profile.</p>
        </div>
        <div className="hidden h-10 w-10 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.025] text-white/25 sm:grid" aria-hidden="true">
          <Clapperboard size={17} strokeWidth={1.3} />
        </div>
      </div>

      {error && <div role="alert" className="mb-5 rounded-lg border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-200">{error}</div>}

      <button type="button" onClick={handleGoogle} className="group flex w-full items-center justify-center gap-3 rounded-lg border border-white/[0.10] bg-white/[0.035] px-4 py-3.5 text-sm font-medium text-white transition duration-300 hover:border-white/20 hover:bg-white/[0.065]">
        <span className="grid h-5 w-5 place-items-center rounded-md bg-white text-[11px] font-bold text-black transition group-hover:scale-105">G</span>
        Continue with Google
      </button>

      <div className="my-7 flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.10]" />
        <span className="flex items-center gap-2 text-[8px] uppercase tracking-[0.3em] text-white/20"><span className="h-1 w-1 rounded-full bg-amber-400/30" /> or email <span className="h-1 w-1 rounded-full bg-amber-400/30" /></span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.10]" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="mb-2.5 block text-[9px] uppercase tracking-[0.25em] text-white/40">Email address</span>
          <input className={inputClass} type="email" value={form.email} onChange={update("email")} autoComplete="email" placeholder="you@example.com" required />
        </label>

        <label className="block">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.25em] text-white/40">Password</span>
            <Link to="/reset-password" className="rounded-md px-1 py-0.5 text-[10px] text-amber-300/65 transition hover:bg-amber-400/[0.05] hover:text-amber-300">Forgot password?</Link>
          </div>
          <div className="relative">
            <input className={`${inputClass} pr-12`} type={showPassword ? "text" : "password"} value={form.password} onChange={update("password")} autoComplete="current-password" placeholder="Enter your password" required />
            <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-white/25 transition hover:bg-white/[0.05] hover:text-white/60" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
          </div>
        </label>

        <button disabled={loading} className="group relative mt-2 flex w-full items-center justify-center gap-3 overflow-hidden rounded-lg bg-amber-400 px-5 py-3.5 text-sm font-semibold text-black shadow-[0_12px_35px_rgba(245,158,11,0.13)] transition duration-300 hover:-translate-y-px hover:bg-amber-300 hover:shadow-[0_16px_42px_rgba(245,158,11,0.20)] disabled:cursor-not-allowed disabled:opacity-50">
          <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-20deg] bg-white/20 transition duration-700 group-hover:translate-x-[380%]" />
          <span className="relative">{loading ? "Signing in…" : "Sign in"}</span>
          <ArrowRight size={16} className="relative transition group-hover:translate-x-1" />
        </button>
      </form>

      <div className="mt-7 flex items-center justify-between text-[8px] uppercase tracking-[0.22em] text-white/15">
        <span>PPP / Talent Network</span>
        <span>Auth 01</span>
      </div>
    </AuthLayout>
  );
}
