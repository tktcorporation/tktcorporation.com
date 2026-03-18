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
      <div className="flex justify-start gap-2 mb-8">
        {(["1month", "6months", "1year"] as const).map((span) => (
          <Button
            key={span}
            onClick={() => onTimeSpanChange(span)}
            variant={timeSpan === span ? "default" : "outline"}
            size="sm"
            className={cn(
              "text-xs",
              timeSpan === span && "bg-stone-900 hover:bg-stone-800 text-white"
            )}
          >
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            {timeSpanLabels[span]}
          </Button>
        ))}
      </div>

      {/* タイムライン */}
      <div className="relative">
        {/* 縦線 */}
        <div className="absolute left-[7px] top-6 bottom-0 w-px bg-stone-200" />

        {entries.map((entry, index) => (
          <div key={index} className="relative mb-6">
            {/* 期間ラベル */}
            <div className="ml-7 mb-1">
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
                    "w-[15px] h-[15px] rounded-full border-2 border-white z-10",
                    index === 0 ? "bg-blue-500" : "bg-stone-300"
                  )}
                />
              </div>

              {/* コンテンツカード */}
              <Card className="flex-1 min-w-0 border-stone-200 shadow-none -mt-1 overflow-hidden">
                <CardHeader className="p-3 md:p-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
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
                                className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] md:text-xs px-2 py-0.5 flex items-center"
                              >
                                {Icon ? (
                                  <Icon className="w-3 h-3 mr-0.5" />
                                ) : (
                                  <Code2 className="w-2.5 h-2.5 mr-0.5" />
                                )}
                                {lang} ({count})
                              </Badge>
                            );
                          }
                        )}
                      </div>

                      {/* リポジトリ数 */}
                      <div className="flex items-center gap-3 text-[10px] md:text-xs text-stone-400">
                        <span className="flex items-center gap-0.5">
                          <Package className="w-3 h-3" />
                          {entry.repositories.size} repos
                        </span>
                      </div>
                    </div>

                    {/* アクティビティ数バッジ */}
                    <Badge
                      variant="outline"
                      className="text-[10px] md:text-xs px-2 py-0.5 self-start text-stone-500"
                    >
                      {getTotalActivities(entry)} activities
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-3 md:p-4 pt-0 md:pt-0 space-y-3">
                  {/* リポジトリグループ */}
                  {entry.repositoryGroups.slice(0, 5).map((group, gIdx) => (
                    <div
                      key={gIdx}
                      className="border-l-2 border-stone-200 pl-3 overflow-hidden"
                    >
                      <a
                        href={group.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block hover:bg-stone-50 rounded p-1.5 -m-1.5 transition-colors duration-200"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs md:text-sm font-medium text-stone-700 group-hover:text-stone-900 break-words transition-colors duration-200">
                                {group.repository}
                              </h4>
                              {group.description && (
                                <p className="text-[10px] md:text-xs text-stone-400 mt-0.5 line-clamp-2">
                                  {group.description}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center flex-wrap gap-1.5 text-[10px] md:text-xs text-stone-400 flex-shrink-0">
                              {group.language && (
                                <Badge
                                  variant="outline"
                                  className="text-[10px] md:text-xs px-1.5 py-0"
                                >
                                  {group.language}
                                </Badge>
                              )}
                              <span className="flex items-center gap-0.5">
                                <GitBranch className="w-2.5 h-2.5" />
                                {group.contributions}
                              </span>
                              {group.activitySummary.commits > 0 && (
                                <span className="flex items-center gap-0.5 text-blue-500">
                                  <Code2 className="w-2.5 h-2.5" />
                                  {group.activitySummary.commits}
                                </span>
                              )}
                              {group.activitySummary.pullRequests > 0 && (
                                <span className="flex items-center gap-0.5 text-green-600">
                                  <GitPullRequest className="w-2.5 h-2.5" />
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
                    <div className="text-[10px] md:text-xs text-stone-400 pl-3">
                      他 {entry.repositoryGroups.length - 5} リポジトリ
                    </div>
                  )}

                  {/* 記事 */}
                  {entry.articles.length > 0 && (
                    <div className="border-l-2 border-blue-200 pl-3 space-y-1.5 overflow-hidden">
                      <h4 className="text-xs md:text-sm font-medium text-stone-700 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        記事 ({entry.articles.length})
                      </h4>
                      <div className="space-y-0.5">
                        {entry.articles.slice(0, 2).map((article, aIdx) => (
                          <a
                            key={aIdx}
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <div className="flex items-start gap-1.5 text-[10px] md:text-xs hover:bg-stone-50 rounded p-1 transition-colors duration-200 overflow-hidden">
                              <Badge
                                variant="outline"
                                className="text-[10px] md:text-xs px-1.5 py-0 flex-shrink-0"
                              >
                                {article.source}
                              </Badge>
                              <span className="text-stone-600 group-hover:text-stone-900 transition-colors duration-200 min-w-0 flex-1 break-words leading-tight">
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
                    <div className="border-l-2 border-amber-200 pl-3 space-y-1.5 overflow-hidden">
                      <h4 className="text-xs md:text-sm font-medium text-stone-700 flex items-center gap-1.5">
                        <Mic2 className="w-3.5 h-3.5" />
                        イベント ({entry.events.length})
                      </h4>
                      <div className="space-y-0.5">
                        {entry.events.map((event, eIdx) => (
                          <a
                            key={eIdx}
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <div className="text-[10px] md:text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded p-1 transition-colors duration-200 min-w-0 break-words leading-tight overflow-hidden">
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
