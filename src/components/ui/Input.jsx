export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full bg-transparent outline-none text-sm placeholder:text-neutral-600 ${className}`}
      {...props}
    />
  );
}
