import { Heart, Pencil, Play, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { pad2 } from "@/lib/format";
import { MEDIA_ICON } from "@/features/talent/components/profile/mediaIcons";

export default function OwnerMediaCard({ item, talent, onEdit, onDelete }) {
  const Icon = MEDIA_ICON[item.type];
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[2rem] bg-white/[0.03] shadow-[0_20px_70px_rgba(0,0,0,0.22)]"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-neutral-900">
        <img
          src={item.image || talent.image}
          alt=""
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 backdrop-blur-xl">
          <Icon size={12} className="text-amber-400" />
          <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/75">
            {item.type}
          </span>
        </div>
        <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-2 text-[9px] text-white/50 backdrop-blur-xl">
          {item.year}
        </span>
        {item.type === "Video" && (
          <span className="absolute bottom-5 left-5 grid h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur-xl transition group-hover:bg-amber-500 group-hover:text-black">
            <Play size={15} fill="currentColor" />
          </span>
        )}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 transition group-hover:opacity-100">
          <button
            type="button"
            aria-label="Edit media"
            onClick={() => onEdit(item)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-black transition hover:bg-amber-500"
          >
            <Pencil size={14} />
          </button>
          <button
            type="button"
            aria-label="Remove media"
            onClick={() => onDelete(item)}
            className="grid h-9 w-9 place-items-center rounded-full bg-amber-500 text-black transition hover:bg-amber-400"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-white">{item.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-400">
              {item.description}
            </p>
          </div>
          <span className="text-xs font-bold text-white/15">{pad2(item.id)}</span>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/25">
            {talent.craft}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-white/35">
            <Heart size={13} />
            {item.likes}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
