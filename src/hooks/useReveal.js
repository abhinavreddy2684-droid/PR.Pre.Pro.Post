import { useInView } from "framer-motion";
import { useRef } from "react";

export default function useReveal() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-120px",
  });

  return {
    ref,
    isInView,
  };
}