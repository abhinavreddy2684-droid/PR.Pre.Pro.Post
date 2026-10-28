import { Route, Routes } from "react-router-dom";

import { ArtistsPage } from "@/features/artists";
import {
  LoginPage,
  NotFoundPage,
  RegisterPage,
  RequireAuth,
  VerifyEmailPage,
} from "@/features/auth";
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
// `signedIn: true` routes send signed-out visitors to /login?next=<the page>.
const routes = [
  { path: "/", Page: HomePage },
  { path: "/talent", Page: TalentDiscoveryPage },
  { path: "/talent/onboarding", Page: TalentOnboardingPage, signedIn: true },
  { path: "/talent/me", Page: TalentOwnerProfilePage, signedIn: true },
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
      {routes.map(({ path, Page, signedIn }) => (
        <Route
          key={path}
          path={path}
          element={
            signedIn ? (
              <RequireAuth>
                <Page />
              </RequireAuth>
            ) : (
              <Page />
            )
          }
        />
      ))}
    </Routes>
  );
}
