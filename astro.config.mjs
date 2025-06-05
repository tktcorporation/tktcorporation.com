import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [tailwind()],
  server: {
    host: "0.0.0.0",
  },
});
