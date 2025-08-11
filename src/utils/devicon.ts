/**
 * Purpose:
 * Devicon アイコンのユーティリティ関数。
 * プログラミング言語やフレームワークの名前から適切な
 * Devicon クラス名を生成する。
 *
 * Context:
 * - Devicon パッケージのデータを直接使用
 * - TechnologyTimeline と Resume で技術スタックのアイコンを表示
 * - 言語/フレームワーク名をDevicon のクラス名にマッピング
 */

import { getDeviconEntry } from "@/data/deviconData";

/**
 * 言語/フレームワーク名からDevicon クラス名を生成
 * @param name - 言語/フレームワーク名
 * @param variant - アイコンのバリアント（plain, original, line, etc.）
 * @param colored - カラー版を使用するか
 * @returns Devicon クラス名
 */
export function getDeviconClass(
  name: string,
  variant:
    | "plain"
    | "original"
    | "line"
    | "plain-wordmark"
    | "original-wordmark" = "plain",
  colored = true
): string {
  const entry = getDeviconEntry(name);

  if (!entry) {
    // マッピングがない場合は、名前をそのまま使用（ハイフンで区切る）
    const fallbackName = name.toLowerCase().replace(/[\s.]+/g, "");
    return `devicon-${fallbackName}-${variant}${colored ? "" : " colored"}`;
  }

  // Devicon エントリーが見つかった場合
  const deviconName = entry.name;

  // バリアントがサポートされているかチェック
  let actualVariant = variant;
  if (!entry.versions.font.includes(variant)) {
    // バリアントがサポートされていない場合、エイリアスをチェック
    const alias = entry.aliases?.find((a) => a.alias === variant);
    if (alias) {
      actualVariant = alias.base as typeof variant;
    } else {
      // それでもない場合は、利用可能な最初のバリアントを使用
      actualVariant = entry.versions.font[0] as typeof variant;
    }
  }

  return `devicon-${deviconName}-${actualVariant}${colored ? "" : " colored"}`;
}

/**
 * 言語/フレームワークがDevicon でサポートされているかチェック
 * @param name - 言語/フレームワーク名
 * @returns サポートされている場合はtrue
 */
export function isDeviconSupported(name: string): boolean {
  return getDeviconEntry(name) !== undefined;
}

/**
 * 言語/フレームワーク名から最適なアイコンバリアントを取得
 * @param name - 言語/フレームワーク名
 * @returns 利用可能なバリアントの配列
 */
export function getAvailableVariants(name: string): string[] {
  const entry = getDeviconEntry(name);

  if (!entry) {
    return ["plain"];
  }

  return entry.versions.font;
}

/**
 * 言語/フレームワークの色を取得
 * @param name - 言語/フレームワーク名
 * @returns カラーコードまたはnull
 */
export function getDeviconColor(name: string): string | null {
  const entry = getDeviconEntry(name);
  return entry?.color || null;
}
