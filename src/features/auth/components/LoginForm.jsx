import useAuthForm from "@/features/auth/hooks/useAuthForm";
import { validateLogin } from "@/features/auth/validation";
import AuthField from "@/features/auth/components/AuthField";
import FormMessage from "@/features/auth/components/FormMessage";
import PasswordField from "@/features/auth/components/PasswordField";
import SubmitButton from "@/features/auth/components/SubmitButton";

/** Email + password sign-in form. `onSubmit({ email, password })` comes from the page. */
export default function LoginForm({ onSubmit }) {
  const form = useAuthForm({
    initialValues: { email: "", password: "" },
    validate: validateLogin,
    onSubmit,
  });

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-6">
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
        autoComplete="current-password"
        placeholder="Enter your password"
      />
      <SubmitButton pending={form.pending} pendingLabel="Signing in…">
        Sign in
      </SubmitButton>
    </form>
  );
}
