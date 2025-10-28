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
import { calculateSkillsWithYears } from "@/utils/calculateSkills";
import { getDeviconClass, isDeviconSupported } from "@/utils/devicon";
import { generateResumeMarkdown } from "@/utils/exportResumeMarkdown";
import { extractTechnologies } from "@/utils/languageMap";
import experiencesData from "../data/experiences.json";

const MAX_CONSECUTIVE_GAP = 1; // Maximum gap allowed between periods to be considered consecutive (1 month)
const PROGRESS_BAR_MAX_MONTHS = 24; // 2 years maximum for progress bar calculation

interface Position {
  id: number;
  job_position_name: string;
}

interface Experience {
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

interface GroupedExperience {
  organization_name: string;
  is_client_work: boolean;
  client_company_name: string;
  total_start_year: number;
  total_start_month: number;
  total_end_year: number | null;
  total_end_month: number | null;
  experiences: Experience[];
}

interface SkillWithYears {
  name: string;
  years: number;
  months: number;
}

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

  const formatDate = (
    year: number,
    month: number,
    endYear: number | null,
    endMonth: number | null
  ): string => {
    if (!year) return "";

    const startDate = `${year}/${String(month).padStart(2, "0")}`;

    if (!endYear || endYear === 0) {
      return `${startDate} - Present`;
    }

    const endDate = `${endYear}/${String(endMonth).padStart(2, "0")}`;
    return `${startDate} - ${endDate}`;
  };

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
          <header className="mb-12 text-center">
            <div className="flex flex-col items-center gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white animate-fade-in">
                Resume
              </h1>
              <CopyResumeButton markdown={resumeMarkdown} variant="primary" />
            </div>
            <p className="text-slate-400 text-sm mt-2">
              Export formats:{" "}
              <a
                href="/resume.md"
                className="text-purple-400 hover:text-purple-300 transition-colors"
                download
              >
                Markdown
              </a>
              <span className="mx-2">•</span>
              <a
                href="/resume.txt"
                className="text-purple-400 hover:text-purple-300 transition-colors"
                download
              >
                Plain Text
              </a>
              <span className="mx-2">•</span>
              <a
                href="/resume.json"
                className="text-purple-400 hover:text-purple-300 transition-colors"
                download
              >
                JSON
              </a>
            </p>
          </header>

          <section className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="rounded-md p-2 md:p-3 bg-white/5 backdrop-blur-lg border border-white/10 animate-pulse"
                  >
                    <div className="h-4 bg-white/10 rounded w-2/3 mb-1" />
                    <div className="h-3 bg-white/10 rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                {skillsWithYears.map((skill) => (
                  <div
                    key={skill.name}
                    className="rounded-md p-2 md:p-3 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 md:hover:shadow-lg md:hover:shadow-purple-500/20 md:hover:-translate-y-1"
                  >
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xs md:text-sm font-semibold text-purple-200 truncate">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] md:text-xs text-purple-300">
                        {skill.years > 0 && `${skill.years}年`}
                        {skill.months > 0 && `${skill.months}ヶ月`}
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1 md:h-1.5 mt-1.5">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min(100, ((skill.years * 12 + skill.months) / PROGRESS_BAR_MAX_MONTHS) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Professional Experience
            </h2>

            {loading ? (
              <div className="space-y-6 md:space-y-8">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-lg p-4 md:p-6 bg-white/5 backdrop-blur-lg border border-white/10 animate-pulse"
                  >
                    <div className="h-5 md:h-6 bg-white/10 rounded w-1/3 mb-3 md:mb-4" />
                    <div className="h-4 bg-white/10 rounded w-1/2 mb-2" />
                    <div className="h-4 bg-white/10 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative">
                <div className="absolute left-2 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent" />
                <div className="space-y-6 md:space-y-8">
                  {groupedExperiences.map((group, index) => (
                    <div
                      key={`${group.organization_name}-${group.total_start_year}-${group.total_start_month}`}
                      className="relative"
                    >
                      <div className="absolute left-0 md:left-6 w-4 h-4 bg-purple-500 rounded-full border-4 border-slate-900 shadow-lg shadow-purple-500/50" />
                      <div
                        className="ml-8 md:ml-16 rounded-lg p-4 md:p-6 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 md:hover:shadow-lg md:hover:shadow-purple-500/20 md:hover:-translate-y-1"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex flex-col md:flex-row md:justify-between mb-3 md:mb-4">
                          <div className="flex-1">
                            <h3 className="text-base md:text-lg font-bold text-white">
                              {group.organization_name}
                              {group.is_client_work &&
                                group.client_company_name && (
                                  <span className="text-xs md:text-sm text-slate-400 ml-1 md:ml-2 font-normal">
                                    ({group.client_company_name})
                                  </span>
                                )}
                            </h3>
                            <div className="mt-2 flex flex-wrap gap-1 md:gap-2">
                              {Array.from(
                                new Set(
                                  group.experiences.flatMap((exp) =>
                                    exp.positions.map(
                                      (pos) => pos.job_position_name
                                    )
                                  )
                                )
                              ).map((positionName) => (
                                <span
                                  key={positionName}
                                  className="inline-block px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full border border-purple-500/30"
                                >
                                  {positionName}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-xs md:text-sm text-slate-400 mt-2 md:mt-0 font-mono">
                            {formatDate(
                              group.total_start_year,
                              group.total_start_month,
                              group.total_end_year,
                              group.total_end_month
                            )}
                          </p>
                        </div>

                        {/* グループ内の個別の経験を表示 */}
                        {group.experiences.length > 1 ? (
                          <div className="space-y-3 md:space-y-4 mt-3 md:mt-4">
                            {group.experiences.map((exp, _expIndex) => (
                              <div
                                key={exp.id}
                                className="border-l-2 border-purple-500/30 pl-3 md:pl-4"
                              >
                                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                                  <h4 className="text-sm md:text-base font-semibold text-purple-200">
                                    {exp.position_name}
                                  </h4>
                                  <p className="text-[10px] md:text-xs text-slate-400 font-mono">
                                    {formatDate(
                                      exp.start_year,
                                      exp.start_month,
                                      exp.end_year,
                                      exp.end_month
                                    )}
                                  </p>
                                </div>
                                {exp.description && (
                                  <>
                                    <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
                                      {extractTechTags(exp.description).map(
                                        (tech) => {
                                          const isSupported =
                                            isDeviconSupported(tech);
                                          return (
                                            <span
                                              key={tech}
                                              className="px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 rounded-md border border-blue-500/30 inline-flex items-center gap-1"
                                            >
                                              {isSupported && (
                                                <i
                                                  className={`${getDeviconClass(
                                                    tech,
                                                    "plain"
                                                  )} text-xs md:text-sm`}
                                                />
                                              )}
                                              {tech}
                                            </span>
                                          );
                                        }
                                      )}
                                    </div>
                                    <div className="text-slate-300 space-y-1 text-xs md:text-sm">
                                      {formatDescription(exp.description)}
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <>
                            <h4 className="text-sm md:text-base font-semibold text-purple-200 mb-2">
                              {group.experiences[0].position_name}
                            </h4>
                            {group.experiences[0].description && (
                              <>
                                <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
                                  {extractTechTags(
                                    group.experiences[0].description
                                  ).map((tech) => {
                                    const isSupported =
                                      isDeviconSupported(tech);
                                    return (
                                      <span
                                        key={tech}
                                        className="px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 rounded-md border border-blue-500/30 inline-flex items-center gap-1"
                                      >
                                        {isSupported && (
                                          <i
                                            className={`${getDeviconClass(
                                              tech,
                                              "plain"
                                            )} text-xs md:text-sm`}
                                          />
                                        )}
                                        {tech}
                                      </span>
                                    );
                                  })}
                                </div>
                                <div className="text-slate-300 space-y-1 text-xs md:text-sm">
                                  {formatDescription(
                                    group.experiences[0].description
                                  )}
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
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

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default Resume;
