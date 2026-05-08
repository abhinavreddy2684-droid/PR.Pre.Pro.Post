import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Briefcase,
  Clapperboard,
  Layers3,
  ArrowRight,
} from "lucide-react";

import Button from "../ui/Button";

export default function CraftModal({
  craft,
  isOpen,
  onClose,
}) {
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
          {/* Overlay */}

          <div
            className="absolute inset-0"
            onClick={onClose}
          />

          {/* Modal */}

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
            {/* Header */}

            <div
              className="
                relative p-10 md:p-14
                border-b border-white/10
                overflow-hidden
              "
            >
              {/* Glow */}

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

            {/* Body */}

            <div className="grid lg:grid-cols-2 gap-10 p-10 md:p-14">
              
              {/* Services */}

              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Briefcase className="text-amber-400" />
                  <h3 className="text-2xl font-bold">
                    Services Offered
                  </h3>
                </div>

                <div className="space-y-4">
                  {craft.services?.map((service) => (
                    <div
                      key={service}
                      className="
                        px-5 py-4 rounded-2xl
                        border border-white/10
                        bg-white/[0.03]
                        text-neutral-300
                      "
                    >
                      {service}
                    </div>
                  ))}
                </div>
              </div>

              {/* Industries */}

              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Clapperboard className="text-amber-400" />
                  <h3 className="text-2xl font-bold">
                    Industries Served
                  </h3>
                </div>

                <div className="flex flex-wrap gap-4">
                  {craft.industries?.map((industry) => (
                    <div
                      key={industry}
                      className="
                        px-5 py-3 rounded-full
                        bg-amber-500/10
                        border border-amber-500/20
                        text-amber-300
                        uppercase tracking-[0.15em]
                        text-sm
                      "
                    >
                      {industry}
                    </div>
                  ))}
                </div>

                {/* Workflow */}

                <div className="mt-12">
                  
                  <div className="flex items-center gap-3 mb-6">
                    <Layers3 className="text-amber-400" />

                    <h3 className="text-2xl font-bold">
                      Workflow
                    </h3>
                  </div>

                  <p className="text-neutral-400 leading-relaxed">
                    {craft.workflow}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}

            <div className="p-10 border-t border-white/10 flex justify-end">
              
              <Button className="flex items-center gap-3">
                Request This Service

                <ArrowRight size={18} />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}