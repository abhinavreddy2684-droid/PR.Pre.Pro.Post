const HOLE_COUNT = 24;

const SIDE_CLASSES = {
  left: "absolute bottom-0 left-0 top-0 hidden w-12 flex-col items-center border-r border-white/10 opacity-20 lg:flex",
  right:
    "absolute bottom-0 right-0 top-0 hidden w-12 flex-col items-center border-l border-white/10 opacity-20 lg:flex",
};

/** Decorative film-perforation strip down one side of the hero (large screens only). */
export default function FilmStripColumn({ side }) {
  return (
    <div className={SIDE_CLASSES[side]}>
      {[...Array(HOLE_COUNT)].map((_, i) => (
        <div key={i} className="mt-4 h-4 w-6 rounded-sm border border-white/30" />
      ))}
    </div>
  );
}
