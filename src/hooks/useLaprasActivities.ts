/**
 * Purpose:
 * LAPRASの活動データを処理し、時系列でグループ化するカスタムフック。
 * アクティビティ、リポジトリ、記事を統合して期間ごとに集約可能な
 * タイムラインデータを生成する。
 *
 * Context:
 * - 異なるデータソースを統合して時系列データを作成
 * - 1ヶ月、6ヶ月、1年単位での集約をサポート
 * - 活動の種類、使用言語、貢献度などを含む詳細情報を提供
 */

import { useCallback, useEffect, useState } from "react";
import { getNormalizedName } from "@/utils/languageMap";
import type { GitHubRepository, LaprasData } from "../data/laprasSchema";

export type TimeSpan = "1month" | "6months" | "1year";

export interface RepositoryGroup {
  repository: string;
  description?: string; // リポジトリの説明
  activitySummary: {
    commits: number;
    pullRequests: number;
    total: number;
  };
  language?: string;
  contributions: number;
  latestActivity: Date;
  url: string; // リポジトリのURL
}

export interface TimelineEntry {
  startDate: Date;
  endDate: Date;
  repositoryGroups: RepositoryGroup[]; // リポジトリごとにグルーピング
  articles: Array<{
    date: Date;
    type: "article";
    title: string;
    url: string;
    source: "qiita" | "zenn" | "blog" | "note";
  }>;
  events: Array<{
    date: Date;
    type: "event";
    title: string;
    url: string;
  }>;
  languages: Map<string, number>; // 言語名 -> 使用回数
  repositories: Map<string, number>; // リポジトリ名 -> 貢献数
  totalContributions: number;
  articleCount: number;
  prCount: number;
  eventCount: number;
}

export function useLaprasActivities(data: LaprasData | null) {
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntry[]>([]);
  const [timeSpan, setTimeSpan] = useState<TimeSpan>("1month");
  const [loading, setLoading] = useState(false);

  const processActivities = useCallback(
    (laprasData: LaprasData, span: TimeSpan): TimelineEntry[] => {
      const entries: TimelineEntry[] = [];
      const activities = laprasData.activities || [];

      // 現在の日付から遡って期間を作成
      const now = new Date();
      const spanMonths = span === "1month" ? 1 : span === "6months" ? 6 : 12;
      const maxPeriods = span === "1month" ? 24 : span === "6months" ? 8 : 5; // 最大表示期間

      // リポジトリ情報のマップを作成
      const repoMap = new Map<string, GitHubRepository>();
      for (const repo of laprasData.github_repositories) {
        repoMap.set(repo.title, repo);
      }

      // 期間ごとにエントリを作成
      for (let i = 0; i < maxPeriods; i++) {
        const endDate = new Date(now);
        endDate.setMonth(endDate.getMonth() - i * spanMonths);

        const startDate = new Date(endDate);
        startDate.setMonth(startDate.getMonth() - spanMonths);

        const entry: TimelineEntry = {
          startDate,
          endDate,
          repositoryGroups: [],
          articles: [],
          events: [],
          languages: new Map(),
          repositories: new Map(),
          totalContributions: 0,
          articleCount: 0,
          prCount: 0,
          eventCount: 0,
        };

        // リポジトリごとの活動を一時的に格納
        const repoActivitiesMap = new Map<
          string,
          {
            commits: number;
            pullRequests: number;
            language?: string;
            description?: string;
            contributions: number;
            latestActivity: Date;
            url: string;
          }
        >();

        // この期間のアクティビティを収集
        for (const activity of activities) {
          const activityDate = new Date(activity.date);

          if (activityDate >= startDate && activityDate < endDate) {
            if (activity.type === "github" || activity.type === "github_pr") {
              const repository = activity.title;
              const repo = repoMap.get(repository);

              if (!repoActivitiesMap.has(repository)) {
                repoActivitiesMap.set(repository, {
                  commits: 0,
                  pullRequests: 0,
                  language: repo?.language,
                  description: repo?.description,
                  contributions: repo?.contributions || 0,
                  latestActivity: activityDate,
                  url: activity.url,
                });

                // 貢献度をカウント
                if (repo) {
                  entry.repositories.set(repository, repo.contributions);
                  entry.totalContributions += repo.contributions;

                  // 言語をカウント
                  for (const lang of repo.languages || []) {
                    entry.languages.set(
                      lang.name,
                      (entry.languages.get(lang.name) || 0) + 1
                    );
                  }
                }
              }

              const repoGroup = repoActivitiesMap.get(repository);
              if (!repoGroup) continue;

              // 最新のアクティビティ日を更新
              if (activityDate > repoGroup.latestActivity) {
                repoGroup.latestActivity = activityDate;
              }

              // アクティビティの種類ごとにカウント
              if (activity.type === "github_pr") {
                repoGroup.pullRequests++;
                entry.prCount++;
              } else {
                repoGroup.commits++;
              }
            } else if (activity.type === "connpass") {
              entry.events.push({
                date: activityDate,
                type: "event",
                title: activity.title,
                url: activity.url,
              });
              entry.eventCount++;
            }
          }
        }

        // リポジトリグループを作成
        for (const [repository, data] of repoActivitiesMap.entries()) {
          entry.repositoryGroups.push({
            repository,
            description: data.description,
            activitySummary: {
              commits: data.commits,
              pullRequests: data.pullRequests,
              total: data.commits + data.pullRequests,
            },
            language: data.language,
            contributions: data.contributions,
            latestActivity: data.latestActivity,
            url: data.url,
          });
        }

        // リポジトリグループを最新の活動日でソート
        entry.repositoryGroups.sort(
          (a, b) => b.latestActivity.getTime() - a.latestActivity.getTime()
        );

        // Qiita記事を追加
        for (const article of laprasData.qiita_articles) {
          const articleDate = new Date(article.updated_at);
          if (articleDate >= startDate && articleDate < endDate) {
            entry.articles.push({
              date: articleDate,
              type: "article",
              title: article.title,
              url: article.url,
              source: "qiita",
            });
            entry.articleCount++;

            // タグから言語を推測（linguist-languagesを使用）
            for (const tag of article.tags) {
              const normalizedLang = getNormalizedName(tag);
              // 正規化された名前が元のタグと異なる場合は、言語として認識された
              if (
                normalizedLang !==
                tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
              ) {
                entry.languages.set(
                  normalizedLang,
                  (entry.languages.get(normalizedLang) || 0) + 1
                );
              }
            }
          }
        }

        // Zenn記事を追加
        for (const article of laprasData.zenn_articles) {
          const articleDate = new Date(article.posted_at);
          if (articleDate >= startDate && articleDate < endDate) {
            entry.articles.push({
              date: articleDate,
              type: "article",
              title: article.title,
              url: article.url,
              source: "zenn",
            });
            entry.articleCount++;
          }
        }

        // 記事とイベントを日付でソート（新しい順）
        entry.articles.sort((a, b) => b.date.getTime() - a.date.getTime());
        entry.events.sort((a, b) => b.date.getTime() - a.date.getTime());

        // アクティビティがある期間のみ追加
        const hasActivity =
          entry.repositoryGroups.length > 0 ||
          entry.articles.length > 0 ||
          entry.events.length > 0;

        if (hasActivity) {
          entries.push(entry);
        }
      }

      return entries;
    },
    []
  );

  useEffect(() => {
    if (!data) return;

    setLoading(true);
    const entries = processActivities(data, timeSpan);
    setTimelineEntries(entries);
    setLoading(false);
  }, [data, timeSpan, processActivities]);

  return {
    timelineEntries,
    timeSpan,
    setTimeSpan,
    loading,
  };
}
