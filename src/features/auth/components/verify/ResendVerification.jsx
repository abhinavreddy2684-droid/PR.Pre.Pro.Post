import { useState } from "react";
import { Link } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { isApiError, userMessage } from "@/lib/api";
import FormMessage from "@/features/auth/components/FormMessage";
import { resendVerification } from "@/features/auth/api/authApi";
import { loginPathFor } from "@/features/auth/nextPath";
import { SECONDARY_BUTTON_CLASS } from "@/features/auth/components/verify/linkClasses";

/**
 * "Resend verification email" for a signed-in, unverified account. Signed-out visitors get a
 * sign-in link instead, since the endpoint needs the session.
 */
export default function ResendVerification() {
  const { status, user, reloadUser } = useAuth();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(null);

  if (status === "loading") return null;

  if (status === "signedOut") {
    return (
      <Link to={loginPathFor({ pathname: "/verify-email" })} className={SECONDARY_BUTTON_CLASS}>
        Sign in to send a new link
      </Link>
    );
  }

  if (user.email_verified) {
    return <FormMessage kind="notice">Your email address is already verified.</FormMessage>;
  }

  const resend = async () => {
    setPending(true);
    setMessage(null);
    try {
      await resendVerification();
      setMessage({ kind: "notice", text: `We sent a new link to ${user.email}.` });
    } catch (error) {
      if (isApiError(error, "already_verified")) {
        await reloadUser().catch(() => {});
        return;
      }
      setMessage({ kind: "error", text: userMessage(error) });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="space-y-5">
      {message && <FormMessage kind={message.kind}>{message.text}</FormMessage>}
      <button type="button" onClick={resend} disabled={pending} className={SECONDARY_BUTTON_CLASS}>
        <RefreshCw size={14} className={pending ? "animate-spin" : ""} />
        {pending ? "Sending…" : "Resend verification email"}
      </button>
    </div>
  );
}
