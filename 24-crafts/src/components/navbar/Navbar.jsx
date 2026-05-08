import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clapperboard } from "lucide-react";

import MobileMenu from "./MobileMenu";

const navLinks = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "Crafts",
    href: "#crafts",
  },
  {
    label: "Talent Network",
    href: "#talent",
  },
  {
    label: "Productions",
    href: "#productions",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-500
          ${
            scrolled
              ? "bg-black/50 backdrop-blur-2xl border-b border-white/10"
              : "bg-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          
          {/* Logo */}

          <motion.a
            whileHover={{ scale: 1.03 }}
            href="#home"
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center">
              <Clapperboard className="text-amber-400" />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-[0.3em] text-amber-400 uppercase">
                24 Crafts
              </h1>

              <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-500">
                Of Cinema
              </p>
            </div>
          </motion.a>

          {/* Desktop Menu */}

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="
                  text-sm uppercase tracking-[0.22em]
                  text-neutral-300
                  hover:text-amber-400
                  transition-all duration-300
                "
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}

          <div className="hidden lg:flex">
            <button
              className="
                px-6 py-3 rounded-full
                bg-amber-500 text-black
                font-semibold
                hover:bg-amber-400
                transition-all duration-300
                shadow-[0_0_40px_rgba(245,158,11,0.25)]
              "
            >
              Start Project
            </button>
          </div>

          {/* Mobile */}

          <div className="lg:hidden">
            <MobileMenu navLinks={navLinks} />
          </div>
        </div>
      </motion.nav>
    </>
  );
}