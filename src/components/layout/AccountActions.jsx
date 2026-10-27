import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, UserRound } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/cn";

const STYLES = {
  bar: {
    root: "flex items-center gap-2",
    primary:
      "inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold tracking-wide text-black shadow-[0_0_40px_rgba(245,158,11,0.25)] transition hover:-translate-y-0.5 hover:bg-amber-400",
    secondary:
      "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-amber-500/40 hover:text-amber-300 disabled:opacity-50",
    // Icon-only so the bar does not wrap; the label stays for screen readers and as a tooltip.
    label: "sr-only",
    note: "hidden whitespace-nowrap text-xs text-amber-300/80 underline-offset-4 hover:underline 2xl:inline",
  },
  menu: {
    root: "mx-auto flex max-w-sm flex-col gap-3",
    primary:
      "flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 px-5 text-base font-bold uppercase tracking-[0.12em] text-black",
    secondary:
      "flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-base font-bold uppercase tracking-[0.12em] text-neutral-200 transition hover:border-amber-500/40 hover:text-amber-400 disabled:opacity-50",
    label: "",
    note: "text-center text-xs text-amber-300/80 underline-offset-4 hover:underline",
  },
};

/**
 * "Login / Sign up" when signed out; "My profile" and "Log out" when signed in, plus a
 * "Verify your email" link for unverified accounts.
 * @param {{ variant?: "bar" | "menu", onNavigate?: () => void }} props `onNavigate` runs before
 *   any navigation (the mobile menu closes itself with it)
 */
export default function AccountActions({ variant = "bar", onNavigate }) {
  const { status, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);
  const styles = STYLES[variant];

  if (status === "loading") return null;

  if (status === "signedOut") {
    const next = `${location.pathname}${location.search}${location.hash}`;
    const isAuthPage = ["/login", "/register"].includes(location.pathname);
    return (
      <div className={styles.root}>
        <Link
          to={isAuthPage ? "/login" : `/login?next=${encodeURIComponent(next)}`}
          onClick={onNavigate}
          className={styles.primary}
        >
          Login / Sign up
        </Link>
      </div>
    );
  }

  const handleLogout = async () => {
    setSigningOut(true);
    await logout();
    setSigningOut(false);
    onNavigate?.();
    navigate("/");
  };

  return (
    <div className={styles.root}>
      {!user.email_verified && (
        <Link to="/verify-email" onClick={onNavigate} className={cn(styles.note, "order-last")}>
          Verify your email
        </Link>
      )}
      <Link
        to="/talent/me"
        onClick={onNavigate}
        className={styles.secondary}
        title={`My profile (${user.email})`}
      >
        <UserRound size={17} />
        <span className={styles.label}>My profile</span>
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        disabled={signingOut}
        className={styles.secondary}
        title="Log out"
      >
        <LogOut size={17} />
        <span className={styles.label}>{signingOut ? "Logging out…" : "Log out"}</span>
      </button>
    </div>
  );
}
