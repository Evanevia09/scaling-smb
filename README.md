# Scaling SMB

Marketing site for Scaling SMB — local SEO, websites, web apps, and AI automation for small and medium businesses. Built with **Astro 6** and **React** islands, deployed to **Cloudflare Pages**.

## Features

- **Landing page** — Hero, services, process, CTA band, portfolio, and contact / book-now section
- **Blog** — Markdown posts with categories, pagination, SEO-friendly URLs, and CTAs to `#contact`
- **Consultation calendar** — React booking UI (date → time → details) with blocked time slots
- **Booking API** — REST layer in `src/lib/booking/` + Cloudflare Pages Functions (`functions/api/booking/`), ready for D1/KV and notifications
- **WhatsApp FAB** — Floating click-to-chat button

## Tech stack

- [Astro](https://astro.build/) 6 (static output)
- [React](https://react.dev/) 19 (`@astrojs/react` islands)
- Content collections for blog (`src/content/blog/`)
- Cloudflare Pages + [Wrangler](https://developers.cloudflare.com/workers/wrangler/)

## Requirements

- **Node.js** ≥ 22.12.0

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:4321/](http://localhost:4321/). The calendar uses the booking API when it is reachable; otherwise it falls back to a `mailto:` handoff.

### Test the booking API locally

Pages Functions are not served by `astro dev`. Use:

```bash
npm run dev:pages
```

This builds the site and runs `wrangler pages dev dist` so `/api/booking/*` works alongside the static app.

## Build & preview

```bash
npm run build
npm run preview
```

## Environment variables

Copy `.env.example` to `.env` for local overrides:

| Variable | Description |
|----------|-------------|
| `SITE` | Production URL for canonicals and Open Graph (e.g. `https://scalingsmb.com`) |
| `PUBLIC_WHATSAPP_LINK` | Optional WhatsApp deep link override |
| `PUBLIC_BOOKING_API_BASE` | Booking API base path (default `/api/booking`) |
| `PUBLIC_BOOKING_API_ENABLED` | Set to `false` to disable API calls and use `mailto` only |

In Cloudflare Pages → **Settings** → **Environment variables**, set the same keys for Production (and Preview if needed).

## Project structure

```
src/
  content/          # site.ts copy + blog markdown
  content.config.ts # blog collection schema
  components/
    landing/        # landing sections + ConsultationBooking.astro
    react/          # ConsultationScheduler, HeroDashboard
  lib/booking/      # API types, handlers, client, store
  pages/            # index.astro, blog/*
  styles/global.css
functions/
  api/booking/      # Cloudflare Pages Function (production API)
docs/
  BOOKING_API.md    # endpoint reference + Cloudflare wiring
public/
  _redirects        # /blog → /blog/ 301
```

## Content

- **Site copy** — `src/content/site.ts` (nav, services, contact, scheduling, blocked time slots)
- **Blog posts** — `src/content/blog/*.md` (frontmatter: title, description, category, date, etc.)

## Booking API

Endpoints (see [docs/BOOKING_API.md](docs/BOOKING_API.md)):

- `GET /api/booking/config`
- `GET /api/booking/availability?date=YYYY-MM-DD`
- `GET /api/booking/availability/month?year=&month=`
- `POST /api/booking`

Bookings are stored in an in-memory store until you wire **D1** or **KV** (see commented bindings in `wrangler.jsonc`).

## Deploy to Cloudflare Pages

### Option A — Connect Git (recommended)

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Select this repository
3. Build settings:
   - **Framework preset:** Astro (or None)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** `22` (or `NODE_VERSION` = `22`)
4. Environment variables (Production):
   - `SITE` = your live URL
   - `PUBLIC_BOOKING_API_BASE` = `/api/booking` (optional; default)
   - `PUBLIC_WHATSAPP_LINK` = optional
5. Deploy. Custom domains: **Pages project → Custom domains**

The `functions/` directory is deployed automatically with the Pages project so the booking API is available at `/api/booking/*`.

### Option B — Wrangler CLI

```bash
npm run build
npx wrangler pages deploy dist --project-name=scaling-smb
```

Log in first: `npx wrangler login`.

## WhatsApp floating button

Opens WhatsApp click-to-chat for **+853 6275 0705** by default (`https://wa.me/85362750705`), matching `contact` in `src/content/site.ts`. Override with `PUBLIC_WHATSAPP_LINK`.

## SEO

Set `SITE` so canonical and Open Graph URLs resolve correctly (`astro.config.mjs` falls back to `https://scaling-smb.pages.dev` if unset).

Blog uses trailing slashes (`trailingSlash: 'always'` in `astro.config.mjs`). `public/_redirects` normalizes `/blog` → `/blog/`.
