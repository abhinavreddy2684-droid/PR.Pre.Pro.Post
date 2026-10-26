import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import AuthField from "@/features/auth/components/AuthField";

/** Password input with a show/hide toggle. Takes the same props as AuthField. */
export default function PasswordField(props) {
  const [visible, setVisible] = useState(false);

  return (
    <AuthField
      {...props}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          className="rounded-full p-1.5 text-white/45 transition hover:bg-white/[0.05] hover:text-white/80"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      }
    />
  );
}
