// Colours per availability status (the labels come from the bootstrap enum).
export const DAY_STYLES = {
  available: { text: "text-amber-300", dot: "bg-amber-500", hover: "hover:bg-amber-500/10" },
  tentative: { text: "text-emerald-300", dot: "bg-emerald-400", hover: "hover:bg-emerald-400/10" },
  unavailable: { text: "text-white/35", dot: "bg-white/20", hover: "hover:bg-white/5" },
  outside: { text: "text-white/15", dot: "bg-white/10", hover: "" },
};

export const AVAILABILITY_ORDER = ["available", "tentative", "unavailable"];
