# Pre Pro Post (web)

React frontend for **Pre Pro Post**, a marketplace for filmmakers: cinema talent builds a profile
and portfolio, and recruiters discover talent and send offers.

> Status: being wired to the backend. Auth, reference data (bootstrap) and talent onboarding are
> real; the rest is still mock. See [CLAUDE.md](./CLAUDE.md) for what is mock vs real.

## Stack

React 19, React Router 7, Vite 8, Tailwind CSS 3, framer-motion, GSAP, lucide-react.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev
```

| Script                                    | Does                          |
| ----------------------------------------- | ----------------------------- |
| `npm run dev`                             | Vite dev server               |
| `npm run build`                           | Production build into `dist/` |
| `npm run preview`                         | Serve the production build    |
| `npm run lint`                            | ESLint                        |
| `npm run format` / `npm run format:check` | Prettier write / check        |

`VITE_API_BASE_URL` is the backend origin (default `http://localhost:8000`; use `localhost`, not
`127.0.0.1`). `VITE_ALLOWED_HOSTS` (optional) lists extra hostnames the dev server accepts, e.g. an
ngrok tunnel. The app needs the backend running: it loads `GET /api/bootstrap` before rendering.

## Layout

`src/app` (router shell and routes), `src/features/*` (artists, auth, home, productions, talent),
`src/components/*` (layout, sections, ui), `src/catalog` (reference data from the API), `src/lib`
(including `lib/api`, the only HTTP client), `src/hooks`,
`src/styles`. Import with the `@/` alias, and across features only through each feature's `index.js`.

## Backend

The API lives in [`prepropost`](https://github.com/abhinavreddy2684-droid/prepropost). Its committed
`openapi.yaml` is the contract; the backend wins any conflict.

## Contributing

Read [CLAUDE.md](./CLAUDE.md): branch from `main`, use Conventional Commits, make sure `lint`,
`format:check` and `build` pass, and open a PR. Never commit to `main`.
