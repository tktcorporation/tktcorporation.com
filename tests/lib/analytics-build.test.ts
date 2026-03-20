/**
 * Purpose:
 * ビルド成果物に GA4 関連コードが正しく含まれることを検証する。
 *
 * Context:
 * - gtag.js の <script> タグは index.html に静的配置（GA 検出ツール対応）。
 * - dataLayer 初期化コードは JS バンドルに含まれる。
 * - index.html にはインライン gtag 初期化スクリプト（window.dataLayer, gtag()）は含まれない。
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

function readDistHtml(): string {
  try {
    return readFileSync(resolve(distDir, "index.html"), "utf-8");
  } catch {
    return "";
  }
}

describe("GA4 ビルド成果物検証", () => {
  const bundledJs = readAllBundledJs();
  const distHtml = readDistHtml();
  const hasDistFiles = bundledJs.length > 0 && distHtml.length > 0;

  it.skipIf(!hasDistFiles)(
    "バンドル済み JS に GA 測定 ID (G-TNFY35RTNP) が含まれる",
    () => {
      expect(bundledJs).toContain("G-TNFY35RTNP");
    }
  );

  it.skipIf(!hasDistFiles)(
    "index.html に gtag.js の静的 script タグが含まれる",
    () => {
      expect(distHtml).toContain(
        "googletagmanager.com/gtag/js?id=G-TNFY35RTNP"
      );
    }
  );

  it.skipIf(!hasDistFiles)(
    "index.html にはインライン gtag 初期化スクリプトが含まれない（モジュール側で処理）",
    () => {
      // dataLayer のインライン初期化がないことを確認
      expect(distHtml).not.toContain("window.dataLayer");
      // gtag() のインライン呼び出しがないことを確認
      expect(distHtml).not.toMatch(/gtag\s*\(/);
    }
  );

  it.skipIf(!hasDistFiles)("index.html に preconnect ヒントが含まれる", () => {
    expect(distHtml).toContain('rel="preconnect"');
    expect(distHtml).toContain("googletagmanager.com");
  });

  it.skipIf(!hasDistFiles)("index.html に OGP メタタグが含まれる", () => {
    expect(distHtml).toContain('property="og:title"');
    expect(distHtml).toContain('property="og:description"');
    expect(distHtml).toContain('name="twitter:card"');
  });
});
