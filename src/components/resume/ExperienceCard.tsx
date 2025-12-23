/**
 * Purpose:
 * 職務経験カードを表示するコンポーネント。
 * グループ化された経験を表示し、複数の経験がある場合は展開表示する。
 *
 * Context:
 * - Resume.tsxから分離されたコンポーネント
 * - GroupedExperienceデータを受け取り、カード形式で表示
 * - 技術バッジ、期間、役職を表示
 */

import type {
  DateFormatter,
  DescriptionFormatter,
  Experience,
  GroupedExperience,
  TechExtractor,
} from "@/types/experience";
import { getDisplayPositionName } from "@/types/experience";
import { PositionBadge, TechBadge } from "./TechBadge";

export interface ExperienceCardProps {
  group: GroupedExperience;
  index: number;
  formatDate: DateFormatter;
  extractTechTags: TechExtractor;
  formatDescription: DescriptionFormatter;
}

interface ExperienceDetailProps {
  exp: Experience;
  formatDate: DateFormatter;
  extractTechTags: TechExtractor;
  formatDescription: DescriptionFormatter;
  /** 左ボーダーを表示するか（複数経験の場合のみtrue） */
  showBorder?: boolean;
  /** 期間を非表示にするか（単一経験でカード全体に期間がある場合） */
  hideDuration?: boolean;
}

function ExperienceDetail({
  exp,
  formatDate,
  extractTechTags,
  formatDescription,
  showBorder = true,
  hideDuration = false,
}: ExperienceDetailProps) {
  const borderClass = showBorder
    ? "border-l-2 border-purple-500/30 pl-3 md:pl-4"
    : "";

  return (
    <div className={borderClass}>
      <div className="flex flex-col md:flex-row md:justify-between mb-2">
        <h4 className="text-sm md:text-base font-semibold text-purple-200">
          {getDisplayPositionName(exp)}
        </h4>
        {!hideDuration && (
          <p className="text-[10px] md:text-xs text-slate-400 font-mono">
            {formatDate(
              exp.start_year,
              exp.start_month,
              exp.end_year,
              exp.end_month
            )}
          </p>
        )}
      </div>
      {exp.description && (
        <>
          <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
            {extractTechTags(exp.description).map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
          <div className="text-slate-300 space-y-1 text-xs md:text-sm">
            {formatDescription(exp.description)}
          </div>
        </>
      )}
    </div>
  );
}

export function ExperienceCard({
  group,
  index,
  formatDate,
  extractTechTags,
  formatDescription,
}: ExperienceCardProps) {
  const uniquePositions = Array.from(
    new Set(
      group.experiences.flatMap((exp) =>
        exp.positions.map((pos) => pos.job_position_name)
      )
    )
  );
  const cardId = `exp-${group.organization_name.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}-${group.total_start_year}`;

  return (
    <li
      key={`${group.organization_name}-${group.total_start_year}-${group.total_start_month}`}
      className="relative list-none"
    >
      {/* タイムラインドット（装飾要素） */}
      <div
        className="absolute left-0 md:left-6 w-4 h-4 bg-purple-500 rounded-full border-4 border-slate-900 shadow-lg shadow-purple-500/50"
        aria-hidden="true"
      />
      <article
        className="ml-8 md:ml-16 rounded-lg p-4 md:p-6 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 md:hover:shadow-lg md:hover:shadow-purple-500/20 md:hover:-translate-y-1"
        style={{ animationDelay: `${index * 0.1}s` }}
        aria-labelledby={cardId}
      >
        <header className="flex flex-col md:flex-row md:justify-between mb-3 md:mb-4">
          <div className="flex-1">
            <h3
              id={cardId}
              className="text-base md:text-lg font-bold text-white"
            >
              {group.organization_name}
              {group.is_client_work && group.client_company_name && (
                <span className="text-xs md:text-sm text-slate-400 ml-1 md:ml-2 font-normal">
                  ({group.client_company_name})
                </span>
              )}
            </h3>
            <ul
              className="mt-2 flex flex-wrap gap-1 md:gap-2 list-none"
              aria-label="Positions"
            >
              {uniquePositions.map((positionName) => (
                <li key={positionName}>
                  <PositionBadge name={positionName} />
                </li>
              ))}
            </ul>
          </div>
          <time
            className="text-xs md:text-sm text-slate-400 mt-2 md:mt-0 font-mono"
            dateTime={`${group.total_start_year}-${String(group.total_start_month).padStart(2, "0")}`}
          >
            {formatDate(
              group.total_start_year,
              group.total_start_month,
              group.total_end_year,
              group.total_end_month
            )}
          </time>
        </header>

        {/* 経験リストを統一的にレンダリング */}
        <div
          className={
            group.experiences.length > 1
              ? "space-y-3 md:space-y-4 mt-3 md:mt-4"
              : ""
          }
        >
          {group.experiences.map((exp) => (
            <ExperienceDetail
              key={exp.id}
              exp={exp}
              formatDate={formatDate}
              extractTechTags={extractTechTags}
              formatDescription={formatDescription}
              showBorder={group.experiences.length > 1}
              hideDuration={group.experiences.length === 1}
            />
          ))}
        </div>
      </article>
    </li>
  );
}
