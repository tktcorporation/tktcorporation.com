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
import type { GitHubRepository, LaprasData } from "../data/laprasSchema";

export type TimeSpan = "1month" | "6months" | "1year";

export interface TimelineEntry {
  startDate: Date;
  endDate: Date;
  activities: Array<{
    date: Date;
    type: "github" | "github_pr" | "article" | "event" | "other";
    title: string;
    url: string;
    repository?: string;
    language?: string;
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
          activities: [],
          languages: new Map(),
          repositories: new Map(),
          totalContributions: 0,
          articleCount: 0,
          prCount: 0,
          eventCount: 0,
        };

        // この期間のアクティビティを収集
        for (const activity of activities) {
          const activityDate = new Date(activity.date);

          if (activityDate >= startDate && activityDate < endDate) {
            let type: TimelineEntry["activities"][0]["type"] = "other";
            let repository: string | undefined;
            let language: string | undefined;

            if (activity.type === "github") {
              type = "github";
              repository = activity.title;
              const repo = repoMap.get(repository);
              if (repo) {
                language = repo.language;
                // 言語をカウント
                for (const lang of repo.languages || []) {
                  entry.languages.set(
                    lang.name,
                    (entry.languages.get(lang.name) || 0) + 1
                  );
                }
                // リポジトリの貢献をカウント
                entry.repositories.set(
                  repository,
                  (entry.repositories.get(repository) || 0) + repo.contributions
                );
                entry.totalContributions += repo.contributions;
              }
            } else if (activity.type === "github_pr") {
              type = "github_pr";
              repository = activity.title;
              entry.prCount++;

              const repo = repoMap.get(repository);
              if (repo) {
                language = repo.language;
                // PRも言語カウントに含める
                for (const lang of repo.languages || []) {
                  entry.languages.set(
                    lang.name,
                    (entry.languages.get(lang.name) || 0) + 1
                  );
                }
              }
            } else if (activity.type === "connpass") {
              type = "event";
              entry.eventCount++;
            }

            entry.activities.push({
              date: activityDate,
              type,
              title: activity.title,
              url: activity.url,
              repository,
              language,
            });
          }
        }

        // Qiita記事を追加
        for (const article of laprasData.qiita_articles) {
          const articleDate = new Date(article.updated_at);
          if (articleDate >= startDate && articleDate < endDate) {
            entry.activities.push({
              date: articleDate,
              type: "article",
              title: article.title,
              url: article.url,
            });
            entry.articleCount++;

            // タグから言語を推測
            for (const tag of article.tags) {
              const langMap: Record<string, string> = {
                typescript: "TypeScript",
                javascript: "JavaScript",
                python: "Python",
                ruby: "Ruby",
                rust: "Rust",
                go: "Go",
                java: "Java",
                kotlin: "Kotlin",
              };

              const lowerTag = tag.toLowerCase();
              for (const [key, lang] of Object.entries(langMap)) {
                if (lowerTag.includes(key)) {
                  entry.languages.set(
                    lang,
                    (entry.languages.get(lang) || 0) + 1
                  );
                }
              }
            }
          }
        }

        // Zenn記事を追加
        for (const article of laprasData.zenn_articles) {
          const articleDate = new Date(article.posted_at);
          if (articleDate >= startDate && articleDate < endDate) {
            entry.activities.push({
              date: articleDate,
              type: "article",
              title: article.title,
              url: article.url,
            });
            entry.articleCount++;
          }
        }

        // アクティビティを日付でソート（新しい順）
        entry.activities.sort((a, b) => b.date.getTime() - a.date.getTime());

        // アクティビティがある期間のみ追加
        if (entry.activities.length > 0) {
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
