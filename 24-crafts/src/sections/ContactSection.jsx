import {
  Camera,
  Mail,
  MessageCircle,
} from "lucide-react";

import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-32 px-6"
    >
      <div
        className="
          max-w-7xl mx-auto
          rounded-[3rem]
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          overflow-hidden
        "
      >
        <div className="grid lg:grid-cols-2 gap-20 p-10 md:p-20">
          
          {/* Left */}

          <div>
            <SectionHeading
              eyebrow="Start Collaboration"
              title={
                <>
                  Bring Your
                  <br />
                  Story To Life.
                </>
              }
            />

            <p className="mt-10 text-lg text-neutral-400 leading-relaxed">
              Connect with filmmakers, editors, writers,
              cinematographers, actors, musicians, and
              production professionals across all 24 crafts.
            </p>

            {/* Social */}

            <div className="flex items-center gap-5 mt-10">
              
              {[Camera, Mail, MessageCircle].map(
                (Icon, index) => (
                  <button
                    key={index}
                    className="
                      w-14 h-14 rounded-full
                      border border-white/10
                      bg-white/5
                      hover:border-amber-500/40
                      hover:bg-amber-500/10
                      transition-all duration-300
                      flex items-center justify-center
                    "
                  >
                    <Icon />
                  </button>
                )
              )}
            </div>
          </div>

          {/* Form */}

          <form className="space-y-6">
            
            <input
              type="text"
              placeholder="Your Name"
              className="
                w-full px-6 py-5
                rounded-2xl
                border border-white/10
                bg-black/30
                text-white
                outline-none
                focus:border-amber-500/40
              "
            />

            <input
              type="email"
              placeholder="Email Address"
              className="
                w-full px-6 py-5
                rounded-2xl
                border border-white/10
                bg-black/30
                text-white
                outline-none
                focus:border-amber-500/40
              "
            />

            <textarea
              rows="6"
              placeholder="Tell us about your production..."
              className="
                w-full px-6 py-5
                rounded-2xl
                border border-white/10
                bg-black/30
                text-white
                outline-none
                focus:border-amber-500/40
              "
            />

            <Button className="w-full">
              Begin Production
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}