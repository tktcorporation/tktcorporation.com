/**
 * Purpose:
 * 経験データのグループ化ロジックを提供するユーティリティ。
 * 組織・期間別のグループ化アルゴリズムを独立したテスト可能な関数として実装。
 *
 * Context:
 * - useResumeData.ts から抽出されたロジック
 * - 連続期間の判定、サブグループ化などの複雑なロジックを分離
 * - 単体テストが容易な純粋関数として実装
 */

import type { Experience, GroupedExperience } from "@/types/experience";
import { dateToMonths } from "./formatDate";

/** 連続期間とみなす最大ギャップ（月数） */
export const MAX_CONSECUTIVE_GAP = 1;

// Re-export for backward compatibility
export { dateToMonths } from "./formatDate";

/**
 * 経験のグループ化キーを生成
 */
export function getGroupKey(exp: Experience): string {
  return `${exp.organization_name}|${exp.is_client_work}|${exp.client_company_name || ""}`;
}

/**
 * 2つの期間が連続しているかを判定
 *
 * @param prev - 前の経験
 * @param current - 現在の経験
 * @param maxGap - 許容する最大ギャップ（月数）
 * @returns 連続している場合は true
 */
export function isConsecutivePeriod(
  prev: Experience,
  current: Experience,
  maxGap: number = MAX_CONSECUTIVE_GAP
): boolean {
  // 前の期間が進行中の場合は連続とみなさない
  if (prev.end_year === null) {
    return false;
  }

  const prevEndDate = dateToMonths(prev.end_year, prev.end_month ?? 12);
  const currentStartDate = dateToMonths(
    current.start_year,
    current.start_month
  );
  const gap = currentStartDate - prevEndDate;

  // 前の期間終了後に開始し、許容ギャップ内の場合のみ連続とみなす
  return gap >= 0 && gap <= maxGap;
}

/**
 * 経験リストを連続期間でサブグループに分割
 *
 * @param experiences - 日付順にソートされた経験リスト
 * @returns サブグループの配列
 */
export function splitIntoConsecutiveGroups(
  experiences: Experience[]
): Experience[][] {
  if (experiences.length === 0) {
    return [];
  }

  const subGroups: Experience[][] = [];
  let currentSubGroup: Experience[] = [experiences[0]];

  for (let i = 1; i < experiences.length; i++) {
    const prev = currentSubGroup[currentSubGroup.length - 1];
    const current = experiences[i];

    if (isConsecutivePeriod(prev, current)) {
      currentSubGroup.push(current);
    } else {
      subGroups.push(currentSubGroup);
      currentSubGroup = [current];
    }
  }
  subGroups.push(currentSubGroup);

  return subGroups;
}

/**
 * サブグループからGroupedExperienceを生成
 */
export function createGroupedExperience(
  subGroup: Experience[]
): GroupedExperience {
  const firstExp = subGroup[0];
  const lastExp = subGroup[subGroup.length - 1];

  return {
    organization_name: firstExp.organization_name,
    is_client_work: firstExp.is_client_work,
    client_company_name: firstExp.client_company_name,
    total_start_year: firstExp.start_year,
    total_start_month: firstExp.start_month,
    total_end_year: lastExp.end_year,
    total_end_month: lastExp.end_month,
    experiences: subGroup,
  };
}

/**
 * 経験リストを開始日順（古い順）にソート
 */
export function sortExperiencesByStartDate(
  experiences: Experience[]
): Experience[] {
  return [...experiences].sort((a, b) => {
    const aDate = dateToMonths(a.start_year, a.start_month);
    const bDate = dateToMonths(b.start_year, b.start_month);
    return aDate - bDate; // 古い順
  });
}

/**
 * 経験を組織・期間でグループ化する
 *
 * 処理内容:
 * 1. 組織名、クライアント作業フラグ、クライアント会社名でグループ化
 * 2. 各グループ内で開始日順にソート
 * 3. 連続する期間（最大1ヶ月のギャップ）を識別してサブグループ化
 * 4. 進行中の雇用期間が重複しないよう処理
 *
 * @param experiences - グループ化する経験データの配列
 * @returns 開始日の新しい順にソートされたGroupedExperienceの配列
 */
export function groupExperiences(
  experiences: Experience[]
): GroupedExperience[] {
  // 組織でグループ化
  const groups: Map<string, Experience[]> = new Map();

  for (const exp of experiences) {
    const key = getGroupKey(exp);
    const existing = groups.get(key);
    if (existing) {
      existing.push(exp);
    } else {
      groups.set(key, [exp]);
    }
  }

  const groupedResults: GroupedExperience[] = [];

  // 各組織グループを処理
  for (const groupExps of groups.values()) {
    // 開始日順にソート
    const sortedExps = sortExperiencesByStartDate(groupExps);

    // 連続期間でサブグループ化
    const subGroups = splitIntoConsecutiveGroups(sortedExps);

    // 各サブグループをGroupedExperienceに変換
    for (const subGroup of subGroups) {
      groupedResults.push(createGroupedExperience(subGroup));
    }
  }

  // 最終的に新しい順にソート
  return groupedResults.sort((a, b) => {
    const aDate = dateToMonths(a.total_start_year, a.total_start_month);
    const bDate = dateToMonths(b.total_start_year, b.total_start_month);
    return bDate - aDate;
  });
}
