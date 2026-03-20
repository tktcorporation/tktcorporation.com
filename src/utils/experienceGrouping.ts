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

import type {
  CompanyGroup,
  Experience,
  GroupedExperience,
} from "@/types/experience";

import { dateToMonths } from "./formatDate";

/** 連続期間とみなす最大ギャップ（月数） */
export const MAX_CONSECUTIVE_GAP = 1;

// Re-export for backward compatibility
export { dateToMonths } from "./formatDate";

/**
 * 経験のグループ化キーを生成
 *
 * organization_name のみで集約する。
 * 同じ会社でのフリーランス/正社員の区別はグループ内で表示する。
 */
export function getGroupKey(exp: Experience): string {
  return exp.organization_name;
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
 * 経験リストからGroupedExperienceを生成
 *
 * 最古の start と最新の end（null=進行中あり）で期間を計算する。
 */
export function createGroupedExperience(
  experiences: Experience[]
): GroupedExperience {
  const firstExp = experiences[0];

  // 最古の開始日を見つける
  let oldestStart = experiences[0];
  for (const exp of experiences) {
    if (
      dateToMonths(exp.start_year, exp.start_month) <
      dateToMonths(oldestStart.start_year, oldestStart.start_month)
    ) {
      oldestStart = exp;
    }
  }

  // 進行中のエントリがあるか
  const hasOngoing = experiences.some((e) => e.end_year === null);

  // 最新の終了日を見つける
  let latestEnd = experiences[0];
  if (!hasOngoing) {
    for (const exp of experiences) {
      const expEnd = dateToMonths(exp.end_year ?? 0, exp.end_month ?? 0);
      const latestEndDate = dateToMonths(
        latestEnd.end_year ?? 0,
        latestEnd.end_month ?? 0
      );
      if (expEnd > latestEndDate) {
        latestEnd = exp;
      }
    }
  }

  return {
    organization_name: firstExp.organization_name,
    is_client_work: firstExp.is_client_work,
    client_company_name: firstExp.client_company_name,
    total_start_year: oldestStart.start_year,
    total_start_month: oldestStart.start_month,
    total_end_year: hasOngoing ? null : (latestEnd.end_year ?? null),
    total_end_month: hasOngoing ? null : (latestEnd.end_month ?? null),
    experiences,
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

  // 各組織グループを処理（連続期間サブグルーピングを廃止し、全エントリを新しい順にソート）
  for (const groupExps of groups.values()) {
    // 新しい順にソート
    const sortedExps = [...groupExps].sort((a, b) => {
      const aDate = dateToMonths(a.start_year, a.start_month);
      const bDate = dateToMonths(b.start_year, b.start_month);
      return bDate - aDate;
    });

    groupedResults.push(createGroupedExperience(sortedExps));
  }

  // 最終的に新しい順にソート
  return groupedResults.sort((a, b) => {
    const aDate = dateToMonths(a.total_start_year, a.total_start_month);
    const bDate = dateToMonths(b.total_start_year, b.total_start_month);
    return bDate - aDate;
  });
}

/**
 * GroupedExperience を会社名でさらに集約する。
 *
 * 同じ organization_name を持つグループをまとめ、
 * 各会社の最も新しい経験開始日で降順ソートして返す。
 * 会社内のグループも新しい順にソートされる。
 */
export function groupByCompany(
  groupedExperiences: GroupedExperience[]
): CompanyGroup[] {
  const companyMap = new Map<string, GroupedExperience[]>();

  for (const group of groupedExperiences) {
    const key = group.organization_name;
    const existing = companyMap.get(key);
    if (existing) {
      existing.push(group);
    } else {
      companyMap.set(key, [group]);
    }
  }

  const companyGroups: CompanyGroup[] = [];

  for (const [companyName, groups] of companyMap) {
    // 会社内のグループを新しい順にソート
    const sortedGroups = [...groups].sort((a, b) => {
      const aDate = dateToMonths(a.total_start_year, a.total_start_month);
      const bDate = dateToMonths(b.total_start_year, b.total_start_month);
      return bDate - aDate;
    });

    // 全体期間を算出
    const earliest = sortedGroups.reduce((min, g) => {
      const d = dateToMonths(g.total_start_year, g.total_start_month);
      return d < dateToMonths(min.total_start_year, min.total_start_month)
        ? g
        : min;
    }, sortedGroups[0]);
    const hasOngoing = sortedGroups.some((g) => g.total_end_year === null);
    const latest = hasOngoing
      ? null
      : sortedGroups.reduce((max, g) => {
          const d = dateToMonths(g.total_end_year ?? 0, g.total_end_month ?? 0);
          const maxD = dateToMonths(
            max.total_end_year ?? 0,
            max.total_end_month ?? 0
          );
          return d > maxD ? g : max;
        }, sortedGroups[0]);

    companyGroups.push({
      company_name: companyName,
      overall_start_year: earliest.total_start_year,
      overall_start_month: earliest.total_start_month,
      overall_end_year: hasOngoing ? null : (latest?.total_end_year ?? null),
      overall_end_month: hasOngoing ? null : (latest?.total_end_month ?? null),
      groups: sortedGroups,
    });
  }

  // 会社を最新経験の開始日で降順ソート
  return companyGroups.sort((a, b) => {
    // 最新のグループの開始日で比較
    const aLatest = a.groups[0];
    const bLatest = b.groups[0];
    const aDate = dateToMonths(
      aLatest.total_start_year,
      aLatest.total_start_month
    );
    const bDate = dateToMonths(
      bLatest.total_start_year,
      bLatest.total_start_month
    );
    return bDate - aDate;
  });
}
