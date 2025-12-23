/**
 * Purpose:
 * 職務経歴書を表示するページ。
 * LAPRASから取得した経験データを基に、視覚的に分かりやすい形で
 * キャリアの経歴とスキルセットを提示する。
 *
 * Context:
 * - 経験を組織別・期間別にグループ化して表示
 * - 技術スタックを自動的に抽出してハイライト
 * - スキルの習熟度を期間ベースで計算・可視化
 * - レスポンシブデザインで様々なデバイスに対応
 */

import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CopyResumeButton } from "@/components/CopyResumeButton";
import {
  ExperienceSection,
  ExportSection,
  SkillsSection,
} from "@/components/resume";
import type {
  Experience,
  GroupedExperience,
  SkillWithYears,
} from "@/types/experience";
import { calculateSkillsWithYears } from "@/utils/calculateSkills";
import { generateResumeMarkdown } from "@/utils/exportResumeMarkdown";
import { formatDateRange } from "@/utils/formatDate";
import { extractTechnologies } from "@/utils/languageMap";
import experiencesData from "../data/experiences.json";

const MAX_CONSECUTIVE_GAP = 1; // Maximum gap allowed between periods to be considered consecutive (1 month)

function Resume() {
  const [_experiences, setExperiences] = useState<Experience[]>([]);
  const [groupedExperiences, setGroupedExperiences] = useState<
    GroupedExperience[]
  >([]);
  const [skillsWithYears, setSkillsWithYears] = useState<SkillWithYears[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Groups experiences by organization and consecutive time periods.
   *
   * This function performs the following steps:
   * 1. Groups experiences by organization name, client work status, and client company name
   * 2. Within each organization group, sorts experiences by start date
   * 3. Identifies consecutive periods (max 1 month gap) and groups them together
   * 4. Handles ongoing employment without creating overlapping periods
   *
   * @param exps - Array of Experience objects to group
   * @returns Array of GroupedExperience objects sorted by start date (newest first)
   */
  const groupExperiences = useCallback(
    (exps: Experience[]): GroupedExperience[] => {
      const groups: { [key: string]: Experience[] } = {};

      // まず、会社名とクライアント作業の組み合わせでグループ化
      for (const exp of exps) {
        const key = `${exp.organization_name}|${exp.is_client_work}|${exp.client_company_name || ""}`;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(exp);
      }

      const groupedResults: GroupedExperience[] = [];
      // Use the global constant for consecutive gap

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

          const currentStartDate =
            current.start_year * 12 + current.start_month;

          // Calculate if periods are consecutive
          let isConsecutive = false;

          if (prev.end_year === null) {
            // Previous period is ongoing - we don't group overlapping periods
            // so any period that starts while another is ongoing is not consecutive
            isConsecutive = false;
          } else {
            // Previous period has ended - check if current period starts within gap tolerance
            const prevEndDate = prev.end_year * 12 + (prev.end_month ?? 12);
            const gap = currentStartDate - prevEndDate;

            // Only consider consecutive if current period starts after previous ends
            // and within the allowed gap (no overlapping periods)
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
    },
    []
  );

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
  }, [groupExperiences]);

  // Generate AI-friendly Markdown for export
  const resumeMarkdown = useMemo(() => {
    if (skillsWithYears.length === 0 || _experiences.length === 0) {
      return "";
    }
    return generateResumeMarkdown(_experiences, skillsWithYears);
  }, [_experiences, skillsWithYears]);

  const extractTechTags = useCallback((description: string): string[] => {
    if (!description) return [];
    // languageMap の extractTechnologies を使用
    return extractTechnologies(description);
  }, []);

  const formatDescription = (description: string): React.ReactElement[] => {
    if (!description) return [];

    return description
      .split("\n")
      .map((line, index) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return null;

        if (line.startsWith("●") || line.startsWith("*")) {
          return (
            <li key={`${index}-disc`} className="ml-4 list-disc">
              {line.substring(1).trim()}
            </li>
          );
        }
        if (line.startsWith("　　■") || line.startsWith("    *")) {
          return (
            <li key={`${index}-sub`} className="ml-8 text-sm list-circle">
              {line.replace(/^[　■\s*]+/, "")}
            </li>
          );
        }
        if (line.startsWith("　○") || line.startsWith("  *")) {
          return (
            <li key={`${index}-circle`} className="ml-6 list-circle">
              {line.replace(/^[　○\s*]+/, "")}
            </li>
          );
        }
        return (
          <p key={`${index}-para`} className="mb-1">
            {trimmedLine}
          </p>
        );
      })
      .filter(Boolean) as React.ReactElement[];
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-200">
      <nav className="p-6 border-b border-white/10 backdrop-blur-lg bg-black/20">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-lg font-bold hover:text-purple-400 transition-colors flex items-center gap-2"
          >
            Home
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Resume
          </h1>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white animate-fade-in">
                Resume
              </h1>
              <CopyResumeButton markdown={resumeMarkdown} variant="primary" />
            </div>
          </header>

          <SkillsSection skills={skillsWithYears} loading={loading} />

          <ExperienceSection
            groupedExperiences={groupedExperiences}
            loading={loading}
            formatDate={formatDateRange}
            extractTechTags={extractTechTags}
            formatDescription={formatDescription}
          />

          <ExportSection />
        </div>
      </main>

      <footer className="mt-auto py-6 text-center text-sm text-slate-400 border-t border-white/10 backdrop-blur-lg bg-black/20">
        <p>
          © {new Date().getFullYear()} tkt | Data from{" "}
          <a
            href="https://lapras.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            LAPRAS
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Resume;
