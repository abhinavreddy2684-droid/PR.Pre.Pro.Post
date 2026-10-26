const HOLE_COUNT = 50;

/** Row of film-sprocket holes that frames the craft reel. */
export default function FilmPerforation() {
  return (
    <div className="w-full h-4 bg-black border-y border-neutral-800 flex justify-around items-center px-4 overflow-hidden">
      {[...Array(HOLE_COUNT)].map((_, index) => (
        <div key={index} className="w-3 h-2 bg-neutral-900 rounded-sm mx-1 shrink-0" />
      ))}
    </div>
  );
}
