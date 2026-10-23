import { motion } from "framer-motion";

export default function WorkflowCard({
  step,
  index,
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
      }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="
        relative overflow-hidden
        rounded-[2rem]
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-10
      "
    >
      {/* Glow */}

      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-all duration-700 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_55%)]" />

      {/* Number */}

      <div className="absolute top-6 right-6 text-5xl font-black text-white/5">
        0{index + 1}
      </div>

      {/* Icon */}

      <div
        className="
          relative w-20 h-20 rounded-2xl
          bg-amber-500/10
          border border-amber-500/20
          flex items-center justify-center
        "
      >
        <Icon
          size={34}
          className="text-amber-400"
        />
      </div>

      {/* Content */}

      <div className="relative mt-10">
        
        <h3 className="text-3xl font-bold tracking-tight">
          {step.title}
        </h3>

        <p className="mt-5 text-neutral-400 leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}