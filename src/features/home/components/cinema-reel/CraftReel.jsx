import CraftReelButton from "@/features/home/components/cinema-reel/CraftReelButton";
import FilmPerforation from "@/features/home/components/cinema-reel/FilmPerforation";

/** Horizontal strip of craft buttons between two film perforation rows. */
export default function CraftReel({ crafts, activeCraftId, onSelect }) {
  return (
    <section className="w-full relative py-12">
      <FilmPerforation />

      <div className="relative w-full bg-black py-6 overflow-x-auto whitespace-nowrap scrollbar-hide flex items-center px-8 space-x-6 snap-x snap-mandatory">
        {crafts.map((craft) => (
          <div key={craft.id} className="relative shrink-0 snap-center">
            <CraftReelButton
              craftId={craft.id}
              active={activeCraftId === craft.id}
              onClick={() => onSelect(craft)}
              aria-label={`View details for ${craft.title}`}
              aria-pressed={activeCraftId === craft.id}
            >
              {craft.title}
            </CraftReelButton>
          </div>
        ))}
      </div>

      <FilmPerforation />
    </section>
  );
}
