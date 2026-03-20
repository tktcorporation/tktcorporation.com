/**
 * Purpose:
 * プルリクエスト用のスクリーンショットを自動生成する。
 * ビルド済みのアプリケーションを起動してPlaywrightで
 * キャプチャし、PRレビューで視覚的な確認を可能にする。
 *
 * Context:
 * - CI/CDパイプラインでのPRプレビュー生成
 * - Vite preview でビルド成果物を配信
 * - Playwrightによる高品質なスクリーンショット生成
 * - エラーハンドリングと適切なリソースクリーンアップ
 */

import path from "node:path";
import { fileURLToPath } from "node:url";

import { type Browser, chromium, type Page } from "playwright";
import { preview } from "vite-plus";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const output = path.join(__dirname, "..", "pr-screenshot.jpg");

const takeScreenshot = async (): Promise<void> => {
  let browser: Browser | null = null;
  let server: Awaited<ReturnType<typeof preview>> | null = null;

  try {
    server = await preview({ preview: { port: 3000, strictPort: true } });
    const address = server.resolvedUrls?.local?.[0] ?? "http://localhost:3000";
    console.log(`Server started on ${address}`);

    browser = await chromium.launch();
    const page: Page = await browser.newPage();

    await page.goto(address);
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
    if (server) {
      await server.close();
    }
  }
};

takeScreenshot();
