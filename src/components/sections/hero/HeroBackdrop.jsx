import FilmStripColumn from "@/components/sections/hero/FilmStripColumn";

/** Stacked decorative layers behind the hero content. */
export default function HeroBackdrop() {
  return (
    <>
      {/* BASE */}
      <div className="absolute inset-0 bg-black" />

      {/* AMBIENT GLOW */}
      <div className="absolute left-1/2 top-1/2 h-[1400px] w-[1400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[200px]" />

      {/* LIGHT SHAFT */}
      <div className="absolute left-[10%] top-[-20%] h-[160%] w-[520px] rotate-[22deg] bg-gradient-to-b from-amber-400/10 to-transparent blur-3xl" />

      {/* FILM GRAIN */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-[0.03]" />

      {/* SCANLINES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.04)_50%)] bg-[length:100%_4px] opacity-10" />

      {/* SIDE FILM STRIPS */}
      <FilmStripColumn side="left" />
      <FilmStripColumn side="right" />
    </>
  );
}
