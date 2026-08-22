import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Briefcase,
  Clapperboard,
  Layers3,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CraftModal({
  craft,
  isOpen,
  onClose,
}) {
  const navigate = useNavigate();

  const handleExploreTalent = () => {
    onClose();
    navigate(`/talent?craft=${encodeURIComponent(craft.title)}`);
  };

  return (
    <AnimatePresence>
      {isOpen && craft && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed inset-0 z-[9999]
            bg-black/80
            backdrop-blur-2xl
            flex items-center justify-center
            p-6
          "
        >
          <div
            className="absolute inset-0"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className="
              relative z-10
              w-full max-w-5xl
              rounded-[2.5rem]
              overflow-hidden
              border border-white/10
              bg-neutral-950
            "
          >
            <div
              className="
                relative p-10 md:p-14
                border-b border-white/10
                overflow-hidden
              "
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_45%)]" />

              <div className="relative flex items-start justify-between gap-6">
                <div>
                  <p className="uppercase tracking-[0.35em] text-sm text-amber-400">
                    Cinema Craft
                  </p>

                  <h2 className="mt-5 text-5xl md:text-7xl font-black tracking-tight">
                    {craft.title}
                  </h2>

                  <p className="mt-8 text-lg text-neutral-400 leading-relaxed max-w-3xl">
                    {craft.description}
                  </p>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Close craft details"
                  className="
                    w-14 h-14 rounded-full
                    border border-white/10
                    bg-white/5
                    flex items-center justify-center
                    hover:border-amber-500/40
                    transition-all duration-300
                  "
                >
                  <X />
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 p-10 md:p-14">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Briefcase className="text-amber-400" />
                  <h3 className="text-2xl font-bold">
                    Find Talent
                  </h3>
                </div>

                <p className="text-neutral-400 leading-relaxed">
                  Explore professionals in this craft, review their work, and discover the right talent for your next project.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Clapperboard className="text-amber-400" />
                  <h3 className="text-2xl font-bold">
                    Built for Production
                  </h3>
                </div>

                <p className="text-neutral-400 leading-relaxed">
                  Browse structured, searchable talent profiles instead of relying on static resumes or scattered referrals.
                </p>

                <div className="mt-10 flex items-center gap-3">
                  <Layers3 className="text-amber-400" />
                  <span className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                    Discover · Evaluate · Hire
                  </span>
                </div>
              </div>
            </div>

            <div className="p-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <p className="text-sm text-neutral-500">
                Explore available talent in {craft.title}.
              </p>

              <button
                onClick={handleExploreTalent}
                className="
                  inline-flex items-center justify-center gap-3
                  rounded-full px-7 py-4
                  bg-amber-400 text-black
                  font-semibold
                  hover:bg-amber-300
                  hover:gap-4
                  transition-all duration-300
                "
              >
                Explore Talent
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
