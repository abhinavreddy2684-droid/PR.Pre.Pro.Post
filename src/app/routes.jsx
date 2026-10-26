import { Route, Routes } from "react-router-dom";

import { ArtistsPage } from "@/features/artists";
import { LoginPage, NotFoundPage, RegisterPage, VerifyEmailPage } from "@/features/auth";
import { HomePage } from "@/features/home";
import { ProductionsPage } from "@/features/productions";
import {
  TalentDiscoveryPage,
  TalentOnboardingPage,
  TalentOwnerProfilePage,
  TalentProfilePage,
} from "@/features/talent";

// Route table. Order matters: /talent/onboarding and /talent/me must stay above /talent/:talentId.
// React Router ranks routes by specificity, so the "*" catch-all only matches unknown paths.
const routes = [
  { path: "/", Page: HomePage },
  { path: "/talent", Page: TalentDiscoveryPage },
  { path: "/talent/onboarding", Page: TalentOnboardingPage },
  { path: "/talent/me", Page: TalentOwnerProfilePage },
  { path: "/talent/:talentId", Page: TalentProfilePage },
  { path: "/productions", Page: ProductionsPage },
  { path: "/artists", Page: ArtistsPage },
  { path: "/login", Page: LoginPage },
  { path: "/register", Page: RegisterPage },
  { path: "/verify-email", Page: VerifyEmailPage },
  { path: "*", Page: NotFoundPage },
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
