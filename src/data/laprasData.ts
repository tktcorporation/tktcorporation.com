/**
 * Purpose:
 * LAPRAS公開APIからデータを動的に取得し、バリデーションを行って
 * 型安全な形でアプリケーションに提供する。
 *
 * Context:
 * - クライアントサイドで https://lapras.com/public/tktcorporation.json を直接fetch
 * - Zodスキーマでバリデーションして型安全性を保証
 * - 静的JSONの事前生成が不要になり、常に最新データを表示できる
 */

import { type LaprasData, LaprasDataSchema } from "./laprasSchema";

const LAPRAS_API_URL = "https://lapras.com/public/tktcorporation.json";

/**
 * LAPRAS公開APIからデータを取得してバリデーションする。
 * publicエンドポイントのため認証不要。
 */
export async function fetchLaprasData(): Promise<LaprasData> {
  const response = await fetch(LAPRAS_API_URL);

  if (!response.ok) {
    throw new Error(
      `LAPRAS APIの取得に失敗しました: ${response.status} ${response.statusText}`
    );
  }

  const rawData = await response.json();
  return LaprasDataSchema.parse(rawData);
}
