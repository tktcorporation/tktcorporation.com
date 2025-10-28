/**
 * Purpose:
 * プログラミング言語/フレームワークの正式名称マッピングと検出機能を提供。
 * GitHub Linguist のデータを参考に、正確な言語名と表示名を管理する。
 *
 * Context:
 * - programmingLanguages データを使用して言語/技術の正規化
 * - 言語名の正規化と検出を統一的に処理
 * - TechnologyTimeline と Resume で使用
 */

import { programmingLanguages } from "../data/programmingLanguages";

// programmingLanguages に含まれていない追加の技術
// 現在は programmingLanguages.ts に全て定義済みなので空
const additionalTechnologies: Record<
  string,
  { name: string; type: string; aliases?: string[] }
> = {};

/**
 * 言語/技術名を正規化して正式名称を取得
 * @param name - 言語/技術名
 * @returns 正式名称または元の名前
 */
export function getNormalizedName(name: string): string {
  const lowerName = name.toLowerCase().trim();

  // まず programmingLanguages のデータをチェック
  for (const [key, value] of Object.entries(programmingLanguages)) {
    // 正式名称の完全一致
    if (key.toLowerCase() === lowerName) {
      return key;
    }

    // エイリアスをチェック
    if (value.aliases && Array.isArray(value.aliases)) {
      if (
        value.aliases.some((alias: string) => alias.toLowerCase() === lowerName)
      ) {
        return key;
      }
    }
  }

  // 追加の技術をチェック
  for (const [key, value] of Object.entries(additionalTechnologies)) {
    // 正式名称の完全一致
    if (key.toLowerCase() === lowerName) {
      return key;
    }

    // エイリアスをチェック
    if (value.aliases) {
      if (value.aliases.some((alias) => alias.toLowerCase() === lowerName)) {
        return key;
      }
    }
  }

  // 見つからない場合は、最初の文字を大文字にして返す
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

/**
 * 言語/技術の種類を取得
 * @param name - 言語/技術名
 * @returns 種類（programming, framework, database, etc.）
 */
export function getTechnologyType(name: string): string {
  const normalizedName = getNormalizedName(name);

  // programmingLanguages のデータをチェック
  if (programmingLanguages[normalizedName]) {
    return programmingLanguages[normalizedName].type || "unknown";
  }

  // 追加の技術をチェック
  if (additionalTechnologies[normalizedName]) {
    return additionalTechnologies[normalizedName].type;
  }

  return "unknown";
}

/**
 * 言語/技術がプログラミング言語かチェック
 * @param name - 言語/技術名
 * @returns プログラミング言語の場合はtrue
 */
export function isProgrammingLanguage(name: string): boolean {
  return getTechnologyType(name) === "programming";
}

/**
 * 言語/技術の色を取得（GitHub の言語カラー）
 * @param name - 言語/技術名
 * @returns カラーコードまたはnull
 */
export function getLanguageColor(name: string): string | null {
  const normalizedName = getNormalizedName(name);

  if (programmingLanguages[normalizedName]) {
    return programmingLanguages[normalizedName].color || null;
  }

  return null;
}

/**
 * テキストから技術スタックを抽出
 * @param text - 解析するテキスト
 * @returns 抽出された技術名の配列
 */
export function extractTechnologies(text: string): string[] {
  const technologies = new Set<string>();

  // programmingLanguages の言語をチェック
  for (const [key, value] of Object.entries(programmingLanguages)) {
    // プログラミング言語とマークアップ言語、フレームワークなどを対象
    if (value.type === "design") {
      continue; // デザインツールは除外
    }

    // 正式名称をチェック
    const regex = new RegExp(
      `\\b${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "gi"
    );
    if (regex.test(text)) {
      technologies.add(key);
    }

    // エイリアスもチェック
    if (value.aliases && Array.isArray(value.aliases)) {
      for (const alias of value.aliases) {
        const aliasRegex = new RegExp(
          `\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
          "gi"
        );
        if (aliasRegex.test(text)) {
          technologies.add(key);
        }
      }
    }
  }

  // 追加の技術をチェック
  for (const [key, value] of Object.entries(additionalTechnologies)) {
    // 正式名称をチェック
    const regex = new RegExp(
      `\\b${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "gi"
    );
    if (regex.test(text)) {
      technologies.add(key);
    }

    // エイリアスもチェック
    if (value.aliases) {
      for (const alias of value.aliases) {
        const aliasRegex = new RegExp(
          `\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
          "gi"
        );
        if (aliasRegex.test(text)) {
          technologies.add(key);
        }
      }
    }
  }

  return Array.from(technologies).sort();
}

/**
 * 言語マッピングオブジェクトを生成（後方互換性のため）
 * @returns Record<string, string> 形式のマッピング
 */
export function getLanguageMap(): Record<string, string> {
  const map: Record<string, string> = {};

  // programmingLanguages の言語を追加
  for (const [key, value] of Object.entries(programmingLanguages)) {
    if (value.type === "programming" || value.type === "markup") {
      // 小文字のキーで正式名称にマップ
      map[key.toLowerCase()] = key;

      // エイリアスも追加
      if (value.aliases && Array.isArray(value.aliases)) {
        for (const alias of value.aliases) {
          map[alias.toLowerCase()] = key;
        }
      }
    }
  }

  // 追加の技術も含める
  for (const [key, value] of Object.entries(additionalTechnologies)) {
    map[key.toLowerCase()] = key;

    if (value.aliases) {
      for (const alias of value.aliases) {
        map[alias.toLowerCase()] = key;
      }
    }
  }

  return map;
}
