/**
 * Purpose:
 * Devicon のアイコンデータを提供するモジュール。
 * node_modules/devicon/devicon.json から直接データをインポートし、
 * 型安全なアクセスを提供する。
 *
 * Context:
 * - Devicon パッケージから自動的にアイコンリストを取得
 * - 言語名、エイリアス、タグ、色情報を含む
 * - programmingLanguages と devicon の統一的なデータソース
 */

import deviconDataRaw from "devicon/devicon.json";

export interface DeviconEntry {
  name: string;
  altnames: string[];
  tags: string[];
  versions: {
    svg: string[];
    font: string[];
  };
  color?: string;
  aliases?: Array<{
    base: string;
    alias: string;
  }>;
}

// 型アサーションで型安全にアクセス
export const deviconData: DeviconEntry[] = deviconDataRaw as DeviconEntry[];

// 名前からエントリーを取得するマップを作成
export const deviconMap = new Map<string, DeviconEntry>();
export const deviconAltNameMap = new Map<string, DeviconEntry>();

// データが正しくインポートされているか確認
if (!deviconData || deviconData.length === 0) {
  console.error("Failed to import devicon data");
} else {
  for (const entry of deviconData) {
    // 正式名称でマップ
    deviconMap.set(entry.name.toLowerCase(), entry);

    // 代替名でもマップ
    for (const altname of entry.altnames || []) {
      deviconAltNameMap.set(altname.toLowerCase(), entry);
    }
  }
}

/**
 * 技術名から Devicon エントリーを取得
 * @param name - 技術名
 * @returns Devicon エントリーまたは undefined
 */
export function getDeviconEntry(name: string): DeviconEntry | undefined {
  const normalized = name.toLowerCase();
  return deviconMap.get(normalized) || deviconAltNameMap.get(normalized);
}

/**
 * 技術名が Devicon でサポートされているかチェック
 * @param name - 技術名
 * @returns サポートされている場合は true
 */
export function isDeviconSupported(name: string): boolean {
  return getDeviconEntry(name) !== undefined;
}

/**
 * Devicon のタグから技術タイプを推定
 * @param tags - タグの配列
 * @returns 推定されたタイプ
 */
export function inferTypeFromTags(tags: string[]): string {
  const tagSet = new Set(tags.map((t) => t.toLowerCase()));

  if (tagSet.has("programming") || tagSet.has("language")) {
    return "programming";
  }
  if (tagSet.has("framework")) {
    return "framework";
  }
  if (tagSet.has("database") || tagSet.has("nosql") || tagSet.has("sql")) {
    return "database";
  }
  if (tagSet.has("cloud") || tagSet.has("hosting")) {
    return "cloud";
  }
  if (
    tagSet.has("infrastructure") ||
    tagSet.has("container") ||
    tagSet.has("orchestration")
  ) {
    return "infrastructure";
  }
  if (tagSet.has("ci") || tagSet.has("cd") || tagSet.has("devops")) {
    return "ci";
  }
  if (tagSet.has("css") || tagSet.has("style") || tagSet.has("ui")) {
    return "css";
  }
  if (tagSet.has("mobile")) {
    return "mobile";
  }
  if (tagSet.has("design")) {
    return "design";
  }
  if (tagSet.has("backend")) {
    return "backend";
  }
  if (tagSet.has("tool") || tagSet.has("editor") || tagSet.has("ide")) {
    return "tool";
  }
  if (tagSet.has("markup") || tagSet.has("html") || tagSet.has("xml")) {
    return "markup";
  }

  return "tool"; // デフォルト
}
