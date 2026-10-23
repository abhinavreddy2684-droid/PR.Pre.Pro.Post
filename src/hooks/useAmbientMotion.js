import { useEffect, useState } from "react";

export default function useAmbientMotion() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev + 0.15);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return {
    transform: `translateY(${Math.sin(offset) * 10}px)`,
  };
}