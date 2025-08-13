import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "copy-404",
      closeBundle() {
        // Copy 404.html to dist after build
        copyFileSync(
          resolve(__dirname, "public/404.html"),
          resolve(__dirname, "dist/404.html")
        );
      },
    },
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
  },
  build: {
    target: "baseline-widely-available",
    outDir: "dist",
    assetsDir: "assets",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: "index.html",
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          icons: [
            "react-icons",
            "@icons-pack/react-simple-icons",
            "lucide-react",
          ],
        },
      },
    },
  },
});
