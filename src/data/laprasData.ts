/**
 * Purpose:
 * LAPRASのデータを読み込み、バリデーションを行って
 * 型安全な形でアプリケーション全体に提供する。
 *
 * Context:
 * - src/data/lapras-data.jsonから静的データを読み込み
 * - Zodスキーマでバリデーションして型安全性を保証
 * - エラーハンドリングを含む2つのアクセス方法を提供
 */

import laprasDataJson from "./lapras-data.json";
import { type LaprasData, LaprasDataSchema } from "./laprasSchema";

/**
 * Get validated LAPRAS data
 * @throws {Error} If the data doesn't match the schema
 */
export function getLaprasData(): LaprasData {
  try {
    // Validate the JSON data against the schema
    const validatedData = LaprasDataSchema.parse(laprasDataJson);
    return validatedData;
  } catch (error) {
    console.error("Failed to validate LAPRAS data:", error);
    throw new Error("Invalid LAPRAS data format");
  }
}

/**
 * Get LAPRAS data safely (returns null on error)
 */
export function getLaprasDataSafe(): LaprasData | null {
  try {
    return getLaprasData();
  } catch (error) {
    console.error("Failed to load LAPRAS data:", error);
    return null;
  }
}
