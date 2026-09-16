import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthLayout({ eyebrow, title, description, children, footer }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040404] text-white selection:bg-amber-400/20">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/[0.07] blur-[180px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.025)_50%)] bg-[length:100%_4px] opacity-30" />
      <div className="grain-overlay" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-[14px] border border-amber-500/40 bg-amber-500/[0.08] text-amber-300 transition duration-300 group-hover:border-amber-400/70 group-hover:bg-amber-400/[0.12]">
            <Film size={18} strokeWidth={1.5} />
          </span>
          <span className="font-['Bebas_Neue'] text-2xl tracking-[0.22em] text-white sm:text-[1.7rem]">PRE PRO POST</span>
        </Link>
        <Link to="/" className="rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-white/65 transition hover:bg-white/[0.04] hover:text-white">
          Back to home
        </Link>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] max-w-7xl items-center justify-center px-6 pb-16 pt-4 lg:px-10">
        <div className="grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24 xl:gap-28">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hidden lg:block">
            <p className="mb-6 text-[10px] uppercase tracking-[0.38em] text-amber-300/75">{eyebrow}</p>
            <h1 className="font-sans text-[6.5rem] font-black leading-[0.82] tracking-[-0.055em] text-white xl:text-[7.5rem] 2xl:text-[8.5rem]">{title}</h1>
            <div className="mt-9 h-px w-28 bg-gradient-to-r from-amber-400 to-transparent" />
            <p className="mt-7 max-w-xl text-[1.05rem] leading-8 text-white/60">{description}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="w-full max-w-2xl lg:ml-auto">
            <div className="px-0 py-2 sm:px-1 lg:px-0">
              <div className="mb-9 lg:hidden">
                <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-amber-300/75">{eyebrow}</p>
                <h1 className="font-sans text-5xl font-black leading-[0.84] tracking-[-0.045em] text-white sm:text-6xl">{title}</h1>
                <p className="mt-5 text-sm leading-6 text-white/60">{description}</p>
              </div>
              {children}
              {footer && <div className="mt-9 border-t border-white/[0.10] pt-7">{footer}</div>}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
