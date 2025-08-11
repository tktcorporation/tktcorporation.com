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
 */

import type { TimelineEntry, TimeSpan } from "../hooks/useLaprasActivities";

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
  const formatPeriod = (start: Date, end: Date): string => {
    const startYear = start.getFullYear();
    const startMonth = start.getMonth() + 1;
    const endYear = end.getFullYear();
    const endMonth = end.getMonth() + 1;

    if (startYear === endYear) {
      if (startMonth === endMonth) {
        return `${startYear}年${startMonth}月`;
      }
      return `${startYear}年${startMonth}月〜${endMonth}月`;
    }
    return `${startYear}年${startMonth}月〜${endYear}年${endMonth}月`;
  };

  const getTopLanguages = (languages: Map<string, number>, limit = 3) => {
    return Array.from(languages.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);
  };

  const getActivityIcon = (
    type: "github" | "github_pr" | "article" | "event"
  ) => {
    switch (type) {
      case "github":
        return "🔧";
      case "github_pr":
        return "🔄";
      case "article":
        return "✍️";
      case "event":
        return "🎤";
      default:
        return "📌";
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

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* 期間切り替えボタン */}
      <div className="flex justify-center gap-2 mb-8">
        {(["1month", "6months", "1year"] as const).map((span) => (
          <button
            key={span}
            type="button"
            onClick={() => onTimeSpanChange(span)}
            className={`px-4 py-2 rounded-lg transition-all ${
              timeSpan === span
                ? "bg-purple-600 text-white"
                : "bg-white/10 text-purple-300 hover:bg-white/20"
            }`}
          >
            {span === "1month" ? "月次" : span === "6months" ? "半期" : "年次"}
          </button>
        ))}
      </div>

      {/* タイムライン */}
      <div className="relative">
        {/* 縦線 */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-purple-400 to-transparent" />

        {entries.map((entry, index) => {
          const topLangs = getTopLanguages(entry.languages);
          const isRecent = index === 0;

          return (
            <div key={index} className="relative flex gap-8 mb-8">
              {/* タイムラインポイント */}
              <div
                className={`absolute left-6 w-5 h-5 rounded-full border-2 ${
                  isRecent
                    ? "bg-purple-500 border-purple-300 animate-pulse"
                    : "bg-slate-700 border-slate-500"
                } z-10`}
              />

              {/* コンテンツ */}
              <div className="ml-16 flex-1">
                <div
                  className={`bg-white/5 backdrop-blur-lg border rounded-lg p-6 ${
                    isRecent
                      ? "border-purple-500/50 shadow-lg shadow-purple-500/20"
                      : "border-white/10"
                  } hover:bg-white/10 transition-all`}
                >
                  {/* ヘッダー */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-purple-200 mb-1">
                        {formatPeriod(entry.startDate, entry.endDate)}
                      </h3>

                      {/* 主要言語 */}
                      {topLangs.length > 0 && (
                        <div className="flex gap-2 mb-2">
                          {topLangs.map(([lang, count]) => (
                            <span
                              key={lang}
                              className="px-2 py-1 text-xs bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-200 rounded-full border border-blue-500/30"
                            >
                              {lang}
                              <span className="ml-1 opacity-70">({count})</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* 統計情報 */}
                      <div className="flex gap-4 text-xs text-slate-400">
                        {entry.totalContributions > 0 && (
                          <span>💻 {entry.totalContributions} commits</span>
                        )}
                        {entry.prCount > 0 && (
                          <span>🔄 {entry.prCount} PRs</span>
                        )}
                        {entry.articleCount > 0 && (
                          <span>✍️ {entry.articleCount} articles</span>
                        )}
                        {entry.eventCount > 0 && (
                          <span>🎤 {entry.eventCount} events</span>
                        )}
                      </div>
                    </div>

                    {/* アクティビティ数バッジ */}
                    <span className="px-3 py-1 text-sm bg-purple-500/20 text-purple-200 rounded-full border border-purple-500/30">
                      {getTotalActivities(entry)} activities
                    </span>
                  </div>

                  {/* アクティビティリスト */}
                  <details className="mt-4">
                    <summary className="text-sm text-purple-300 cursor-pointer hover:text-purple-200 transition-colors">
                      詳細を表示
                    </summary>
                    <div className="mt-3 space-y-4">
                      {/* リポジトリグループ */}
                      {entry.repositoryGroups.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-slate-400 mb-2">
                            📦 リポジトリ活動
                          </h4>
                          <div className="space-y-3">
                            {entry.repositoryGroups
                              .slice(0, 5)
                              .map((group, idx) => (
                                <div
                                  key={idx}
                                  className="bg-black/20 rounded-lg p-3 border border-white/5"
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <h5 className="text-sm font-medium text-blue-300">
                                      {group.repository}
                                    </h5>
                                    <div className="flex gap-2 text-xs text-slate-500">
                                      {group.language && (
                                        <span className="px-2 py-0.5 bg-blue-500/10 text-blue-300 rounded">
                                          {group.language}
                                        </span>
                                      )}
                                      {group.contributions > 0 && (
                                        <span>
                                          💻 {group.contributions} commits
                                        </span>
                                      )}
                                      {group.prCount > 0 && (
                                        <span>🔄 {group.prCount} PRs</span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    {group.activities
                                      .slice(0, 3)
                                      .map((activity, actIdx) => (
                                        <div
                                          key={actIdx}
                                          className="flex items-center gap-2 text-xs"
                                        >
                                          <span>
                                            {getActivityIcon(activity.type)}
                                          </span>
                                          <a
                                            href={activity.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`hover:underline ${getActivityColor(activity.type)}`}
                                          >
                                            {activity.type === "github_pr"
                                              ? "Pull Request"
                                              : "Commit"}
                                          </a>
                                          <span className="text-slate-600">
                                            {activity.date.toLocaleDateString(
                                              "ja-JP"
                                            )}
                                          </span>
                                        </div>
                                      ))}
                                    {group.activities.length > 3 && (
                                      <p className="text-xs text-slate-500 mt-1">
                                        他 {group.activities.length - 3}{" "}
                                        件の活動
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            {entry.repositoryGroups.length > 5 && (
                              <p className="text-xs text-slate-400">
                                他 {entry.repositoryGroups.length - 5}{" "}
                                リポジトリ
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* 記事 */}
                      {entry.articles.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-slate-400 mb-2">
                            ✍️ 執筆記事
                          </h4>
                          <div className="space-y-2">
                            {entry.articles.slice(0, 5).map((article, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 text-sm"
                              >
                                <span className="mt-1">
                                  {getActivityIcon(article.type)}
                                </span>
                                <div className="flex-1">
                                  <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`hover:underline ${getActivityColor(article.type)}`}
                                  >
                                    {article.title}
                                  </a>
                                  <div className="text-xs text-slate-500 mt-0.5">
                                    {article.date.toLocaleDateString("ja-JP")}
                                    <span className="ml-2">
                                      {article.source === "qiita"
                                        ? "Qiita"
                                        : "Zenn"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {entry.articles.length > 5 && (
                              <p className="text-xs text-slate-400">
                                他 {entry.articles.length - 5} 件の記事
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* イベント */}
                      {entry.events.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-slate-400 mb-2">
                            🎤 イベント参加
                          </h4>
                          <div className="space-y-2">
                            {entry.events.map((event, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 text-sm"
                              >
                                <span className="mt-1">
                                  {getActivityIcon(event.type)}
                                </span>
                                <div className="flex-1">
                                  <a
                                    href={event.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`hover:underline ${getActivityColor(event.type)}`}
                                  >
                                    {event.title}
                                  </a>
                                  <div className="text-xs text-slate-500 mt-0.5">
                                    {event.date.toLocaleDateString("ja-JP")}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              </div>
            </div>
          );
        })}

        {/* タイムライン終端 */}
        {entries.length > 0 && (
          <div className="absolute left-6 bottom-0 w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-600" />
        )}
      </div>
    </div>
  );
}
