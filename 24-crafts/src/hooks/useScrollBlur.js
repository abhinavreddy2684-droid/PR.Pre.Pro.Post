import { useEffect, useState } from "react";

export default function useScrollBlur() {
  const [blurred, setBlurred] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setBlurred(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return blurred;
}