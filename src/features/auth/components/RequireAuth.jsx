import { Navigate, useLocation } from "react-router-dom";
import Loader from "@/components/ui/Loader";
import useAuth from "@/hooks/useAuth";
import { loginPathFor } from "@/features/auth/nextPath";

/** Renders `children` for a signed-in user; sends anyone else to /login?next=<this page>. */
export default function RequireAuth({ children }) {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") return <Loader />;
  if (status === "signedOut") return <Navigate to={loginPathFor(location)} replace />;
  return children;
}
