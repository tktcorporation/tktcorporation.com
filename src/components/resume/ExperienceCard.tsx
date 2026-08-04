/**
 * Purpose:
 * 会社単位でグループ化された職務経験をタイムラインUIで表示するコンポーネント。
 * 左ボーダー+ドットマーカーで視覚的な構造を表現し、
 * スクロール時でも会社の境界が明確になるようデザイン。
 *
 * Context:
 * - CompanyGroup を受け取り、会社単位でまとめて表示
 * - タイムラインUI: 縦線 + ドットマーカーで時系列を表現
 * - 閉じた状態でも職種・役職・期間は常に表示し、説明のみアコーディオンで開閉
 * - design-system.md のトークンに準拠
 */

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import type {
  CompanyGroup,
  DateFormatter,
  DescriptionFormatter,
  Experience,
  TechExtractor,
} from "@/types/experience";
import {
  getAllPositionNames,
  getDisplayPositionName,
} from "@/types/experience";

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

interface RoleSummaryProps {
  exp: Experience;
  formatDate: DateFormatter;
  expanded?: boolean;
  showToggle?: boolean;
}

/**
 * 閉じた状態でも見せる職種・役職・期間のサマリー
 */
function RoleSummary({
  exp,
  formatDate,
  expanded = false,
  showToggle = false,
}: RoleSummaryProps) {
  const roleNames = getAllPositionNames(exp);
  const roleLabel =
    roleNames.length > 0 ? roleNames.join(" · ") : getDisplayPositionName(exp);
  const jobCategory = exp.position_name.trim();
  const showJobCategory =
    jobCategory.length > 0 && !roleNames.includes(jobCategory);
  const dateLabel = formatDate(
    exp.start_year,
    exp.start_month,
    exp.end_year,
    exp.end_month
  );

  return (
    <span className="flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between md:gap-3">
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
          {showToggle && (
            <ChevronDown
              aria-hidden="true"
              className={`h-3.5 w-3.5 shrink-0 text-stone-300 transition-all duration-200 ${
                expanded ? "rotate-180 text-stone-400" : ""
              }`}
            />
          )}
          <span className="text-sm font-medium">{roleLabel}</span>
          {exp.is_client_work && exp.client_company_name && (
            <span className="text-[10px] text-stone-400">業務委託</span>
          )}
        </span>
        {showJobCategory && (
          <span className="flex items-baseline gap-x-2">
            {showToggle && (
              <span className="inline-block h-3.5 w-3.5 shrink-0" />
            )}
            <span className="text-[10px] text-stone-400 md:text-xs">
              {jobCategory}
            </span>
          </span>
        )}
      </span>
      <span className="shrink-0 font-mono text-[10px] text-stone-400 md:text-xs">
        {dateLabel}
      </span>
    </span>
  );
}

/**
 * 個別の経験（ロール）をタイムラインエントリとして表示。
 * 職種・役職は常に表示し、説明のみデフォルト閉じのアコーディオンにする。
 */
function RoleEntry({
  exp,
  formatDate,
  extractTechTags,
  formatDescription,
}: RoleEntryProps) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = Boolean(exp.description?.trim());
  const panelId = `role-details-${exp.id}`;

  return (
    <div className="relative pl-6 md:pl-8">
      {/* ロールドット */}
      <div className="absolute top-2 left-[3px] h-1.5 w-1.5 rounded-full bg-stone-300" />

      {hasDetails ? (
        <div>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={expanded ? panelId : undefined}
            onClick={() => setExpanded((value) => !value)}
            className="w-full rounded-sm text-left text-stone-700 transition-colors duration-200 hover:text-stone-900 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-400"
          >
            <RoleSummary
              exp={exp}
              formatDate={formatDate}
              expanded={expanded}
              showToggle
            />
          </button>

          {expanded && (
            <div id={panelId} className="mt-1.5">
              <div className="mb-1.5 flex flex-wrap gap-1">
                {extractTechTags(exp.description).map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
              <div className="space-y-1 text-xs leading-relaxed text-stone-500 md:text-sm">
                {formatDescription(exp.description)}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-stone-700">
          <RoleSummary exp={exp} formatDate={formatDate} />
        </div>
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
        <div className="space-y-5 md:space-y-6">
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
