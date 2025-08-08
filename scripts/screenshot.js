import httpServer from "http-server";
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, "..", "dist");
const output = path.join(__dirname, "..", "pr-screenshot.jpg");

const server = httpServer.createServer({ root: outDir });

server.listen(3000, async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.screenshot({
    path: output,
    type: "jpeg",
    quality: 60,
    fullPage: true,
  });
  await browser.close();
  server.close();
});
