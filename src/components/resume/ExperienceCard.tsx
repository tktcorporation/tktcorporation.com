/**
 * Purpose:
 * 会社単位でグループ化された職務経験を表示するコンポーネント。
 * 会社ヘッダー → 期間ごとの経験詳細という階層構造で、
 * 余白・タイポグラフィ・視覚的強弱で理解しやすい構造を作る。
 *
 * Context:
 * - CompanyGroup を受け取り、会社単位でまとめて表示
 * - 会社ヘッダーは大きく目立たせ、各期間は控えめに
 * - ノンデザイナーズデザインブックの原則: 近接・整列・反復・コントラスト
 * - ボーダーなし、余白で語るデザイン
 */

import type {
  CompanyGroup,
  DateFormatter,
  DescriptionFormatter,
  Experience,
  GroupedExperience,
  TechExtractor,
} from "@/types/experience";
import { getDisplayPositionName } from "@/types/experience";

import { PositionBadge, TechBadge } from "./TechBadge";

export interface CompanyGroupCardProps {
  company: CompanyGroup;
  formatDate: DateFormatter;
  extractTechTags: TechExtractor;
  formatDescription: DescriptionFormatter;
}

interface RoleDetailProps {
  exp: Experience;
  formatDate: DateFormatter;
  extractTechTags: TechExtractor;
  formatDescription: DescriptionFormatter;
}

/**
 * 個別の経験（ロール）を表示
 */
function RoleDetail({
  exp,
  formatDate,
  extractTechTags,
  formatDescription,
}: RoleDetailProps) {
  return (
    <div className="pl-3 md:pl-4">
      <div className="mb-1.5 flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between">
        <h4 className="text-sm font-medium text-stone-700">
          {getDisplayPositionName(exp)}
        </h4>
        <p className="font-mono text-[10px] text-stone-400 md:text-xs">
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
          <div className="mb-1.5 flex flex-wrap gap-1">
            {extractTechTags(exp.description).map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
          <div className="space-y-1 text-xs leading-relaxed text-stone-500 md:text-sm">
            {formatDescription(exp.description)}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * グループ内の経験リストを表示（同一期間グループ内に複数経験がある場合）
 */
function GroupedRoles({
  group,
  formatDate,
  extractTechTags,
  formatDescription,
}: {
  group: GroupedExperience;
  formatDate: DateFormatter;
  extractTechTags: TechExtractor;
  formatDescription: DescriptionFormatter;
}) {
  const uniquePositions = Array.from(
    new Set(
      group.experiences.flatMap((exp) =>
        exp.positions.map((pos) => pos.job_position_name)
      )
    )
  );

  // 単一経験の場合はシンプルに表示
  if (group.experiences.length === 1) {
    const exp = group.experiences[0];
    return (
      <div>
        <div className="mb-1 flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <h4 className="text-sm font-medium text-stone-700">
              {getDisplayPositionName(exp)}
            </h4>
            {group.is_client_work && group.client_company_name && (
              <span className="text-xs text-stone-400">
                ({group.client_company_name})
              </span>
            )}
          </div>
          <p className="font-mono text-[10px] text-stone-400 md:text-xs">
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
            <div className="mb-1.5 flex flex-wrap gap-1">
              {extractTechTags(exp.description).map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
            <div className="space-y-1 text-xs leading-relaxed text-stone-500 md:text-sm">
              {formatDescription(exp.description)}
            </div>
          </>
        )}
      </div>
    );
  }

  // 複数経験の場合はサブヘッダー付きで表示
  return (
    <div>
      <div className="mb-2 flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          {uniquePositions.map((positionName) => (
            <PositionBadge key={positionName} name={positionName} />
          ))}
          {group.is_client_work && group.client_company_name && (
            <span className="text-xs text-stone-400">
              ({group.client_company_name})
            </span>
          )}
        </div>
        <p className="shrink-0 font-mono text-[10px] text-stone-400 md:text-xs">
          {formatDate(
            group.total_start_year,
            group.total_start_month,
            group.total_end_year,
            group.total_end_month
          )}
        </p>
      </div>
      <div className="space-y-4">
        {group.experiences.map((exp) => (
          <RoleDetail
            key={exp.id}
            exp={exp}
            formatDate={formatDate}
            extractTechTags={extractTechTags}
            formatDescription={formatDescription}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * 会社単位のカード
 * 会社名を大きなヘッダーとして、その下に期間ごとの経験をまとめて表示
 */
export function CompanyGroupCard({
  company,
  formatDate,
  extractTechTags,
  formatDescription,
}: CompanyGroupCardProps) {
  const cardId = `company-${company.company_name.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`;

  return (
    <li className="list-none">
      <article aria-labelledby={cardId}>
        {/* 会社ヘッダー */}
        <header className="mb-4">
          <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            <h3
              id={cardId}
              className="text-base font-bold tracking-tight text-stone-900 md:text-lg"
            >
              {company.company_name}
            </h3>
            <time
              className="shrink-0 font-mono text-xs text-stone-400"
              dateTime={`${company.overall_start_year}-${String(company.overall_start_month).padStart(2, "0")}`}
            >
              {formatDate(
                company.overall_start_year,
                company.overall_start_month,
                company.overall_end_year,
                company.overall_end_month
              )}
            </time>
          </div>
        </header>

        {/* 期間ごとの経験 */}
        <div className="space-y-6">
          {company.groups.map((group) => (
            <GroupedRoles
              key={`${group.total_start_year}-${group.total_start_month}`}
              group={group}
              formatDate={formatDate}
              extractTechTags={extractTechTags}
              formatDescription={formatDescription}
            />
          ))}
        </div>
      </article>
    </li>
  );
}
