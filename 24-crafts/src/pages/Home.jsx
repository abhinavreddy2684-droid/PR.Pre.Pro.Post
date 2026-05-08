import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

import HeroSection from "../sections/HeroSection";
import CinemaReel from "../sections/CinemaReel";
import AboutSection from "../sections/AboutSection";
import TalentNetwork from "../sections/TalentNetwork";
import ProductionShowcase from "../sections/ProductionShowcase";
import HowItWorks from "../sections/HowItWorks";
import Testimonials from "../sections/Testimonials";
import ContactSection from "../sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />

      <CinemaReel />

      <AboutSection />

      <TalentNetwork />

      <ProductionShowcase />

      <HowItWorks />

      <Testimonials />

      <ContactSection />

      <Footer />
    </>
  );
}