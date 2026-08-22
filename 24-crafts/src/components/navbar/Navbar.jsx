import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-black/50 backdrop-blur-2xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.03 }} className="w-12 h-12 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center">
            <span className="text-amber-400">PR</span>
          </motion.div>
          <h1 className="text-md md:text font-black tracking-[0.3em] text-amber-400 uppercase">PRE PRO POST</h1>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link key={item.label} to={item.href} className="text-sm uppercase tracking-[0.22em] text-neutral-300 hover:text-amber-400 transition-all duration-300">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex"><Button className="!px-6 !py-3">Start Project</Button></div>
        <div className="lg:hidden"><MobileMenu navLinks={navLinks} /></div>
      </div>
    </motion.nav>
  );
}
