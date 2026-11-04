/**
 * Purpose:
 * Verify the current resume export contracts: rendered Markdown in development,
 * readable plain text/JSON, and raw downloadable files in the production build.
 * External analytics and CDN availability are isolated by the shared fixture.
 */
import { test, expect } from "./fixtures";

const rawRoutes = [
  { path: "/resume.txt", format: "Plain Text" },
  { path: "/resume.json", format: "JSON" },
];

for (const route of rawRoutes) {
  test(`${route.format} export is readable plain text`, async ({ page }) => {
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);
    const pre = page.locator("pre");
    await expect(pre).toBeVisible();
    await expect(pre).not.toBeEmpty();
    expect((await pre.textContent())!.length).toBeGreaterThan(100);
    expect(await pre.evaluate((el) => getComputedStyle(el).whiteSpace)).toBe(
      "pre-wrap"
    );
    expect(await pre.evaluate((el) => getComputedStyle(el).wordWrap)).toBe(
      "break-word"
    );
    await expect(pre.locator("*")).toHaveCount(0);
    await expect(page.getByRole("button")).toHaveCount(0);
  });
}

test("Markdown export renders resume headings and content", async ({
  page,
}) => {
  const response = await page.goto("/resume.md");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { name: "Professional Resume", exact: true })
  ).toBeVisible();
  for (const name of [
    "Summary",
    "Skills & Technologies",
    "Professional Experience",
    "Career Timeline",
  ]) {
    await expect(
      page.getByRole("heading", { name, exact: true })
    ).toBeVisible();
  }
  await expect(page.locator(".prose")).toContainText("TypeScript");
  await expect(page.locator("pre")).toHaveCount(0);
  await expect(page.getByRole("button")).toHaveCount(0);
});

test("JSON export has metadata, skills, experiences and statistics", async ({
  page,
}) => {
  await page.goto("/resume.json");
  const pre = page.locator("pre");
  await expect(pre).not.toBeEmpty();
  const data = JSON.parse((await pre.textContent())!);
  expect(data.metadata.format_version).toBe("1.0");
  expect(Number.isNaN(Date.parse(data.metadata.generated_at))).toBe(false);
  expect(Array.isArray(data.skills)).toBe(true);
  expect(data.skills.length).toBeGreaterThan(0);
  expect(data.experiences.length).toBeGreaterThan(0);
  expect(data.statistics.total_positions).toBe(data.experiences.length);
  expect(data.statistics.total_companies).toBeGreaterThan(0);
});

test("Plain text export contains the resume sections and wraps lines", async ({
  page,
}) => {
  await page.goto("/resume.txt");
  const pre = page.locator("pre");
  await expect(pre).not.toBeEmpty();
  const content = (await pre.textContent())!;
  for (const heading of [
    "PROFESSIONAL RESUME",
    "SUMMARY",
    "SKILLS & TECHNOLOGIES",
    "PROFESSIONAL EXPERIENCE",
    "CAREER TIMELINE",
  ]) {
    expect(content).toContain(heading);
  }
  const lines = content
    .split("\n")
    .filter((line) => line.trim() && !/^[=-]{3,}$/.test(line));
  expect(lines.filter((line) => line.length > 82).length).toBeLessThan(
    lines.length * 0.1
  );
});

for (const path of ["/resume.md", "/resume.txt", "/resume.json"]) {
  test(`${path} loads without JavaScript errors`, async ({ page }) => {
    const errors: Error[] = [];
    page.on("pageerror", (error) => errors.push(error));
    await page.goto(path);
    if (path.endsWith(".md")) {
      await expect(
        page.getByRole("heading", { name: "Professional Resume", exact: true })
      ).toBeVisible();
    } else {
      await expect(page.locator("pre")).not.toBeEmpty();
    }
    expect(errors).toHaveLength(0);
  });
}
