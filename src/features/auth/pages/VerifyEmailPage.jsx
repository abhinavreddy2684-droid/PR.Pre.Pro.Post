import { useSearchParams } from "react-router-dom";
import AuthLayout from "@/features/auth/components/AuthLayout";
import CheckInbox from "@/features/auth/components/verify/CheckInbox";
import TokenVerification from "@/features/auth/components/verify/TokenVerification";
import { safeNextPath } from "@/features/auth/nextPath";

/**
 * /verify-email?token=... confirms the address from the email link.
 * Without a token it is the "check your inbox" notice shown after registering; `?next=` is
 * where "Continue" goes.
 */
export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const next = safeNextPath(searchParams.get("next"));

  return (
    <AuthLayout
      eyebrow="Talent Network / Verification"
      title={
        <>
          CHECK
          <br />
          YOUR
          <br />
          INBOX.
        </>
      }
      description="A verified email keeps your talent account secure and gives us a reliable way to help you recover access later."
    >
      <div className="text-center">
        {token ? <TokenVerification key={token} token={token} /> : <CheckInbox next={next} />}
      </div>
    </AuthLayout>
  );
}
