/**
 * Purpose:
 * 日付フォーマットのユーティリティ関数群。
 * プロジェクト全体で一貫した日付表示を提供する。
 *
 * Context:
 * - Resume.tsx、exportResumeMarkdown.tsなどで使用
 * - 期間の表示、経過月数の計算を統一
 */

export interface DateRange {
  startYear: number;
  startMonth: number;
  endYear: number | null;
  endMonth: number | null;
}

/**
 * 日付範囲を文字列にフォーマット
 * @example formatDateRange({ startYear: 2022, startMonth: 1, endYear: null, endMonth: null })
 * // => "2022/01 - Present"
 */
export function formatDateRange(
  startYear: number,
  startMonth: number,
  endYear: number | null,
  endMonth: number | null
): string {
  if (!startYear) return "";

  const startDate = `${startYear}/${String(startMonth).padStart(2, "0")}`;

  if (!endYear) {
    return `${startDate} - Present`;
  }

  const endDate = `${endYear}/${String(endMonth).padStart(2, "0")}`;
  return `${startDate} - ${endDate}`;
}

/**
 * 期間の長さを月数で計算
 */
export function calculateDurationMonths(
  startYear: number,
  startMonth: number,
  endYear: number | null,
  endMonth: number | null
): number {
  const startDate = new Date(startYear, startMonth - 1);
  const endDate =
    endYear && endMonth ? new Date(endYear, endMonth - 1) : new Date();

  return (
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    endDate.getMonth() -
    startDate.getMonth()
  );
}

/**
 * 月数を年月表示にフォーマット
 * @example formatDuration(14) // => "1 year 2 months"
 */
export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let duration = "";
  if (years > 0) duration += `${years} year${years > 1 ? "s" : ""}`;
  if (remainingMonths > 0) {
    if (duration) duration += " ";
    duration += `${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`;
  }

  return duration || "< 1 month";
}

/**
 * 月数を日本語の年月表示にフォーマット
 * @example formatDurationJa(14) // => "1年2ヶ月"
 */
export function formatDurationJa(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let duration = "";
  if (years > 0) duration += `${years}年`;
  if (remainingMonths > 0) duration += `${remainingMonths}ヶ月`;

  return duration || "1ヶ月未満";
}

/**
 * 日付範囲と経過期間を含めた完全な表示
 * @example formatDateRangeWithDuration(...)
 * // => "2022/01 - 2023/03 (1 year 2 months)"
 */
export function formatDateRangeWithDuration(
  startYear: number,
  startMonth: number,
  endYear: number | null,
  endMonth: number | null
): string {
  const range = formatDateRange(startYear, startMonth, endYear, endMonth);
  const months = calculateDurationMonths(
    startYear,
    startMonth,
    endYear,
    endMonth
  );
  const duration = formatDuration(months);

  return `${range} (${duration})`;
}
