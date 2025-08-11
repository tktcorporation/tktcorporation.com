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
  stargazers_count: z.number(),
  language: z.string(),
  languages: z.array(GitHubLanguageSchema),
  contributions: z.number(),
  contributions_url: z.string(),
  created_at: z.string().optional(),
  pushed_at: z.string().optional(),
});

// Qiita Article
const QiitaArticleSchema = z.object({
  title: z.string(),
  url: z.string(),
  tags: z.array(z.string()),
  stockers_count: z.number(),
  updated_at: z.string(),
});

// Zenn Article
const ZennArticleSchema = z.object({
  title: z.string(),
  url: z.string(),
  tags: z.array(z.string()),
  posted_at: z.string(),
});

// Main LAPRAS Data Schema
export const LaprasDataSchema = z.object({
  name: z.string(),
  description: z.string(),
  e_score: z.number(),
  b_score: z.number(),
  i_score: z.number(),
  iconimage_url: z.string(),
  qiita_articles: z.array(QiitaArticleSchema),
  zenn_articles: z.array(ZennArticleSchema),
  github_repositories: z.array(GitHubRepositorySchema),
});

// Type exports
export type LaprasData = z.infer<typeof LaprasDataSchema>;
export type GitHubRepository = z.infer<typeof GitHubRepositorySchema>;
export type QiitaArticle = z.infer<typeof QiitaArticleSchema>;
export type ZennArticle = z.infer<typeof ZennArticleSchema>;
