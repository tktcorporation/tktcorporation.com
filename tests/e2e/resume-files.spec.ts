/**
 * Purpose:
 * Verify production exports as HTTP responses for clients that do not run React.
 * These checks complement the development page tests with raw file contracts.
 */
import { test, expect } from "@playwright/test";

for (const extension of ["md", "txt", "json"]) {
  test(`production resume.${extension} is a raw downloadable export`, async ({
    request,
  }) => {
    const response = await request.get(`/resume.${extension}`);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).not.toContain("text/html");
    const body = await response.text();
    expect(body.length).toBeGreaterThan(100);
    expect(body).not.toContain('<div id="root">');
    if (extension === "json") {
      const data = JSON.parse(body);
      expect(data.metadata.format_version).toBe("1.0");
      expect(data.experiences.length).toBeGreaterThan(0);
      expect(data.statistics.total_positions).toBe(data.experiences.length);
    } else if (extension === "md") {
      expect(body).toMatch(/^---\n[\s\S]*?---\n/);
      expect(body).toContain("# Professional Resume");
    } else {
      expect(body).toContain("PROFESSIONAL RESUME");
    }
  });
}
