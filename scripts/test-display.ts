import { type Browser, type Page, chromium } from "playwright";

const testDisplay = async (): Promise<void> => {
  let browser: Browser | null = null;

  try {
    console.log("Starting display test...");

    browser = await chromium.launch({
      headless: true,
    });

    const page: Page = await browser.newPage();

    // Test if we can create a page and set viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    // Navigate to a simple data URL to test rendering
    await page.goto("data:text/html,<h1>Display Test Successful</h1>");

    // Take a screenshot to verify rendering works
    const screenshot = await page.screenshot();

    if (screenshot && screenshot.length > 0) {
      console.log("✅ Display test passed - screenshot captured successfully");
      console.log(`   Screenshot size: ${screenshot.length} bytes`);
    } else {
      throw new Error("Screenshot failed");
    }
  } catch (error) {
    console.error("❌ Display test failed:", error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

testDisplay();
