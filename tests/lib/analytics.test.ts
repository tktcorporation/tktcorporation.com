/**
 * Purpose:
 * GA4 + Partytown タグが index.html に正しく設置されていることを検証する。
 *
 * Context:
 * - GA4 は Partytown 経由で Web Worker 実行（メインスレッド非ブロック）。
 * - gtag スクリプトは type="text/partytown" で配置。
 * - Partytown の設定（lib パス、forward 設定）が正しいことを保証する。
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const indexHtml = readFileSync(
  resolve(import.meta.dirname, "../../index.html"),
  "utf-8"
);

describe("GA4 + Partytown 設置検証 (index.html)", () => {
  it("Partytown の設定が含まれる", () => {
    expect(indexHtml).toContain('lib: "/~partytown/"');
    expect(indexHtml).toContain('"dataLayer.push"');
  });

  it('gtag.js が type="text/partytown" で配置されている', () => {
    expect(indexHtml).toMatch(
      /type="text\/partytown"[\s\S]*?googletagmanager\.com\/gtag\/js/
    );
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
