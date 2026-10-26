import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/components/sections/hero/HeroSection";
import CinemaReel from "@/features/home/components/cinema-reel/CinemaReel";
import AboutSection from "@/features/home/components/AboutSection";
import HowItWorks from "@/features/home/components/HowItWorks";
import Testimonials from "@/features/home/components/Testimonials";
import ContactSection from "@/features/home/components/ContactSection";

export default function HomePage() {
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
