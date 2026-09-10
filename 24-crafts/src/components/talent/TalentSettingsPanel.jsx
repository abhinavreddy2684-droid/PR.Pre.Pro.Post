import { Bell, BriefcaseBusiness, CalendarDays, Check, ChevronLeft, ChevronRight, FileText, Image, Plus, Search, Trash2, UserRound, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import talents from "../../data/talents";

const STORAGE_KEY = "pre-pro-post:talent-settings";

const sections = [
  { id: "professional", icon: UserRound, label: "Professional details", description: "Name, bio, location and profile information" },
  { id: "crafts", icon: BriefcaseBusiness, label: "Crafts", description: "Manage your primary and supporting crafts" },
  { id: "media", icon: Image, label: "Media management", description: "Upload, edit and organise your public work" },
  { id: "experience", icon: FileText, label: "Experience & credits", description: "Manage your professional history and credits" },
  { id: "calendar", icon: CalendarDays, label: "Availability calendar", description: "Manage the next 90 days of availability" },
  { id: "notifications", icon: Bell, label: "Notifications", description: "Choose what you want to hear about" },
];

const fallbackMedia = [
  { id: "media-1", title: "Featured performance", description: "A live vocal performance recorded during a recent production session.", type: "Video", year: 2026 },
  { id: "media-2", title: "Studio session", description: "A studio recording session focused on an intimate cinematic vocal arrangement.", type: "Audio", year: 2026 },
  { id: "media-3", title: "Behind the performance", description: "A quiet look at the preparation behind a feature-film recording.", type: "Image", year: 2025 },
];

const defaultNotifications = {
  opportunities: true,
  profileActivity: true,
  platformUpdates: false,
};

const readStored = () => {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

const getInitialSettings = () => {
  const talent = talents[0] || {};
  const stored = readStored();

  return {
    professional: {
      name: stored?.professional?.name ?? talent.name ?? "",
      location: stored?.professional?.location ?? talent.location ?? "",
      experience: stored?.professional?.experience ?? talent.experience ?? "",
      bio: stored?.professional?.bio ?? talent.bio ?? "",
    },
    crafts: {
      primary: stored?.crafts?.primary ?? talent.craft ?? "",
      supporting: stored?.crafts?.supporting ?? [],
      genres: stored?.crafts?.genres ?? talent.genres ?? [],
    },
    media: stored?.media ?? talent.media ?? fallbackMedia,
    experiences: stored?.experiences ?? talent.experiences ?? [],
    availability: stored?.availability ?? {},
    notifications: { ...defaultNotifications, ...(stored?.notifications || {}) },
  };
};

const saveSettings = (settings) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Storage is optional; the settings remain usable for the current session.
  }
};

function Field({ label, value, onChange, multiline = false, placeholder }) {
  const className = "w-full rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-amber-500/40 focus:bg-white/[0.05]";
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">{label}</span>
      {multiline ? <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={5} placeholder={placeholder} className={`${className} resize-none`} /> : <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={className} />}
    </label>
  );
}

function SaveButton({ onClick, saved }) {
  return <button onClick={onClick} className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-xs font-bold text-black transition hover:-translate-y-0.5 hover:bg-amber-400">{saved ? <><Check size={14} /> Saved</> : "Save changes"}</button>;
}

function SettingsCard({ title, description, children }) {
  return <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6"><div><h3 className="text-sm font-semibold text-white/85">{title}</h3>{description && <p className="mt-1 text-xs leading-5 text-white/30">{description}</p>}</div><div className="mt-5">{children}</div></div>;
}

function ProfessionalSettings({ settings, onSave }) {
  const [draft, setDraft] = useState(settings);
  const [saved, setSaved] = useState(false);
  useEffect(() => setDraft(settings), [settings]);
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const save = () => { onSave(draft); setSaved(true); window.setTimeout(() => setSaved(false), 1400); };

  return <div className="space-y-5"><SettingsCard title="Professional identity" description="This is the information recruiters see first on your public talent profile."><div className="grid gap-5 sm:grid-cols-2"><Field label="Professional name" value={draft.name} onChange={(value) => update("name", value)} placeholder="Your professional name" /><Field label="Location" value={draft.location} onChange={(value) => update("location", value)} placeholder="City, country" /><Field label="Experience" value={draft.experience} onChange={(value) => update("experience", value)} placeholder="e.g. 8 years" /></div><div className="mt-5"><Field label="Bio" value={draft.bio} onChange={(value) => update("bio", value)} multiline placeholder="Tell recruiters what defines your work." /></div></SettingsCard><div className="flex justify-end"><SaveButton onClick={save} saved={saved} /></div></div>;
}

function ChipInput({ values, onChange, placeholder }) {
  const [value, setValue] = useState("");
  const add = () => { const next = value.trim(); if (!next || values.includes(next)) return; onChange([...values, next]); setValue(""); };
  const remove = (item) => onChange(values.filter((value) => value !== item));
  return <div><div className="flex flex-wrap gap-2">{values.map((item) => <span key={item} className="inline-flex items-center gap-2 rounded-full border border-amber-500/15 bg-amber-500/[0.07] px-3 py-2 text-xs text-amber-300">{item}<button type="button" onClick={() => remove(item)} aria-label={`Remove ${item}`} className="text-amber-300/50 hover:text-amber-300">×</button></span>)}</div><div className="mt-3 flex gap-2"><input value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); add(); } }} placeholder={placeholder} className="min-w-0 flex-1 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/20 focus:border-amber-500/40" /><button type="button" onClick={add} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-white/50 transition hover:bg-amber-500 hover:text-black"><Plus size={16} /></button></div></div>;
}

function CraftsSettings({ settings, onSave }) {
  const [draft, setDraft] = useState(settings);
  const [saved, setSaved] = useState(false);
  useEffect(() => setDraft(settings), [settings]);
  const save = () => { onSave(draft); setSaved(true); window.setTimeout(() => setSaved(false), 1400); };
  return <div className="space-y-5"><SettingsCard title="Primary craft" description="Your primary craft anchors discovery and appears throughout your profile."><select value={draft.primary} onChange={(event) => setDraft({ ...draft, primary: event.target.value })} className="w-full appearance-none rounded-2xl border border-white/[0.08] bg-[#101010] px-4 py-3 text-sm text-white outline-none focus:border-amber-500/40"><option>Playback Singing</option><option>Acting</option><option>Cinematography</option><option>Editing</option><option>Music Direction</option><option>Dance</option><option>Sound Design</option></select></SettingsCard><SettingsCard title="Supporting crafts" description="Add adjacent skills you want recruiters to discover you for."><ChipInput values={draft.supporting} onChange={(supporting) => setDraft({ ...draft, supporting })} placeholder="Add a supporting craft" /></SettingsCard><SettingsCard title="Genres & specialities" description="These tags help recruiters understand your range and improve matching."><ChipInput values={draft.genres} onChange={(genres) => setDraft({ ...draft, genres })} placeholder="Add a genre or speciality" /></SettingsCard><div className="flex justify-end"><SaveButton onClick={save} saved={saved} /></div></div>;
}

function MediaSettings({ settings, onSave }) {
  const [media, setMedia] = useState(settings);
  const [editing, setEditing] = useState(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => setMedia(settings), [settings]);
  const persist = (next) => { setMedia(next); onSave(next); setSaved(true); window.setTimeout(() => setSaved(false), 1200); };
  const upload = (event) => { const file = event.target.files?.[0]; if (!file) return; const type = file.type.startsWith("video") ? "Video" : file.type.startsWith("audio") ? "Audio" : "Image"; const next = [{ id: `media-${Date.now()}`, title: file.name.replace(/\.[^.]+$/, ""), description: "New portfolio work.", type, year: new Date().getFullYear() }, ...media]; persist(next); event.target.value = ""; };
  const updateItem = (item) => persist(media.map((entry) => entry.id === item.id ? item : entry));
  const remove = (id) => persist(media.filter((item) => item.id !== id));

  return <div className="space-y-5"><SettingsCard title="Portfolio media" description="Manage the work that appears in your public gallery. Uploads are recorded locally until the media API is connected."><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-white/35">{media.length} item{media.length === 1 ? "" : "s"} in your gallery</p><label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-amber-500 px-4 py-2.5 text-xs font-bold text-black transition hover:bg-amber-400"><Plus size={14} /> Upload media<input type="file" accept="image/*,video/*,audio/*" className="sr-only" onChange={upload} /></label></div><div className="mt-5 divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.07]">{media.map((item) => <div key={item.id} className="flex items-center gap-4 p-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-500/[0.08] text-amber-400"><Image size={17} /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-white/80">{item.title}</p><p className="mt-1 truncate text-xs text-white/30">{item.type} · {item.year}</p></div><button onClick={() => setEditing(item)} className="rounded-full bg-white/[0.05] px-3 py-2 text-[10px] font-semibold text-white/50 hover:bg-white/[0.09] hover:text-white">Edit</button><button onClick={() => remove(item.id)} aria-label={`Remove ${item.title}`} className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.04] text-white/30 transition hover:bg-amber-500 hover:text-black"><Trash2 size={14} /></button></div>)}</div></SettingsCard><div className="flex justify-end"><SaveButton onClick={() => { onSave(media); setSaved(true); window.setTimeout(() => setSaved(false), 1200); }} saved={saved} /></div>{editing && <MediaEditor item={editing} onClose={() => setEditing(null)} onSave={(item) => { updateItem(item); setEditing(null); }} />}</div>;
}

function MediaEditor({ item, onClose, onSave }) {
  const [draft, setDraft] = useState(item);
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-5 backdrop-blur-sm"><div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111] p-6 shadow-2xl sm:p-8"><div className="flex items-center justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-400">Media management</p><h3 className="mt-2 text-2xl font-bold text-white">Edit media</h3></div><button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/50 hover:bg-white/10"><X size={16} /></button></div><div className="mt-7 space-y-4"><Field label="Title" value={draft.title} onChange={(value) => setDraft({ ...draft, title: value })} /><Field label="Description" value={draft.description} onChange={(value) => setDraft({ ...draft, description: value })} multiline /><div className="grid gap-4 sm:grid-cols-2"><Field label="Type" value={draft.type} onChange={(value) => setDraft({ ...draft, type: value })} /><Field label="Year" value={String(draft.year)} onChange={(value) => setDraft({ ...draft, year: Number(value) || new Date().getFullYear() })} /></div></div><div className="mt-7 flex justify-end gap-3"><button onClick={onClose} className="rounded-full px-5 py-2.5 text-xs font-semibold text-white/50 hover:text-white">Cancel</button><button onClick={() => onSave(draft)} className="rounded-full bg-amber-500 px-6 py-2.5 text-xs font-bold text-black">Save media</button></div></div></div>;
}

function ExperienceSettings({ settings, onSave }) {
  const [entries, setEntries] = useState(settings);
  const [editing, setEditing] = useState(null);
  useEffect(() => setEntries(settings), [settings]);
  const saveEntries = (next) => { setEntries(next); onSave(next); };
  const remove = (index) => saveEntries(entries.filter((_, itemIndex) => itemIndex !== index));
  const empty = { period: "", title: "", company: "", description: "", craft: "" };
  return <div className="space-y-5"><SettingsCard title="Professional timeline" description="Add the experiences and credits that make your career easy to scan."><div className="flex justify-end"><button onClick={() => setEditing({ ...empty, index: -1 })} className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2.5 text-xs font-bold text-black hover:bg-amber-400"><Plus size={14} /> Add experience</button></div><div className="mt-5 divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.07]">{entries.length ? entries.map((entry, index) => <div key={`${entry.title}-${index}`} className="flex gap-4 p-4"><div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" /><div className="min-w-0 flex-1"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">{entry.period || "Period not set"}</p><p className="mt-2 text-sm font-semibold text-white/80">{entry.title || "Untitled experience"}</p><p className="mt-1 text-xs text-white/30">{entry.company}</p></div><button onClick={() => setEditing({ ...entry, index })} className="self-start rounded-full bg-white/[0.05] px-3 py-2 text-[10px] font-semibold text-white/50 hover:bg-white/[0.09] hover:text-white">Edit</button><button onClick={() => remove(index)} aria-label={`Remove ${entry.title || "experience"}`} className="self-start grid h-8 w-8 place-items-center rounded-full bg-white/[0.04] text-white/30 hover:bg-amber-500 hover:text-black"><Trash2 size={13} /></button></div>) : <div className="p-6 text-center text-xs text-white/30">No professional experience added yet.</div>}</div></SettingsCard>{editing && <ExperienceEditor entry={editing} onClose={() => setEditing(null)} onSave={(entry) => { const next = [...entries]; if (entry.index === -1) next.unshift({ ...entry, index: undefined }); else next[entry.index] = { ...entry, index: undefined }; saveEntries(next); setEditing(null); }} />}</div>;
}

function ExperienceEditor({ entry, onClose, onSave }) {
  const [draft, setDraft] = useState(entry);
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-5 backdrop-blur-sm"><div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#111] p-6 shadow-2xl sm:p-8"><div className="flex items-center justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-400">Experience & credits</p><h3 className="mt-2 text-2xl font-bold text-white">{entry.index === -1 ? "Add experience" : "Edit experience"}</h3></div><button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/50 hover:bg-white/10"><X size={16} /></button></div><div className="mt-7 grid gap-4 sm:grid-cols-2"><Field label="Period" value={draft.period} onChange={(value) => update("period", value)} placeholder="2021 — Present" /><Field label="Role / title" value={draft.title} onChange={(value) => update("title", value)} placeholder="Playback Vocalist" /><Field label="Production / company" value={draft.company} onChange={(value) => update("company", value)} placeholder="Feature Film Production" /><Field label="Craft" value={draft.craft} onChange={(value) => update("craft", value)} placeholder="Playback Singing" /></div><div className="mt-4"><Field label="Description" value={draft.description} onChange={(value) => update("description", value)} multiline placeholder="Describe your contribution." /></div><div className="mt-7 flex justify-end gap-3"><button onClick={onClose} className="rounded-full px-5 py-2.5 text-xs font-semibold text-white/50 hover:text-white">Cancel</button><button onClick={() => onSave(draft)} className="rounded-full bg-amber-500 px-6 py-2.5 text-xs font-bold text-black">Save experience</button></div></div></div>;
}

function AvailabilitySettings({ settings, onSave }) {
  const [cursor, setCursor] = useState(() => new Date());
  const [states, setStates] = useState(settings);
  const [selected, setSelected] = useState(null);
  useEffect(() => setStates(settings), [settings]);
  const today = useMemo(() => { const value = new Date(); value.setHours(0, 0, 0, 0); return value; }, []);
  const maxDate = useMemo(() => { const value = new Date(today); value.setDate(value.getDate() + 89); return value; }, [today]);
  const monthLabel = useMemo(() => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(cursor), [cursor]);
  const calendar = useMemo(() => { const year = cursor.getFullYear(); const month = cursor.getMonth(); return { firstDay: new Date(year, month, 1).getDay(), daysInMonth: new Date(year, month + 1, 0).getDate() }; }, [cursor]);
  const keyFor = (date) => { const value = new Date(date); value.setHours(0, 0, 0, 0); return value.toISOString().slice(0, 10); };
  const getStatus = (day) => { const date = new Date(cursor.getFullYear(), cursor.getMonth(), day); if (date < today) return "past"; if (date > maxDate) return "outside"; return states[keyFor(date)] || "available"; };
  const cycle = (day) => { const date = new Date(cursor.getFullYear(), cursor.getMonth(), day); const status = getStatus(day); if (status === "past" || status === "outside") return; const key = keyFor(date); const next = status === "available" ? "tentative" : status === "tentative" ? "unavailable" : "available"; const nextStates = { ...states, [key]: next }; setStates(nextStates); onSave(nextStates); setSelected(key); };
  const shift = (offset) => { const next = new Date(cursor.getFullYear(), cursor.getMonth() + offset, 1); if (next > maxDate || new Date(next.getFullYear(), next.getMonth() + 1, 0) < today) return; setCursor(next); setSelected(null); };
  const statusMeta = { available: { label: "Available", className: "text-amber-300", dot: "bg-amber-500" }, tentative: { label: "Tentative", className: "text-emerald-300", dot: "bg-emerald-400" }, unavailable: { label: "Unavailable", className: "text-white/35", dot: "bg-white/20" }, past: { label: "Past", className: "text-white/15", dot: "bg-white/10" }, outside: { label: "Outside 90 days", className: "text-white/15", dot: "bg-white/10" } };
  const selectedStatus = selected ? statusMeta[states[selected] || "available"] : null;

  return <div className="space-y-5"><SettingsCard title="Next 90 days" description="Every future day starts as Available. Cycle a day through Available, Tentative and Unavailable. Past days are locked."><div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4 sm:p-6"><div className="flex items-center justify-between"><button onClick={() => shift(-1)} aria-label="Previous month" className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"><ChevronLeft size={16} /></button><p className="text-sm font-bold text-white">{monthLabel}</p><button onClick={() => shift(1)} aria-label="Next month" className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"><ChevronRight size={16} /></button></div><div className="mt-5 grid grid-cols-7 gap-1 text-center text-[9px] font-semibold uppercase tracking-wider text-white/25">{["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <span key={`${day}-${index}`} className="py-1">{day}</span>)}</div><div className="mt-1 grid grid-cols-7 gap-1">{Array.from({ length: calendar.firstDay }).map((_, index) => <span key={`blank-${index}`} className="h-9" />)}{Array.from({ length: calendar.daysInMonth }, (_, index) => index + 1).map((day) => { const status = getStatus(day); const meta = statusMeta[status]; const isSelected = selected === keyFor(new Date(cursor.getFullYear(), cursor.getMonth(), day)); return <button key={day} disabled={status === "past" || status === "outside"} onClick={() => cycle(day)} className={`group relative h-9 rounded-xl text-xs font-semibold transition ${meta.className} ${status === "available" ? "hover:bg-amber-500/10" : status === "tentative" ? "hover:bg-emerald-400/10" : "cursor-not-allowed"} ${isSelected ? "bg-white/10 ring-1 ring-white/20" : ""}`}><span>{day}</span><span className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${meta.dot}`} /></button>; })}</div></div><div className="mt-4 flex flex-wrap gap-4 text-[10px] font-semibold text-white/35"><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-amber-500" /> Available</span><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-emerald-400" /> Tentative</span><span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-white/20" /> Unavailable</span></div>{selected && selectedStatus && <p className="mt-4 text-xs text-white/40">{selected} · <span className={selectedStatus.className}>{selectedStatus.label}</span></p>}</SettingsCard></div>;
}

function NotificationsSettings({ settings, onSave }) {
  const [draft, setDraft] = useState(settings);
  const [saved, setSaved] = useState(false);
  useEffect(() => setDraft(settings), [settings]);
  const rows = [
    { key: "opportunities", title: "New opportunities", body: "Hear about relevant hiring activity and opportunities." },
    { key: "profileActivity", title: "Profile activity", body: "Know when recruiters interact with your profile or work." },
    { key: "platformUpdates", title: "Platform updates", body: "Product changes, important announcements and service updates." },
  ];
  const save = () => { onSave(draft); setSaved(true); window.setTimeout(() => setSaved(false), 1400); };
  return <div className="space-y-5"><SettingsCard title="What should reach you?" description="Control the activity that matters to your work without changing your public profile visibility."><div className="divide-y divide-white/[0.07]">{rows.map((row) => <div key={row.key} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-white/75">{row.title}</p><p className="mt-1 text-xs leading-5 text-white/30">{row.body}</p></div><button role="switch" aria-checked={draft[row.key]} onClick={() => setDraft({ ...draft, [row.key]: !draft[row.key] })} className={`relative h-7 w-12 shrink-0 rounded-full transition ${draft[row.key] ? "bg-amber-500" : "bg-white/10"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${draft[row.key] ? "left-6" : "left-1"}`} /></button></div>)}</div></SettingsCard><div className="flex justify-end"><SaveButton onClick={save} saved={saved} /></div></div>;
}

export default function TalentSettingsPanel({ open, onClose, onSelect }) {
  const [selected, setSelected] = useState("professional");
  const [query, setQuery] = useState("");
  const [settings, setSettings] = useState(getInitialSettings);

  useEffect(() => {
    if (!open) return;
    setSettings(getInitialSettings());
  }, [open]);

  const visibleSections = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return sections;
    return sections.filter((section) => `${section.label} ${section.description}`.toLowerCase().includes(normalized));
  }, [query]);

  const active = sections.find((item) => item.id === selected) || sections[0];
  const ActiveIcon = active.icon;
  const update = (key, value) => setSettings((current) => { const next = { ...current, [key]: value }; saveSettings(next); return next; });
  const manageSection = () => onSelect?.(selected);

  return <AnimatePresence>{open && <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-3 py-4 backdrop-blur-[3px] sm:px-6 sm:py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.button aria-label="Close settings" onClick={onClose} className="absolute inset-0 cursor-default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
    <motion.aside role="dialog" aria-modal="true" aria-label="Talent settings" className="relative flex h-[min(860px,calc(100vh-32px))] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#080808]/95 shadow-[0_35px_120px_rgba(0,0,0,.65)] backdrop-blur-2xl sm:h-[min(860px,calc(100vh-64px))] sm:rounded-[2.5rem]" initial={{ opacity: 0, y: 28, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}>
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-amber-500/[0.06] blur-3xl" /><div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-amber-500/[0.035] blur-3xl" />
      <aside className="relative hidden w-[285px] shrink-0 border-r border-white/[0.08] bg-white/[0.018] lg:flex lg:flex-col"><div className="px-7 pb-6 pt-8"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500 text-black shadow-[0_0_30px_rgba(245,158,11,.16)]"><BriefcaseBusiness size={17} /></div><div><p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-amber-400">Pre Pro Post</p><h2 className="mt-1 text-lg font-bold tracking-tight text-white">Talent settings</h2></div></div></div><nav className="flex-1 overflow-y-auto px-3 pb-6"><p className="px-3 pb-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/25">Manage profile</p><div className="space-y-1">{sections.map(({ id, icon: Icon, label }) => <button key={id} onClick={() => setSelected(id)} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${selected === id ? "bg-amber-500 text-black shadow-[0_8px_25px_rgba(245,158,11,.12)]" : "text-white/55 hover:bg-white/[0.05] hover:text-white"}`}><Icon size={17} /><span className="flex-1 text-sm font-semibold">{label}</span>{selected !== id && <ChevronRight size={14} className="text-white/15 transition group-hover:translate-x-0.5 group-hover:text-white/35" />}</button>)}</div></nav><div className="border-t border-white/[0.08] p-5"><div className="rounded-2xl border border-amber-500/10 bg-amber-500/[0.035] p-4"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-400">Visibility</p><p className="mt-2 text-xs leading-5 text-white/35">Your profile and uploaded media are public to people exploring the talent network.</p></div></div></aside>
      <main className="relative min-w-0 flex-1 overflow-y-auto"><div className="mx-auto min-h-full max-w-4xl px-5 pb-10 sm:px-8 sm:pb-12 lg:px-12"><header className="sticky top-0 z-20 -mx-5 flex items-center gap-3 border-b border-white/[0.07] bg-[#080808]/92 px-5 pb-5 pt-5 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"><button onClick={onClose} aria-label="Close settings" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/[0.045] text-white/55 transition hover:bg-white/[0.08] hover:text-white"><X size={17} /></button><label className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-white/[0.07] bg-white/[0.035] px-4 py-2.5"><Search size={16} className="shrink-0 text-white/25" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search settings" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25" /></label></header>
        <div className="mb-8 pt-5 lg:hidden"><div className="flex gap-2 overflow-x-auto pb-2">{visibleSections.map(({ id, label }) => <button key={id} onClick={() => setSelected(id)} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold transition ${selected === id ? "bg-amber-500 text-black" : "bg-white/[0.045] text-white/50 hover:bg-white/[0.08]"}`}>{label}</button>)}</div></div>
        <AnimatePresence mode="wait"><motion.section key={selected} className="max-w-3xl pt-8 sm:pt-10" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-400">{selected === "professional" ? "Profile" : selected === "crafts" ? "Profile" : selected === "media" ? "Portfolio" : selected === "experience" ? "Career" : selected === "calendar" ? "Availability" : "Account"}</p><div className="mt-2 flex items-start justify-between gap-6"><div><h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{active.label}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">{active.description}</p></div><div className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl border border-amber-500/15 bg-amber-500/[0.07] text-amber-400 sm:grid"><ActiveIcon size={21} /></div></div><div className="mt-8">{selected === "professional" && <ProfessionalSettings settings={settings.professional} onSave={(value) => update("professional", value)} />}{selected === "crafts" && <CraftsSettings settings={settings.crafts} onSave={(value) => update("crafts", value)} />}{selected === "media" && <MediaSettings settings={settings.media} onSave={(value) => update("media", value)} />}{selected === "experience" && <ExperienceSettings settings={settings.experiences} onSave={(value) => update("experiences", value)} />}{selected === "calendar" && <AvailabilitySettings settings={settings.availability} onSave={(value) => update("availability", value)} />}{selected === "notifications" && <NotificationsSettings settings={settings.notifications} onSave={(value) => update("notifications", value)} />}</div><div className="mt-7 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold text-white/80">Profile section</p><p className="mt-1 text-xs leading-5 text-white/30">Use the profile section for the public-facing result; Settings is where you manage the data.</p></div><button onClick={manageSection} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white/[0.06] px-5 py-2.5 text-xs font-semibold text-white/65 transition hover:bg-amber-500 hover:text-black">Open section <ChevronRight size={14} /></button></div></div></motion.section></AnimatePresence>
      </div></main>
    </motion.aside>
  </motion.div>}</AnimatePresence>;
}
