import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, Check, Mail } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { userMessage } from "@/lib/api";
import FormMessage from "@/features/auth/components/FormMessage";
import { verifyEmail } from "@/features/auth/api/authApi";
import ResendVerification from "@/features/auth/components/verify/ResendVerification";
import VerificationStatus from "@/features/auth/components/verify/VerificationStatus";
import {
  PRIMARY_LINK_CLASS,
  SECONDARY_BUTTON_CLASS,
} from "@/features/auth/components/verify/linkClasses";

// One request per token, even when StrictMode runs the effect twice: the token is single-use,
// so a second POST would turn a success into "invalid".
const verifications = new Map();

function verifyOnce(token) {
  if (!verifications.has(token)) verifications.set(token, verifyEmail(token));
  return verifications.get(token);
}

const LINK_PROBLEMS = {
  token_expired: {
    heading: "LINK EXPIRED",
    text: "This verification link has expired. Send yourself a new one below.",
  },
  invalid_token: {
    heading: "LINK NOT VALID",
    text: "This verification link is invalid or has already been used. Send yourself a new one below.",
  },
};

/** Confirms the address from the emailed link (POST /api/auth/verify-email, once). */
export default function TokenVerification({ token }) {
  const { status, applyUser } = useAuth();
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ state: "pending" });

  useEffect(() => {
    let active = true;
    verifyOnce(token).then(
      (user) => {
        if (!active) return;
        applyUser(user);
        setResult({ state: "verified" });
      },
      (error) => active && setResult({ state: "failed", error }),
    );
    return () => {
      active = false;
    };
  }, [token, attempt, applyUser]);

  if (result.state === "pending") {
    return (
      <VerificationStatus icon={Mail} eyebrow="Verifying" heading="ONE MOMENT">
        Checking your link…
      </VerificationStatus>
    );
  }

  if (result.state === "verified") {
    const signedIn = status === "signedIn";
    return (
      <>
        <VerificationStatus icon={Check} eyebrow="Verified" heading="EMAIL VERIFIED">
          Thanks. Your email address is confirmed.
        </VerificationStatus>
        <div className="mt-9">
          <Link to={signedIn ? "/talent/me" : "/login"} className={PRIMARY_LINK_CLASS}>
            {signedIn ? "Go to your profile" : "Sign in"}
            <ArrowRight size={14} className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      </>
    );
  }

  const problem = LINK_PROBLEMS[result.error?.code];
  if (problem) {
    return (
      <>
        <VerificationStatus icon={AlertTriangle} eyebrow="Verification" heading={problem.heading}>
          {problem.text}
        </VerificationStatus>
        <div className="mt-8">
          <ResendVerification />
        </div>
      </>
    );
  }

  // Anything else (offline, rate limited, server error) did not use the token up: retry it.
  const retry = () => {
    verifications.delete(token);
    setResult({ state: "pending" });
    setAttempt((value) => value + 1);
  };

  return (
    <>
      <VerificationStatus icon={AlertTriangle} eyebrow="Verification" heading="NOT VERIFIED YET">
        We couldn&apos;t check your link.
      </VerificationStatus>
      <div className="mt-6">
        <FormMessage>{userMessage(result.error)}</FormMessage>
      </div>
      <button type="button" onClick={retry} className={`mt-8 ${SECONDARY_BUTTON_CLASS}`}>
        Try again
      </button>
    </>
  );
}
