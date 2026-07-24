
## Heads up before we start

The Lovable preview/publish pipeline in this workspace is built around TanStack Start (see `vite.config.ts` using `@lovable.dev/vite-tanstack-config`, `src/server.ts`, `src/routeTree.gen.ts`). Removing those pieces is exactly what you asked for and will produce a clean static `dist/` you can drop on cPanel, but the in-Lovable live preview and one-click publish may stop working after the migration since they expect the TanStack Start entry. Local `bun run dev` / `bun run build` / `bun run preview` and any external host (cPanel, Netlify, etc.) will work normally. If that trade-off is not acceptable, tell me and I'll adjust.

## Goal

Replace the current TanStack Start + Cloudflare Worker setup with a pure client-side React 19 + Vite 7 + TS SPA using `react-router-dom`, Tailwind v4, and existing shadcn/ui primitives. No SSR, no server functions, no Supabase, no Worker code. Visual design and content stay identical.

## 1. Remove TanStack / SSR / Worker surface

Delete files:
- `src/server.ts`, `src/start.ts`, `src/router.tsx`, `src/routeTree.gen.ts`
- `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routes/sitemap[.]xml.ts`, `src/routes/README.md` (route content ported to new SPA files below; sitemap becomes a static `public/sitemap.xml`)
- `src/lib/error-capture.ts`, `src/lib/error-page.ts`, `src/lib/lovable-error-reporting.ts`
- `vite.config.ts` (replaced), any `wrangler.jsonc` / `.wrangler/` if present
- `src/integrations/**` and `supabase/` if present (none in tree, but the cleanup step will `rm -rf` them defensively)

Uninstall (via `bun remove`):
`@tanstack/react-router`, `@tanstack/react-start`, `@tanstack/react-query`, `@tanstack/router-plugin`, `@tailwindcss/vite` (kept — see note), `@lovable.dev/vite-tanstack-config`, `nitro`, `vite-tsconfig-paths` (replaced by manual alias).

Note: keep `@tailwindcss/vite` and `tailwindcss@4` — those are the Tailwind v4 pieces you asked for. Also keep all `@radix-ui/*`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css`, `sonner`, `zod`, `react-hook-form`, `@hookform/resolvers` since shadcn/ui and the current UI use them.

## 2. Add SPA dependencies

`bun add react-router-dom@6 react-helmet-async`
`bun add -d @playwright/test`

React 19, `react-dom` 19, Vite 7 (currently on 8 — will pin to `vite@^7` per request), TypeScript, `@vitejs/plugin-react` are already present or will be pinned.

## 3. New build config

**`vite.config.ts`** (root):
- Plugins: `@vitejs/plugin-react`, `@tailwindcss/vite`.
- `resolve.alias`: `@` → `./src`.
- `build.outDir: 'dist'`, relative base `base: './'` so it works from any cPanel subdirectory.
- No SSR, no nitro, no cloudflare plugin.

**`index.html`** (new, project root):
- `<link>` tags for Playfair Display, Inter, JetBrains Mono (preconnect + stylesheet).
- Meta viewport, theme-color, default title/description.
- Conditional GA4 snippet gated on `import.meta.env.VITE_GA_ID` (inline module script that only injects the gtag tags if the env var exists).
- `<div id="root">` + `<script type="module" src="/src/main.tsx">`.

**`tsconfig.json`**: keep strict, adjust `paths` to `{ "@/*": ["./src/*"] }` (already set), drop `allowImportingTsExtensions` if it causes friction, remove references to server-only libs.

**`src/main.tsx`** (new): standard React 19 `createRoot` bootstrap wrapping `<HelmetProvider><BrowserRouter><App /></BrowserRouter></HelmetProvider>`.

**`src/App.tsx`** (new): declares routes with `react-router-dom`:
- `/` → `<HomePage />` (ported from current `src/routes/index.tsx`)
- `*` → `<NotFound />`

The home page currently uses hash sections (`#about`, `#services`, `#properties`), so a single route is sufficient. Nav links keep working with hash anchors + existing smooth-scroll logic.

## 4. Port existing route content

- Move the body of `src/routes/index.tsx` into `src/pages/Home.tsx`. Replace `createFileRoute` head metadata with `<Helmet>` tags (title, description, OG, Twitter, JSON-LD RealEstateAgent script). Keep every component, image import, filter state, modal, and IntersectionObserver hook exactly as-is.
- Move any global `<html>`/`<head>` bits from `__root.tsx` into `index.html` (favicon, theme-color, fonts) and app-level `<Helmet>` defaults into `src/App.tsx`.
- Replace `<Link to=... params=...>` (TanStack) with plain `<a href="#section">` for the nav (already hash-based) and `<Link to="/">` from `react-router-dom` where a real route link is needed.

## 5. SEO artifacts as static files

- `public/sitemap.xml` — static copy of the URLs the dynamic sitemap route was producing.
- `public/robots.txt` — already exists, verify it references the new sitemap URL.
- `public/.htaccess` — SPA fallback for cPanel Apache: rewrite unknown paths to `/index.html` so deep links work.

## 6. Styles

`src/styles.css` stays as-is (Tailwind v4 `@import "tailwindcss"`, `@theme inline`, brand tokens, `@utility` blocks). No content changes — only ensure it's imported once from `src/main.tsx`.

## 7. Scripts & tooling

`package.json` scripts become:
- `dev`: `vite`
- `build`: `tsc -b && vite build`
- `preview`: `vite preview`
- `lint`, `format`: unchanged

ESLint config: drop TanStack-specific `no-restricted-imports` rule about `server-only`; keep the rest.

## 8. Verification

1. `bun install` → `bun run build` produces `dist/` with `index.html` + hashed assets, no server bundle.
2. `bun run preview` — click through nav (About, Services, Properties Lagos/Abuja/Land), open a property modal, submit contact form UI.
3. Deploy `dist/` to a cPanel subfolder, confirm `.htaccess` SPA fallback handles refresh on `/#properties`.
4. Confirm no references remain to `@tanstack/*`, `createServerFn`, `supabase`, `process.env` (grep step at the end).

## Out of scope

- No visual redesign; palette, typography, layout, imagery unchanged.
- No new features; property data, contact form target (WhatsApp / mailto), and copy stay the same.
- No backend replacement — contact form remains a `mailto:` / WhatsApp link as it is today.
