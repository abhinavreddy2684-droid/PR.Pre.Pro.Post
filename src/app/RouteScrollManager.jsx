import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "@/lib/scroll";

// Scrolls to the top on route changes, or to #hash targets, and keeps the browser from
// restoring old scroll positions while the app is mounted.
export default function RouteScrollManager() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    } else {
      scrollToTop("auto");
    }

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, [pathname, hash]);

  return null;
}
