import { Plus } from "lucide-react";
import { useState } from "react";

/**
 * Tag list with an add box. `maxItems` / `maxLength` mirror the API limits; at the item limit
 * the add box is disabled.
 */
export default function ChipInput({ values, onChange, placeholder, maxItems, maxLength, label }) {
  const [value, setValue] = useState("");
  const full = maxItems !== undefined && values.length >= maxItems;
  const add = () => {
    const next = value.trim();
    if (!next || full || values.some((item) => item.toLowerCase() === next.toLowerCase())) return;
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
          placeholder={full ? `Limit of ${maxItems} reached` : placeholder}
          maxLength={maxLength}
          disabled={full}
          aria-label={label}
          className="min-w-0 flex-1 rounded-xl bg-white/[0.035] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/20 focus:bg-white/[0.055] disabled:opacity-40"
        />
        <button
          aria-label={label ? `Add ${label.toLowerCase()}` : "Add"}
          type="button"
          onClick={add}
          disabled={full}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-white/50 transition hover:bg-amber-500 hover:text-black disabled:opacity-40"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
