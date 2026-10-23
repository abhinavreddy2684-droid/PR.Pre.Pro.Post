import { Camera, Mail, MessageCircle } from "lucide-react";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import SectionHeading from "../components/ui/SectionHeading";
import Textarea from "../components/ui/Textarea";

export default function ContactSection() {
  const socialButtonClass = "!p-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center";

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 px-6">
      <div className="max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 p-6 sm:p-10 lg:p-14">
          <div>
            <SectionHeading eyebrow="Start Collaboration" title={<>Bring Your<br />Story To Life.</>} />
            <p className="mt-6 text-base sm:text-lg text-neutral-400 leading-relaxed">Connect with filmmakers, editors, writers, cinematographers, actors, musicians, and production professionals across all 24 crafts.</p>
            <div className="flex items-center gap-4 mt-7">
              {[Camera, Mail, MessageCircle].map((Icon, index) => <Button key={index} variant="secondary" aria-label={`Contact option ${index + 1}`} className={socialButtonClass}><Icon /></Button>)}
            </div>
          </div>

          <form className="space-y-4 sm:space-y-5">
            <Input type="text" placeholder="Your Name" className="px-5 py-4 rounded-2xl border border-white/10 bg-black/30 text-white focus:border-amber-500/40" />
            <Input type="email" placeholder="Email Address" className="px-5 py-4 rounded-2xl border border-white/10 bg-black/30 text-white focus:border-amber-500/40" />
            <Textarea rows="5" placeholder="Tell us about your production..." />
            <Button type="submit" className="w-full">Begin Production</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
