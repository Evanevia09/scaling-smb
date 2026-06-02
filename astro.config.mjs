// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// Set SITE in Cloudflare Pages env vars (or .env) to your production URL for canonicals/OG.
export default defineConfig({
  site: process.env.SITE ?? 'https://scaling-smb.pages.dev',
  output: 'static',
  integrations: [react()],
  vite: {
    // Ensure the React SSR entry resolves with a proper default export in dev/build.
    // Without this, Vite can externalize @astrojs/react in a way that drops the renderer
    // from the pipeline and triggers NoMatchingRenderer for .tsx islands.
    ssr: {
      noExternal: ['@astrojs/react'],
    },
  },
});