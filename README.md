# Pre Pro Post (web)

React frontend for **Pre Pro Post**, a marketplace for filmmakers: cinema talent builds a profile
and portfolio, and recruiters discover talent and send offers.

> Status: UI prototype. All data is mock; nothing talks to the backend yet.
> See [CLAUDE.md](./CLAUDE.md) for what is mock vs real.

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

`VITE_ALLOWED_HOSTS` (optional) lists extra hostnames the dev server accepts, e.g. an ngrok tunnel.

## Layout

`src/app` (router shell and routes), `src/features/*` (artists, home, productions, talent),
`src/components/*` (layout, sections, ui), `src/catalog` (reference data), `src/lib`, `src/hooks`,
`src/styles`. Import with the `@/` alias, and across features only through each feature's `index.js`.

## Backend

The API lives in [`prepropost`](https://github.com/abhinavreddy2684-droid/prepropost). Its committed
`openapi.yaml` is the contract; the backend wins any conflict.

## Contributing

Read [CLAUDE.md](./CLAUDE.md): branch from `main`, use Conventional Commits, make sure `lint`,
`format:check` and `build` pass, and open a PR. Never commit to `main`.
