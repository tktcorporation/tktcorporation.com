/**
 * Purpose:
 * プログラミング言語/フレームワークの正式名称マッピングと検出機能を提供。
 * GitHub Linguist のデータを参考に、正確な言語名と表示名を管理する。
 *
 * Context:
 * - programmingLanguages データを使用して言語/技術の正規化
 * - 言語名の正規化と検出を統一的に処理
 * - TechnologyTimeline と Resume で使用
 * - 正規表現はキャッシュされてパフォーマンス最適化
 */

import { programmingLanguages } from "../data/programmingLanguages";

// programmingLanguages に含まれていない追加の技術
// 現在は programmingLanguages.ts に全て定義済みなので空
const additionalTechnologies: Record<
  string,
  { name: string; type: string; aliases?: string[] }
> = {};

// ============================================================================
// 正規表現キャッシュ（LRU方式でサイズ制限）
// ============================================================================

/** キャッシュの最大サイズ */
const MAX_REGEX_CACHE_SIZE = 500;

/** 技術名/エイリアスから正規表現への変換キャッシュ */
const regexCache = new Map<string, RegExp>();

/**
 * 文字列から単語境界マッチ用の正規表現を取得（キャッシュ付き）
 * LRU方式でキャッシュサイズを制限し、メモリリークを防止
 */
function getWordBoundaryRegex(word: string): RegExp {
  const cached = regexCache.get(word);
  if (cached) {
    // LRU: アクセスされたアイテムを最後に移動
    regexCache.delete(word);
    regexCache.set(word, cached);
    return cached;
  }

  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`\\b${escaped}\\b`, "gi");

  // キャッシュサイズ制限チェック
  if (regexCache.size >= MAX_REGEX_CACHE_SIZE) {
    // 最も古いエントリを削除（Mapは挿入順を保持）
    const oldestKey = regexCache.keys().next().value;
    if (oldestKey !== undefined) {
      regexCache.delete(oldestKey);
    }
  }

  regexCache.set(word, regex);
  return regex;
}

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
 * 正規表現はキャッシュされるため、同じテキストパターンに対して高速に動作
 *
 * @param text - 解析するテキスト
 * @returns 抽出された技術名の配列（アルファベット順）
 */
export function extractTechnologies(text: string): string[] {
  const technologies = new Set<string>();

  // programmingLanguages の言語をチェック
  for (const [key, value] of Object.entries(programmingLanguages)) {
    // デザインツールは除外
    if (value.type === "design") {
      continue;
    }

    // 正式名称をチェック（キャッシュ付き正規表現を使用）
    const regex = getWordBoundaryRegex(key);
    if (regex.test(text)) {
      technologies.add(key);
    }

    // エイリアスもチェック
    if (value.aliases && Array.isArray(value.aliases)) {
      for (const alias of value.aliases) {
        const aliasRegex = getWordBoundaryRegex(alias);
        if (aliasRegex.test(text)) {
          technologies.add(key);
        }
      }
    }
  }

  // 追加の技術をチェック
  for (const [key, value] of Object.entries(additionalTechnologies)) {
    // 正式名称をチェック
    const regex = getWordBoundaryRegex(key);
    if (regex.test(text)) {
      technologies.add(key);
    }

    // エイリアスもチェック
    if (value.aliases) {
      for (const alias of value.aliases) {
        const aliasRegex = getWordBoundaryRegex(alias);
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
