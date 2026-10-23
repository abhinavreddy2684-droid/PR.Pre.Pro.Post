import { useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import HomePage from "@/features/home/pages/HomePage";
import ProductionsPage from "@/features/productions/pages/ProductionsPage";
import ArtistsPage from "@/features/artists/pages/ArtistsPage";
import TalentDiscoveryPage from "@/features/talent/pages/TalentDiscoveryPage";
import TalentProfilePage from "@/features/talent/pages/TalentProfilePage";
import TalentOnboardingPage from "@/features/talent/pages/TalentOnboardingPage";
import TalentOwnerProfilePage from "@/features/talent/pages/TalentOwnerProfilePage";

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
        <Route path="/" element={<HomePage />} />
        <Route path="/talent" element={<TalentDiscoveryPage />} />
        <Route path="/talent/onboarding" element={<TalentOnboardingPage />} />
        <Route path="/talent/me" element={<TalentOwnerProfilePage />} />
        <Route path="/talent/:talentId" element={<TalentProfilePage />} />
        <Route path="/productions" element={<ProductionsPage />} />
        <Route path="/artists" element={<ArtistsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
