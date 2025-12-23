/**
 * Purpose:
 * 職務経歴書データの取得・加工を行うカスタムフック。
 * 経験データのグループ化、スキル計算、Markdown生成を一元管理する。
 *
 * Context:
 * - Resume.tsxから分離されたデータ処理ロジック
 * - グループ化ロジックは utils/experienceGrouping.ts に抽出
 * - 同じロジックを他のコンポーネントでも再利用可能
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  Experience,
  GroupedExperience,
  SkillWithYears,
} from "@/types/experience";
import { calculateSkillsWithYears } from "@/utils/calculateSkills";
import { groupExperiences } from "@/utils/experienceGrouping";
import { generateResumeMarkdown } from "@/utils/exportResumeMarkdown";
import { dateToMonths } from "@/utils/formatDate";
import experiencesData from "../data/experiences.json";

interface UseResumeDataResult {
  experiences: Experience[];
  groupedExperiences: GroupedExperience[];
  skillsWithYears: SkillWithYears[];
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
  const [skillsWithYears, setSkillsWithYears] = useState<SkillWithYears[]>([]);
  const [loading, setLoading] = useState(true);

  // データ処理をメモ化
  const processData = useCallback(() => {
    const sortedExperiences = sortExperiencesByDate(
      experiencesData.experience_list
    );
    const grouped = groupExperiences(sortedExperiences);
    const skills = calculateSkillsWithYears(sortedExperiences);

    return { sortedExperiences, grouped, skills };
  }, []);

  useEffect(() => {
    const { sortedExperiences, grouped, skills } = processData();

    setExperiences(sortedExperiences);
    setGroupedExperiences(grouped);
    setSkillsWithYears(skills);
    setLoading(false);
  }, [processData]);

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
