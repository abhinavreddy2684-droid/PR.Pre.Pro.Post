// Client-side checks only. The backend is the authority on what is accepted: it also rejects
// common, all-numeric and email-like passwords, and those errors show under the field.
// 8 matches Django's MinimumLengthValidator default used by the backend.
export const MIN_PASSWORD_LENGTH = 8;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email) => EMAIL_PATTERN.test(email.trim());

function validateEmail(email) {
  if (!email.trim()) return "Enter your email address.";
  if (!isValidEmail(email)) return "Enter a valid email address.";
  return "";
}

/** Sign-in only needs a password to be present; the backend decides whether it is right. */
export function validateLogin({ email, password }) {
  return {
    email: validateEmail(email),
    password: password ? "" : "Enter your password.",
  };
}

export function validateRegister({ email, password }) {
  let passwordError = "";
  if (!password) passwordError = "Create a password.";
  else if (password.length < MIN_PASSWORD_LENGTH) {
    passwordError = `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  return { email: validateEmail(email), password: passwordError };
}
