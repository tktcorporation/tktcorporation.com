/**
 * Purpose:
 * 技術活動の時系列表示コンポーネント。
 * 期間ごとにグループ化された活動を縦型のタイムラインで表示し、
 * 使用技術、リポジトリ、記事などの詳細情報を視覚的に提示する。
 *
 * Context:
 * - 職歴表示と同様の縦型タイムラインデザイン
 * - 期間ごとの活動サマリと詳細の両方を表示
 * - 言語の使用頻度を視覚的に表現
 * - Lucide Reactアイコンを使用した視覚的表現
 */

import {
  Calendar,
  Code2,
  FileText,
  GitBranch,
  GitPullRequest,
  Globe,
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

    // 最初のエントリーで現在と一致する場合の特別な表示
    if (index === 0) {
      // 現在の月と一致する場合
      if (endYear === currentYear && endMonth === currentMonth) {
        switch (timeSpan) {
          case "1month":
            return "This month";
          case "6months": {
            // 6ヶ月期間の場合、開始月を確認
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

      // 現在の年と一致する場合（月は異なる）
      if (endYear === currentYear && timeSpan === "1year") {
        return "This year";
      }
    }

    // 月の名前配列
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

    // 期間に応じた表示形式
    switch (timeSpan) {
      case "1month":
        // 1ヶ月表示の場合は月名と年
        return `${monthNames[startMonth]} ${startYear}`;

      case "6months":
        // 6ヶ月表示の場合は期間表示
        if (startYear === endYear) {
          if (startMonth === endMonth) {
            return `${monthNames[startMonth]} ${startYear}`;
          }
          return `${monthNames[startMonth]} - ${monthNames[endMonth]} ${startYear}`;
        }
        return `${monthNames[startMonth]} ${startYear} - ${monthNames[endMonth]} ${endYear}`;

      case "1year":
        // 1年表示の場合は年のみ
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
    <div className="w-full max-w-5xl mx-auto">
      {/* 期間切り替えボタン */}
      <div className="flex justify-center gap-2 mb-8">
        {(["1month", "6months", "1year"] as const).map((span) => (
          <Button
            key={span}
            onClick={() => onTimeSpanChange(span)}
            variant={timeSpan === span ? "default" : "outline"}
            size="sm"
            className={cn(
              "transition-all",
              timeSpan === span && "bg-purple-600 hover:bg-purple-700"
            )}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {timeSpanLabels[span]}
          </Button>
        ))}
      </div>

      {/* タイムライン */}
      <div className="relative overflow-hidden">
        {/* 縦線 */}
        <div className="absolute left-2 md:left-2.5 top-8 bottom-0 w-0.5 bg-slate-600" />

        {entries.map((entry, index) => (
          <div key={index} className="relative mb-6 md:mb-8 lg:mb-10">
            {/* 期間ラベル（タイムラインポイントの上に配置） */}
            <div className="ml-7 md:ml-8 mb-1">
              <div
                className={cn(
                  "text-[10px] md:text-xs lg:text-sm font-medium",
                  index === 0 ? "text-purple-400" : "text-slate-400"
                )}
              >
                {formatPeriod(entry.startDate, entry.endDate, index)}
              </div>
            </div>

            {/* タイムラインポイントとコンテンツ */}
            <div className="relative flex gap-3 md:gap-4 overflow-hidden">
              {/* タイムラインポイント */}
              <div className="relative flex-shrink-0">
                <div
                  className={cn(
                    "w-4 md:w-5 h-4 md:h-5 rounded-full border-2 md:border-4 border-slate-800 z-10",
                    index === 0
                      ? "bg-purple-500 ring-2 ring-purple-500/30"
                      : "bg-purple-500"
                  )}
                />
              </div>

              {/* コンテンツカード */}
              <Card className="flex-1 min-w-0 bg-white/5 border-white/10 -mt-1 overflow-hidden">
                <CardHeader className="p-3 md:p-4 lg:p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    <div className="space-y-1 md:space-y-2">
                      {/* 主要言語 */}
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {getTopLanguages(entry.languages).map(
                          ([lang, count]) => {
                            const Icon = getTechIcon(lang);
                            return (
                              <Badge
                                key={lang}
                                variant="secondary"
                                className="bg-blue-500/20 text-blue-200 border-blue-500/30 text-[10px] md:text-xs px-2 py-0.5 md:px-3 md:py-1 flex items-center"
                              >
                                {Icon ? (
                                  <Icon className="w-3 md:w-3.5 h-3 md:h-3.5 mr-0.5 md:mr-1" />
                                ) : (
                                  <Code2 className="w-2.5 md:w-3 h-2.5 md:h-3 mr-0.5 md:mr-1" />
                                )}
                                {lang} ({count})
                              </Badge>
                            );
                          }
                        )}
                      </div>

                      {/* リポジトリ数 */}
                      <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs lg:text-sm text-slate-400">
                        <span className="flex items-center gap-0.5 md:gap-1">
                          <Package className="w-3 md:w-4 h-3 md:h-4" />
                          {entry.repositories.size} repos
                        </span>
                        <span className="flex items-center gap-0.5 md:gap-1">
                          <Globe className="w-3 md:w-4 h-3 md:h-4" />
                          {entry.languages.size} languages
                        </span>
                      </div>
                    </div>

                    {/* アクティビティ数バッジ */}
                    <Badge className="bg-purple-500/20 text-purple-200 border-purple-500/30 text-[10px] md:text-xs px-2 py-0.5 md:px-3 md:py-1 self-start">
                      {getTotalActivities(entry)} activities
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-3 md:p-4 lg:p-6 pt-0 md:pt-0 space-y-3 md:space-y-4">
                  {/* リポジトリグループ */}
                  {entry.repositoryGroups.slice(0, 5).map((group, gIdx) => (
                    <div
                      key={gIdx}
                      className="border-l-2 border-slate-600 pl-2 md:pl-3 lg:pl-4 overflow-hidden"
                    >
                      <a
                        href={group.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block hover:bg-white/10 rounded p-1 md:p-2 -m-1 md:-m-2 transition-colors"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs md:text-sm font-medium text-slate-200 group-hover:text-white break-words transition-colors">
                                {group.repository}
                              </h4>
                              {group.description && (
                                <p className="text-[10px] md:text-xs text-slate-400 mt-0.5 line-clamp-2">
                                  {group.description}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center flex-wrap gap-1 md:gap-2 text-[10px] md:text-xs text-slate-400 flex-shrink-0">
                              {group.language && (
                                <Badge
                                  variant="outline"
                                  className="text-[10px] md:text-xs px-1.5 py-0 md:px-2 md:py-0.5"
                                >
                                  {group.language}
                                </Badge>
                              )}
                              <span className="flex items-center gap-0.5 md:gap-1">
                                <GitBranch className="w-2.5 md:w-3 h-2.5 md:h-3" />
                                {group.contributions}
                              </span>
                              {group.activitySummary.commits > 0 && (
                                <span className="flex items-center gap-0.5 md:gap-1 text-blue-300">
                                  <Code2 className="w-2.5 md:w-3 h-2.5 md:h-3" />
                                  {group.activitySummary.commits}
                                </span>
                              )}
                              {group.activitySummary.pullRequests > 0 && (
                                <span className="flex items-center gap-0.5 md:gap-1 text-green-300">
                                  <GitPullRequest className="w-2.5 md:w-3 h-2.5 md:h-3" />
                                  {group.activitySummary.pullRequests}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}

                  {/* もっと見る */}
                  {entry.repositoryGroups.length > 5 && (
                    <div className="text-[10px] md:text-xs text-slate-500 pl-2 md:pl-3">
                      他 {entry.repositoryGroups.length - 5} リポジトリ
                    </div>
                  )}

                  {/* 記事 */}
                  {entry.articles.length > 0 && (
                    <div className="border-l-2 border-purple-600 pl-2 md:pl-3 lg:pl-4 space-y-1 md:space-y-2 overflow-hidden">
                      <h4 className="text-xs md:text-sm font-medium text-slate-200 flex items-center gap-1 md:gap-2">
                        <FileText className="w-3 md:w-4 h-3 md:h-4" />
                        記事 ({entry.articles.length})
                      </h4>
                      <div className="space-y-0.5 md:space-y-1">
                        {entry.articles.slice(0, 2).map((article, aIdx) => (
                          <a
                            key={aIdx}
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <div className="flex items-start gap-1 md:gap-2 text-[10px] md:text-xs hover:bg-white/10 rounded p-0.5 md:p-1 transition-colors overflow-hidden">
                              <Badge
                                variant="outline"
                                className="text-[10px] md:text-xs px-1.5 py-0 md:px-2 md:py-0.5 flex-shrink-0"
                              >
                                {article.source}
                              </Badge>
                              <span className="text-slate-300 group-hover:text-slate-100 transition-colors min-w-0 flex-1 break-words leading-tight">
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
                    <div className="border-l-2 border-yellow-600 pl-2 md:pl-3 lg:pl-4 space-y-1 md:space-y-2 overflow-hidden">
                      <h4 className="text-xs md:text-sm font-medium text-slate-200 flex items-center gap-1 md:gap-2">
                        <Mic2 className="w-3 md:w-4 h-3 md:h-4" />
                        イベント ({entry.events.length})
                      </h4>
                      <div className="space-y-0.5 md:space-y-1">
                        {entry.events.map((event, eIdx) => (
                          <a
                            key={eIdx}
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <div className="text-[10px] md:text-xs text-slate-300 hover:text-slate-100 hover:bg-white/10 rounded p-0.5 md:p-1 transition-colors min-w-0 break-words leading-tight overflow-hidden">
                              {event.title}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* もっと見るリンク */}
                  {entry.repositoryGroups.length > 3 && (
                    <div className="text-center pt-1 md:pt-2">
                      <span className="text-[10px] md:text-xs text-slate-500">
                        他 {entry.repositoryGroups.length - 3} 件のリポジトリ
                      </span>
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
