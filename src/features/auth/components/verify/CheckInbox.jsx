import { Link } from "react-router-dom";
import { ArrowRight, Check, Mail } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import ResendVerification from "@/features/auth/components/verify/ResendVerification";
import VerificationStatus from "@/features/auth/components/verify/VerificationStatus";
import { PRIMARY_LINK_CLASS } from "@/features/auth/components/verify/linkClasses";

/** The notice shown after registering: check your inbox, resend, or continue to `next`. */
export default function CheckInbox({ next }) {
  const { status, user } = useAuth();
  const signedIn = status === "signedIn";

  const continueLink = signedIn && (
    <Link to={next} className={PRIMARY_LINK_CLASS}>
      {next === "/talent/onboarding" ? "Continue to talent onboarding" : "Continue"}
      <ArrowRight size={14} className="transition group-hover:translate-x-1" />
    </Link>
  );

  if (signedIn && user.email_verified) {
    return (
      <>
        <VerificationStatus icon={Check} eyebrow="Verified" heading="EMAIL VERIFIED">
          {user.email} is confirmed.
        </VerificationStatus>
        <div className="mt-9">{continueLink}</div>
      </>
    );
  }

  return (
    <>
      <VerificationStatus icon={Mail} eyebrow="Scene 02 / Verification" heading="VERIFY YOUR EMAIL">
        We sent a verification link to{" "}
        <span className="text-white/90">{user?.email || "your email address"}</span>. Open it to
        verify your account.
      </VerificationStatus>
      <div className="mt-8">
        <ResendVerification />
      </div>
      {continueLink && (
        <div className="mt-9">
          {continueLink}
          <p className="mt-3 text-xs text-white/45">You can verify your email later.</p>
        </div>
      )}
    </>
  );
}
