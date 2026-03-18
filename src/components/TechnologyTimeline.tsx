/**
 * Purpose:
 * 技術活動の時系列表示コンポーネント。
 * 期間ごとにグループ化された活動を縦型のタイムラインで表示し、
 * 使用技術、リポジトリ、記事などの詳細情報を視覚的に提示する。
 *
 * Context:
 * - 職歴表示と同様の縦型タイムラインデザイン
 * - 期間ごとの活動サマリと詳細の両方を表示
 * - ミニマルなライトテーマ、控えめなボーダーとホバー
 */

import {
  Calendar,
  Code2,
  FileText,
  GitBranch,
  GitPullRequest,
  Mic2,
  Package,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
            return "This month";
          case "6months": {
            const monthsDiff =
              currentMonth - startMonth + (currentYear - startYear) * 12;
            if (monthsDiff <= 1) {
              return "This month";
            } else if (monthsDiff <= 3) {
              return "Past 3 months";
            } else {
              return "Past 6 months";
            }
          }
          case "1year":
            return "This year";
          default:
            return "This month";
        }
      }

      if (endYear === currentYear && timeSpan === "1year") {
        return "This year";
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
          return `${monthNames[startMonth]} - ${monthNames[endMonth]} ${startYear}`;
        }
        return `${monthNames[startMonth]} ${startYear} - ${monthNames[endMonth]} ${endYear}`;

      case "1year":
        if (startYear === endYear) {
          return `${startYear}`;
        }
        return `${startYear} - ${endYear}`;

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

  const getTotalActivities = (entry: TimelineEntry): number => {
    const repoActivities = entry.repositoryGroups.reduce(
      (sum, group) => sum + group.activitySummary.total,
      0
    );
    return repoActivities + entry.articles.length + entry.events.length;
  };

  const timeSpanLabels = {
    "1month": "1ヶ月",
    "6months": "6ヶ月",
    "1year": "1年",
  } as const;

  return (
    <div className="w-full">
      {/* 期間切り替えボタン */}
      <div className="mb-8 flex justify-start gap-2">
        {(["1month", "6months", "1year"] as const).map((span) => (
          <Button
            key={span}
            onClick={() => onTimeSpanChange(span)}
            variant={timeSpan === span ? "default" : "outline"}
            size="sm"
            className={cn(
              "text-xs",
              timeSpan === span && "bg-stone-900 text-white hover:bg-stone-800"
            )}
          >
            <Calendar className="mr-1.5 h-3.5 w-3.5" />
            {timeSpanLabels[span]}
          </Button>
        ))}
      </div>

      {/* タイムライン */}
      <div className="relative">
        {/* 縦線 */}
        <div className="absolute top-6 bottom-0 left-[7px] w-px bg-stone-200" />

        {entries.map((entry, index) => (
          <div key={index} className="relative mb-6">
            {/* 期間ラベル */}
            <div className="mb-1 ml-7">
              <div
                className={cn(
                  "text-xs font-medium",
                  index === 0 ? "text-blue-600" : "text-stone-400"
                )}
              >
                {formatPeriod(entry.startDate, entry.endDate, index)}
              </div>
            </div>

            {/* タイムラインポイントとコンテンツ */}
            <div className="relative flex gap-3 overflow-hidden">
              {/* タイムラインポイント */}
              <div className="relative flex-shrink-0">
                <div
                  className={cn(
                    "z-10 h-[15px] w-[15px] rounded-full border-2 border-white",
                    index === 0 ? "bg-blue-500" : "bg-stone-300"
                  )}
                />
              </div>

              {/* コンテンツカード */}
              <Card className="-mt-1 min-w-0 flex-1 overflow-hidden border-stone-200 shadow-none">
                <CardHeader className="p-3 md:p-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-1.5">
                      {/* 主要言語 */}
                      <div className="flex flex-wrap gap-1 md:gap-1.5">
                        {getTopLanguages(entry.languages).map(
                          ([lang, count]) => {
                            const Icon = getTechIcon(lang);
                            return (
                              <Badge
                                key={lang}
                                variant="secondary"
                                className="flex items-center border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] text-blue-700 md:text-xs"
                              >
                                {Icon ? (
                                  <Icon className="mr-0.5 h-3 w-3" />
                                ) : (
                                  <Code2 className="mr-0.5 h-2.5 w-2.5" />
                                )}
                                {lang} ({count})
                              </Badge>
                            );
                          }
                        )}
                      </div>

                      {/* リポジトリ数 */}
                      <div className="flex items-center gap-3 text-[10px] text-stone-400 md:text-xs">
                        <span className="flex items-center gap-0.5">
                          <Package className="h-3 w-3" />
                          {entry.repositories.size} repos
                        </span>
                      </div>
                    </div>

                    {/* アクティビティ数バッジ */}
                    <Badge
                      variant="outline"
                      className="self-start px-2 py-0.5 text-[10px] text-stone-500 md:text-xs"
                    >
                      {getTotalActivities(entry)} activities
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 p-3 pt-0 md:p-4 md:pt-0">
                  {/* リポジトリグループ */}
                  {entry.repositoryGroups.slice(0, 5).map((group, gIdx) => (
                    <div
                      key={gIdx}
                      className="overflow-hidden border-l-2 border-stone-200 pl-3"
                    >
                      <a
                        href={group.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group -m-1.5 block rounded p-1.5 transition-colors duration-200 hover:bg-stone-50"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0 flex-1">
                              <h4 className="text-xs font-medium break-words text-stone-700 transition-colors duration-200 group-hover:text-stone-900 md:text-sm">
                                {group.repository}
                              </h4>
                              {group.description && (
                                <p className="mt-0.5 line-clamp-2 text-[10px] text-stone-400 md:text-xs">
                                  {group.description}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-shrink-0 flex-wrap items-center gap-1.5 text-[10px] text-stone-400 md:text-xs">
                              {group.language && (
                                <Badge
                                  variant="outline"
                                  className="px-1.5 py-0 text-[10px] md:text-xs"
                                >
                                  {group.language}
                                </Badge>
                              )}
                              <span className="flex items-center gap-0.5">
                                <GitBranch className="h-2.5 w-2.5" />
                                {group.contributions}
                              </span>
                              {group.activitySummary.commits > 0 && (
                                <span className="flex items-center gap-0.5 text-blue-500">
                                  <Code2 className="h-2.5 w-2.5" />
                                  {group.activitySummary.commits}
                                </span>
                              )}
                              {group.activitySummary.pullRequests > 0 && (
                                <span className="flex items-center gap-0.5 text-green-600">
                                  <GitPullRequest className="h-2.5 w-2.5" />
                                  {group.activitySummary.pullRequests}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}

                  {entry.repositoryGroups.length > 5 && (
                    <div className="pl-3 text-[10px] text-stone-400 md:text-xs">
                      他 {entry.repositoryGroups.length - 5} リポジトリ
                    </div>
                  )}

                  {/* 記事 */}
                  {entry.articles.length > 0 && (
                    <div className="space-y-1.5 overflow-hidden border-l-2 border-blue-200 pl-3">
                      <h4 className="flex items-center gap-1.5 text-xs font-medium text-stone-700 md:text-sm">
                        <FileText className="h-3.5 w-3.5" />
                        記事 ({entry.articles.length})
                      </h4>
                      <div className="space-y-0.5">
                        {entry.articles.slice(0, 2).map((article, aIdx) => (
                          <a
                            key={aIdx}
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                          >
                            <div className="flex items-start gap-1.5 overflow-hidden rounded p-1 text-[10px] transition-colors duration-200 hover:bg-stone-50 md:text-xs">
                              <Badge
                                variant="outline"
                                className="flex-shrink-0 px-1.5 py-0 text-[10px] md:text-xs"
                              >
                                {article.source}
                              </Badge>
                              <span className="min-w-0 flex-1 leading-tight break-words text-stone-600 transition-colors duration-200 group-hover:text-stone-900">
                                {article.title}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* イベント */}
                  {entry.events.length > 0 && (
                    <div className="space-y-1.5 overflow-hidden border-l-2 border-amber-200 pl-3">
                      <h4 className="flex items-center gap-1.5 text-xs font-medium text-stone-700 md:text-sm">
                        <Mic2 className="h-3.5 w-3.5" />
                        イベント ({entry.events.length})
                      </h4>
                      <div className="space-y-0.5">
                        {entry.events.map((event, eIdx) => (
                          <a
                            key={eIdx}
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                          >
                            <div className="min-w-0 overflow-hidden rounded p-1 text-[10px] leading-tight break-words text-stone-600 transition-colors duration-200 hover:bg-stone-50 hover:text-stone-900 md:text-xs">
                              {event.title}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
