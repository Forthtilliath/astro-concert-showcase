import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: process.env.CI
    ? "https://cda-showcase.vercel.app"
    : "http://localhost:4321",
  integrations: [react(), tailwind()],
});
