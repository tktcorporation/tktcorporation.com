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
 */

/**
 * 職位情報
 */
export interface Position {
  id: number;
  job_position_name: string;
}

/**
 * 職務経験データ
 */
export interface Experience {
  id: number;
  organization_name: string;
  is_client_work: boolean;
  client_company_name: string;
  positions: Position[];
  position_name: string;
  start_year: number;
  start_month: number;
  end_year: number | null;
  end_month: number | null;
  description: string;
  updated_at: string;
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
