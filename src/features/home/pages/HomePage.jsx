import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/components/sections/hero/HeroSection";
import CinemaReel from "@/features/home/components/cinema-reel/CinemaReel";
import AboutSection from "@/features/home/components/AboutSection";
import TalentNetwork from "@/features/home/components/TalentNetwork";
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
      <TalentNetwork />

      {/*
        ProductionShowcase remains implemented but is intentionally hidden until there are real
        productions (there is no productions endpoint yet).
      */}

      <HowItWorks />
      <Testimonials />
      <ContactSection />

      <Footer />
    </>
  );
}
