# CLAUDE.md

Guidance for working on the **Pre Pro Post** web app, the React frontend of a two-sided marketplace
where cinema talent builds a profile and portfolio, and recruiters discover talent and send offers.
The backend lives in a separate repo (see [Backend contract](#backend-contract)).

This file describes the code as it is on the refactor stack tip (`refactor/fe-structure`, which
includes PRs #7, #8 and #9). Update it in the same commit when a convention here changes.

## Stack

| Piece                             | Version (from `package.json`)                                    |
| --------------------------------- | ---------------------------------------------------------------- |
| React / React DOM                 | ^19.2                                                            |
| React Router (`react-router-dom`) | ^7.15, `BrowserRouter` + `<Routes>`                              |
| Vite (+ `@vitejs/plugin-react`)   | ^8 / ^6, ES modules (`"type": "module"`)                         |
| Tailwind CSS                      | ^3.4 via PostCSS + autoprefixer (config in `tailwind.config.js`) |
| framer-motion / gsap              | ^12.38 / ^3.15 (animation)                                       |
| lucide-react                      | ^1.14 (icons)                                                    |
| ESLint (flat config)              | ^10, with `react-hooks` and `react-refresh` plugins              |
| Prettier                          | ^3.9 (double quotes, semicolons, trailing commas, width 100)     |

Plain JavaScript (`.js` / `.jsx`), no TypeScript. Shared shapes are documented as JSDoc typedefs in
`src/lib/types.js`. Node 22 is what this was verified with; no `engines` field is set (TODO: pin).
There is no test runner yet (TODO).

## Scripts

```bash
npm install
npm run dev            # Vite dev server on 0.0.0.0
npm run build          # production build into dist/
npm run preview        # serve dist/ locally
npm run lint           # eslint .
npm run format         # prettier --write .
npm run format:check   # prettier --check . (what to run before committing)
```

Copy `.env.example` to `.env.local` (git-ignored; only `.env.example` is committed). Today the only
variable is `VITE_ALLOWED_HOSTS`, a comma-separated list of extra hostnames the dev server accepts
(for example an ngrok tunnel). Add every new variable to `.env.example`. Only `VITE_`-prefixed
variables reach browser code, so never put a secret in one.

## Folder map

```
index.html                 fonts are loaded here, not from CSS
src/
  main.jsx                 entry: StrictMode, imports styles/index.css, renders <App/>
  app/                     App.jsx (BrowserRouter shell), routes.jsx (route table),
                           RouteScrollManager.jsx (scroll-to-top / hash handling)
  features/                one folder per product area, see "Features" below
    artists/ auth/ home/ productions/ talent/
      index.js             the feature's public API
      pages/               route-level components (*Page.jsx)
      components/          feature-private components
      hooks/               feature-private hooks (talent and auth today)
      data/                mock data behind accessor functions (see "Mock vs real")
  components/              shared, feature-agnostic building blocks
    layout/                Navbar, MobileMenu, Footer, OnboardingBrand, navLinks.js
    sections/hero/         the landing hero and its parts
    ui/                    primitives: Button, Input, Select, Textarea, Loader, SectionHeading
  catalog/                 reference data shared by features: crafts, India states/cities
                           (index.js exposes getCrafts, getCraftTitles, getStates, getCities)
  animations/              easing.js, shared easing curve
  hooks/                   shared hooks: useAutoAdvance, useClickOutside, useDialog
  lib/                     pure helpers: availability, calendar, cn, format, media, scroll,
                           types.js (JSDoc typedefs)
  styles/index.css         the single global stylesheet (Tailwind layers + global CSS)
```

`src/lib/api/` does not exist yet. It is where all HTTP code goes once the backend is wired in.

### Features and routes

Routes live in `src/app/routes.jsx`. Order matters: `/talent/onboarding` and `/talent/me` must
stay above `/talent/:talentId`.

| Path                 | Page                                                      | Feature       |
| -------------------- | --------------------------------------------------------- | ------------- |
| `/`                  | `HomePage`                                                | `home`        |
| `/talent`            | `TalentDiscoveryPage`                                     | `talent`      |
| `/talent/onboarding` | `TalentOnboardingPage`                                    | `talent`      |
| `/talent/me`         | `TalentOwnerProfilePage` (owner view with settings panel) | `talent`      |
| `/talent/:talentId`  | `TalentProfilePage` (public view)                         | `talent`      |
| `/productions`       | `ProductionsPage`                                         | `productions` |
| `/artists`           | `ArtistsPage`                                             | `artists`     |
| `/login`             | `LoginPage` (not linked from the UI yet)                  | `auth`        |
| `/register`          | `RegisterPage` (not linked from the UI yet)               | `auth`        |
| `/verify-email`      | `VerifyEmailPage` (`?email=` shows the address)           | `auth`        |

## Import rules

- **`@/` is an alias for `src/`** (`vite.config.js` for the build, `jsconfig.json` for the editor).
  Use it for every cross-folder import (`@/components/ui/Button`). Use relative imports only for
  files in the same folder or a direct child.
- **Each feature's `index.js` is its public API.** Code outside a feature imports from
  `@/features/<name>`, never from its internals. Current exports:
  - `artists`: `ArtistsPage`, `ArtistCard`, `getArtists`
  - `auth`: `LoginPage`, `RegisterPage`, `VerifyEmailPage`
  - `home`: `HomePage`
  - `productions`: `ProductionsPage`, `ProductionCard`, `getProductions`
  - `talent`: `TalentDiscoveryPage`, `TalentProfilePage`, `TalentOwnerProfilePage`,
    `TalentOnboardingPage`
- Inside a feature, files may import their own feature by full `@/features/<name>/...` path
  (the existing code does). Do not reach into another feature's `components/`, `hooks/` or `data/`.
  If something is needed by two features, export it from the owner's `index.js` or move it to
  `components/`, `hooks/`, `lib/` or `catalog/`.
- Dependency direction: `app` -> `features` -> `components`, `catalog`, `hooks`, `lib`,
  `animations`. Shared folders never import from `features/`.
- Components: one component per file, `PascalCase.jsx`; hooks `useThing.js`; pages end in `Page`.
  Keep `react-refresh/only-export-components` clean (components files export components only;
  constants and helpers go in sibling `.js` files).
- Styling is Tailwind utility classes; join conditional classes with `cn` from `@/lib/cn`.
  Do not add CSS files, a second styling system or inline `style` objects that create Tailwind
  classes dynamically.
- Add a dependency only with a reason in the commit body (TODO: no dependency policy beyond that).

## Mock vs real today

**Everything is mock. There is no network code, no auth and no `.env` API URL in the app.**

| Area                                                  | State                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Talent list and profiles (`/talent`, `/talent/:id`)   | Mock. `features/talent/data/talents.js`, read via `getTalents` / `getTalentById`. Ids are numbers.                                                                                                                                                                                                                                                                                           |
| Owner profile (`/talent/me`)                          | Mock. `getOwnerTalent()` returns the first mock talent. There is no "signed-in user".                                                                                                                                                                                                                                                                                                        |
| Talent settings panel                                 | Persists to `localStorage` key `pre-pro-post:talent-settings` (`settingsStorage.js`), read back by the owner talent. Not sent anywhere.                                                                                                                                                                                                                                                      |
| Onboarding (`/talent/onboarding`)                     | Local component state only. Nothing is submitted. The chosen photo is a browser object URL.                                                                                                                                                                                                                                                                                                  |
| Media upload / gallery                                | Mock seed (`MEDIA_SEED`). The file input only reads the file name; nothing is uploaded. Likes are static numbers.                                                                                                                                                                                                                                                                            |
| Availability calendar                                 | UI over mock data, not persisted.                                                                                                                                                                                                                                                                                                                                                            |
| Productions, artists, testimonials                    | Mock data via `getProductions`, `getArtists`, `getTestimonials`.                                                                                                                                                                                                                                                                                                                             |
| Crafts, states, cities                                | Static files in `src/catalog/` (`getCrafts`, `getStates`, `getCities`). This is the seam to replace with `GET /api/bootstrap`. Mock crafts have numeric `id` and are matched by `title`.                                                                                                                                                                                                     |
| Contact form (home)                                   | Markup only. It has no submit handler.                                                                                                                                                                                                                                                                                                                                                       |
| Login, register, verify-email pages (`features/auth`) | UI exists at `/login`, `/register`, `/verify-email` but is **not connected**: client-side validation only, and a valid submit shows "Not connected yet" unless a page is given an `onSubmit` / `onResend` prop. No session, token or `lib/api` yet. Not linked from the Navbar; the wiring PR adds the entry point. No Google sign-in or password reset (the backend has no such endpoints). |
| Recruiter side, offers, search ranking, notifications | Not built. No pages, no routes.                                                                                                                                                                                                                                                                                                                                                              |

Rules that follow from this:

- Page and component code reads data only through the accessor functions (`getTalents()`,
  `getCrafts()`, ...), never by importing a data file directly. That keeps the swap to the API in
  one place per feature.
- No half-wired UI. Do not add a button, form, toggle or link that looks functional but does
  nothing. Either wire it end to end, or leave it out, or render it visibly disabled with the
  reason. Existing mock-only controls listed above are known debt, not a pattern to copy.
- When replacing a mock with the API, delete the mock data in the same commit and update this table.

## Backend contract

The backend is [`abhinavreddy2684-droid/prepropost`](https://github.com/abhinavreddy2684-droid/prepropost)
(Django + DRF). Its committed **`openapi.yaml` is the source of truth** for every request and
response. **The backend wins every conflict and the frontend follows it.** If the API looks wrong
or is missing something, raise it on the backend repo; do not work around it or guess in the
frontend. Do not invent endpoints: if `openapi.yaml` does not list it, it does not exist.

- **All HTTP goes through `src/lib/api/`.** No `fetch` or XHR in components, hooks or pages.
  Components call feature-level functions that call `lib/api`. (The folder is not created yet.)
- **Auth.** The access token lives **in memory only**: a module variable or store. Never write it
  to `localStorage`, `sessionStorage`, cookies, IndexedDB or the URL, and never log it. The refresh
  token is an **HttpOnly cookie that JS never reads or sets**; the browser sends it, so requests to
  the refresh endpoint need `credentials: "include"`. After a page reload the access token is gone
  and must be re-obtained through the refresh flow. The exact endpoints are TODO: read them from
  `openapi.yaml`.
- **Errors** have one shape: `{"error": {"code", "message", "details"}}`. Branch on `code`, show
  `message` to users only when it is meant for them, and use `details` for field-level form errors.
  Parse this in one place in `lib/api`. The list of codes is TODO (see `openapi.yaml`).
- **Lists use cursor pagination:** `{ "next", "previous", "results" }`. Follow `next` / `previous`
  as opaque URLs or cursors; do not build page numbers or offsets, and do not assume a total count.
- **Ids are UUID strings.** Treat them as opaque strings; never `Number()`, `parseInt` or compare
  with numbers. Mock ids today are numbers, which is a known mismatch to fix when wiring talent
  endpoints (routes already read `:talentId` as a string).
- **Reference data comes from `GET /api/bootstrap`**, loaded once at startup and cached (the
  backend documents ETag revalidation). Crafts and locations (states, cities) are referenced by
  `slug` or `id` as `openapi.yaml` specifies, **never by display name and never hardcoded**.
  `src/catalog/` is the temporary mock for this; matching crafts by `title` must go away when
  bootstrap is wired. Whether the frontend keeps bootstrap in a store or context is TODO.
- **Privacy.** The backend never returns a talent's `full_name`, `gender`, `date_of_birth`, email or
  phone in a public response. Do not add UI that expects them on public talent views.
- **Money** is integer minor units (paise) plus a currency code. Never floats; format only at the
  display edge (`src/lib/format.js`). No money UI exists yet.
- **Types.** `src/lib/types.js` describes today's mock shapes. When wiring an endpoint, update the
  typedefs to match `openapi.yaml`; generating a typed client from it is a possible later step (TODO).
- Not yet decided (TODO): API base URL variable and dev proxy, CORS/cookie setup between dev server
  and API, token refresh/retry strategy, error toasts vs inline errors, loading-state conventions.

## Definition of Done (run before EVERY commit)

1. `npm run lint` passes.
2. `npm run format:check` passes (run `npm run format` to fix).
3. `npm run build` passes.
4. No half-wired UI: everything a user can click, type into or see either works end to end, is
   clearly disabled, or is absent. No dead buttons, no placeholder handlers, no commented-out code,
   no `console.log`.
5. New data access goes through a feature accessor or `lib/api`; new cross-feature imports go
   through the feature's `index.js`.
6. Docs updated if a convention, route, env variable or mock/real status changed (this file, and
   `.env.example` for variables).

Also check the screens you touched in the browser (`npm run dev`) at phone and desktop widths;
lint and build do not catch layout, animation or routing problems. There is no CI configuration in
this repo yet (TODO), so these checks are on you.

Never commit with failing checks. Never skip hooks.

## Git workflow

- **Never commit to `main`.** Work on a short-lived branch named `feat/...`, `fix/...`, `chore/...`
  or `docs/...` (refactors use `refactor/...`, as the stack did). Open a **pull request**; **never
  merge your own PR**. Do not force-push shared branches or rewrite pushed history.
- **Commits are small and each leaves the tree green** (lint, format:check and build pass at every
  commit). Do not mix a refactor with a behaviour change, or formatting-only changes with logic.
- Use [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): imperative
summary` under ~72 characters, then a body explaining **why**.
  - types: `feat`, `fix`, `refactor`, `style`, `build`, `chore`, `docs`
  - scopes: the existing history uses `fe`; prefer a feature or area (`talent`, `home`,
    `productions`, `artists`, `layout`, `ui`, `catalog`, `api`, `app`) for new work.
  - Good: `feat(talent): load discovery results from the API`
  - Bad: `updates`, `wip`, `fix stuff`
- Never commit secrets or `.env` files (only `.env.example`). Do not commit `dist/` or
  `node_modules/`.
- When the backend contract changes, the frontend follows in a separate PR that links the backend
  change.

## When unsure

Ask before: adding a dependency, changing the folder structure or import rules, changing how auth
tokens are stored, or touching anything involving money. Prefer the smallest change that fits the
existing layout. Mark unknowns as TODO rather than guessing.
