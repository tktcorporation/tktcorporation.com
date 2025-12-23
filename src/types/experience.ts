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
 *
 * Note: total_start_*, total_end_* は experiences から計算可能な派生フィールドです。
 * グループ化時に事前計算されますが、experiences を直接参照する場合は
 * getGroupedPeriod() を使用することもできます。
 */
export interface GroupedExperience {
  organization_name: string;
  is_client_work: boolean;
  client_company_name: string;
  /** 派生フィールド: experiences[0].start_year から計算 */
  total_start_year: number;
  /** 派生フィールド: experiences[0].start_month から計算 */
  total_start_month: number;
  /** 派生フィールド: experiences[last].end_year から計算 */
  total_end_year: number | null;
  /** 派生フィールド: experiences[last].end_month から計算 */
  total_end_month: number | null;
  experiences: Experience[];
}

/**
 * 期間情報の型
 */
export interface Period {
  startYear: number;
  startMonth: number;
  endYear: number | null;
  endMonth: number | null;
}

/**
 * GroupedExperience の期間を experiences から再計算
 * キャッシュされた total_* フィールドの代わりに使用可能
 */
export function getGroupedPeriod(group: GroupedExperience): Period {
  const firstExp = group.experiences[0];
  const lastExp = group.experiences[group.experiences.length - 1];

  return {
    startYear: firstExp.start_year,
    startMonth: firstExp.start_month,
    endYear: lastExp.end_year,
    endMonth: lastExp.end_month,
  };
}

/**
 * グループの全期間を月数で計算
 */
export function getGroupedDurationMonths(group: GroupedExperience): number {
  // Note: formatDate.ts の dateToMonths を使用すると循環依存になるため、
  // ここでは直接計算を行う。この型定義ファイルは依存関係の底にあるべき。
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const startMonths = group.total_start_year * 12 + group.total_start_month;
  const endMonths =
    group.total_end_year === null
      ? currentYear * 12 + currentMonth
      : group.total_end_year * 12 + (group.total_end_month ?? 12);

  return Math.max(0, endMonths - startMonths);
}
