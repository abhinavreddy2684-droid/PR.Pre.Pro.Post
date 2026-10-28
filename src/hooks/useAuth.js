import { useContext } from "react";
import { AuthContext } from "@/hooks/authContext";

/**
 * The current session, from AuthProvider.
 * @returns {{
 *   status: "loading" | "signedIn" | "signedOut",
 *   user: import("@/lib/types").Me | null,
 *   login: (values: { email: string, password: string }) => Promise<void>,
 *   register: (values: { email: string, password: string }) => Promise<void>,
 *   logout: () => Promise<void>,
 *   reloadUser: () => Promise<void>,
 *   applyUser: (user: import("@/lib/types").Me) => void,
 * }}
 */
export default function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside <AuthProvider>.");
  return value;
}
