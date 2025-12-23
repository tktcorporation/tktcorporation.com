/**
 * Purpose:
 * Parse experience description strings into structured data.
 * Handles technology extraction and hierarchical bullet point parsing.
 *
 * Context:
 * - Robust parsing logic that preserves indentation and hierarchy
 * - Uses Zod validation for type safety
 * - Replaces fragile string manipulation with structured data
 * - パース結果はキャッシュされてパフォーマンス最適化
 */

import {
  type BulletItem,
  type StructuredDescription,
  StructuredDescriptionSchema,
} from "../types/resume-export";

// ============================================================================
// キャッシュ（LRU方式でサイズ制限）
// ============================================================================

const MAX_PARSE_CACHE_SIZE = 100;
const parseCache = new Map<string, StructuredDescription>();

/**
 * キャッシュをクリアする（テスト用）
 */
export function clearParseCache(): void {
  parseCache.clear();
}

/**
 * Parse experience description into structured data
 * パース結果はキャッシュされ、同じdescriptionに対して高速に動作
 *
 * Expected format:
 * ```
 * Tech1 / Tech2 / Tech3
 *
 * * Responsibility 1
 *     * Sub-item 1
 *     * Sub-item 2
 * * Responsibility 2
 * ```
 */
export function parseExperienceDescription(
  description: string
): StructuredDescription {
  // キャッシュをチェック
  const cached = parseCache.get(description);
  if (cached) {
    // LRU: アクセスされたアイテムを最後に移動
    parseCache.delete(description);
    parseCache.set(description, cached);
    return cached;
  }

  const result = parseDescriptionInternal(description);

  // キャッシュサイズ制限
  if (parseCache.size >= MAX_PARSE_CACHE_SIZE) {
    const oldestKey = parseCache.keys().next().value;
    if (oldestKey !== undefined) {
      parseCache.delete(oldestKey);
    }
  }

  parseCache.set(description, result);
  return result;
}

/**
 * 内部パース処理（キャッシュなし）
 */
function parseDescriptionInternal(description: string): StructuredDescription {
  const lines = description.split("\n");

  // Parse technologies from first line (format: "Tech1 / Tech2 / Tech3")
  const technologies = parseTechListFromFirstLine(lines[0] || "");

  // Find the start of bullet points (skip empty lines after tech line)
  let bulletStartIndex = 1;
  while (bulletStartIndex < lines.length && !lines[bulletStartIndex].trim()) {
    bulletStartIndex++;
  }

  // Parse bullet points with hierarchy
  const bulletLines = lines.slice(bulletStartIndex);
  const responsibilities = parseBulletPoints(bulletLines);

  // Validate with Zod
  const result = StructuredDescriptionSchema.parse({
    technologies,
    responsibilities,
  });

  return result;
}

/**
 * Parse technology list from first line of description
 * Expected format: "Tech1 / Tech2 / Tech3"
 *
 * Note: This is different from languageMap.ts extractTechnologies() which
 * detects technologies from any text using regex pattern matching.
 * This function simply splits a formatted tech list string.
 */
function parseTechListFromFirstLine(firstLine: string): string[] {
  if (!firstLine.trim()) {
    return [];
  }

  // Split by " / " and clean up
  return firstLine
    .split("/")
    .map((tech) => tech.trim())
    .filter((tech) => tech.length > 0);
}

/**
 * Parse bullet points into hierarchical structure
 * Recognizes indentation (spaces) to build tree
 */
function parseBulletPoints(lines: string[]): BulletItem[] {
  interface LineWithIndent {
    text: string;
    indent: number;
  }

  // Parse lines with their indentation level
  const parsedLines: LineWithIndent[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Skip lines that don't start with "*"
    if (!trimmed.startsWith("*")) continue;

    // Calculate indentation (number of leading spaces before "*")
    const indent = line.indexOf("*");
    const text = trimmed.substring(1).trim(); // Remove "*" and trim

    parsedLines.push({ text, indent });
  }

  // Build hierarchy based on indentation
  return buildHierarchy(parsedLines, 0).items;
}

/**
 * Build hierarchical structure from flat list of indented items.
 * インデントレベルに基づいてフラットなリストをツリー構造に変換する。
 *
 * Algorithm:
 * 1. 各行を順番に処理
 * 2. 現在のインデント（baseIndent）より小さい行 → このレベルの終了
 * 3. 現在のインデントと同じ行 → このレベルのアイテム
 * 4. 次の行がより深いインデント → 再帰的に子要素を処理
 *
 * Example input:
 * ```
 * [
 *   { text: "Item 1", indent: 0 },
 *   { text: "Child 1", indent: 4 },
 *   { text: "Child 2", indent: 4 },
 *   { text: "Item 2", indent: 0 }
 * ]
 * ```
 *
 * Example output:
 * ```
 * [
 *   { text: "Item 1", children: [{ text: "Child 1" }, { text: "Child 2" }] },
 *   { text: "Item 2" }
 * ]
 * ```
 *
 * @param lines - パース済みの行配列（テキストとインデントを含む）
 * @param baseIndent - 現在処理中のインデントレベル
 * @returns items: 構築されたツリー、nextIndex: 処理した行数
 */
function buildHierarchy(
  lines: Array<{ text: string; indent: number }>,
  baseIndent: number
): { items: BulletItem[]; nextIndex: number } {
  const items: BulletItem[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Base case: インデントが現在のレベルより浅い → 親に戻る
    if (line.indent < baseIndent) {
      break;
    }

    // 現在のレベルのアイテムを処理
    if (line.indent === baseIndent) {
      const item: BulletItem = { text: line.text };

      // 次の行がより深いインデント → 子要素として再帰処理
      if (i + 1 < lines.length && lines[i + 1].indent > baseIndent) {
        const childIndent = lines[i + 1].indent;

        // Recursive case: 子要素を再帰的に構築
        const childResult = buildHierarchy(lines.slice(i + 1), childIndent);
        if (childResult.items.length > 0) {
          item.children = childResult.items;
        }

        // 処理済みの子要素をスキップ
        i += childResult.nextIndex + 1;
      } else {
        i++;
      }

      items.push(item);
    } else {
      // Edge case: 予期しないインデント（不正な入力）
      // グレースフルに処理してスキップ
      i++;
    }
  }

  return { items, nextIndex: i };
}

/**
 * Extract technologies from description (legacy fallback)
 * Use parseExperienceDescription instead for full parsing
 */
export function extractTechnologiesLegacy(description: string): string[] {
  return parseExperienceDescription(description).technologies;
}
