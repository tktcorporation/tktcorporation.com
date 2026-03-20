/**
 * Purpose:
 * ビルド成果物に GA4 関連コードが含まれることを検証する。
 * GA をインラインスクリプトから Vite モジュールに移行したため、
 * ビルド後の JS に測定 ID と gtag 初期化コードが確実にバンドルされていることを CI で保証する。
 *
 * Context:
 * - index.html には GA のインラインスクリプトが存在しないため、
 *   JS バンドル側に含まれていなければ GA が完全に欠落してしまう。
 * - このテストは `npm run build` 後に dist/ を検査する。
 */

import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const distDir = resolve(import.meta.dirname, "../../dist");

/**
 * dist/assets/ 内の JS ファイルを全て結合して返す。
 * ビルドが未実行の場合は空文字を返す（テスト側で適切にハンドル）。
 */
function readAllBundledJs(): string {
  try {
    const assetsDir = resolve(distDir, "assets");
    const jsFiles = readdirSync(assetsDir).filter((f) => f.endsWith(".js"));
    return jsFiles
      .map((f) => readFileSync(resolve(assetsDir, f), "utf-8"))
      .join("\n");
  } catch {
    return "";
  }
}

describe("GA4 ビルド成果物検証", () => {
  const bundledJs = readAllBundledJs();

  it.skipIf(!bundledJs)(
    "バンドル済み JS に GA 測定 ID (G-TNFY35RTNP) が含まれる",
    () => {
      expect(bundledJs).toContain("G-TNFY35RTNP");
    }
  );

  it.skipIf(!bundledJs)(
    "バンドル済み JS に googletagmanager.com への参照が含まれる",
    () => {
      expect(bundledJs).toMatch(/googletagmanager\.com\/gtag\/js/);
    }
  );

  it.skipIf(!bundledJs)(
    "ビルド済み index.html には GA インラインスクリプト (gtag/dataLayer) が含まれない",
    () => {
      const html = readFileSync(resolve(distDir, "index.html"), "utf-8");
      // gtag インラインスクリプトが除去されていることを確認
      expect(html).not.toContain("window.dataLayer");
      expect(html).not.toContain("gtag(");
      // gtag.js の <script src="..."> が直接埋め込まれていないことを確認
      expect(html).not.toContain("gtag/js?id=");
    }
  );

  it.skipIf(!bundledJs)("index.html に preconnect ヒントが含まれる", () => {
    const html = readFileSync(resolve(distDir, "index.html"), "utf-8");
    expect(html).toContain('rel="preconnect"');
    expect(html).toContain("googletagmanager.com");
  });

  it.skipIf(!bundledJs)("index.html に OGP メタタグが含まれる", () => {
    const html = readFileSync(resolve(distDir, "index.html"), "utf-8");
    expect(html).toContain('property="og:title"');
    expect(html).toContain('property="og:description"');
    expect(html).toContain('name="twitter:card"');
  });
});
