import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 15 * 1000,
  expect: {
    timeout: 3000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    actionTimeout: 0,
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    },
  },

  projects: [
    {
      name: "chromium",
      testIgnore: "**/resume-files.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "production-exports",
      testMatch: "**/resume-files.spec.ts",
      use: { baseURL: "http://localhost:5175" },
    },
  ],

  webServer: [
    {
      command: "npm run dev",
      port: 5173,
      reuseExistingServer: !process.env.CI,
      timeout: 30 * 1000,
    },
    {
      command: "npm run build && npm run preview -- --port 5175",
      port: 5175,
      reuseExistingServer: !process.env.CI,
      timeout: 30000,
    },
  ],
});
