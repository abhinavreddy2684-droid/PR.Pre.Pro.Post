import { useState } from "react";

export const NOT_CONNECTED_MESSAGE = "Not connected yet";

/**
 * State for an auth form: field values, per-field errors, a form-level message and a pending flag.
 * `validate(values)` returns { field: "message" } with an empty string for valid fields.
 * `onSubmit(values)` is supplied by the page; it may throw an Error whose message is shown.
 * Without one (nothing is wired to the backend yet) a valid submit shows "Not connected yet".
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

    if (!onSubmit) {
      setMessage({ kind: "notice", text: NOT_CONNECTED_MESSAGE });
      return;
    }

    setPending(true);
    try {
      await onSubmit(values);
    } catch (error) {
      setMessage({
        kind: "error",
        text: error?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setPending(false);
    }
  };

  return { values, errors, message, pending, update, handleSubmit };
}
