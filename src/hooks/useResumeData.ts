/**
 * Purpose:
 * 職務経歴書データの取得・加工を行うカスタムフック。
 * 経験データのグループ化と Markdown 生成を一元管理する。
 *
 * Context:
 * - Resume.tsxから分離されたデータ処理ロジック
 * - グループ化ロジックは utils/experienceGrouping.ts に抽出
 * - スキル期間の算出はエクスポート用 Markdown 生成のため内部で行う
 */

import { useCallback, useEffect, useMemo, useState } from "react";

import type {
  CompanyGroup,
  Experience,
  GroupedExperience,
} from "@/types/experience";
import { calculateSkillsWithYears } from "@/utils/calculateSkills";
import { groupByCompany, groupExperiences } from "@/utils/experienceGrouping";
import { generateResumeMarkdown } from "@/utils/exportResumeMarkdown";
import { dateToMonths } from "@/utils/formatDate";

import experiencesData from "../data/experiences.json";

interface UseResumeDataResult {
  experiences: Experience[];
  groupedExperiences: GroupedExperience[];
  companyGroups: CompanyGroup[];
  resumeMarkdown: string;
  loading: boolean;
}

/**
 * 経験を開始日順（新しい順）にソート
 */
const sortExperiencesByDate = (experiences: Experience[]): Experience[] => {
  return [...experiences].sort((a, b) => {
    const aDate = dateToMonths(a.start_year, a.start_month);
    const bDate = dateToMonths(b.start_year, b.start_month);
    return bDate - aDate;
  });
};

/**
 * 職務経歴書データを取得・加工するカスタムフック
 */
export function useResumeData(): UseResumeDataResult {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [groupedExperiences, setGroupedExperiences] = useState<
    GroupedExperience[]
  >([]);
  const [companyGroups, setCompanyGroups] = useState<CompanyGroup[]>([]);
  const [loading, setLoading] = useState(true);

  // データ処理をメモ化
  const processData = useCallback(() => {
    const sortedExperiences = sortExperiencesByDate(
      experiencesData.experience_list
    );
    const grouped = groupExperiences(sortedExperiences);
    const companies = groupByCompany(grouped);

    return { sortedExperiences, grouped, companies };
  }, []);

  useEffect(() => {
    const { sortedExperiences, grouped, companies } = processData();

    setExperiences(sortedExperiences);
    setGroupedExperiences(grouped);
    setCompanyGroups(companies);
    setLoading(false);
  }, [processData]);

  // AI用Markdown生成（スキル一覧はエクスポート用途のみ）
  const resumeMarkdown = useMemo(() => {
    if (experiences.length === 0) {
      return "";
    }
    const skills = calculateSkillsWithYears(experiences);
    return generateResumeMarkdown(experiences, skills);
  }, [experiences]);

  return {
    experiences,
    groupedExperiences,
    companyGroups,
    resumeMarkdown,
    loading,
  };
}
