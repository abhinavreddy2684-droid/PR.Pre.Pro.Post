import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthLayout({ eyebrow, title, description, children, footer }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-amber-400/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(245,158,11,0.08),transparent_48%),linear-gradient(180deg,#080706_0%,#050505_55%,#030303_100%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="grain-overlay" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-amber-500/30 bg-amber-500/[0.08] text-amber-300 transition duration-300 group-hover:border-amber-400/60 group-hover:bg-amber-400/[0.12]">
            <Film size={18} strokeWidth={1.5} />
          </span>
          <span className="font-['Bebas_Neue'] text-2xl tracking-[0.22em] text-white">PRE PRO POST</span>
        </Link>
        <Link to="/" className="rounded-lg px-2 py-1 text-[10px] uppercase tracking-[0.28em] text-white/35 transition hover:bg-white/[0.03] hover:text-amber-300">
          Back to home
        </Link>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] max-w-7xl items-center justify-center px-6 pb-16 pt-6 lg:px-10">
        <div className="grid w-full max-w-5xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="hidden lg:block">
            <p className="mb-5 text-[10px] uppercase tracking-[0.34em] text-amber-300/70">{eyebrow}</p>
            <h1 className="font-['Bebas_Neue'] text-7xl leading-[0.86] tracking-[0.02em] text-white xl:text-8xl">{title}</h1>
            <div className="mt-8 h-px w-28 bg-gradient-to-r from-amber-400 to-transparent" />
            <p className="mt-7 max-w-md text-sm leading-7 text-white/40">{description}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="w-full">
            <div className="rounded-2xl border border-white/[0.09] bg-[#11100e]/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-9 lg:p-10">
              <div className="mb-8 lg:hidden">
                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-amber-300/70">{eyebrow}</p>
                <h1 className="font-['Bebas_Neue'] text-6xl leading-none tracking-wide text-white">{title}</h1>
                <p className="mt-4 text-sm leading-6 text-white/40">{description}</p>
              </div>
              {children}
              {footer && <div className="mt-8 border-t border-white/[0.08] pt-6">{footer}</div>}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
