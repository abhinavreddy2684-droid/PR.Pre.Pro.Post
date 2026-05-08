import React, { useState } from 'react';

// The 24 Crafts Database (Ready to be moved to your Django/DRF backend later)
const crafts = [
  { id: 1, title: 'Direction', description: 'The visionary force driving the narrative, aesthetic, and technical execution of the film.' },
  { id: 2, title: 'Screenplay', description: 'Structuring the story, pacing, and scene-by-scene blueprint that brings the script to the screen.' },
  { id: 3, title: 'Cinematography', description: 'Painting with light and shadow. Expert camera work to capture the director’s vision.' },
  { id: 4, title: 'Music Direction', description: 'Original compositions, background scoring, and thematic music that dictate the emotional heartbeat.' },
  { id: 5, title: 'Editing', description: 'The final rewrite. Pacing, rhythm, and structural assembly of the raw footage.' },
  { id: 6, title: 'Art Direction', description: 'Executing the visual style of sets, locations, and overall environmental aesthetics.' },
  { id: 7, title: 'Action & Stunts', description: 'Choreographing and executing safe, high-impact physical action sequences.' },
  { id: 8, title: 'Dance Choreography', description: 'Designing movement and rhythm for musical sequences and specialized scenes.' },
  { id: 9, title: 'Makeup & Hair', description: 'Transforming actors into characters through prosthetics, styling, and visual design.' },
  { id: 10, title: 'Costume Design', description: 'Sourcing, designing, and fitting wardrobe that authenticates the character and era.' },
  { id: 11, title: 'Sound Design', description: 'Building the auditory world from Foley and ambiance to final multi-channel mixing.' },
  { id: 12, title: 'VFX & CGI', description: 'Digital set extensions, creature design, and post-production visual enhancement.' },
  { id: 13, title: 'Dubbing', description: 'Professional voice acting and automated dialogue replacement (ADR) for flawless audio.' },
  { id: 14, title: 'Playback Singing', description: 'World-class vocal tracking for original songs and musical numbers.' },
  { id: 15, title: 'Lyricist', description: 'Crafting poetic, rhythmic, and narrative-driven lyrics for original compositions.' },
  { id: 16, title: 'Story Development', description: 'The genesis. Brainstorming, outlining, and developing the core narrative premise.' },
  { id: 17, title: 'Dialogue Writing', description: 'Crafting natural, impactful, and character-specific spoken lines.' },
  { id: 18, title: 'Production Design', description: 'The overarching visual concept architect, overseeing both art and costume departments.' },
  { id: 19, title: 'PR & Publicity', description: 'Strategic marketing, press relations, and audience building for the final release.' },
  { id: 20, title: 'Still Photography', description: 'Capturing high-resolution promotional imagery and behind-the-scenes moments.' },
  { id: 21, title: 'Casting', description: 'Scouting, auditioning, and securing the perfect talent for every role.' },
  { id: 22, title: 'Subtitling', description: 'Accurate, localized translation and timing for global audience reach.' },
  { id: 23, title: 'Color Grading (DI)', description: 'Digital intermediate processing to finalize the mood, contrast, and color palette.' },
  { id: 24, title: 'Production Management', description: 'The logistical backbone: budgeting, scheduling, and day-to-day set operations.' }
];

export default function CinemaReel() {
  // Initialize state with Screenplay, as requested in the prototype design
  const [activeCraft, setActiveCraft] = useState(crafts[1]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* 1. Hero Section */}
      <header className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
          You Dream We Build.
        </h1>
        <p className="text-lg md:text-2xl text-neutral-400 font-light leading-relaxed">
          The bridge between visionary filmmakers and the industry's elite talent. 
          Select a craft below to request specialized services from our 24-craft network.
        </p>
      </header>

      {/* 2. The 35mm Reel Section */}
      <section className="w-full relative py-12">
        {/* Top Perforations */}
        <div className="w-full h-4 bg-black border-y border-neutral-800 flex justify-around items-center px-4 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div key={`top-${i}`} className="w-3 h-2 bg-neutral-900 rounded-sm mx-1"></div>
          ))}
        </div>

        {/* The Film Strip (Scrollable Container) */}
        <div className="w-full bg-black py-6 overflow-x-auto whitespace-nowrap scrollbar-hide flex items-center px-8 space-x-6 snap-x snap-mandatory">
          {crafts.map((craft) => {
            const isActive = activeCraft.id === craft.id;
            return (
              <button
                key={craft.id}
                onClick={() => setActiveCraft(craft)}
                className={`snap-center relative flex-shrink-0 w-64 h-40 rounded-sm flex items-center justify-center transition-all duration-300 ease-out cursor-pointer group
                  ${isActive 
                    ? 'bg-amber-500 scale-110 z-10 shadow-[0_0_30px_rgba(245,158,11,0.4)]' 
                    : 'bg-neutral-900 hover:bg-neutral-800 hover:scale-105 opacity-60 hover:opacity-100'}
                `}
              >
                <div className="absolute inset-1 border border-neutral-950/20 rounded-sm"></div>
                <span className={`text-xl font-bold tracking-wide transition-colors duration-300 
                  ${isActive ? 'text-black' : 'text-neutral-300 group-hover:text-white'}
                `}>
                  {craft.title}
                </span>
                
                {/* Frame Number */}
                <span className={`absolute bottom-2 right-3 text-xs font-mono 
                  ${isActive ? 'text-black/60' : 'text-neutral-600'}
                `}>
                  {String(craft.id).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Perforations */}
        <div className="w-full h-4 bg-black border-y border-neutral-800 flex justify-around items-center px-4 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div key={`bottom-${i}`} className="w-3 h-2 bg-neutral-900 rounded-sm mx-1"></div>
          ))}
        </div>
      </section>

      {/* 3. The Spotlight Stage (Dynamic Content) */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center animate-fade-in-up">
        <div className="inline-block mb-4 px-4 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-mono tracking-widest uppercase">
          Craft {String(activeCraft.id).padStart(2, '0')}
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          {activeCraft.title}
        </h2>
        <p className="text-xl text-neutral-400 mb-10 leading-relaxed">
          {activeCraft.description}
        </p>
        
        <button className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg py-4 px-10 rounded-full transition-all duration-200 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(245,158,11,0.2)] active:translate-y-0">
          Request {activeCraft.title} Services
        </button>
      </section>
    </div>
  );
}