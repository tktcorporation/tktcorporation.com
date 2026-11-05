/**
 * Purpose:
 * Keep application E2E tests independent of third-party analytics and icon CDN
 * availability while retaining checks for errors in the application itself.
 */
import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route("https://cdn.jsdelivr.net/**", (route) =>
      route.fulfill({ contentType: "text/css", body: "" })
    );
    await page.route("https://www.googletagmanager.com/**", (route) =>
      route.fulfill({ contentType: "application/javascript", body: "" })
    );
    await page.route("https://www.google-analytics.com/**", (route) =>
      route.fulfill({ status: 204, body: "" })
    );
    await use(page);
  },
});
export { expect };
