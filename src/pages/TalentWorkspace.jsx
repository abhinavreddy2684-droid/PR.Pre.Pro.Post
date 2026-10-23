import { useMemo, useState } from "react";
import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Image as ImageIcon,
  MapPin,
  Plus,
  Trash2,
  Upload,
  UserRound,
  X,
} from "lucide-react";

const INITIAL_PROFILE = {
  name: "Aarav Rao",
  email: "aarav.rao@example.com",
  contact: "+91 98765 43210",
  gender: "Male",
  age: "29",
  location: "Hyderabad, Telangana",
  bio: "Playback vocalist known for expressive performances across Telugu and Hindi cinema.",
  primaryCraft: "Playback Singing",
  supportingCrafts: ["Live Performance", "Vocal Arrangement"],
};

const CRAFTS = [
  "Actor", "Playback Singing", "Cinematography", "Editing", "Music", "Dancer", "Direction", "Writing", "Sound Design", "Live Performance", "Vocal Arrangement",
];

const INITIAL_MEDIA = [
  { id: 1, title: "Featured performance", description: "Live vocal performance from a recent production session.", type: "Video", craft: "Playback Singing", year: 2026 },
  { id: 2, title: "Studio session", description: "Cinematic vocal arrangement recorded in studio.", type: "Audio", craft: "Vocal Arrangement", year: 2026 },
  { id: 3, title: "Behind the performance", description: "A production still from a recording day.", type: "Image", craft: "Playback Singing", year: 2025 },
];

const INITIAL_EXPERIENCE = [
  { id: 1, title: "Playback Vocalist", company: "Independent · Telugu Cinema", period: "2021 — Present", description: "Recording lead and supporting vocals for feature films and original soundtracks.", craft: "Playback Singing" },
  { id: 2, title: "Studio Vocalist", company: "Independent Music Productions", period: "2018 — 2021", description: "Worked with composers and music directors on original songs and commercial recordings.", craft: "Vocal Arrangement" },
];

const statusMeta = {
  available: { label: "Available", className: "border-amber-400/25 bg-amber-400/10 text-amber-300", dot: "bg-amber-400" },
  tentative: { label: "Tentative", className: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300", dot: "bg-emerald-400" },
  unavailable: { label: "Unavailable", className: "border-white/10 bg-white/5 text-white/35", dot: "bg-white/25" },
};

const dateKey = (date) => date.toISOString().slice(0, 10);

export default function TalentWorkspace() {
  const [active, setActive] = useState("Profile");
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [media, setMedia] = useState(INITIAL_MEDIA);
  const [experiences, setExperiences] = useState(INITIAL_EXPERIENCE);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your profile is now visible in the talent network.", time: "Today", read: false },
    { id: 2, text: "New profile tools are available.", time: "Yesterday", read: true },
  ]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [mediaDraft, setMediaDraft] = useState(null);
  const [experienceDraft, setExperienceDraft] = useState(null);
  const [craftDraft, setCraftDraft] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const [availability, setAvailability] = useState({});

  const navItems = [
    { label: "Profile", icon: UserRound },
    { label: "My Gallery", icon: ImageIcon },
    { label: "Experience & Credits", icon: BriefcaseBusiness },
    { label: "Crafts", icon: Plus },
    { label: "Availability", icon: CalendarDays },
  ];

  const unread = notifications.filter((item) => !item.read).length;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#050505]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div>
            <p className="text-xl font-black tracking-[0.18em]">PRE PRO POST</p>
            <p className="mt-0.5 text-[9px] uppercase tracking-[0.28em] text-amber-300/55">Talent workspace</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setNotifications((items) => items.map((item) => ({ ...item, read: true })))} className="relative grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white" aria-label="Notifications">
              <Bell size={18} />
              {unread > 0 && <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-amber-400 px-1 text-[8px] font-bold text-black">{unread}</span>}
            </button>
            <div className="hidden h-9 w-px bg-white/10 sm:block" />
            <span className="hidden text-sm text-white/55 sm:block">{profile.name}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:flex-row lg:py-10">
        <aside className="lg:w-64 lg:shrink-0">
          <div className="lg:sticky lg:top-24">
            <div className="mb-5 rounded-[1.5rem] border border-white/[0.07] bg-white/[0.025] p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-amber-400/10 text-amber-300"><UserRound size={20} /></div>
                <div className="min-w-0"><p className="truncate font-semibold">{profile.name}</p><p className="text-xs text-white/35">{profile.primaryCraft}</p></div>
              </div>
              <button onClick={() => setActive("Profile")} className="mt-4 w-full rounded-full bg-white/5 py-2.5 text-xs font-semibold text-white/55 hover:bg-white/10 hover:text-white">View my profile</button>
            </div>
            <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
              {navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => setActive(label)} className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${active === label ? "bg-amber-400 text-black" : "text-white/45 hover:bg-white/5 hover:text-white"}`}><Icon size={17} />{label}</button>)}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          {active === "Profile" && <ProfileSection profile={profile} setProfile={setProfile} editing={editingProfile} setEditing={setEditingProfile} />}
          {active === "My Gallery" && <GallerySection media={media} setMedia={setMedia} draft={mediaDraft} setDraft={setMediaDraft} />}
          {active === "Experience & Credits" && <ExperienceSection experiences={experiences} setExperiences={setExperiences} draft={experienceDraft} setDraft={setExperienceDraft} />}
          {active === "Crafts" && <CraftSection profile={profile} setProfile={setProfile} editing={craftDraft} setEditing={setCraftDraft} />}
          {active === "Availability" && <AvailabilitySection month={calendarMonth} setMonth={setCalendarMonth} availability={availability} setAvailability={setAvailability} />}
        </main>
      </div>

      {notifications.some((item) => !item.read) && <NotificationTray notifications={notifications} setNotifications={setNotifications} />}
    </div>
  );
}

function SectionHeader({ eyebrow, title, description, action }) {
  return <div className="flex flex-col gap-5 border-b border-white/[0.07] pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-300/70">{eyebrow}</p><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">{description}</p></div>{action}</div>;
}

function ProfileSection({ profile, setProfile, editing, setEditing }) {
  const [draft, setDraft] = useState(profile);
  const save = () => { setProfile(draft); setEditing(false); };
  return <section>
    <SectionHeader eyebrow="01 / Personal data" title="Your profile" description="Manage the personal information shown on your public talent profile." action={<button onClick={() => { setDraft(profile); setEditing(true); }} className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 px-5 py-3 text-xs font-semibold text-white/65 hover:bg-white/10 hover:text-white"><Edit3 size={14} /> Edit profile</button>} />
    <div className="mt-8 rounded-[2rem] border border-white/[0.07] bg-white/[0.025] p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center"><div className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-amber-400/10 text-amber-300"><UserRound size={34} /></div><div><h2 className="text-2xl font-bold">{profile.name}</h2><p className="mt-1 text-sm text-amber-300">{profile.primaryCraft}</p><p className="mt-2 flex items-center gap-2 text-sm text-white/35"><MapPin size={14} /> {profile.location}</p></div></div>
      <p className="mt-7 max-w-3xl text-sm leading-7 text-white/50">{profile.bio}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[["Email", profile.email], ["Contact", profile.contact], ["Gender", profile.gender], ["Age", profile.age], ["Primary craft", profile.primaryCraft], ["Location", profile.location]].map(([label, value]) => <div key={label} className="rounded-2xl bg-black/20 p-4"><p className="text-[10px] uppercase tracking-[0.18em] text-white/25">{label}</p><p className="mt-2 text-sm text-white/75">{value}</p></div>)}</div>
      {editing && <Modal title="Edit personal information" onClose={() => setEditing(false)}><div className="grid gap-4 sm:grid-cols-2">{["name", "email", "contact", "gender", "age", "location"].map((field) => <Field key={field} label={field} value={draft[field]} onChange={(value) => setDraft({ ...draft, [field]: value })} />)}<div className="sm:col-span-2"><Field label="Bio" value={draft.bio} multiline onChange={(value) => setDraft({ ...draft, bio: value })} /></div></div><ModalActions onCancel={() => setEditing(false)} onSave={save} /></Modal>}
    </div>
  </section>;
}

function GallerySection({ media, setMedia, draft, setDraft }) {
  const save = () => { if (!draft?.title) return; if (draft.id) setMedia((items) => items.map((item) => item.id === draft.id ? draft : item)); else setMedia((items) => [{ ...draft, id: Date.now(), year: new Date().getFullYear() }, ...items]); setDraft(null); };
  return <section>
    <SectionHeader eyebrow="02 / My Gallery" title="The work speaks first" description="Manage the work samples that recruiters and other users can see. Uploaded media is always public." action={<button onClick={() => setDraft({ title: "", description: "", type: "Video", craft: "Playback Singing" })} className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-xs font-bold text-black hover:bg-amber-300"><Upload size={15} /> Upload media</button>} />
    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{media.map((item) => <article key={item.id} className="overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-white/[0.025]"><div className="grid aspect-[16/10] place-items-center bg-neutral-900 text-white/15"><ImageIcon size={42} /></div><div className="p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="font-bold">{item.title}</h3><p className="mt-1 text-xs text-white/35">{item.type} · {item.year}</p></div><span className="rounded-full bg-white/5 px-2.5 py-1 text-[9px] text-amber-300/70">PUBLIC</span></div><p className="mt-3 line-clamp-2 text-sm leading-6 text-white/40">{item.description}</p><div className="mt-5 flex items-center justify-between"><span className="text-[10px] uppercase tracking-[0.15em] text-white/25">{item.craft}</span><div className="flex gap-2"><button onClick={() => setDraft(item)} className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/45 hover:text-white"><Edit3 size={14} /></button><button onClick={() => setMedia((items) => items.filter((entry) => entry.id !== item.id))} className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/35 hover:text-red-300"><Trash2 size={14} /></button></div></div></div></article>)}</div>
    {draft && <Modal title={draft.id ? "Edit media" : "Upload media"} onClose={() => setDraft(null)}><div className="grid gap-4 sm:grid-cols-2"><Field label="Title" value={draft.title} onChange={(value) => setDraft({ ...draft, title: value })} /><SelectField label="Media type" value={draft.type} options={["Video", "Audio", "Image"]} onChange={(value) => setDraft({ ...draft, type: value })} /><div className="sm:col-span-2"><Field label="Description / caption" value={draft.description} multiline onChange={(value) => setDraft({ ...draft, description: value })} /></div><SelectField label="Craft performed" value={draft.craft} options={CRAFTS} onChange={(value) => setDraft({ ...draft, craft: value })} /></div><p className="mt-4 text-xs text-white/30">Visibility is always public. There is no private-media option.</p><ModalActions onCancel={() => setDraft(null)} onSave={save} /></Modal>}
  </section>;
}

function ExperienceSection({ experiences, setExperiences, draft, setDraft }) {
  const save = () => { if (!draft?.title) return; if (draft.id) setExperiences((items) => items.map((item) => item.id === draft.id ? draft : item)); else setExperiences((items) => [{ ...draft, id: Date.now() }, ...items]); setDraft(null); };
  return <section>
    <SectionHeader eyebrow="03 / Experience & credits" title="The career behind the craft" description="Add, edit or remove professional experience and credits." action={<button onClick={() => setDraft({ title: "", company: "", period: "", description: "", craft: "Playback Singing" })} className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-xs font-bold text-black"><Plus size={15} /> Add experience</button>} />
    <div className="mt-8 space-y-4">{experiences.map((entry) => <article key={entry.id} className="rounded-[1.75rem] border border-white/[0.07] bg-white/[0.025] p-6 sm:p-7"><div className="flex flex-col gap-5 sm:flex-row sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300/70">{entry.period}</p><h3 className="mt-2 text-xl font-bold">{entry.title}</h3><p className="mt-1 text-sm text-white/35">{entry.company}</p><p className="mt-4 max-w-2xl text-sm leading-6 text-white/45">{entry.description}</p><span className="mt-5 inline-flex rounded-full bg-white/5 px-3 py-1.5 text-[10px] text-white/40">{entry.craft}</span></div><div className="flex shrink-0 gap-2"><button onClick={() => setDraft(entry)} className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/45 hover:text-white"><Edit3 size={14} /></button><button onClick={() => setExperiences((items) => items.filter((item) => item.id !== entry.id))} className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/35 hover:text-red-300"><Trash2 size={14} /></button></div></div></article>)}</div>
    {draft && <Modal title={draft.id ? "Edit experience" : "Add experience"} onClose={() => setDraft(null)}><div className="grid gap-4 sm:grid-cols-2"><Field label="Role / title" value={draft.title} onChange={(value) => setDraft({ ...draft, title: value })} /><Field label="Company / production" value={draft.company} onChange={(value) => setDraft({ ...draft, company: value })} /><Field label="Period" value={draft.period} onChange={(value) => setDraft({ ...draft, period: value })} /><SelectField label="Craft" value={draft.craft} options={CRAFTS} onChange={(value) => setDraft({ ...draft, craft: value })} /><div className="sm:col-span-2"><Field label="Description" value={draft.description} multiline onChange={(value) => setDraft({ ...draft, description: value })} /></div></div><ModalActions onCancel={() => setDraft(null)} onSave={save} /></Modal>}
  </section>;
}

function CraftSection({ profile, setProfile, editing, setEditing }) {
  const [primary, setPrimary] = useState(profile.primaryCraft);
  const [supporting, setSupporting] = useState(profile.supportingCrafts);
  const toggle = (craft) => setSupporting((items) => items.includes(craft) ? items.filter((item) => item !== craft) : [...items, craft]);
  const save = () => { setProfile({ ...profile, primaryCraft: primary, supportingCrafts: supporting.filter((craft) => craft !== primary) }); setEditing(false); };
  return <section>
    <SectionHeader eyebrow="04 / Crafts" title="Your crafts" description="Keep one primary craft and add the supporting crafts you work in." action={<button onClick={() => { setPrimary(profile.primaryCraft); setSupporting(profile.supportingCrafts); setEditing(true); }} className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 px-5 py-3 text-xs font-semibold text-white/65 hover:bg-white/10 hover:text-white"><Edit3 size={14} /> Manage crafts</button>} />
    <div className="mt-8 grid gap-5 md:grid-cols-2"><div className="rounded-[1.75rem] border border-amber-400/15 bg-amber-400/[0.04] p-7"><p className="text-[10px] uppercase tracking-[0.2em] text-amber-300/60">Primary craft</p><h2 className="mt-3 text-2xl font-black">{profile.primaryCraft}</h2><p className="mt-2 text-sm text-white/35">Your main professional identity.</p></div><div className="rounded-[1.75rem] border border-white/[0.07] bg-white/[0.025] p-7"><p className="text-[10px] uppercase tracking-[0.2em] text-white/25">Supporting crafts</p><div className="mt-4 flex flex-wrap gap-2">{profile.supportingCrafts.map((craft) => <span key={craft} className="rounded-full bg-white/5 px-3 py-2 text-xs text-white/55">{craft}</span>)}</div></div></div>
    {editing && <Modal title="Manage crafts" onClose={() => setEditing(false)}><SelectField label="Primary craft" value={primary} options={CRAFTS} onChange={setPrimary} /><div className="mt-5"><p className="mb-3 text-xs font-semibold text-white/50">Supporting crafts</p><div className="flex flex-wrap gap-2">{CRAFTS.filter((craft) => craft !== primary).map((craft) => <button key={craft} onClick={() => toggle(craft)} className={`rounded-full border px-3 py-2 text-xs transition ${supporting.includes(craft) ? "border-amber-400/30 bg-amber-400/10 text-amber-300" : "border-white/10 bg-white/5 text-white/40"}`}>{supporting.includes(craft) && <Check size={12} className="mr-1 inline" />}{craft}</button>)}</div></div><ModalActions onCancel={() => setEditing(false)} onSave={save} /></Modal>}
  </section>;
}

function AvailabilitySection({ month, setMonth, availability, setAvailability }) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const end = new Date(today); end.setDate(end.getDate() + 89);
  const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
  const firstDay = monthStart.getDay();
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const monthDays = useMemo(() => Array.from({ length: daysInMonth }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)), [month, daysInMonth]);
  const setStatus = (date, status) => { if (date < today || date > end) return; const key = dateKey(date); setAvailability((items) => { const next = { ...items }; if (status === "available") delete next[key]; else next[key] = status; return next; }); };
  const shift = (offset) => setMonth(new Date(month.getFullYear(), month.getMonth() + offset, 1));
  return <section>
    <SectionHeader eyebrow="05 / Availability" title="Your next 90 days" description="Every future day is available by default. Mark a day tentative or unavailable when your plans change." action={<div className="flex items-center gap-2"><button onClick={() => shift(-1)} className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/45"><ChevronLeft size={17} /></button><button onClick={() => shift(1)} className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/45"><ChevronRight size={17} /></button></div>} />
    <div className="mt-8 rounded-[2rem] border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7"><div className="flex items-center justify-between"><h2 className="text-lg font-bold">{month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h2><div className="flex gap-3 text-[9px] uppercase tracking-[0.12em] text-white/30"><span><i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-amber-400" />Available</span><span><i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-emerald-400" />Tentative</span><span><i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-white/20" />Unavailable</span></div></div><div className="mt-6 grid grid-cols-7 gap-1.5 text-center sm:gap-2">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <div key={day} className="pb-2 text-[9px] uppercase tracking-[0.15em] text-white/20">{day}</div>)}{Array.from({ length: firstDay }).map((_, i) => <div key={`blank-${i}`} />)}{monthDays.map((date) => { const key = dateKey(date); const isInWindow = date >= today && date <= end; const status = availability[key] || "available"; const meta = statusMeta[status]; return <button key={key} disabled={!isInWindow} onClick={() => setStatus(date, status === "available" ? "tentative" : status === "tentative" ? "unavailable" : "available")} className={`min-h-16 rounded-xl border p-2 text-left transition sm:min-h-20 ${!isInWindow ? "cursor-not-allowed border-transparent bg-transparent opacity-15" : `${meta.className} hover:-translate-y-0.5`}`}><span className="text-xs font-semibold">{date.getDate()}</span>{isInWindow && <span className="mt-3 flex items-center gap-1.5 text-[8px] uppercase tracking-[0.08em]"><i className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />{meta.label}</span>}</button>; })}</div><p className="mt-5 text-xs leading-5 text-white/25">Only today through the next 89 days are editable. Available is the implicit default; only Tentative and Unavailable days are stored as overrides.</p></div>
  </section>;
}

function NotificationTray({ notifications, setNotifications }) {
  return <div className="fixed bottom-5 right-5 z-40 w-[min(360px,calc(100vw-2.5rem))] rounded-2xl border border-white/10 bg-[#101010]/95 p-4 shadow-2xl backdrop-blur-xl"><div className="flex items-center justify-between"><p className="text-xs font-bold">Notifications</p><button onClick={() => setNotifications((items) => items.map((item) => ({ ...item, read: true })))} className="text-[10px] text-amber-300/70">Mark all read</button></div>{notifications.filter((item) => !item.read).map((item) => <div key={item.id} className="mt-3 rounded-xl bg-white/5 p-3"><p className="text-xs leading-5 text-white/65">{item.text}</p><p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-white/25">{item.time}</p></div>)}</div>;
}

function Modal({ title, children, onClose }) { return <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-5 backdrop-blur-sm"><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#111] p-6 shadow-2xl sm:p-8"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">{title}</h2><button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/45"><X size={16} /></button></div><div className="mt-7">{children}</div></div></div>; }
function ModalActions({ onCancel, onSave }) { return <div className="mt-7 flex justify-end gap-2"><button onClick={onCancel} className="rounded-full px-5 py-2.5 text-xs text-white/45 hover:text-white">Cancel</button><button onClick={onSave} className="rounded-full bg-amber-400 px-5 py-2.5 text-xs font-bold text-black">Save changes</button></div>; }
function Field({ label, value, onChange, multiline = false }) { const Tag = multiline ? "textarea" : "input"; return <label className="block"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">{label}</span><Tag value={value ?? ""} onChange={(e) => onChange(e.target.value)} rows={multiline ? 4 : undefined} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400/40" /></label>; }
function SelectField({ label, value, options, onChange }) { return <label className="block"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-sm text-white outline-none focus:border-amber-400/40">{options.map((option) => <option key={option}>{option}</option>)}</select></label>; }
