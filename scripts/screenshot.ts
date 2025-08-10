import path from "node:path";
import { fileURLToPath } from "node:url";
import httpServer from "http-server";
import { type Browser, chromium, type Page } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, "..", "dist");
const output = path.join(__dirname, "..", "pr-screenshot.jpg");

const server = httpServer.createServer({ root: outDir });

const takeScreenshot = async (): Promise<void> => {
  let browser: Browser | null = null;

  try {
    await new Promise<void>((resolve) => {
      server.listen(3000, () => {
        console.log("Server started on http://localhost:3000");
        resolve();
      });
    });

    browser = await chromium.launch();
    const page: Page = await browser.newPage();

    await page.goto("http://localhost:3000");
    await page.setViewportSize({ width: 1024, height: 768 });

    await page.screenshot({
      path: output,
      type: "jpeg",
      quality: 60,
      fullPage: true,
    });

    console.log(`Screenshot saved to ${output}`);
  } catch (error) {
    console.error("Error taking screenshot:", error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
    server.close();
  }
};

takeScreenshot();
