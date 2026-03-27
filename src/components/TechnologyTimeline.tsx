/**
 * Purpose:
 * 技術活動の時系列表示コンポーネント。
 * Dia/Arc風の余白主導デザインで、タイポグラフィと
 * ホワイトスペースで情報階層を表現する。
 *
 * Context:
 * - カード・ボーダーを最小限に抑え、余白で区切る
 * - 期間ごとの活動をフラットなリストで表示
 * - 洗練されつつもワクワクする、控えめなアクセント
 */

import { Code2, FileText, GitPullRequest, Mic2 } from "lucide-react";

import type { TimelineEntry, TimeSpan } from "@/hooks/useLaprasActivities";
import { cn } from "@/lib/utils";
import { getTechIcon } from "@/utils/techIcons";

interface TechnologyTimelineProps {
  entries: TimelineEntry[];
  timeSpan: TimeSpan;
  onTimeSpanChange: (span: TimeSpan) => void;
}

export function TechnologyTimeline({
  entries,
  timeSpan,
  onTimeSpanChange,
}: TechnologyTimelineProps) {
  const formatPeriod = (start: Date, end: Date, index: number): string => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const startYear = start.getFullYear();
    const startMonth = start.getMonth();
    const endYear = end.getFullYear();
    const endMonth = end.getMonth();

    if (index === 0) {
      if (endYear === currentYear && endMonth === currentMonth) {
        switch (timeSpan) {
          case "1month":
            return "Now";
          case "6months":
            return "Recent";
          case "1year":
            return String(currentYear);
          default:
            return "Now";
        }
      }
      if (endYear === currentYear && timeSpan === "1year") {
        return String(currentYear);
      }
    }

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    switch (timeSpan) {
      case "1month":
        return `${monthNames[startMonth]} ${startYear}`;
      case "6months":
        if (startYear === endYear) {
          if (startMonth === endMonth) {
            return `${monthNames[startMonth]} ${startYear}`;
          }
          return `${monthNames[startMonth]}–${monthNames[endMonth]} ${startYear}`;
        }
        return `${monthNames[startMonth]} ${startYear}–${monthNames[endMonth]} ${endYear}`;
      case "1year":
        return startYear === endYear
          ? String(startYear)
          : `${startYear}–${endYear}`;
      default:
        return `${monthNames[startMonth]} ${startYear}`;
    }
  };

  const getTopLanguages = (
    languages: Record<string, number>,
    limit = 3
  ): [string, number][] => {
    return Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);
  };

  const timeSpanOptions = [
    { value: "1month" as const, label: "Monthly" },
    { value: "6months" as const, label: "Half-year" },
    { value: "1year" as const, label: "Yearly" },
  ];

  return (
    <div className="w-full">
      {/* 期間切り替え — ミニマルなセグメント */}
      <div className="mb-12 flex gap-1">
        {timeSpanOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onTimeSpanChange(opt.value)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs transition-colors duration-200",
              timeSpan === opt.value
                ? "bg-stone-900 text-white"
                : "text-stone-400 hover:text-stone-600"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* タイムライン */}
      <div className="space-y-16">
        {entries.map((entry, index) => {
          const topLangs = getTopLanguages(entry.languages);
          const hasRepos = entry.repositoryGroups.length > 0;
          const hasArticles = entry.articles.length > 0;
          const hasEvents = entry.events.length > 0;

          return (
            <section key={index}>
              {/* 期間ヘッダー — 大きなタイポグラフィ */}
              <div className="mb-8 flex items-baseline gap-4">
                <h2
                  className={cn(
                    "text-2xl font-bold tracking-tight md:text-3xl",
                    index === 0 ? "text-stone-900" : "text-stone-300"
                  )}
                >
                  {formatPeriod(entry.startDate, entry.endDate, index)}
                </h2>

                {/* 言語タグ — 控えめに */}
                {topLangs.length > 0 && (
                  <div className="flex items-center gap-2">
                    {topLangs.map(([lang]) => {
                      const Icon = getTechIcon(lang);
                      return (
                        <span
                          key={lang}
                          className="flex items-center gap-1 text-xs text-stone-400"
                        >
                          {Icon ? (
                            <Icon className="h-3.5 w-3.5" />
                          ) : (
                            <Code2 className="h-3 w-3" />
                          )}
                          {lang}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* リポジトリ — フラットリスト */}
              {hasRepos && (
                <div className="mb-6 space-y-1">
                  {entry.repositoryGroups.slice(0, 6).map((group, gIdx) => (
                    <a
                      key={gIdx}
                      href={group.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline gap-3 rounded-md px-1 py-1.5 transition-colors duration-200 hover:bg-stone-50"
                    >
                      <span className="min-w-0 flex-1 truncate text-sm text-stone-700 transition-colors duration-200 group-hover:text-stone-900">
                        {group.repository}
                      </span>
                      <span className="flex flex-shrink-0 items-center gap-2 text-xs text-stone-300">
                        {group.language && (
                          <span className="text-stone-400">
                            {group.language}
                          </span>
                        )}
                        {group.activitySummary.commits > 0 && (
                          <span className="flex items-center gap-0.5">
                            <Code2 className="h-3 w-3" />
                            {group.activitySummary.commits}
                          </span>
                        )}
                        {group.activitySummary.pullRequests > 0 && (
                          <span className="flex items-center gap-0.5 text-blue-400">
                            <GitPullRequest className="h-3 w-3" />
                            {group.activitySummary.pullRequests}
                          </span>
                        )}
                      </span>
                    </a>
                  ))}
                  {entry.repositoryGroups.length > 6 && (
                    <p className="px-1 pt-1 text-xs text-stone-300">
                      +{entry.repositoryGroups.length - 6} more
                    </p>
                  )}
                </div>
              )}

              {/* 記事 */}
              {hasArticles && (
                <div className="mb-6 space-y-1">
                  <div className="flex items-center gap-1.5 px-1 pb-1 text-xs text-stone-400">
                    <FileText className="h-3.5 w-3.5" />
                    <span>Articles</span>
                  </div>
                  {entry.articles.slice(0, 3).map((article, aIdx) => (
                    <a
                      key={aIdx}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline gap-3 rounded-md px-1 py-1.5 transition-colors duration-200 hover:bg-stone-50"
                    >
                      <span className="min-w-0 flex-1 truncate text-sm text-stone-600 transition-colors duration-200 group-hover:text-stone-900">
                        {article.title}
                      </span>
                      <span className="flex-shrink-0 text-xs text-stone-300">
                        {article.source}
                      </span>
                    </a>
                  ))}
                </div>
              )}

              {/* イベント */}
              {hasEvents && (
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 px-1 pb-1 text-xs text-stone-400">
                    <Mic2 className="h-3.5 w-3.5" />
                    <span>Events</span>
                  </div>
                  {entry.events.map((event, eIdx) => (
                    <a
                      key={eIdx}
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-md px-1 py-1.5 text-sm text-stone-600 transition-colors duration-200 hover:bg-stone-50 hover:text-stone-900"
                    >
                      {event.title}
                    </a>
                  ))}
                </div>
              )}

              {/* セクション区切り線 — 最後以外 */}
              {index < entries.length - 1 && (
                <div className="mt-12 h-px bg-stone-100" />
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
