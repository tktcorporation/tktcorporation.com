/**
 * Purpose:
 * Verify search-visible production HTML without JavaScript and metadata after SPA navigation.
 */

import { test, expect } from "./fixtures";

// Read the production response itself: a browser rendering an SPA would hide
// missing body content and GitHub Pages' 404 fallback from these checks.
for (const route of [
  { path: "/", heading: "tktcorporation", text: "Web Application Developer" },
  { path: "/resume/", heading: "Resume", text: "Professional Experience" },
  { path: "/technologies/", heading: "Activities", text: "Activity Overview" },
]) {
  test(`${route.path} は JavaScript なしで本文と固有のメタデータを配信する`, async ({
    browser,
    request,
  }) => {
    const response = await request.get(route.path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).not.toContain('<div id="root"></div>');
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(new URL(route.path, "http://localhost:5175").href);
    await expect(
      page.getByRole("heading", { name: route.heading, exact: true })
    ).toBeVisible();
    await expect(page.locator("main")).toContainText(route.text);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://tktcorporation.com${route.path}`
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      `https://tktcorporation.com${route.path}`
    );
    if (route.path === "/resume/") {
      await expect(
        page.locator('ol[aria-label*="Work experience"] h3').first()
      ).toBeVisible();
    }
    await context.close();
  });
}

test("サイトマップは静的ページを列挙し robots.txt から発見できる", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toMatch(
    /^Sitemap: https:\/\/tktcorporation.com\/sitemap.xml$/m
  );
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml).toContain("https://tktcorporation.com/resume/");
  expect(xml).toContain("https://tktcorporation.com/technologies/");
  expect(xml).not.toContain("resume.md");
});

test("クライアント遷移と戻る操作でもメタデータが画面に一致する", async ({
  page,
}) => {
  await page.goto("http://localhost:5175/");
  await page.getByRole("link", { name: "Resume", exact: true }).click();
  await expect(page).toHaveTitle("Resume - tkt | Professional Experience");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://tktcorporation.com/resume/"
  );
  await page.goBack();
  await expect(page).toHaveTitle("tkt - Web Application Developer");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://tktcorporation.com/"
  );
});
