const httpServer = require("http-server");
const { chromium } = require("playwright");
const path = require("path");

const outDir = path.join(__dirname, "..", "out");
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
