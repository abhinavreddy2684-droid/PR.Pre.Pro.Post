import { Upload } from "lucide-react";

export default function UploadControl({ prominent = false, onChange }) {
  return (
    <label
      className={`group inline-flex cursor-pointer items-center justify-center gap-3 rounded-full font-semibold transition-all duration-300 ${prominent ? "min-h-12 bg-amber-500 px-6 py-3 text-sm text-black shadow-[0_0_40px_rgba(245,158,11,0.25)] hover:-translate-y-0.5 hover:bg-amber-400" : "bg-white/5 px-5 py-3 text-xs text-white/70 hover:bg-white/[0.08] hover:text-white"}`}
    >
      <Upload size={prominent ? 17 : 14} />
      <span>{prominent ? "Upload Your Work" : "Upload media"}</span>
      <input type="file" accept="image/*,video/*,audio/*" className="sr-only" onChange={onChange} />
    </label>
  );
}
