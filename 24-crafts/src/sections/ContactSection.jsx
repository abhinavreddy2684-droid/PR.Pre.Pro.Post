import { Camera, Mail, MessageCircle } from "lucide-react";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import SectionHeading from "../components/ui/SectionHeading";
import Textarea from "../components/ui/Textarea";

export default function ContactSection() {
  const socialButtonClass = "!p-0 w-14 h-14 flex items-center justify-center";

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto rounded-[3rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-20 p-10 md:p-20">
          <div>
            <SectionHeading eyebrow="Start Collaboration" title={<>Bring Your<br />Story To Life.</>} />
            <p className="mt-10 text-lg text-neutral-400 leading-relaxed">Connect with filmmakers, editors, writers, cinematographers, actors, musicians, and production professionals across all 24 crafts.</p>
            <div className="flex items-center gap-5 mt-10">
              {[Camera, Mail, MessageCircle].map((Icon, index) => <Button key={index} variant="secondary" aria-label={`Contact option ${index + 1}`} className={socialButtonClass}><Icon /></Button>)}
            </div>
          </div>

          <form className="space-y-6">
            <Input type="text" placeholder="Your Name" className="px-6 py-5 rounded-2xl border border-white/10 bg-black/30 text-white focus:border-amber-500/40" />
            <Input type="email" placeholder="Email Address" className="px-6 py-5 rounded-2xl border border-white/10 bg-black/30 text-white focus:border-amber-500/40" />
            <Textarea rows="6" placeholder="Tell us about your production..." />
            <Button type="submit" className="w-full">Begin Production</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
