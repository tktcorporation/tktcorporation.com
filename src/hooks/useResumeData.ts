/**
 * Purpose:
 * 職務経歴書データの取得・加工を行うカスタムフック。
 * 経験データのグループ化、スキル計算、Markdown生成を一元管理する。
 *
 * Context:
 * - Resume.tsxから分離されたデータ処理ロジック
 * - 経験データのグループ化アルゴリズムを含む
 * - 同じロジックを他のコンポーネントでも再利用可能
 */

import { useEffect, useMemo, useState } from "react";
import type {
  Experience,
  GroupedExperience,
  SkillWithYears,
} from "@/types/experience";
import { calculateSkillsWithYears } from "@/utils/calculateSkills";
import { generateResumeMarkdown } from "@/utils/exportResumeMarkdown";
import experiencesData from "../data/experiences.json";

/** 連続期間とみなす最大ギャップ（月数） */
const MAX_CONSECUTIVE_GAP = 1;

interface UseResumeDataResult {
  experiences: Experience[];
  groupedExperiences: GroupedExperience[];
  skillsWithYears: SkillWithYears[];
  resumeMarkdown: string;
  loading: boolean;
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
 * @param exps - グループ化する経験データの配列
 * @returns 開始日の新しい順にソートされたGroupedExperienceの配列
 */
function groupExperiences(exps: Experience[]): GroupedExperience[] {
  const groups: { [key: string]: Experience[] } = {};

  // 会社名とクライアント作業の組み合わせでグループ化
  for (const exp of exps) {
    const key = `${exp.organization_name}|${exp.is_client_work}|${exp.client_company_name || ""}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(exp);
  }

  const groupedResults: GroupedExperience[] = [];

  for (const [_key, groupExps] of Object.entries(groups)) {
    // 各グループ内で日付順にソート
    groupExps.sort((a, b) => {
      const aDate = a.start_year * 12 + a.start_month;
      const bDate = b.start_year * 12 + b.start_month;
      return aDate - bDate; // 古い順
    });

    // 連続する期間を見つけてサブグループ化
    const subGroups: Experience[][] = [];
    let currentSubGroup: Experience[] = [groupExps[0]];

    for (let i = 1; i < groupExps.length; i++) {
      const prev = currentSubGroup[currentSubGroup.length - 1];
      const current = groupExps[i];

      const currentStartDate = current.start_year * 12 + current.start_month;

      // 連続性を計算
      let isConsecutive = false;

      if (prev.end_year === null) {
        // 前の期間が進行中 - 重複する期間はグループ化しない
        isConsecutive = false;
      } else {
        // 前の期間が終了 - 現在の期間がギャップ許容範囲内で開始するかチェック
        const prevEndDate = prev.end_year * 12 + (prev.end_month ?? 12);
        const gap = currentStartDate - prevEndDate;

        // 前の期間終了後に開始し、許容ギャップ内の場合のみ連続とみなす
        isConsecutive = gap >= 0 && gap <= MAX_CONSECUTIVE_GAP;
      }

      if (isConsecutive) {
        currentSubGroup.push(current);
      } else {
        subGroups.push(currentSubGroup);
        currentSubGroup = [current];
      }
    }
    subGroups.push(currentSubGroup);

    // 各サブグループをGroupedExperienceに変換
    for (const subGroup of subGroups) {
      const firstExp = subGroup[0];
      const lastExp = subGroup[subGroup.length - 1];

      groupedResults.push({
        organization_name: firstExp.organization_name,
        is_client_work: firstExp.is_client_work,
        client_company_name: firstExp.client_company_name,
        total_start_year: firstExp.start_year,
        total_start_month: firstExp.start_month,
        total_end_year: lastExp.end_year,
        total_end_month: lastExp.end_month,
        experiences: subGroup,
      });
    }
  }

  // 最終的に新しい順にソート
  return groupedResults.sort((a, b) => {
    const aDate = a.total_start_year * 12 + a.total_start_month;
    const bDate = b.total_start_year * 12 + b.total_start_month;
    return bDate - aDate;
  });
}

/**
 * 職務経歴書データを取得・加工するカスタムフック
 */
export function useResumeData(): UseResumeDataResult {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [groupedExperiences, setGroupedExperiences] = useState<
    GroupedExperience[]
  >([]);
  const [skillsWithYears, setSkillsWithYears] = useState<SkillWithYears[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sortedExperiences = [...experiencesData.experience_list].sort(
      (a, b) => {
        const aDate = a.start_year * 12 + a.start_month;
        const bDate = b.start_year * 12 + b.start_month;
        return bDate - aDate;
      }
    );

    const grouped = groupExperiences(sortedExperiences);
    const skills = calculateSkillsWithYears(sortedExperiences);

    setExperiences(sortedExperiences);
    setGroupedExperiences(grouped);
    setSkillsWithYears(skills);
    setLoading(false);
  }, []);

  // AI用Markdown生成
  const resumeMarkdown = useMemo(() => {
    if (skillsWithYears.length === 0 || experiences.length === 0) {
      return "";
    }
    return generateResumeMarkdown(experiences, skillsWithYears);
  }, [experiences, skillsWithYears]);

  return {
    experiences,
    groupedExperiences,
    skillsWithYears,
    resumeMarkdown,
    loading,
  };
}
