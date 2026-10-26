import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";
import { scrollToHash } from "@/lib/scroll";
import MobileMenuOverlay, { ICON_BUTTON_CLASS } from "@/components/layout/MobileMenuOverlay";

/** Menu button (below lg) that opens the MobileMenuOverlay in a portal. */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (href) => {
    setOpen(false);

    const url = new URL(href, window.location.origin);
    const targetPath = url.pathname;
    const targetHash = url.hash;
    const currentHash = window.location.hash;

    // A router navigation to the current route does not remount the page.
    // Explicitly handle that case so Home always means "go to the top" and
    // the current anchor can still be reselected.
    if (location.pathname === targetPath && currentHash === targetHash) {
      requestAnimationFrame(() => scrollToHash(targetHash));
      return;
    }

    navigate(`${targetPath}${targetHash}`);
  };

  const menuOverlay = open ? (
    <AnimatePresence>
      <MobileMenuOverlay onClose={() => setOpen(false)} onNavigate={handleNavigation} />
    </AnimatePresence>
  ) : null;

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className={ICON_BUTTON_CLASS}
      >
        <Menu className="w-5 h-5 text-white" />
      </Button>

      {typeof document !== "undefined" && createPortal(menuOverlay, document.body)}
    </>
  );
}
