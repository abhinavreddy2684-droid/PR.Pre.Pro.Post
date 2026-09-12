import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";

const inputClass = "w-full border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-amber-400/50 focus:bg-white/[0.045]";

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
    <AuthLayout eyebrow="Talent Network / Sign in" title={<>WELCOME<br />BACK.</>} description="Your work, your craft, your place in cinema. Sign in to continue building your professional presence." footer={<p className="text-center text-xs text-white/35">New to Pre Pro Post? <Link to={`/register?next=${encodeURIComponent(next)}`} className="font-medium text-amber-300 transition hover:text-amber-200">Create an account</Link></p>}>
      <div className="mb-7"><h2 className="text-xl font-semibold text-white">Sign in</h2><p className="mt-1 text-sm text-white/35">Continue to your talent profile.</p></div>
      {error && <div role="alert" className="mb-5 border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-200">{error}</div>}
      <button type="button" onClick={handleGoogle} className="flex w-full items-center justify-center gap-3 border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.07]"><span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[11px] font-bold text-black">G</span>Continue with Google</button>
      <div className="my-7 flex items-center gap-4"><span className="h-px flex-1 bg-white/10" /><span className="text-[9px] uppercase tracking-[0.25em] text-white/20">or email</span><span className="h-px flex-1 bg-white/10" /></div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block"><span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/40">Email address</span><input className={inputClass} type="email" value={form.email} onChange={update("email")} autoComplete="email" placeholder="you@example.com" required /></label>
        <label className="block"><div className="mb-2 flex items-center justify-between"><span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Password</span><Link to="/reset-password" className="text-[10px] text-amber-300/70 hover:text-amber-300">Forgot password?</Link></div><div className="relative"><input className={`${inputClass} pr-12`} type={showPassword ? "text" : "password"} value={form.password} onChange={update("password")} autoComplete="current-password" placeholder="Enter your password" required /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
        <button disabled={loading} className="group flex w-full items-center justify-center gap-3 bg-amber-400 px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Signing in…" : "Sign in"}<ArrowRight size={16} className="transition group-hover:translate-x-1" /></button>
      </form>
    </AuthLayout>
  );
}
