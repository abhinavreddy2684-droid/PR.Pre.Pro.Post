import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/components/sections/hero/HeroSection";
import CinemaReel from "@/sections/CinemaReel";
import AboutSection from "@/sections/AboutSection";
import HowItWorks from "@/sections/HowItWorks";
import Testimonials from "@/sections/Testimonials";
import ContactSection from "@/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />
      <CinemaReel />
      <AboutSection />

      {/*
        TalentNetwork and ProductionShowcase (src/sections/) remain implemented
        but are intentionally hidden until there are real marketplace entries.
      */}

      <HowItWorks />
      <Testimonials />
      <ContactSection />

      <Footer />
    </>
  );
}
