import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "@/hooks/authContext";
import { onSessionEnded } from "@/lib/api";
import * as authApi from "@/features/auth/api/authApi";

const SIGNED_OUT = { status: "signedOut", user: null };

/**
 * Owns the session. On mount it restores a previous session through the refresh cookie and
 * GET /api/me; a 401 there just means signed out. Read it with useAuth().
 */
export default function AuthProvider({ children }) {
  const [session, setSession] = useState({ status: "loading", user: null });

  useEffect(() => {
    let active = true;
    authApi
      .restoreSession()
      .then((user) => active && setSession(user ? { status: "signedIn", user } : SIGNED_OUT))
      .catch(() => active && setSession(SIGNED_OUT));
    const unsubscribe = onSessionEnded(() => setSession(SIGNED_OUT));
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const login = useCallback(async (values) => {
    await authApi.login(values);
    const user = await authApi.getMe();
    setSession({ status: "signedIn", user });
  }, []);

  const register = useCallback(async (values) => {
    const user = await authApi.register(values);
    setSession({ status: "signedIn", user });
  }, []);

  // Signing out locally always succeeds. If the request failed (offline, rate limited), the
  // refresh cookie may survive and the next page load would restore the session.
  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // The token is already dropped; nothing more to do here.
    } finally {
      setSession(SIGNED_OUT);
    }
  }, []);

  const reloadUser = useCallback(async () => {
    const user = await authApi.getMe();
    setSession({ status: "signedIn", user });
  }, []);

  /** Takes a fresher copy of the signed-in account (e.g. from verify-email). */
  const applyUser = useCallback((user) => {
    setSession((current) =>
      current.status === "signedIn" && current.user?.id === user.id
        ? { ...current, user }
        : current,
    );
  }, []);

  const value = useMemo(
    () => ({ ...session, login, register, logout, reloadUser, applyUser }),
    [session, login, register, logout, reloadUser, applyUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
