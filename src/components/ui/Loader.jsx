import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear",
          }}
          className="
            w-32 h-32 rounded-full
            border-[10px]
            border-neutral-800
            border-t-amber-400
          "
        />

        <motion.div
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="
            absolute inset-0
            bg-amber-400/20
            blur-3xl rounded-full
          "
        />
      </div>
    </div>
  );
}