/**
 * Purpose:
 * ビルド成果物 (dist/) に GA4 タグと最適化要素が正しく含まれることを検証する。
 *
 * Context:
 * - GA4 は index.html にインラインで配置。
 * - ビルド後も gtag スクリプト・dataLayer 初期化・preconnect・OGP が保持されることを CI で保証。
 * - dist/ が存在しない場合はテストをスキップ（ビルド未実行時）。
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const distDir = resolve(import.meta.dirname, "../../dist");

function readDistHtml(): string {
  try {
    return readFileSync(resolve(distDir, "index.html"), "utf-8");
  } catch {
    return "";
  }
}

describe("ビルド成果物検証 (dist/index.html)", () => {
  const html = readDistHtml();
  const hasDist = html.length > 0;

  it.skipIf(!hasDist)("gtag.js の async script タグが含まれる", () => {
    expect(html).toContain("googletagmanager.com/gtag/js?id=G-TNFY35RTNP");
  });

  it.skipIf(!hasDist)("dataLayer 初期化が含まれる", () => {
    expect(html).toContain("window.dataLayer");
  });

  it.skipIf(!hasDist)('gtag("config") 呼び出しが含まれる', () => {
    expect(html).toContain("G-TNFY35RTNP");
  });

  it.skipIf(!hasDist)("preconnect ヒントが含まれる", () => {
    expect(html).toContain('rel="preconnect"');
    expect(html).toContain("googletagmanager.com");
  });

  it.skipIf(!hasDist)("OGP メタタグが含まれる", () => {
    expect(html).toContain('property="og:title"');
    expect(html).toContain('property="og:description"');
    expect(html).toContain('name="twitter:card"');
  });
});
