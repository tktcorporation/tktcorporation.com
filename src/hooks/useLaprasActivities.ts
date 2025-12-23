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
 * - 処理ロジックは小さな関数に分割されている
 */

import { useCallback, useEffect, useState } from "react";
import { getNormalizedName } from "@/utils/languageMap";
import type {
  Activity,
  GitHubRepository,
  LaprasData,
} from "../data/laprasSchema";

export type TimeSpan = "1month" | "6months" | "1year";

export interface RepositoryGroup {
  repository: string;
  description?: string;
  activitySummary: {
    commits: number;
    pullRequests: number;
    total: number;
  };
  language?: string;
  contributions: number;
  latestActivity: Date;
  url: string;
}

export interface TimelineEntry {
  startDate: Date;
  endDate: Date;
  repositoryGroups: RepositoryGroup[];
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
  // Record型に変更（シリアライズ可能）
  languages: Record<string, number>;
  repositories: Record<string, number>;
  totalContributions: number;
  articleCount: number;
  prCount: number;
  eventCount: number;
}

// ============================================================================
// ヘルパー関数群（processActivitiesから分離）
// ============================================================================

/**
 * TimeSpanから月数を取得
 */
function getSpanMonths(span: TimeSpan): number {
  switch (span) {
    case "1month":
      return 1;
    case "6months":
      return 6;
    case "1year":
      return 12;
  }
}

/**
 * TimeSpanから最大表示期間を取得
 */
function getMaxPeriods(span: TimeSpan): number {
  switch (span) {
    case "1month":
      return 24;
    case "6months":
      return 8;
    case "1year":
      return 5;
  }
}

/**
 * リポジトリ情報のマップを作成
 */
function createRepoMap(
  repositories: GitHubRepository[]
): Map<string, GitHubRepository> {
  const repoMap = new Map<string, GitHubRepository>();
  for (const repo of repositories) {
    repoMap.set(repo.title, repo);
  }
  return repoMap;
}

interface RepoActivityData {
  commits: number;
  pullRequests: number;
  language?: string;
  description?: string;
  contributions: number;
  latestActivity: Date;
  url: string;
}

/**
 * GitHubアクティビティを処理
 */
function processGitHubActivity(
  activity: Activity,
  activityDate: Date,
  repoMap: Map<string, GitHubRepository>,
  repoActivitiesMap: Map<string, RepoActivityData>,
  entry: TimelineEntry
): void {
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

    if (repo) {
      entry.repositories[repository] = repo.contributions;
      entry.totalContributions += repo.contributions;

      for (const lang of repo.languages || []) {
        entry.languages[lang.name] = (entry.languages[lang.name] || 0) + 1;
      }
    }
  }

  const repoGroup = repoActivitiesMap.get(repository);
  if (!repoGroup) return;

  if (activityDate > repoGroup.latestActivity) {
    repoGroup.latestActivity = activityDate;
  }

  if (activity.type === "github_pr") {
    repoGroup.pullRequests++;
    entry.prCount++;
  } else {
    repoGroup.commits++;
  }
}

/**
 * Connpassイベントアクティビティを処理
 */
function processEventActivity(
  activity: Activity,
  activityDate: Date,
  entry: TimelineEntry
): void {
  entry.events.push({
    date: activityDate,
    type: "event",
    title: activity.title,
    url: activity.url,
  });
  entry.eventCount++;
}

/**
 * アクティビティを処理してエントリに追加
 */
function processActivitiesForPeriod(
  activities: Activity[],
  startDate: Date,
  endDate: Date,
  repoMap: Map<string, GitHubRepository>,
  entry: TimelineEntry
): Map<string, RepoActivityData> {
  const repoActivitiesMap = new Map<string, RepoActivityData>();

  for (const activity of activities) {
    const activityDate = new Date(activity.date);

    if (activityDate >= startDate && activityDate < endDate) {
      if (activity.type === "github" || activity.type === "github_pr") {
        processGitHubActivity(
          activity,
          activityDate,
          repoMap,
          repoActivitiesMap,
          entry
        );
      } else if (activity.type === "connpass") {
        processEventActivity(activity, activityDate, entry);
      }
    }
  }

  return repoActivitiesMap;
}

/**
 * リポジトリグループを作成
 */
function createRepositoryGroups(
  repoActivitiesMap: Map<string, RepoActivityData>
): RepositoryGroup[] {
  const groups: RepositoryGroup[] = [];

  for (const [repository, data] of repoActivitiesMap.entries()) {
    groups.push({
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

  // 最新の活動日でソート
  return groups.sort(
    (a, b) => b.latestActivity.getTime() - a.latestActivity.getTime()
  );
}

/**
 * Qiita記事を処理
 */
function processQiitaArticles(
  articles: LaprasData["qiita_articles"],
  startDate: Date,
  endDate: Date,
  entry: TimelineEntry
): void {
  for (const article of articles) {
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

      for (const tag of article.tags) {
        const normalizedLang = getNormalizedName(tag);
        if (
          normalizedLang !==
          tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
        ) {
          entry.languages[normalizedLang] =
            (entry.languages[normalizedLang] || 0) + 1;
        }
      }
    }
  }
}

/**
 * Zenn記事を処理
 */
function processZennArticles(
  articles: LaprasData["zenn_articles"],
  startDate: Date,
  endDate: Date,
  entry: TimelineEntry
): void {
  for (const article of articles) {
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
}

/**
 * 空のTimelineEntryを作成
 */
function createEmptyEntry(startDate: Date, endDate: Date): TimelineEntry {
  return {
    startDate,
    endDate,
    repositoryGroups: [],
    articles: [],
    events: [],
    languages: {},
    repositories: {},
    totalContributions: 0,
    articleCount: 0,
    prCount: 0,
    eventCount: 0,
  };
}

// ============================================================================
// メイン処理関数
// ============================================================================

/**
 * LAPRASデータを処理してタイムラインエントリを生成
 */
function processActivities(
  laprasData: LaprasData,
  span: TimeSpan
): TimelineEntry[] {
  const entries: TimelineEntry[] = [];
  const activities = laprasData.activities || [];
  const spanMonths = getSpanMonths(span);
  const maxPeriods = getMaxPeriods(span);
  const now = new Date();
  const repoMap = createRepoMap(laprasData.github_repositories);

  for (let i = 0; i < maxPeriods; i++) {
    const endDate = new Date(now);
    endDate.setMonth(endDate.getMonth() - i * spanMonths);

    const startDate = new Date(endDate);
    startDate.setMonth(startDate.getMonth() - spanMonths);

    const entry = createEmptyEntry(startDate, endDate);

    // アクティビティを処理
    const repoActivitiesMap = processActivitiesForPeriod(
      activities,
      startDate,
      endDate,
      repoMap,
      entry
    );

    // リポジトリグループを作成
    entry.repositoryGroups = createRepositoryGroups(repoActivitiesMap);

    // 記事を処理
    processQiitaArticles(laprasData.qiita_articles, startDate, endDate, entry);
    processZennArticles(laprasData.zenn_articles, startDate, endDate, entry);

    // 記事とイベントを日付でソート
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
}

// ============================================================================
// カスタムフック
// ============================================================================

export function useLaprasActivities(data: LaprasData | null) {
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntry[]>([]);
  const [timeSpan, setTimeSpan] = useState<TimeSpan>("1month");
  const [loading, setLoading] = useState(false);

  const process = useCallback(
    (laprasData: LaprasData, span: TimeSpan): TimelineEntry[] => {
      return processActivities(laprasData, span);
    },
    []
  );

  useEffect(() => {
    if (!data) return;

    setLoading(true);
    const entries = process(data, timeSpan);
    setTimelineEntries(entries);
    setLoading(false);
  }, [data, timeSpan, process]);

  return {
    timelineEntries,
    timeSpan,
    setTimeSpan,
    loading,
  };
}
