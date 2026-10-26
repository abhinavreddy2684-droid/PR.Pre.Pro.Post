const KINDS = {
  error: "border-red-400/20 bg-red-400/[0.06] text-red-200",
  notice: "border-amber-400/20 bg-amber-400/[0.06] text-amber-100",
};

/** Form-level message. "error" is announced immediately; "notice" is announced politely. */
export default function FormMessage({ kind = "error", children }) {
  return (
    <div
      role={kind === "error" ? "alert" : "status"}
      className={`rounded-full border px-5 py-3 text-sm ${KINDS[kind]}`}
    >
      {children}
    </div>
  );
}
