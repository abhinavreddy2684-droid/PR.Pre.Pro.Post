import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

import HeroSection from "../sections/HeroSection";
import CinemaReel from "../sections/CinemaReel";
import AboutSection from "../sections/AboutSection";
import HowItWorks from "../sections/HowItWorks";
import Testimonials from "../sections/Testimonials";
import ContactSection from "../sections/ContactSection";

// Kept in the codebase for when the marketplace has live talent and productions.
// They are intentionally not rendered while the platform is launching.
import TalentNetwork from "../sections/TalentNetwork";
import ProductionShowcase from "../sections/ProductionShowcase";

export default function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />
      <CinemaReel />
      <AboutSection />

      {/*
        TalentNetwork and ProductionShowcase remain implemented and imported,
        but are intentionally hidden until there are real marketplace entries.
      */}

      <HowItWorks />
      <Testimonials />
      <ContactSection />

      <Footer />
    </>
  );
}
