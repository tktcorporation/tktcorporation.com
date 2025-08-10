import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import experiencesData from "../data/experiences.json";

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

function Resume() {
  const [_experiences, setExperiences] = useState<Experience[]>([]);
  const [groupedExperiences, setGroupedExperiences] = useState<
    GroupedExperience[]
  >([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const extractSkills = useCallback((exps: Experience[]): string[] => {
    const skillSet = new Set<string>();
    const techRegex =
      /\b(AWS|Docker|Python|Django|TypeScript|Vue|React|Node\.js|JavaScript|Kotlin|Android|iOS|Swift|Java|Crystal|NestJS|MySQL|PostgreSQL|DynamoDB|Redis|MongoDB|Elasticsearch|BigQuery|Lambda|S3|CloudFormation|CloudFront|Route53|ECR|ECS|CircleCI|GitHub Actions|GitLab|Bitbucket|Selenium|Terraform|Kubernetes|Firebase|Figma|Jira|Vite|Tailwind CSS)\b/gi;

    for (const exp of exps) {
      if (exp.description) {
        const matches = exp.description.match(techRegex);
        if (matches) {
          for (const skill of matches) {
            skillSet.add(skill);
          }
        }
      }
    }

    return Array.from(skillSet);
  }, []);

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
      // Maximum gap allowed between periods to be considered consecutive (1 month)
      const MAX_CONSECUTIVE_GAP = 1;

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
            const prevEndDate = prev.end_year * 12 + (prev.end_month || 0);
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

    setExperiences(sortedExperiences);
    setGroupedExperiences(grouped);
    setSkills(extractSkills(sortedExperiences));
    setLoading(false);
  }, [extractSkills, groupExperiences]);

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-950 text-slate-200">
      <nav className="p-6 border-b border-white/10 backdrop-blur-lg bg-black/20">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-lg font-bold hover:text-purple-400 transition-colors flex items-center gap-2"
          >
            <span>←</span> Back to Home
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Resume
          </h1>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
              tkt
            </h1>
            <p className="text-xl text-purple-300 animate-fade-in animation-delay-100">
              Web Application Developer
            </p>
            <p className="text-base text-slate-400 mt-2 animate-fade-in animation-delay-200">
              Japan 🇯🇵
            </p>
          </header>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Professional Experience
            </h2>

            {loading ? (
              <div className="space-y-8">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-lg p-6 bg-white/5 backdrop-blur-lg border border-white/10 animate-pulse"
                  >
                    <div className="h-6 bg-white/10 rounded w-1/3 mb-4" />
                    <div className="h-4 bg-white/10 rounded w-1/2 mb-2" />
                    <div className="h-4 bg-white/10 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent" />
                <div className="space-y-8">
                  {groupedExperiences.map((group, index) => (
                    <div
                      key={`${group.organization_name}-${group.total_start_year}-${group.total_start_month}`}
                      className="relative"
                    >
                      <div className="absolute left-6 w-4 h-4 bg-purple-500 rounded-full border-4 border-slate-900 shadow-lg shadow-purple-500/50" />
                      <div
                        className="ml-16 rounded-lg p-6 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex flex-col md:flex-row md:justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-white">
                              {group.organization_name}
                              {group.is_client_work &&
                                group.client_company_name && (
                                  <span className="text-sm text-slate-400 ml-2 font-normal">
                                    ({group.client_company_name})
                                  </span>
                                )}
                            </h3>
                            <div className="mt-2 flex flex-wrap gap-2">
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
                                  className="inline-block px-3 py-1 text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full border border-purple-500/30"
                                >
                                  {positionName}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-slate-400 mt-2 md:mt-0 font-mono">
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
                          <div className="space-y-4 mt-4">
                            {group.experiences.map((exp, _expIndex) => (
                              <div
                                key={exp.id}
                                className="border-l-2 border-purple-500/30 pl-4"
                              >
                                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                                  <h4 className="text-base font-semibold text-purple-200">
                                    {exp.position_name}
                                  </h4>
                                  <p className="text-xs text-slate-400 font-mono">
                                    {formatDate(
                                      exp.start_year,
                                      exp.start_month,
                                      exp.end_year,
                                      exp.end_month
                                    )}
                                  </p>
                                </div>
                                {exp.description && (
                                  <div className="text-slate-300 space-y-1 text-sm">
                                    {formatDescription(exp.description)}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <>
                            <h4 className="text-base font-semibold text-purple-200 mb-2">
                              {group.experiences[0].position_name}
                            </h4>
                            {group.experiences[0].description && (
                              <div className="text-slate-300 space-y-1 text-sm">
                                {formatDescription(
                                  group.experiences[0].description
                                )}
                              </div>
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

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full text-sm text-purple-200 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-lg hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
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
