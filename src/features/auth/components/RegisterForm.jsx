import { Check } from "lucide-react";
import useAuthForm from "@/features/auth/hooks/useAuthForm";
import { MIN_PASSWORD_LENGTH, validateRegister } from "@/features/auth/validation";
import AuthField from "@/features/auth/components/AuthField";
import FormMessage from "@/features/auth/components/FormMessage";
import PasswordField from "@/features/auth/components/PasswordField";
import SubmitButton from "@/features/auth/components/SubmitButton";

/** Email + password registration form. `onSubmit({ email, password })` comes from the page. */
export default function RegisterForm({ onSubmit }) {
  const form = useAuthForm({
    initialValues: { email: "", password: "" },
    validate: validateRegister,
    onSubmit,
  });

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
      {form.message && <FormMessage kind={form.message.kind}>{form.message.text}</FormMessage>}
      <AuthField
        label="Email address"
        type="email"
        value={form.values.email}
        onChange={form.update("email")}
        error={form.errors.email}
        autoComplete="email"
        placeholder="you@example.com"
      />
      <PasswordField
        label="Password"
        value={form.values.password}
        onChange={form.update("password")}
        error={form.errors.password}
        autoComplete="new-password"
        placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
      />
      <div className="flex items-start gap-2 rounded-full bg-white/[0.02] px-4 py-3 text-[11px] leading-5 text-white/65">
        <Check size={14} className="mt-0.5 shrink-0 text-amber-400" />
        Your account can be used to continue into talent onboarding.
      </div>
      <SubmitButton pending={form.pending} pendingLabel="Creating account…">
        Create account
      </SubmitButton>
    </form>
  );
}
