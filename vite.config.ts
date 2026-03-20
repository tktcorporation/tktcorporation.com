/**
 * Purpose:
 * Unified Vite+ configuration for dev server, build, lint (Oxlint),
 * format (Oxfmt), and test (Vitest) in a single file.
 *
 * Context:
 * Uses vite-plus (https://github.com/voidzero-dev/vite-plus) to unify dev server,
 * build, lint (oxlint), format (oxfmt), and test (vitest) configuration.
 */

import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

// Node.js 21+ provides import.meta.dirname as ESM-compatible __dirname replacement
const __dirname = import.meta.dirname;

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "copy-404",
      closeBundle() {
        copyFileSync(
          resolve(__dirname, "public/404.html"),
          resolve(__dirname, "dist/404.html")
        );
      },
    },
    {
      name: "generate-resume-exports",
      async closeBundle() {
        try {
          const { generateResumeMarkdown } =
            await import("./src/utils/exportResumeMarkdown.ts");
          const { markdownToPlainText } =
            await import("./src/utils/exportResumeText.ts");
          const { generateResumeJson } =
            await import("./src/utils/exportResumeJson.ts");

          const experiencesPath = resolve(
            __dirname,
            "src/data/experiences.json"
          );
          const experiencesData = JSON.parse(
            readFileSync(experiencesPath, "utf-8")
          );
          const experiences = experiencesData.experience_list;

          const skills: unknown[] = [];

          const markdownContent = generateResumeMarkdown(experiences, skills);
          writeFileSync(
            resolve(__dirname, "dist/resume.md"),
            markdownContent,
            "utf-8"
          );
          console.log("✓ Generated dist/resume.md");

          const textContent = markdownToPlainText(markdownContent);
          writeFileSync(
            resolve(__dirname, "dist/resume.txt"),
            textContent,
            "utf-8"
          );
          console.log("✓ Generated dist/resume.txt");

          const jsonContent = generateResumeJson(experiences, skills);
          writeFileSync(
            resolve(__dirname, "dist/resume.json"),
            jsonContent,
            "utf-8"
          );
          console.log("✓ Generated dist/resume.json");
        } catch (error) {
          console.error("Error generating resume exports:", error);
          throw error;
        }
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
        // Rolldown requires manualChunks as a function (not an object like Rollup)
        manualChunks(id: string) {
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router-dom/")
          ) {
            return "vendor";
          }
          if (
            id.includes("node_modules/react-icons/") ||
            id.includes("node_modules/@icons-pack/react-simple-icons/") ||
            id.includes("node_modules/lucide-react/")
          ) {
            return "icons";
          }
        },
      },
    },
  },

  // Vitest configuration (replaces vitest.config.ts)
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./tests/setup.ts",
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/*.spec.js",
      "**/tests/e2e/**",
      "**/*.e2e.ts",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "tests/",
        "dist/",
        "**/*.config.{js,ts}",
        "**/*.d.ts",
      ],
    },
  },

  // Oxlint configuration
  lint: {
    ignorePatterns: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
      "playwright-report/**",
      "build/**",
    ],
  },

  // Oxfmt configuration
  fmt: {
    printWidth: 80,
    semi: true,
    singleQuote: false,
    trailingComma: "es5" as const,
    arrowParens: "always" as const,
    bracketSpacing: true,
    bracketSameLine: false,
    endOfLine: "lf" as const,
    tabWidth: 2,
    ignorePatterns: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
      "playwright-report/**",
      "build/**",
    ],
    sortImports: {},
    sortTailwindcss: {
      functions: ["clsx", "cn", "cva"],
    },
  },
});
