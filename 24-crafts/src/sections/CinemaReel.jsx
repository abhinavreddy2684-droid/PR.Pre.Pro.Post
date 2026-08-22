import React, { useState } from "react";

import CinemaReelCraftButton from "../components/ui/CinemaReelCraftButton";
import CinemaReelCTAButton from "../components/ui/CinemaReelCTAButton";

const crafts = [
  { id: 1, title: "Direction", description: "The visionary force driving the narrative, aesthetic, and technical execution of the film.", talentTypes: ["Film Directors", "Assistant Directors", "Commercial Directors", "Music Video Directors"] },
  { id: 2, title: "Screenplay", description: "Structuring the story, pacing, and scene-by-scene blueprint that brings the script to the screen.", talentTypes: ["Screenwriters", "Script Writers", "Story Writers", "Screenplay Consultants"] },
  { id: 3, title: "Cinematography", description: "Painting with light and shadow. Expert camera work to capture the director’s vision.", talentTypes: ["Directors of Photography", "Cinematographers", "Camera Operators", "Steadicam Operators"] },
  { id: 4, title: "Music Direction", description: "Original compositions, background scoring, and thematic music that dictate the emotional heartbeat.", talentTypes: ["Music Directors", "Film Composers", "Background Score Composers", "Music Producers"] },
  { id: 5, title: "Editing", description: "The final rewrite. Pacing, rhythm, and structural assembly of the raw footage.", talentTypes: ["Film Editors", "Trailer Editors", "Assistant Editors", "Post-Production Editors"] },
  { id: 6, title: "Art Direction", description: "Executing the visual style of sets, locations, and overall environmental aesthetics.", talentTypes: ["Art Directors", "Set Designers", "Set Decorators", "Visual Concept Artists"] },
  { id: 7, title: "Action & Stunts", description: "Choreographing and executing safe, high-impact physical action sequences.", talentTypes: ["Stunt Performers", "Stunt Coordinators", "Action Choreographers", "Fight Choreographers"] },
  { id: 8, title: "Dance Choreography", description: "Designing movement and rhythm for musical sequences and specialized scenes.", talentTypes: ["Dance Choreographers", "Dance Directors", "Movement Directors", "Dance Performers"] },
  { id: 9, title: "Makeup & Hair", description: "Transforming actors into characters through prosthetics, styling, and visual design.", talentTypes: ["Makeup Artists", "Hair Stylists", "Prosthetic Makeup Artists", "Character Makeup Artists"] },
  { id: 10, title: "Costume Design", description: "Sourcing, designing, and fitting wardrobe that authenticates the character and era.", talentTypes: ["Costume Designers", "Wardrobe Stylists", "Costume Supervisors", "Costume Assistants"] },
  { id: 11, title: "Sound Design", description: "Building the auditory world from Foley and ambiance to final multi-channel mixing.", talentTypes: ["Sound Designers", "Foley Artists", "Re-Recording Mixers", "Location Sound Recordists"] },
  { id: 12, title: "VFX & CGI", description: "Digital set extensions, creature design, and post-production visual enhancement.", talentTypes: ["VFX Artists", "CGI Artists", "Compositors", "3D Artists"] },
  { id: 13, title: "Dubbing", description: "Professional voice acting and automated dialogue replacement (ADR) for flawless audio.", talentTypes: ["Dubbing Artists", "Voice Actors", "ADR Artists", "Dubbing Directors"] },
  { id: 14, title: "Playback Singing", description: "World-class vocal tracking for original songs and musical numbers.", talentTypes: ["Playback Singers", "Session Singers", "Vocalists", "Backing Vocalists"] },
  { id: 15, title: "Lyricist", description: "Crafting poetic, rhythmic, and narrative-driven lyrics for original compositions.", talentTypes: ["Lyricists", "Songwriters", "Poets", "Music Writers"] },
  { id: 16, title: "Story Development", description: "The genesis. Brainstorming, outlining, and developing the core narrative premise.", talentTypes: ["Story Developers", "Story Writers", "Creative Consultants", "Narrative Designers"] },
  { id: 17, title: "Dialogue Writing", description: "Crafting natural, impactful, and character-specific spoken lines.", talentTypes: ["Dialogue Writers", "Screenwriters", "Script Consultants", "Dialogue Consultants"] },
  { id: 18, title: "Production Design", description: "The overarching visual concept architect, overseeing both art and costume departments.", talentTypes: ["Production Designers", "Art Department Heads", "Visual Designers", "Set Designers"] },
  { id: 19, title: "PR & Publicity", description: "Strategic marketing, press relations, and audience building for the final release.", talentTypes: ["PR Professionals", "Publicists", "Film Marketers", "Entertainment Communications Specialists"] },
  { id: 20, title: "Still Photography", description: "Capturing high-resolution promotional imagery and behind-the-scenes moments.", talentTypes: ["Film Photographers", "Still Photographers", "Unit Photographers", "Behind-the-Scenes Photographers"] },
  { id: 21, title: "Casting", description: "Scouting, auditioning, and securing the perfect talent for every role.", talentTypes: ["Casting Directors", "Casting Associates", "Talent Scouts", "Casting Assistants"] },
  { id: 22, title: "Subtitling", description: "Accurate, localized translation and timing for global audience reach.", talentTypes: ["Subtitle Editors", "Subtitle Translators", "Localization Specialists", "Captioning Professionals"] },
  { id: 23, title: "Color Grading (DI)", description: "Digital intermediate processing to finalize the mood, contrast, and color palette.", talentTypes: ["Colorists", "DI Colorists", "Color Grading Artists", "Online Editors"] },
  { id: 24, title: "Production Management", description: "The logistical backbone: budgeting, scheduling, and day-to-day set operations.", talentTypes: ["Production Managers", "Line Producers", "Production Coordinators", "Production Supervisors"] },
];

export default function CinemaReel() {
  const [activeCraft, setActiveCraft] = useState(crafts[1]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-black">
      <header className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
          You Dream We Build.
        </h1>
        <p className="text-lg md:text-2xl text-neutral-400 font-light leading-relaxed">
          The bridge between visionary filmmakers and the industry&apos;s elite talent.
          Select a craft below to discover the talent behind every frame across our 24-craft network.
        </p>
      </header>

      <section className="w-full relative py-12">
        <div className="w-full h-4 bg-black border-y border-neutral-800 flex justify-around items-center px-4 overflow-hidden">
          {[...Array(50)].map((_, i) => <div key={`top-${i}`} className="w-3 h-2 bg-neutral-900 rounded-sm mx-1" />)}
        </div>

        <div className="w-full bg-black py-6 overflow-x-auto whitespace-nowrap scrollbar-hide flex items-center px-8 space-x-6 snap-x snap-mandatory">
          {crafts.map((craft) => (
            <CinemaReelCraftButton
              key={craft.id}
              craftId={craft.id}
              active={activeCraft.id === craft.id}
              onClick={() => setActiveCraft(craft)}
            >
              {craft.title}
            </CinemaReelCraftButton>
          ))}
        </div>

        <div className="w-full h-4 bg-black border-y border-neutral-800 flex justify-around items-center px-4 overflow-hidden">
          {[...Array(50)].map((_, i) => <div key={`bottom-${i}`} className="w-3 h-2 bg-neutral-900 rounded-sm mx-1" />)}
        </div>
      </section>

      <section className="relative max-w-5xl mx-auto px-6 py-20 text-center overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-amber-500/[0.05] blur-[120px] pointer-events-none" />

        <div key={activeCraft.id} className="relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-amber-500/25 bg-amber-500/[0.07] text-amber-400 text-xs font-mono tracking-[0.28em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.7)]" />
            Craft {String(activeCraft.id).padStart(2, "0")}
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">
            {activeCraft.title}
          </h2>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-400 leading-relaxed mb-10">
            {activeCraft.description}
          </p>

          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-10 h-px bg-gradient-to-r from-transparent to-amber-500/40" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                Who can choose this craft
              </span>
              <div className="w-10 h-px bg-gradient-to-l from-transparent to-amber-500/40" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {activeCraft.talentTypes.map((talent, index) => (
                <span
                  key={talent}
                  className="px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.025] text-sm text-neutral-300 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/25 hover:text-amber-200 hover:bg-amber-500/[0.04]"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  {talent}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <CinemaReelCTAButton />
            <p className="text-xs text-neutral-600 tracking-wide">
              Join the network and build your professional cinema profile.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
