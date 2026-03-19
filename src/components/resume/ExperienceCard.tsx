/**
 * Purpose:
 * 職務経験を表示するコンポーネント。
 * グループ化された経験を余白とタイポグラフィで区切り、ボーダーボックスに頼らない。
 *
 * Context:
 * - Resume.tsxから分離されたコンポーネント
 * - GroupedExperienceデータを受け取る
 * - ノンデザイナーズデザインブックの原則: 近接・整列・反復・コントラスト
 * - ボーダーなし、余白で語るデザイン
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
  /** 複数経験がある場合にインデント表示する */
  isNested?: boolean;
  /** 期間を非表示にするか（単一経験で親に期間がある場合） */
  hideDuration?: boolean;
}

function ExperienceDetail({
  exp,
  formatDate,
  extractTechTags,
  formatDescription,
  isNested = false,
  hideDuration = false,
}: ExperienceDetailProps) {
  return (
    <div className={isNested ? "pl-3 md:pl-4" : ""}>
      <div className="mb-1.5 flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between">
        <h4 className="text-sm font-medium text-stone-700">
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
          <div className="mb-2 flex flex-wrap gap-1">
            {extractTechTags(exp.description).map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
          <div className="space-y-0.5 text-xs leading-relaxed text-stone-500 md:text-sm">
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
    <li className="list-none">
      <article aria-labelledby={cardId}>
        {/* ヘッダー: 組織名 + 期間を強い左揃えで */}
        <header className="mb-2">
          <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            <h3
              id={cardId}
              className="text-base font-bold tracking-tight text-stone-900 md:text-lg"
            >
              {group.organization_name}
              {group.is_client_work && group.client_company_name && (
                <span className="ml-1.5 text-xs font-normal text-stone-400 md:text-sm">
                  ({group.client_company_name})
                </span>
              )}
            </h3>
            <time
              className="shrink-0 font-mono text-xs text-stone-400"
              dateTime={`${group.total_start_year}-${String(group.total_start_month).padStart(2, "0")}`}
            >
              {formatDate(
                group.total_start_year,
                group.total_start_month,
                group.total_end_year,
                group.total_end_month
              )}
            </time>
          </div>
          {/* 職種: テキストのみで控えめに表示 */}
          <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5">
            {uniquePositions.map((positionName) => (
              <PositionBadge key={positionName} name={positionName} />
            ))}
          </div>
        </header>

        {/* 経験詳細 */}
        <div className={group.experiences.length > 1 ? "space-y-4" : ""}>
          {group.experiences.map((exp) => (
            <ExperienceDetail
              key={exp.id}
              exp={exp}
              formatDate={formatDate}
              extractTechTags={extractTechTags}
              formatDescription={formatDescription}
              isNested={group.experiences.length > 1}
              hideDuration={group.experiences.length === 1}
            />
          ))}
        </div>
      </article>
    </li>
  );
}
