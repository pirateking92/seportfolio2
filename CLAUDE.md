# CLAUDE.md

Guidance for working in this repo. Keep this file updated as the project evolves.

## What this is

Portfolio site for **Sepy Baghaei** (theatre director/playwright, London). Live at
https://sepybaghaei.co.uk/. It's a **Next.js 15 (App Router) + TypeScript + Tailwind**
frontend backed by a **headless WordPress CMS** (`https://cms.sepybaghaei.co.uk`) queried
over **GraphQL via Apollo Client**. Sepy edits content in WordPress; the site pulls it at
build time.

## Commands

- `npm run dev` — local dev server (fonts/CSS render correctly here; note prod builds can
  differ from dev, see gotchas).
- `npm run build` — production build. Fetches page content from the WordPress GraphQL API
  **and** downloads Google Fonts at build time, so the build needs network access to both.
- `npm run start` — serve the production build.
- `npm run lint` — Next/ESLint.

## Deploy

- Hosted on **Vercel**.
- **Node.js:** pinned via `engines.node` (`">=24.0.0"`) in `package.json`, which overrides
  Vercel's Project Settings and deploys on Node 24.x (20.x is deprecated on Vercel). The range
  form (not `"24.x"`) avoids `EBADENGINE` warnings for local Node > 24.
- Content is fetched at build time, so new WordPress content only appears after a rebuild.
  A **daily cron job** (external cron-job.org hitting a Vercel deploy hook) triggers a
  rebuild to pick up CMS changes. (A previous GitHub Action approach was removed — see
  commit `ce915db`.) If content looks stale, a rebuild is the fix.

## Architecture / key files

- `src/app/layout.tsx` — root layout. Defines fonts via `next/font/google`, wraps the app
  in `LenisScrollProvider` (smooth scroll), renders `Navbar` / `main` / `Footer`, and
  preloads the first production image.
- `src/app/page.tsx` — home page. Server component; fetches the production list from
  WordPress and renders `CarouselClient` (Embla autoplay carousel of production images).
- `src/app/productions/[...uri]/page.tsx` — individual production pages (dynamic catch-all).
- `src/app/{about,contact,cv}/` — static-ish routes.
- **CV page:** the WordPress CV is free-form `<p>` HTML. `src/lib/parseCV.ts` (run
  server-side in `src/app/cv/page.tsx`) turns it into sections → year subheadings → rows of
  cells, which `CVPage.tsx` lays out as a 3-column grid (title | writer/adapter/role | venue;
  2-cell rows span the last two columns; stacks on mobile). It relies on the CMS conventions:
  bold all-caps headings, bare-year paragraphs, `<strong>Title.</strong> Credit. Venue.`
  rows, `–`-separated education rows, and awards ending in a year. Unrecognised lines fall
  back to a full-width row, so nothing is dropped — tweak the parser if Sepy's formatting changes.
- `src/lib/queries.ts` — GraphQL queries (e.g. `GET_PAGE_IMAGE_AND_CONTENT`).
- `apollo-client.ts` (repo root) — Apollo client pointed at the WordPress GraphQL endpoint.
- `src/components/` — UI. `ui/` holds shadcn-style primitives (carousel, etc.).
- Content from WordPress is injected via `dangerouslySetInnerHTML` (e.g. `PageContent.tsx`,
  `AboutSection.tsx`) and styled with Tailwind Typography (`prose`).

## Fonts (read before touching font code)

Two Google fonts via `next/font/google` in `layout.tsx`:

- **Heading:** `Indie_Flower` → CSS var `--font-headingFont` → Tailwind class `font-headingFont`.
- **Body:** `Alegreya` → CSS var **`--font-bodyfont`** (lowercase `f`!) → Tailwind class `font-bodyFont`.

Defaults are set in `src/app/globals.css`: `body` = body font, `h1–h6` = heading font.
Some headings (page titles, About title, a nav item) intentionally override the default
heading font with the **body** font by adding the `font-bodyFont` class.

⚠️ **Variable-name gotcha:** the next/font variable is `--font-bodyfont` (lowercase), and
`tailwind.config.ts` must reference that exact name. A previous bug had the Tailwind
`bodyFont` family pointing at `var(--font-bodyFont)` (capital `F`, undefined), so
`font-bodyFont` only rendered correctly by accidental CSS inheritance — fine in `next dev`
but falling back to the browser's stock font (`Inter`, from Flowbite's preflight) in
production. Fixed by matching the name and adding explicit fallbacks in `tailwind.config.ts`
(`bodyFont: ["var(--font-bodyfont)", "serif"]`, `headingFont: [..., "cursive"]`). Keep the
next/font `variable:` names and the `tailwind.config.ts` `fontFamily` entries in sync.

Note: `flowbite/dist/flowbite.css` is imported in `layout.tsx` and ships its own Tailwind
preflight that sets `html { font-family: Inter, ... }` — this is the "stock" fallback you'll
see if a font variable is undefined. It also ships its own copies of standard Tailwind
utilities (e.g. `lg:text-xl`) that load **after** ours, so they override same-breakpoint
utilities like `lg:leading-*`. If a size/leading combo doesn't apply, use arbitrary values
Flowbite doesn't define, e.g. `lg:text-[20px]/[1.75]` (see `AboutSection.tsx`).

### ⚠️ Production "stock font" bug = stale Vercel build cache (NOT a CSS bug)

Symptom: the deployed site renders everything in Inter/system-ui even though `next dev` and
a clean `npm run build` look correct. Root cause is a **next/font class-hash desync from a
stale Vercel build cache**: `next/font` names its CSS-variable class with a content hash
(e.g. `.__variable_c3bae4{--font-bodyfont:...}`) and stamps the same hash onto `<html>`'s
`className`. With a stale build cache, the prerendered HTML keeps an OLD hash
(`__variable_95d655`) while the CSS is regenerated with a NEW one (`__variable_c3bae4`). The
applied class then defines nothing, `var(--font-bodyfont)` is undefined, the `body`
font-family declaration becomes invalid, and body inherits `html`'s Inter → whole site looks
"stock". The daily cron rebuild reuses Vercel's cache, so it stays broken across rebuilds.

How to confirm: compare the `__variable_*` classes on `<html>` in the served HTML against the
`.__variable_*{--font-*:...}` definitions in the served `/_next/static/css/*.css`. If they
don't match, it's this bug. (A clean local `rm -rf .next && npm run build` always produces
matching hashes.)

Fix:
1. **Immediate:** Vercel → Deployments → latest → ⋯ → **Redeploy** with **"Use existing Build
   Cache" UNCHECKED**. Clean build → matching hashes → fonts fixed.
2. **Prevent recurrence** (so the daily cron rebuild stays clean): set the project env var
   **`VERCEL_FORCE_NO_BUILD_CACHE=1`** (Production). Slightly slower builds; fine for this site.

## Layout / mobile background

The dark gradient (`bg-black-to-navy`, defined as a utility in `globals.css`) is on `<body>`
with `bg-fixed` + `min-h-dvh`. `<html>` has `background-color: #000` so mobile overscroll and
dynamic-address-bar gaps never expose the white browser canvas below the fixed gradient. If
you see a white strip at the bottom on mobile again, check that the `html` background is still
present and that heights use `dvh` (not `vh`/`min-h-screen`) — `background-attachment: fixed`
plus `100vh` is the usual culprit.

## Conventions

- Path alias `@/` → `src/` (see `tsconfig.json`).
- `next.config.js` uses `trailingSlash: true` and whitelists remote image hosts
  (`cms.sepybaghaei.co.uk`, `secure.gravatar.com`) — add new image hosts there.
- Tailwind config is `tailwind.config.ts`; global CSS + CSS vars (shadcn tokens, gradient
  utility, font defaults) live in `src/app/globals.css`.
