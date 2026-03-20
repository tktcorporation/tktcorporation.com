/**
 * Purpose:
 * GA4 タグが index.html に正しく設置されていることを検証する。
 *
 * Context:
 * - GA4 は index.html にインラインで配置（Google 公式推奨の標準方式）。
 * - gtag.js の async script タグと dataLayer 初期化が両方存在することを保証する。
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const indexHtml = readFileSync(
  resolve(import.meta.dirname, "../../index.html"),
  "utf-8"
);

describe("GA4 タグ設置検証 (index.html)", () => {
  it("gtag.js の async script タグが含まれる", () => {
    expect(indexHtml).toContain("googletagmanager.com/gtag/js?id=G-TNFY35RTNP");
  });

  it("dataLayer の初期化スクリプトが含まれる", () => {
    expect(indexHtml).toContain("window.dataLayer = window.dataLayer || []");
  });

  it('gtag("config") 呼び出しが含まれる', () => {
    expect(indexHtml).toContain('gtag("config", "G-TNFY35RTNP")');
  });

  it("preconnect ヒントが含まれる", () => {
    expect(indexHtml).toContain('rel="preconnect"');
    expect(indexHtml).toContain("https://www.googletagmanager.com");
  });
});
