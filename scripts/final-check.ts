/**
 * Purpose:
 * 最終確認用のスクリーンショットスクリプト。
 */

import { chromium } from "playwright";

async function finalCheck() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("http://localhost:5173/technologies");
  await page.waitForTimeout(2000);

  await page.screenshot({
    path: "technologies-final.png",
    fullPage: true,
  });

  console.log("Final screenshot saved to technologies-final.png");

  await browser.close();
}

finalCheck().catch(console.error);
