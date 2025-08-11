/**
 * Purpose:
 * 職務経歴書で使用するデータ型の定義。
 * LAPRASから取得する経験データの構造を
 * TypeScriptの型として定義し、型安全性を提供する。
 *
 * Context:
 * - Resume.tsxで使用される経験データの型定義
 * - 職位、組織、期間などの構造化されたデータモデル
 * - JSONデータとTypeScriptコードの間のインターフェース
 */

export interface Position {
  id: number;
  job_position_name: string;
}

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

export interface ExperienceData {
  experience_list: Experience[];
}
