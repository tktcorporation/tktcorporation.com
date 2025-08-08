import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: "index.html",
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
