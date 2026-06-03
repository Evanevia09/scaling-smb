// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Set SITE in Cloudflare Pages env vars (or .env) to your production URL for canonicals/OG/sitemap.
export default defineConfig({
  site: process.env.SITE ?? 'https://scalingsmb.com',
  // Static site; `/api/booking/*` is served via `functions/` on Cloudflare (see docs/BOOKING_API.md).
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/api/'),
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (path === '/') {
          item.priority = 1;
          item.changefreq = 'weekly';
        } else if (path.startsWith('/blog/')) {
          item.priority = path === '/blog/' ? 0.85 : 0.75;
          item.changefreq = 'weekly';
        }
        return item;
      },
    }),
  ],
  vite: {
    // Ensure the React SSR entry resolves with a proper default export in dev/build.
    // Without this, Vite can externalize @astrojs/react in a way that drops the renderer
    // from the pipeline and triggers NoMatchingRenderer for .tsx islands.
    ssr: {
      noExternal: ['@astrojs/react'],
    },
  },
});