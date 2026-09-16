import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";

const inputClass = "w-full rounded-full border border-white/[0.10] bg-black/45 px-5 py-3.5 text-sm text-white outline-none transition duration-300 placeholder:text-white/20 focus:border-amber-400/45 focus:bg-white/[0.035] focus:shadow-[0_0_0_1px_rgba(245,158,11,0.06)]";
const secondaryButtonClass = "flex w-full items-center justify-center gap-3 rounded-full border border-white/[0.10] bg-white/[0.035] px-5 py-3.5 text-sm font-medium text-white transition duration-300 hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.065]";
const primaryButtonClass = "group relative mt-4 flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-amber-500 px-5 py-4 text-sm font-semibold text-black shadow-[0_0_40px_rgba(245,158,11,0.25)] transition duration-300 hover:-translate-y-px hover:bg-amber-400 hover:shadow-[0_0_45px_rgba(245,158,11,0.30)] disabled:cursor-not-allowed disabled:opacity-50";

export default function Register() {
  const navigate = useNavigate(); const location = useLocation();
  const next = new URLSearchParams(location.search).get("next") || "/talent/onboarding";
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault(); setError("");
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ name: form.name, email: form.email, password: form.password }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Unable to create your account.");
      sessionStorage.setItem("ppp_authenticated", "1");
      navigate(next);
    } catch (err) { setError(err.message || "Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };
  const handleGoogle = () => window.location.assign(`/api/auth/google?next=${encodeURIComponent(next)}`);

  return (
    <AuthLayout eyebrow="Talent Network / Create account" title={<>YOUR<br /><span className="bg-gradient-to-r from-amber-300 via-amber-100 to-amber-500 bg-clip-text text-transparent">STORY</span><br />STARTS.</>} description="Create your account and move straight into talent onboarding. You can shape the profile around your craft as your work grows." footer={<p className="text-center text-xs text-white/80">Already have an account? <Link to={`/login?next=${encodeURIComponent(next)}`} className="font-medium text-amber-300 transition hover:text-amber-200">Sign in</Link></p>}>
      <div className="mb-10"><p className="mb-2 text-[9px] uppercase tracking-[0.32em] text-amber-300/75">Scene 02 / Create</p><h2 className="font-sans text-4xl font-black leading-none tracking-[-0.035em] text-white">CREATE ACCOUNT</h2><p className="mt-3 text-sm text-white/65">Join the Talent Network.</p></div>
      {error && <div role="alert" className="mb-7 rounded-full border border-red-400/20 bg-red-400/[0.06] px-5 py-3 text-sm text-red-200">{error}</div>}
      <button type="button" onClick={handleGoogle} className={secondaryButtonClass}><span className="grid h-5 w-5 place-items-center rounded-md bg-white text-[11px] font-bold text-black">G</span>Continue with Google</button>
      <div className="my-9 flex items-center gap-4" aria-hidden="true"><span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.10]" /><span className="flex items-center gap-2 text-[8px] uppercase tracking-[0.3em] text-white/50"><span className="h-1 w-1 rounded-full bg-amber-400/60" />or email<span className="h-1 w-1 rounded-full bg-amber-400/60" /></span><span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.10]" /></div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block"><span className="mb-3 block text-[9px] uppercase tracking-[0.25em] text-white/85">Full name</span><input className={inputClass} value={form.name} onChange={update("name")} autoComplete="name" placeholder="Your name" required /></label>
        <label className="block"><span className="mb-3 block text-[9px] uppercase tracking-[0.25em] text-white/85">Email address</span><input className={inputClass} type="email" value={form.email} onChange={update("email")} autoComplete="email" placeholder="you@example.com" required /></label>
        <label className="block"><span className="mb-3 block text-[9px] uppercase tracking-[0.25em] text-white/85">Password</span><input className={inputClass} type="password" value={form.password} onChange={update("password")} autoComplete="new-password" placeholder="Create a password" minLength={8} required /></label>
        <label className="block"><span className="mb-3 block text-[9px] uppercase tracking-[0.25em] text-white/85">Confirm password</span><input className={inputClass} type="password" value={form.confirmPassword} onChange={update("confirmPassword")} autoComplete="new-password" placeholder="Repeat your password" minLength={8} required /></label>
        <div className="flex items-start gap-2 rounded-full bg-white/[0.02] px-4 py-3 text-[11px] leading-5 text-white/65"><Check size={14} className="mt-0.5 shrink-0 text-amber-400" />Your account can be used to continue into talent onboarding.</div>
        <button disabled={loading} className={primaryButtonClass}><span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-20deg] bg-white/20 transition duration-700 group-hover:translate-x-[380%]" /><span className="relative">{loading ? "Creating account…" : "Create account"}</span><ArrowRight size={16} className="relative transition group-hover:translate-x-1" /></button>
      </form>
    </AuthLayout>
  );
}
