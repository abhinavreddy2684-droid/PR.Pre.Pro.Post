export default function Select({ className = "", children, ...props }) {
  return (
    <select
      className={`bg-transparent outline-none text-sm text-neutral-300 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
