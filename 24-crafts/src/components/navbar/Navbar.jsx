import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import Button from "../ui/Button";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Crafts", href: "/#cinema-reel" },
  { label: "Talent Network", href: "/talent" },
  { label: "Productions", href: "/productions" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCraftsClick = (event) => {
    if (location.pathname !== "/") return;

    event.preventDefault();

    const target = document.getElementById("cinema-reel");
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });

    if (window.location.hash !== "#cinema-reel") {
      window.history.pushState(null, "", "/#cinema-reel");
    }
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-black/70 backdrop-blur-2xl border-b border-white/10" : "bg-black/20 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-5 flex items-center justify-between gap-3">
        <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <motion.div whileHover={{ scale: 1.03 }} className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center">
            <span className="text-sm sm:text-base text-amber-400">PR</span>
          </motion.div>
          <h1 className="truncate text-[11px] sm:text-sm lg:text-base font-black tracking-[0.18em] sm:tracking-[0.3em] text-amber-400 uppercase">PRE PRO POST</h1>
        </Link>

        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={item.label === "Crafts" ? handleCraftsClick : undefined}
              className="text-sm uppercase tracking-[0.18em] text-neutral-300 hover:text-amber-400 transition-all duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex"><Button className="!px-6 !py-3">Start Project</Button></div>
        <div className="lg:hidden shrink-0"><MobileMenu navLinks={navLinks} /></div>
      </div>
    </motion.nav>
  );
}
