import { Route, Routes } from "react-router-dom";

import HomePage from "@/features/home/pages/HomePage";
import ProductionsPage from "@/features/productions/pages/ProductionsPage";
import ArtistsPage from "@/features/artists/pages/ArtistsPage";
import TalentDiscoveryPage from "@/features/talent/pages/TalentDiscoveryPage";
import TalentProfilePage from "@/features/talent/pages/TalentProfilePage";
import TalentOnboardingPage from "@/features/talent/pages/TalentOnboardingPage";
import TalentOwnerProfilePage from "@/features/talent/pages/TalentOwnerProfilePage";

// Route table. Order matters: /talent/onboarding and /talent/me must stay above /talent/:talentId.
const routes = [
  { path: "/", Page: HomePage },
  { path: "/talent", Page: TalentDiscoveryPage },
  { path: "/talent/onboarding", Page: TalentOnboardingPage },
  { path: "/talent/me", Page: TalentOwnerProfilePage },
  { path: "/talent/:talentId", Page: TalentProfilePage },
  { path: "/productions", Page: ProductionsPage },
  { path: "/artists", Page: ArtistsPage },
];

export default function AppRoutes() {
  return (
    <Routes>
      {routes.map(({ path, Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
    </Routes>
  );
}
