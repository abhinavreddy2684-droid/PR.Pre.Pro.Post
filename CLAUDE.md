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

Copy `.env.example` to `.env.local` (git-ignored; only `.env.example` is committed). Variables:

| Variable             | Meaning                                                                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_BASE_URL`  | Backend origin, default `http://localhost:8000`. Use `localhost`, never `127.0.0.1`: the dev server is `http://localhost:5173` and the refresh cookie is same-site. |
| `VITE_ALLOWED_HOSTS` | Comma-separated extra hostnames the dev server accepts (for example an ngrok tunnel).                                                                               |

Add every new variable to `.env.example`. Only `VITE_`-prefixed variables reach browser code, so
never put a secret in one. The backend must list the dev origin in `CORS_ALLOWED_ORIGINS` (its
default is `FRONTEND_URL`, `http://localhost:5173`).

## Folder map

```
index.html                 fonts are loaded here, not from CSS
src/
  main.jsx                 entry: StrictMode, imports styles/index.css, renders <App/>
  app/                     App.jsx (BrowserRouter + AuthProvider shell), routes.jsx (route
                           table and guards), RouteScrollManager.jsx (scroll / hash handling)
  features/                one folder per product area, see "Features" below
    artists/ auth/ home/ productions/ talent/
      index.js             the feature's public API
      pages/               route-level components (*Page.jsx)
      components/          feature-private components
      hooks/               feature-private hooks (talent and auth today)
      api/                 the feature's backend calls, built on lib/api (auth, talent)
      data/                mock data behind accessor functions (see "Mock vs real")
  components/              shared, feature-agnostic building blocks
    layout/                Navbar, MobileMenu, Footer, OnboardingBrand, navLinks.js
    sections/hero/         the landing hero and its parts
    ui/                    primitives: Button, Input, Select, Textarea, Loader, SectionHeading
  catalog/                 reference data from GET /api/bootstrap: BootstrapProvider (in
                           App.jsx) and useCatalog() (crafts, states with cities, enums, and
                           craftBySlug / stateById / cityById / enumOptions / enumLabel)
  animations/              easing.js, shared easing curve
  hooks/                   shared hooks: useAutoAdvance, useClickOutside, useDebouncedValue,
                           useDialog, useAuth
                           (+ authContext.js; AuthProvider in features/auth fills it)
  lib/                     pure helpers: availability, calendar, cn, format, media, scroll,
                           types.js (JSDoc typedefs)
    api/                   the HTTP client: every request to the backend goes through here
  styles/index.css         the single global stylesheet (Tailwind layers + global CSS)
```

`src/lib/api/` is the only place that talks HTTP: `apiFetch` / `api.get|post|put|patch|delete`
(base URL, JSON, `credentials: "include"`, Bearer token, one shared refresh-and-retry on a 401,
absolute `next` URLs accepted), `ApiError` with `{ status, code, message, details }`, and the
helpers `userMessage(error)` and `fieldErrors(error)` for showing errors.

### Features and routes

Routes live in `src/app/routes.jsx`. Order matters: `/talent/onboarding` and `/talent/me` must
stay above `/talent/:talentId`. Routes marked "signed in" are wrapped in `RequireAuth`, which
sends signed-out visitors to `/login?next=<the page>`. `?next=` is only followed when it resolves
to this origin (`safeNextPath` in `features/auth/nextPath.js`).

| Path                 | Page                                                    | Feature       |
| -------------------- | ------------------------------------------------------- | ------------- |
| `/`                  | `HomePage`                                              | `home`        |
| `/talent`            | `TalentDiscoveryPage`                                   | `talent`      |
| `/talent/onboarding` | `TalentOnboardingPage` (signed in)                      | `talent`      |
| `/talent/me`         | `TalentOwnerProfilePage` (signed in; owner view)        | `talent`      |
| `/talent/:talentId`  | `TalentProfilePage` (public view)                       | `talent`      |
| `/productions`       | `ProductionsPage`                                       | `productions` |
| `/artists`           | `ArtistsPage`                                           | `artists`     |
| `/login`             | `LoginPage` (`?next=` = where to go after)              | `auth`        |
| `/register`          | `RegisterPage` (then the verify notice)                 | `auth`        |
| `/verify-email`      | `VerifyEmailPage` (`?token=` verifies, else the notice) | `auth`        |
| `*`                  | `NotFoundPage` (404 catch-all)                          | `auth`        |

## Import rules

- **`@/` is an alias for `src/`** (`vite.config.js` for the build, `jsconfig.json` for the editor).
  Use it for every cross-folder import (`@/components/ui/Button`). Use relative imports only for
  files in the same folder or a direct child.
- **Each feature's `index.js` is its public API.** Code outside a feature imports from
  `@/features/<name>`, never from its internals. Current exports:
  - `artists`: `ArtistsPage`, `ArtistCard`, `getArtists`
  - `auth`: `AuthProvider`, `RequireAuth`, `LoginPage`, `RegisterPage`, `VerifyEmailPage`,
    `NotFoundPage`. Read the session anywhere with `useAuth()` from `@/hooks/useAuth`
    (`status`, `user`, `login`, `register`, `logout`, `reloadUser`).
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

Auth is real (see the table). Everything else listed as mock still is.

| Area                                                     | State                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Talent discovery (`/talent`)                             | **Real.** `GET /api/talent` through `useTalentSearch` (300 ms debounced `q`, stale requests aborted, filters reset the cursor, "Load more" follows `next`). Filters: `?craft=<slug>`, state and city slugs from bootstrap, available. Cards come from `toTalentCard` (`features/talent/api/talentAdapters.js`).                                                                                                               |
| Public profiles (`/talent/:id`)                          | Mock. `features/talent/data/talents.js`, read via `getTalentById`. Ids are numbers.                                                                                                                                                                                                                                                                                                                                           |
| Owner profile (`/talent/me`)                             | Mock. `getOwnerTalent()` returns the first mock talent. There is no "signed-in user".                                                                                                                                                                                                                                                                                                                                         |
| Talent settings panel                                    | Persists to `localStorage` key `pre-pro-post:talent-settings` (`settingsStorage.js`), read back by the owner talent. Not sent anywhere.                                                                                                                                                                                                                                                                                       |
| Onboarding (`/talent/onboarding`)                        | **Real.** Signed in only. Finishing sends `POST /api/talent/me` -> `PUT /api/talent/me/crafts` -> `POST /api/talent/me/onboarding/complete` (`useOnboardingSubmit`, payloads from `toOnboardingRequests`), then opens `/talent/me`. A 409 on create fetches the existing profile and continues; a retry after a partial failure resumes. No profile photo step yet (it returns with media upload).                            |
| Media upload / gallery                                   | Mock seed (`MEDIA_SEED`). The file input only reads the file name; nothing is uploaded. Likes are static numbers.                                                                                                                                                                                                                                                                                                             |
| Availability calendar                                    | UI over mock data, not persisted.                                                                                                                                                                                                                                                                                                                                                                                             |
| Productions, artists, testimonials                       | Mock data via `getProductions`, `getArtists`, `getTestimonials`.                                                                                                                                                                                                                                                                                                                                                              |
| Crafts, states, cities, enums                            | **Real.** `GET /api/bootstrap` via `BootstrapProvider` / `useCatalog()`. Used by the home craft reel, onboarding and the discovery heading. `?craft=` takes a slug.                                                                                                                                                                                                                                                           |
| Contact form (home)                                      | Markup only. It has no submit handler.                                                                                                                                                                                                                                                                                                                                                                                        |
| Login, register, verify-email, session (`features/auth`) | **Real.** `POST /api/auth/login`, `/register`, `/logout`, `/refresh`, `/verify-email`, `/resend-verification` and `GET /api/me`. `AuthProvider` restores the session on load (refresh, then `/api/me`; a 401 means signed out). Navbar and mobile menu show "Login / Sign up" or "My profile" / "Log out" (and "Verify your email" when unverified). No Google sign-in or password reset (the backend has no such endpoints). |
| Recruiter side, offers, search ranking, notifications    | Not built. No pages, no routes.                                                                                                                                                                                                                                                                                                                                                                                               |

Rules that follow from this:

- Page and component code reads data only through the accessor functions (`getTalents()`,
  `useCatalog()`, ...), never by importing a data file directly. That keeps the swap to the API in
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
  Components call feature-level functions that call `lib/api`.
- **Auth.** The access token lives **in memory only**: a module variable or store. Never write it
  to `localStorage`, `sessionStorage`, cookies, IndexedDB or the URL, and never log it. The refresh
  token is an **HttpOnly cookie that JS never reads or sets**; the browser sends it, so requests to
  the refresh endpoint need `credentials: "include"`. After a page reload the access token is gone
  and must be re-obtained through the refresh flow. `src/lib/api/token.js` holds the token;
  `apiFetch` refreshes once on a 401 (concurrent 401s share one `POST /api/auth/refresh`) and
  retries; a 401 from refresh means signed out.
- **Errors** have one shape: `{"error": {"code", "message", "details"}}`. Branch on `code`, show
  `message` to users only when it is meant for them, and use `details` for field-level form errors.
  Parsed only in `src/lib/api/errors.js`. 429 means rate limited (`userMessage` says so). The full
  list of codes is TODO (see `openapi.yaml` and the backend services).
- **Lists use cursor pagination:** `{ "next", "previous", "results" }`. Follow `next` / `previous`
  as opaque URLs or cursors; do not build page numbers or offsets, and do not assume a total count.
- **Ids are UUID strings.** Treat them as opaque strings; never `Number()`, `parseInt` or compare
  with numbers. Mock ids today are numbers, which is a known mismatch to fix when wiring talent
  endpoints (routes already read `:talentId` as a string).
- **Reference data comes from `GET /api/bootstrap`**, loaded once at startup and cached (the
  backend documents ETag revalidation). Crafts and locations (states, cities) are referenced by
  `slug` or `id` as `openapi.yaml` specifies, **never by display name and never hardcoded**.
  `BootstrapProvider` (a plain React context in `src/catalog/`) loads it once; nothing renders
  until it has, and a failure shows a full-page retry. Read it with `useCatalog()`. Crafts go in
  URLs and requests by `slug`, cities by `id` (`city_id`). Use `enumLabel(name, value)` for the
  labels of backend enums (gallery stages, media kinds, ...) instead of hardcoding them.
- **Privacy.** The backend never returns a talent's `full_name`, `gender`, `date_of_birth`, email or
  phone in a public response. Do not add UI that expects them on public talent views.
- **Money** is integer minor units (paise) plus a currency code. Never floats; format only at the
  display edge (`src/lib/format.js`). No money UI exists yet.
- **Types.** `src/lib/types.js` describes today's mock shapes. When wiring an endpoint, update the
  typedefs to match `openapi.yaml`; generating a typed client from it is a possible later step (TODO).
- Errors are shown inline, next to the form or section that caused them (no toasts).
- Not yet decided (TODO): a dev proxy instead of CORS, loading-state conventions.

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
