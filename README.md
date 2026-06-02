# Scaling SMB — Astro marketing site

Static Astro site deployed to **Cloudflare Pages** (`dist/` output).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Set your production URL for SEO metadata:

```bash
# .env (local) or Cloudflare Pages → Settings → Environment variables
SITE=https://your-domain.com
```

## Deploy to Cloudflare Pages

### Option A — Connect Git (recommended)

1. In [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select this repository.
3. Build settings:
   - **Framework preset:** Astro (or None)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** `22` (or add variable `NODE_VERSION` = `22`)
4. Environment variables (Production):
   - `SITE` = your live URL (e.g. `https://scalingsmb.com`)
   - `PUBLIC_WHATSAPP_LINK` = optional WhatsApp deep link override
5. Save and deploy. Custom domains: **Pages project → Custom domains**.

### Option B — Wrangler CLI

```bash
npm run build
npx wrangler pages deploy dist --project-name=scaling-smb
```

Requires [Wrangler](https://developers.cloudflare.com/workers/wrangler/) logged in (`npx wrangler login`).

## WhatsApp floating button

Opens WhatsApp click-to-chat for **+853 6275 0705** by default (`https://wa.me/85362750705`), matching `contact` in `src/content/site.ts`.

Override with **`PUBLIC_WHATSAPP_LINK`** in Cloudflare Pages environment variables or a local `.env`.

## Site URL / SEO

Update the `SITE` environment variable (or `site` fallback in `astro.config.mjs`) so canonical and Open Graph URLs resolve correctly.

## Content

Marketing copy lives in `src/content/site.ts`. The site is a single-page landing layout with sections for services, process, portfolio, and contact.

The home hero dashboard is a React island: [`src/components/react/HeroDashboard.tsx`](src/components/react/HeroDashboard.tsx).

Consultation booking uses a **mailto** handoff from [`ConsultationScheduler.tsx`](src/components/react/ConsultationScheduler.tsx) (no server-side form handler required on Cloudflare Pages).
