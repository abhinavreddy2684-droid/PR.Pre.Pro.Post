import { Link, useLocation } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";

export default function ErrorPage() {
  const { pathname } = useLocation();
  return (
    <AuthLayout eyebrow="Pre Pro Post / Something went wrong" title={<>WRONG<br />TURN.</>} description="The page you’re looking for isn’t available right now. You can return to the home page or head back to the Talent Network.">
      <div className="text-center">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-amber-400/20 bg-amber-400/[0.07] text-amber-300"><AlertTriangle size={25} strokeWidth={1.5} /></div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/25">Route unavailable</p>
        <p className="mt-2 font-mono text-xs text-white/35">{pathname}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 bg-amber-400 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-black hover:bg-amber-300">Home</Link>
          <Link to="/talent" className="inline-flex items-center justify-center gap-2 border border-white/10 px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white/65 hover:border-amber-400/30 hover:text-amber-300"><ArrowLeft size={14} /> Talent Network</Link>
        </div>
      </div>
    </AuthLayout>
  );
}
