import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://scaling-smb.netlify.app",
  vite: {
    plugins: [tailwindcss()],
  },
});
