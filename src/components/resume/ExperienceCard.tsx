/**
 * Purpose:
 * 職務経験カードを表示するコンポーネント。
 * グループ化された経験を表示し、複数の経験がある場合は展開表示する。
 *
 * Context:
 * - Resume.tsxから分離されたコンポーネント
 * - GroupedExperienceデータを受け取り、シンプルなカード形式で表示
 * - 技術バッジ、期間、役職を表示
 * - ミニマルデザイン: 控えめなボーダーとホバーのみ
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
    ? "border-l-2 border-stone-200 pl-3 md:pl-4"
    : "";

  return (
    <div className={borderClass}>
      <div className="mb-2 flex flex-col md:flex-row md:justify-between">
        <h4 className="text-sm font-medium text-stone-700 md:text-base">
          {getDisplayPositionName(exp)}
        </h4>
        {!hideDuration && (
          <p className="font-mono text-[10px] text-stone-400 md:text-xs">
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
          <div className="mb-2 flex flex-wrap gap-1 md:mb-3 md:gap-1.5">
            {extractTechTags(exp.description).map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
          <div className="space-y-1 text-xs leading-relaxed text-stone-600 md:text-sm">
            {formatDescription(exp.description)}
          </div>
        </>
      )}
    </div>
  );
}

export function ExperienceCard({
  group,
  index: _index,
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
      {/* タイムラインドット */}
      <div
        className="absolute left-0 h-[15px] w-[15px] rounded-full border-2 border-stone-300 bg-white"
        aria-hidden="true"
      />
      <article
        className="ml-8 rounded-lg border border-stone-200 p-4 transition-colors duration-200 hover:border-stone-300 md:p-5"
        aria-labelledby={cardId}
      >
        <header className="mb-3 flex flex-col md:flex-row md:justify-between">
          <div className="flex-1">
            <h3
              id={cardId}
              className="text-base font-bold text-stone-900 md:text-lg"
            >
              {group.organization_name}
              {group.is_client_work && group.client_company_name && (
                <span className="ml-1 text-xs font-normal text-stone-400 md:ml-2 md:text-sm">
                  ({group.client_company_name})
                </span>
              )}
            </h3>
            <ul
              className="mt-1.5 flex list-none flex-wrap gap-1 md:gap-1.5"
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
            className="mt-2 font-mono text-xs text-stone-400 md:mt-0 md:text-sm"
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

        <div
          className={
            group.experiences.length > 1
              ? "mt-3 space-y-3 md:mt-4 md:space-y-4"
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
