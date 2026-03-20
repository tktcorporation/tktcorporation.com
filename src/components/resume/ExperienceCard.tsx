/**
 * Purpose:
 * 会社単位でグループ化された職務経験をタイムラインUIで表示するコンポーネント。
 * 左ボーダー+ドットマーカーで視覚的な構造を表現し、
 * スクロール時でも会社の境界が明確になるようデザイン。
 *
 * Context:
 * - CompanyGroup を受け取り、会社単位でまとめて表示
 * - タイムラインUI: 縦線 + ドットマーカーで時系列を表現
 * - design-system.md のトークンに準拠
 */

import type {
  CompanyGroup,
  DateFormatter,
  DescriptionFormatter,
  Experience,
  TechExtractor,
} from "@/types/experience";
import { getDisplayPositionName } from "@/types/experience";

import { TechBadge } from "./TechBadge";

export interface CompanyGroupCardProps {
  company: CompanyGroup;
  formatDate: DateFormatter;
  extractTechTags: TechExtractor;
  formatDescription: DescriptionFormatter;
  /** 最後の会社かどうか（縦線の長さ制限に使用） */
  isLast?: boolean;
}

interface RoleEntryProps {
  exp: Experience;
  formatDate: DateFormatter;
  extractTechTags: TechExtractor;
  formatDescription: DescriptionFormatter;
}

/**
 * 個別の経験（ロール）をタイムラインエントリとして表示
 */
function RoleEntry({
  exp,
  formatDate,
  extractTechTags,
  formatDescription,
}: RoleEntryProps) {
  return (
    <div className="relative pl-6 md:pl-8">
      {/* ロールドット */}
      <div className="absolute top-2 left-[3px] h-1.5 w-1.5 rounded-full bg-stone-300" />

      <div className="mb-1 flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <h4 className="text-sm font-medium text-stone-700">
            {getDisplayPositionName(exp)}
          </h4>
          {exp.is_client_work && exp.client_company_name && (
            <span className="text-[10px] text-stone-400">業務委託</span>
          )}
        </div>
        <p className="shrink-0 font-mono text-[10px] text-stone-400 md:text-xs">
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
 * 会社単位のタイムラインカード
 * 左にタイムラインの縦線+ドットマーカー、右に会社名と経験詳細
 */
export function CompanyGroupCard({
  company,
  formatDate,
  extractTechTags,
  formatDescription,
  isLast = false,
}: CompanyGroupCardProps) {
  const cardId = `company-${company.company_name.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`;

  // 全経験を新しい順にフラット表示
  const allExperiences = company.groups.flatMap((g) => g.experiences);

  return (
    <li className="list-none">
      <article aria-labelledby={cardId} className="relative pl-6 md:pl-8">
        {/* タイムライン縦線 */}
        <div
          className={`absolute top-3 left-[5px] w-px bg-stone-200 ${
            isLast ? "bottom-6" : "bottom-0"
          }`}
        />

        {/* 会社ドット */}
        <div className="absolute top-1.5 left-0 h-3 w-3 rounded-full bg-blue-400" />

        {/* 会社ヘッダー */}
        <header className="mb-6">
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

        {/* ロール一覧 */}
        <div className="space-y-8">
          {allExperiences.map((exp) => (
            <RoleEntry
              key={exp.id}
              exp={exp}
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
