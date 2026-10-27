import { useState } from "react";
import { fieldErrors, userMessage } from "@/lib/api";

/**
 * State for an auth form: field values, per-field errors, a form-level message and a pending flag.
 * `validate(values)` returns { field: "message" } with an empty string for valid fields.
 * `onSubmit(values)` comes from the page. When it throws, field errors from the API's `details`
 * are shown under their fields and the error's message above the form.
 */
export default function useAuthForm({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [pending, setPending] = useState(false);

  const update = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: "" } : current));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);

    const found = validate(values);
    setErrors(found);
    if (Object.values(found).some(Boolean)) return;

    setPending(true);
    try {
      await onSubmit(values);
    } catch (error) {
      const fromServer = fieldErrors(error);
      setErrors(
        Object.fromEntries(Object.keys(initialValues).map((key) => [key, fromServer[key] ?? ""])),
      );
      setMessage({ kind: "error", text: userMessage(error) });
    } finally {
      setPending(false);
    }
  };

  return { values, errors, message, pending, update, handleSubmit };
}
