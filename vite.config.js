import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { copyFileSync } from "fs";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-404",
      closeBundle() {
        // Copy 404.html to dist after build
        copyFileSync(
          resolve(__dirname, "public/404.html"),
          resolve(__dirname, "dist/404.html"),
        );
      },
    },
  ],
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
