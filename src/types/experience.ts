/**
 * Purpose:
 * 職務経歴書で使用するデータ型の定義。
 * LAPRASから取得する経験データの構造を
 * TypeScriptの型として定義し、型安全性を提供する。
 *
 * Context:
 * - Resume.tsxおよびexportユーティリティで使用される経験データの型定義
 * - 職位、組織、期間などの構造化されたデータモデル
 * - JSONデータとTypeScriptコードの間のインターフェース
 * - スキル計算や経験グループ化に使用される派生型も含む
 * - コンポーネント間で共有される関数型エイリアスも含む
 */

import type React from "react";

// ============================================================================
// 共通の関数型エイリアス
// ============================================================================

/**
 * 日付範囲をフォーマットする関数の型
 */
export type DateFormatter = (
  year: number,
  month: number,
  endYear: number | null,
  endMonth: number | null
) => string;

/**
 * 説明文から技術タグを抽出する関数の型
 */
export type TechExtractor = (description: string) => string[];

/**
 * 説明文をReact要素にフォーマットする関数の型
 */
export type DescriptionFormatter = (
  description: string
) => React.ReactElement[];

// ============================================================================
// データ型定義
// ============================================================================

/**
 * 職位情報
 */
export interface Position {
  id: number;
  job_position_name: string;
}

/**
 * 職務経験データ
 *
 * Note: position_name と positions[].job_position_name の関係
 * - position_name: 一般的な職種名（例: "ソフトウェアエンジニア"）
 * - positions[].job_position_name: より具体的な職種（例: "Webアプリケーションエンジニア"）
 * 表示には getDisplayPositionName() を使用することを推奨
 */
export interface Experience {
  id: number;
  organization_name: string;
  is_client_work: boolean;
  client_company_name: string;
  positions: Position[];
  /** @deprecated Use getDisplayPositionName() instead for display purposes */
  position_name: string;
  start_year: number;
  start_month: number;
  end_year: number | null;
  end_month: number | null;
  description: string;
  updated_at: string;
}

/**
 * 表示用の職種名を取得
 * positions 配列から取得し、なければ position_name にフォールバック
 */
export function getDisplayPositionName(exp: Experience): string {
  if (exp.positions.length > 0 && exp.positions[0].job_position_name) {
    return exp.positions[0].job_position_name;
  }
  return exp.position_name;
}

/**
 * 全ての職種名を取得（ユニークな値のみ）
 */
export function getAllPositionNames(exp: Experience): string[] {
  const names = exp.positions.map((p) => p.job_position_name);
  return [...new Set(names)];
}

/**
 * 経験データのルート構造
 */
export interface ExperienceData {
  experience_list: Experience[];
}

/**
 * スキルと経験年数
 */
export interface SkillWithYears {
  name: string;
  years: number;
  months: number;
}

/**
 * グループ化された経験（組織・期間別）
 */
export interface GroupedExperience {
  organization_name: string;
  is_client_work: boolean;
  client_company_name: string;
  total_start_year: number;
  total_start_month: number;
  total_end_year: number | null;
  total_end_month: number | null;
  experiences: Experience[];
}
