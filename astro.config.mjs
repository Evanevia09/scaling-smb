import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://scalingsmb.com",
  vite: {
    plugins: [tailwindcss()],
  },
});
