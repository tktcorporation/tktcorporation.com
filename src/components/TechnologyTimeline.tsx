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
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { TimelineEntry, TimeSpan } from "@/hooks/useLaprasActivities";
import { cn } from "@/lib/utils";

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
    // 最初のエントリーは「現在」として表示
    if (index === 0) {
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      // 現在の月と一致する場合は「現在」と表示
      const endMonth = end.getMonth() + 1;
      const endYear = end.getFullYear();
      if (endYear === currentYear && endMonth === currentMonth) {
        return "現在";
      }
    }

    const startYear = start.getFullYear();
    const startMonth = start.getMonth() + 1;
    const endYear = end.getFullYear();
    const endMonth = end.getMonth() + 1;

    // 期間に応じた表示形式
    switch (timeSpan) {
      case "1month":
        // 1ヶ月表示の場合は月のみ
        if (startYear === endYear && startMonth === endMonth) {
          return `${startMonth}月`;
        }
        return `${startMonth}月`;

      case "6months":
        // 6ヶ月表示の場合は期間表示
        if (startYear === endYear) {
          if (startMonth === endMonth) {
            return `${startYear}年${startMonth}月`;
          }
          return `${startMonth}月〜${endMonth}月`;
        }
        return `${startYear}年${startMonth}月〜`;

      case "1year":
        // 1年表示の場合は年を強調
        if (startYear === endYear) {
          return `${startYear}年`;
        }
        return `${startYear}年〜`;

      default:
        return `${startYear}年${startMonth}月`;
    }
  };

  const getTopLanguages = (languages: Map<string, number>, limit = 3) => {
    return Array.from(languages.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);
  };

  const getActivityIcon = (
    type: "github" | "github_pr" | "article" | "event"
  ): ReactNode => {
    switch (type) {
      case "github":
        return <GitBranch className="w-4 h-4" />;
      case "github_pr":
        return <GitPullRequest className="w-4 h-4" />;
      case "article":
        return <FileText className="w-4 h-4" />;
      case "event":
        return <Mic2 className="w-4 h-4" />;
      default:
        return <Code2 className="w-4 h-4" />;
    }
  };

  const getActivityColor = (
    type: "github" | "github_pr" | "article" | "event"
  ) => {
    switch (type) {
      case "github":
        return "text-blue-300";
      case "github_pr":
        return "text-green-300";
      case "article":
        return "text-purple-300";
      case "event":
        return "text-yellow-300";
      default:
        return "text-gray-300";
    }
  };

  const getTotalActivities = (entry: TimelineEntry): number => {
    const repoActivities = entry.repositoryGroups.reduce(
      (sum, group) => sum + group.activities.length,
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
      <div className="relative">
        {/* 縦線 */}
        <div className="absolute left-32 top-0 bottom-0 w-0.5 bg-gray-600" />

        {entries.map((entry, index) => (
          <div key={index} className="relative flex gap-6 mb-12">
            {/* 期間ラベル（左側に配置） */}
            <div className="w-24 text-right flex-shrink-0">
              <div
                className={cn(
                  "text-sm font-medium mt-1",
                  index === 0 ? "text-purple-400" : "text-gray-400"
                )}
              >
                {formatPeriod(entry.startDate, entry.endDate, index)}
              </div>
            </div>

            {/* タイムラインポイント */}
            <div className="relative flex-shrink-0">
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-4 border-gray-800 z-10",
                  index === 0
                    ? "bg-purple-500 ring-2 ring-purple-500/30"
                    : "bg-purple-500"
                )}
              />
            </div>

            {/* コンテンツカード */}
            <Card className="flex-1 bg-gray-800/50 border-gray-700 -mt-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    {/* 主要言語 */}
                    <div className="flex gap-2">
                      {getTopLanguages(entry.languages).map(([lang, count]) => (
                        <Badge
                          key={lang}
                          variant="secondary"
                          className="bg-blue-500/20 text-blue-200 border-blue-500/30"
                        >
                          <Code2 className="w-3 h-3 mr-1" />
                          {lang} ({count})
                        </Badge>
                      ))}
                    </div>

                    {/* リポジトリ数 */}
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        {entry.repositories.size} repos
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {entry.languages.size} languages
                      </span>
                    </div>
                  </div>

                  {/* アクティビティ数バッジ */}
                  <Badge className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                    {getTotalActivities(entry)} activities
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* リポジトリグループ */}
                {entry.repositoryGroups.slice(0, 3).map((group, gIdx) => (
                  <div
                    key={gIdx}
                    className="border-l-2 border-gray-600 pl-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-200">
                        {group.repository}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        {group.language && (
                          <Badge variant="outline" className="text-xs">
                            {group.language}
                          </Badge>
                        )}
                        <span className="flex items-center gap-1">
                          <GitBranch className="w-3 h-3" />
                          {group.contributions}
                        </span>
                        {group.prCount > 0 && (
                          <span className="flex items-center gap-1">
                            <GitPullRequest className="w-3 h-3" />
                            {group.prCount}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* アクティビティ */}
                    <div className="space-y-1">
                      {group.activities.slice(0, 2).map((activity, aIdx) => (
                        <a
                          key={aIdx}
                          href={activity.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group"
                        >
                          <div className="flex items-start gap-2 text-xs hover:bg-gray-700/30 rounded p-1 transition-colors">
                            <span
                              className={cn(
                                "mt-0.5",
                                getActivityColor(activity.type)
                              )}
                            >
                              {getActivityIcon(activity.type)}
                            </span>
                            <span className="text-gray-300 group-hover:text-gray-100 transition-colors line-clamp-1">
                              {activity.title}
                            </span>
                          </div>
                        </a>
                      ))}
                      {group.activities.length > 2 && (
                        <div className="text-xs text-gray-500 pl-6">
                          他 {group.activities.length - 2} 件のアクティビティ
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* 記事 */}
                {entry.articles.length > 0 && (
                  <div className="border-l-2 border-purple-600 pl-4 space-y-2">
                    <h4 className="text-sm font-medium text-gray-200 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      記事 ({entry.articles.length})
                    </h4>
                    <div className="space-y-1">
                      {entry.articles.slice(0, 2).map((article, aIdx) => (
                        <a
                          key={aIdx}
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group"
                        >
                          <div className="flex items-start gap-2 text-xs hover:bg-gray-700/30 rounded p-1 transition-colors">
                            <Badge variant="outline" className="text-xs">
                              {article.source}
                            </Badge>
                            <span className="text-gray-300 group-hover:text-gray-100 transition-colors line-clamp-1">
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
                  <div className="border-l-2 border-yellow-600 pl-4 space-y-2">
                    <h4 className="text-sm font-medium text-gray-200 flex items-center gap-2">
                      <Mic2 className="w-4 h-4" />
                      イベント ({entry.events.length})
                    </h4>
                    <div className="space-y-1">
                      {entry.events.map((event, eIdx) => (
                        <a
                          key={eIdx}
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group"
                        >
                          <div className="text-xs text-gray-300 hover:text-gray-100 hover:bg-gray-700/30 rounded p-1 transition-colors line-clamp-1">
                            {event.title}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* もっと見るリンク */}
                {entry.repositoryGroups.length > 3 && (
                  <div className="text-center pt-2">
                    <span className="text-xs text-gray-500">
                      他 {entry.repositoryGroups.length - 3} 件のリポジトリ
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
