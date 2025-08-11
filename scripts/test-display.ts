/**
 * Purpose:
 * Playwrightの表示機能とスクリーンショット機能をテストする。
 * CI環境でPlaywrightが正常に動作することを確認し、
 * ヘッドレスブラウザ環境の健全性を検証する。
 *
 * Context:
 * - CI/CDパイプラインでの環境チェック
 * - スクリーンショット機能の動作確認
 * - エラー時の詳細なトラブルシューティング情報の提供
 */

import { type Browser, chromium, type Page } from "playwright";

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
