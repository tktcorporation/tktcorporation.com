/**
 * Purpose:
 * ビルド成果物に GA4 + Partytown が正しく含まれることを検証する。
 *
 * Context:
 * - Partytown スニペットは Vite プラグインでビルド時に注入。
 * - ~partytown/ ディレクトリに Service Worker ファイルがコピーされる。
 * - dist/ が存在しない場合はテストをスキップ（ビルド未実行時）。
 */

import { existsSync, readFileSync } from "node:fs";
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

describe("ビルド成果物検証 (dist/)", () => {
  const html = readDistHtml();
  const hasDist = html.length > 0;

  it.skipIf(!hasDist)(
    "Partytown スニペットがビルド済み HTML に注入されている",
    () => {
      expect(html).toContain("partytown");
    }
  );

  it.skipIf(!hasDist)(
    "Partytown Service Worker ファイルが dist/~partytown/ に存在する",
    () => {
      expect(existsSync(resolve(distDir, "~partytown/partytown.js"))).toBe(
        true
      );
      expect(existsSync(resolve(distDir, "~partytown/partytown-sw.js"))).toBe(
        true
      );
    }
  );

  it.skipIf(!hasDist)("GA4 測定 ID が含まれる", () => {
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
