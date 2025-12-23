/**
 * Purpose:
 * LAPRASのデータ構造を定義し、型安全性とバリデーションを提供する。
 * Zodスキーマを使用してLAPRAS APIから取得するデータの
 * 完全な型定義と実行時バリデーションを実現する。
 *
 * Context:
 * - GitHubリポジトリ、Qiita記事、スピーカーデック等の構造を定義
 * - TypeScriptの型推論と実行時バリデーションの両立
 * - データ取得スクリプトとアプリケーションの間の契約として機能
 */

import { z } from "zod";

// GitHub Repository Language
const GitHubLanguageSchema = z.object({
  name: z.string(),
  bytes: z.number(),
});

// GitHub Repository
const GitHubRepositorySchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string(),
  is_oss: z.boolean(),
  is_fork: z.boolean(),
  is_owner: z.boolean(),
  description: z.string(),
  stargazers_count: z
    .union([z.number(), z.string()])
    .transform((val) =>
      typeof val === "string" ? parseInt(val, 10) || 0 : val
    ),
  language: z.string(),
  languages: z.array(GitHubLanguageSchema),
  contributions: z.number(),
  contributions_url: z.string(),
  contributors_count: z.number().optional(),
  contributors_url: z.string().optional(),
  forks: z.number().optional(),
  stargazers_url: z.string().optional(),
});

// Qiita Article
const QiitaArticleSchema = z.object({
  title: z.string(),
  url: z.string(),
  tags: z.array(z.string()),
  stockers_count: z.number(),
  updated_at: z.string(),
  headlines: z.array(z.string()).optional(),
});

// Zenn Article
const ZennArticleSchema = z.object({
  title: z.string(),
  url: z.string(),
  tags: z.array(z.string()),
  posted_at: z.string(),
});

// Activity types - 既知のアクティビティタイプを型安全に
export const ActivityTypes = [
  "github",
  "github_pr",
  "connpass",
  "qiita",
  "zenn",
  "blog",
  "note",
  "speaker_deck",
  "teratail",
  "hatena",
  "other",
] as const;

export type ActivityType = (typeof ActivityTypes)[number];

// Activity
const ActivitySchema = z.object({
  title: z.string(),
  url: z.string(),
  date: z.string(),
  // 既知のタイプはenumで検証、未知のタイプは "other" として扱う
  type: z
    .string()
    .transform((val) =>
      ActivityTypes.includes(val as ActivityType) ? val : "other"
    ) as z.ZodType<ActivityType>,
});

// Event
const EventSchema = z.object({
  title: z.string(),
  url: z.string(),
  date: z.string(),
  is_organizer: z.boolean().optional(),
  is_presenter: z.boolean().optional(),
  status: z.number().optional(),
});

// Blog Article
const BlogArticleSchema = z.object({
  title: z.string(),
  url: z.string(),
  tags: z.array(z.string()),
  posted_at: z.string(),
});

// Note Article
const NoteArticleSchema = z.object({
  title: z.string(),
  url: z.string(),
  tags: z.array(z.string()),
  published_at: z.string(),
  like_count: z.number().optional(),
});

// Speaker Deck Slide
const SpeakerDeckSlideSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().optional(),
  presentation_date: z.string().optional(),
  star_count: z.number().optional(),
  view_count: z.number().optional(),
});

// Teratail Reply
const TeratailReplySchema = z.object({
  title: z.string(),
  url: z.string(),
  tags: z.array(z.string()),
  created_at: z.string(),
  is_best_answer: z.boolean().optional(),
});

// Main LAPRAS Data Schema
export const LaprasDataSchema = z.object({
  name: z.string(),
  description: z.string(),
  e_score: z.number(),
  b_score: z.number(),
  i_score: z.number(),
  iconimage_url: z.string(),
  qiita_articles: z.array(QiitaArticleSchema).default([]),
  zenn_articles: z.array(ZennArticleSchema).default([]),
  github_repositories: z.array(GitHubRepositorySchema).default([]),
  activities: z.array(ActivitySchema).default([]),
  events: z.array(EventSchema).default([]),
  blog_articles: z.array(BlogArticleSchema).default([]),
  note_articles: z.array(NoteArticleSchema).default([]),
  speaker_deck_slides: z.array(SpeakerDeckSlideSchema).default([]),
  teratail_replies: z.array(TeratailReplySchema).default([]),
  hatena_articles: z.array(BlogArticleSchema).default([]),
});

// Type exports
export type LaprasData = z.infer<typeof LaprasDataSchema>;
export type GitHubRepository = z.infer<typeof GitHubRepositorySchema>;
export type QiitaArticle = z.infer<typeof QiitaArticleSchema>;
export type ZennArticle = z.infer<typeof ZennArticleSchema>;
export type Activity = z.infer<typeof ActivitySchema>;
export type Event = z.infer<typeof EventSchema>;
