# AniUI Docs

The documentation site for [AniUI](https://aniui.dev) — a Next.js app deployed on Vercel. It also **hosts the `@aniui` shadcn-compatible registry**.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also runs in CI)
```

## Registry hosting

The full component catalog is served as static JSON from `public/`:

- `public/registry.json` — the registry index
- `public/r/<name>.json` — one shadcn `registry-item` per component / block / `utils` / `theme`

→ live at `https://aniui.dev/registry.json` and `https://aniui.dev/r/<name>.json`.

**These files are generated — do not edit them by hand.** The generator lives in the CLI package and reads the single source of truth (`cli/src/registry.ts` + `cli/src/block-registry.ts`):

```bash
# from the repo root
npm run registry:build      # → writes docs/public/registry.json + docs/public/r/*.json
```

CI fails if the committed registry is out of date (see `.github/workflows/ci.yml` → `registry-drift`). After changing any component, re-run `registry:build` and commit the result.

Consumer usage (shadcn CLI + React Native Reusables CLI) is documented at [aniui.dev/docs/shadcn-registry](https://aniui.dev/docs/shadcn-registry).

## Structure

- `app/` — routes (App Router). `app/docs/**` guides + per-component pages, `app/sitemap.ts`, `app/robots.ts`.
- `components/` — web-adapted preview components for the docs.
- `lib/` — `nav-data.ts` (nav source of truth), `constants.ts`.
- `public/` — static assets, `llms.txt`, and the generated registry.
