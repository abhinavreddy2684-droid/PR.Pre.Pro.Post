import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TalentOnboarding from "./TalentOnboarding";

export default function TalentOnboardingGate() {
  const navigate = useNavigate();
  const location = useLocation();
  const authenticated = sessionStorage.getItem("ppp_authenticated") === "1";

  useEffect(() => {
    if (!authenticated) {
      navigate(`/login?next=${encodeURIComponent(`${location.pathname}${location.search}`)}`, { replace: true });
    }
  }, [authenticated, location.pathname, location.search, navigate]);

  if (!authenticated) return null;
  return <TalentOnboarding />;
}
