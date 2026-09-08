import { useLayoutEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Productions from "./pages/Productions";
import Artists from "./pages/Artists";
import TalentDiscovery from "./pages/TalentDiscovery";
import TalentProfile from "./pages/TalentProfile";
import TalentOnboarding from "./pages/TalentOnboarding";

function RouteScrollManager() {
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
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/talent" element={<TalentDiscovery />} />
        <Route path="/talent/onboarding" element={<TalentOnboarding />} />
        <Route path="/talent/:talentId" element={<TalentProfile />} />
        <Route path="/productions" element={<Productions />} />
        <Route path="/artists" element={<Artists />} />
      </Routes>
    </BrowserRouter>
  );
}
