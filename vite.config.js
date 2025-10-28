import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
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
    {
      name: "generate-resume-exports",
      async closeBundle() {
        try {
          // Import utilities dynamically (ESM modules)
          const { generateResumeMarkdown } = await import(
            "./src/utils/exportResumeMarkdown.ts"
          );
          const { markdownToPlainText } = await import(
            "./src/utils/exportResumeText.ts"
          );
          const { generateResumeJson } = await import(
            "./src/utils/exportResumeJson.ts"
          );

          // Read experiences data
          const experiencesPath = resolve(
            __dirname,
            "src/data/experiences.json"
          );
          const experiencesData = JSON.parse(
            readFileSync(experiencesPath, "utf-8")
          );
          const experiences = experiencesData.experience_list;

          // Note: Skills calculation requires devicon data which uses JSON imports
          // not supported in Node.js build environment.
          // Skills will be calculated at runtime in the browser instead.
          const skills = [];

          // Generate Markdown export
          const markdownContent = generateResumeMarkdown(experiences, skills);
          writeFileSync(
            resolve(__dirname, "dist/resume.md"),
            markdownContent,
            "utf-8"
          );
          console.log("✓ Generated dist/resume.md");

          // Generate plain text export
          const textContent = markdownToPlainText(markdownContent);
          writeFileSync(
            resolve(__dirname, "dist/resume.txt"),
            textContent,
            "utf-8"
          );
          console.log("✓ Generated dist/resume.txt");

          // Generate JSON export
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
