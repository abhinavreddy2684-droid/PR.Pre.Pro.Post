import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthLayout({ eyebrow, title, description, children, footer }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040404] text-white selection:bg-amber-400/20">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute left-1/2 top-1/2 h-[1400px] w-[1400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[200px]" />
      <div className="absolute left-[10%] top-[-20%] h-[160%] w-[520px] rotate-[22deg] bg-gradient-to-b from-amber-400/10 to-transparent blur-3xl" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-[0.03]" />

      <div className="absolute bottom-0 left-0 top-0 hidden w-10 flex-col items-center border-r border-white/10 opacity-10 lg:flex">
        {[...Array(24)].map((_, i) => <div key={i} className="mt-4 h-4 w-6 rounded-sm border border-white/30" />)}
      </div>
      <div className="absolute bottom-0 right-0 top-0 hidden w-10 flex-col items-center border-l border-white/10 opacity-10 lg:flex">
        {[...Array(24)].map((_, i) => <div key={i} className="mt-4 h-4 w-6 rounded-sm border border-white/30" />)}
      </div>

      <div className="grain-overlay" />

      <header className="relative z-10 mx-auto flex max-w-[1600px] items-center justify-between px-8 py-7 lg:px-14 xl:px-16">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-[14px] border border-amber-500/40 bg-amber-500/[0.08] text-amber-300 transition duration-300 group-hover:border-amber-400/70 group-hover:bg-amber-400/[0.12]">
            <Film size={18} strokeWidth={1.5} />
          </span>
          <span className="font-['Bebas_Neue'] text-2xl tracking-[0.22em] text-white sm:text-[1.7rem]">PRE PRO POST</span>
        </Link>
        <Link to="/" className="rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-white/75 transition hover:bg-white/[0.04] hover:text-white">
          Back to home
        </Link>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] max-w-[1600px] items-center px-8 pb-16 pt-6 lg:px-14 xl:px-16">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 xl:gap-28">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hidden lg:block">
            <p className="mb-6 text-[10px] uppercase tracking-[0.38em] text-amber-300/85">{eyebrow}</p>
            <h1 className="max-w-3xl font-sans text-[5.5rem] font-black leading-[0.8] tracking-[-0.06em] xl:text-[6.5rem] 2xl:text-[7.25rem]">{title}</h1>
            <div className="mt-9 h-px w-28 bg-gradient-to-r from-amber-500 to-transparent" />
            <p className="mt-7 max-w-xl text-[1.05rem] leading-8 text-white/75">{description}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="w-full max-w-2xl lg:ml-auto">
            <div className="px-0 py-2 sm:px-1 lg:px-0">
              <div className="mb-9 lg:hidden">
                <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-amber-300/85">{eyebrow}</p>
                <h1 className="font-sans text-5xl font-black leading-[0.82] tracking-[-0.05em] text-white sm:text-6xl">{title}</h1>
                <p className="mt-5 text-sm leading-6 text-white/70">{description}</p>
              </div>
              {children}
              {footer && <div className="mt-10 border-t border-white/[0.10] pt-7">{footer}</div>}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
