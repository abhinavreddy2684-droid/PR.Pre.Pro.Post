import { Plus } from "lucide-react";
import { useState } from "react";

export default function ChipInput({ values, onChange, placeholder }) {
  const [value, setValue] = useState("");
  const add = () => {
    const next = value.trim();
    if (!next || values.includes(next)) return;
    onChange([...values, next]);
    setValue("");
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {values.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-2 rounded-full bg-amber-500/[0.07] px-3 py-2 text-xs text-amber-300"
          >
            {item}
            <button
              type="button"
              aria-label={`Remove ${item}`}
              onClick={() => onChange(values.filter((current) => current !== item))}
              className="text-amber-300/50 hover:text-amber-300"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className="min-w-0 flex-1 rounded-xl bg-white/[0.035] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/20 focus:bg-white/[0.055]"
        />
        <button
          aria-label="Add"
          type="button"
          onClick={add}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-white/50 transition hover:bg-amber-500 hover:text-black"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
