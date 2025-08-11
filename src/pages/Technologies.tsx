/**
 * Purpose:
 * 技術スタックの使用履歴をタイムライン形式で可視化するページ。
 * LAPRASのGitHubリポジトリデータを解析し、各技術の使用期間と
 * プロジェクトを時系列で表示することで、技術経験を俯瞰できるようにする。
 *
 * Context:
 * - GitHubリポジトリから言語・技術情報を自動抽出
 * - 使用期間をビジュアルなタイムラインで表示
 * - 技術ごとの総経験期間を計算・表示
 * - レスポンシブデザインでモバイル対応
 */

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLaprasDataSafe } from "../data/laprasData";
import type { GitHubRepository, LaprasData } from "../data/laprasSchema";
import "./Technologies.css";

interface TechnologyTimeline {
  name: string;
  periods: Array<{
    start: Date;
    end: Date | null;
    source: "repository" | "article";
    project: string;
    url: string;
  }>;
  totalMonths: number;
  years: number;
  months: number;
}

// 定数の定義
const MONTHS_PER_YEAR = 12;
const MAX_EXPERIENCE_MONTHS = 24;
const DEFAULT_PROJECT_DURATION_MONTHS = 3;

function Technologies() {
  const [laprasData, setLaprasData] = useState<LaprasData | null>(null);
  const [technologies, setTechnologies] = useState<TechnologyTimeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const extractTechnologiesFromRepositories = useCallback(
    (repos: GitHubRepository[]): TechnologyTimeline[] => {
      const techMap = new Map<string, TechnologyTimeline>();
      const currentDate = new Date();

      for (const repo of repos) {
        // 実際のリポジトリ作成日時を使用、フォールバックで現在日時
        const repositoryDate = new Date(
          repo.created_at || repo.pushed_at || currentDate
        );
        const languages = repo.languages || [];

        if (repo.language) {
          languages.push({ name: repo.language, bytes: 1 });
        }

        for (const lang of languages) {
          const techName = lang.name;
          if (!techMap.has(techName)) {
            techMap.set(techName, {
              name: techName,
              periods: [],
              totalMonths: 0,
              years: 0,
              months: 0,
            });
          }

          const tech = techMap.get(techName);
          if (!tech) continue;
          tech.periods.push({
            start: repositoryDate,
            end: null,
            source: "repository",
            project: repo.title,
            url: repo.url,
          });
        }
      }

      // 実際の経験期間に基づく計算
      for (const tech of techMap.values()) {
        // プロジェクト数ベースの概算（プロジェクトあたりデフォルト3ヶ月）
        const estimatedTotalMonths = Math.min(
          tech.periods.length * DEFAULT_PROJECT_DURATION_MONTHS,
          MAX_EXPERIENCE_MONTHS
        );

        tech.totalMonths = estimatedTotalMonths;
        tech.years = Math.floor(estimatedTotalMonths / MONTHS_PER_YEAR);
        tech.months = estimatedTotalMonths % MONTHS_PER_YEAR;
      }

      return Array.from(techMap.values()).sort((a, b) => {
        const totalA = a.years * MONTHS_PER_YEAR + a.months;
        const totalB = b.years * MONTHS_PER_YEAR + b.months;
        if (totalB !== totalA) {
          return totalB - totalA;
        }
        return a.name.localeCompare(b.name);
      });
    },
    []
  );

  const fetchLaprasData = useCallback(() => {
    try {
      setLoading(true);
      const data = getLaprasDataSafe();

      if (!data) {
        throw new Error("LAPRASデータの読み込みに失敗しました");
      }

      setLaprasData(data);

      const techTimeline = extractTechnologiesFromRepositories(
        data.github_repositories
      );
      setTechnologies(techTimeline);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("不明なエラーが発生しました");
      }
    } finally {
      setLoading(false);
    }
  }, [extractTechnologiesFromRepositories]);

  const handleRetry = useCallback(() => {
    setError(null);
    setLoading(true);
    fetchLaprasData();
  }, [fetchLaprasData]);

  useEffect(() => {
    fetchLaprasData();
  }, [fetchLaprasData]);

  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-950 text-slate-200">
      <nav className="p-6 border-b border-white/10 backdrop-blur-lg bg-black/20">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-lg font-bold hover:text-purple-400 transition-colors flex items-center gap-2"
          >
            <span>←</span> Back to Home
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Technologies
          </h1>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
              Technology Timeline
            </h1>
            <p className="text-xl text-purple-300 animate-fade-in animation-delay-100">
              個人開発で扱った技術の経験とタイムライン
            </p>
          </header>

          {loading && (
            <div className="text-center py-12">
              {/* biome-ignore lint/a11y/useSemanticElements: role="status" is correct for loading spinners */}
              <div
                className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"
                role="status"
                aria-label="データを読み込み中"
              />
              <p className="mt-4 text-slate-400" aria-live="polite">
                技術データを読み込み中...
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-12" role="alert">
              <p className="text-red-400 mb-4">エラー: {error}</p>
              <button
                type="button"
                onClick={handleRetry}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                aria-label="データの再読み込み"
              >
                再試行
              </button>
            </div>
          )}

          {!loading && !error && technologies.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                技術スキル経験年数
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="rounded-lg p-4 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-purple-200">
                        {tech.name}
                      </h3>
                      <span className="px-2 py-1 text-xs bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 rounded-full border border-purple-500/40">
                        {tech.years > 0 && `${tech.years}年`}
                        {tech.months > 0 && `${tech.months}ヶ月`}
                      </span>
                    </div>
                    <div
                      className="w-full bg-slate-700 rounded-full h-2 mb-2"
                      role="progressbar"
                      aria-label={`${tech.name}の経験レベル`}
                    >
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min(100, (tech.totalMonths / MAX_EXPERIENCE_MONTHS) * 100)}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-slate-300 mb-1">
                      経験レベル:{" "}
                      {tech.totalMonths < 6
                        ? "初級"
                        : tech.totalMonths < 18
                          ? "中級"
                          : "上級"}
                    </div>
                    <p className="text-xs text-slate-400 mb-2">
                      プロジェクト数: {tech.periods.length}個
                    </p>

                    <details className="mt-2">
                      <summary
                        className="text-xs text-purple-300 cursor-pointer hover:text-purple-200 transition-colors"
                        aria-label={`${tech.name}の使用プロジェクト詳細を表示`}
                      >
                        使用プロジェクト ({tech.periods.length})
                      </summary>
                      <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                        {tech.periods.map((period, idx) => (
                          <div key={idx} className="text-xs text-slate-300">
                            <a
                              href={period.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-300 hover:text-blue-200 truncate block"
                            >
                              {period.project}
                            </a>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </section>
          )}

          {laprasData && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                技術記事 Timeline
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-purple-200 mb-4">
                    Qiita記事 ({laprasData.qiita_articles.length})
                  </h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {laprasData.qiita_articles
                      .sort(
                        (a, b) =>
                          new Date(b.updated_at).getTime() -
                          new Date(a.updated_at).getTime()
                      )
                      .map((article, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white/5 rounded-lg border border-white/10"
                        >
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 hover:text-blue-200 font-medium text-sm block mb-1"
                          >
                            {article.title}
                          </a>
                          <div className="flex flex-wrap gap-1 mb-1">
                            {article.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 text-xs bg-green-500/20 text-green-300 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-slate-400">
                            {formatDate(new Date(article.updated_at))} •
                            ストック: {article.stockers_count}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-200 mb-4">
                    Zenn記事 ({laprasData.zenn_articles.length})
                  </h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {laprasData.zenn_articles
                      .sort(
                        (a, b) =>
                          new Date(b.posted_at).getTime() -
                          new Date(a.posted_at).getTime()
                      )
                      .map((article, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white/5 rounded-lg border border-white/10"
                        >
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 hover:text-blue-200 font-medium text-sm block mb-1"
                          >
                            {article.title}
                          </a>
                          <p className="text-xs text-slate-400">
                            {formatDate(new Date(article.posted_at))}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {laprasData && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                GitHub リポジトリ ({laprasData.github_repositories.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {laprasData.github_repositories
                  .sort((a, b) => b.contributions - a.contributions)
                  .map((repo) => (
                    <div
                      key={repo.id}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-purple-200 text-sm">
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-purple-100"
                          >
                            {repo.title}
                          </a>
                        </h3>
                        <span className="text-xs text-slate-400">
                          {repo.contributions} commits
                        </span>
                      </div>

                      {repo.description && (
                        <p className="text-xs text-slate-300 mb-2">
                          {repo.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-1">
                        {repo.languages.map((lang) => (
                          <span
                            key={lang.name}
                            className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-300 rounded"
                          >
                            {lang.name}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-slate-400">
                          ⭐ {repo.stargazers_count}
                        </span>
                        <div className="flex gap-2 text-xs">
                          {repo.is_owner && (
                            <span className="text-green-400">Owner</span>
                          )}
                          {repo.is_oss && (
                            <span className="text-blue-400">OSS</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="mt-auto py-6 text-center text-sm text-slate-400 border-t border-white/10 backdrop-blur-lg bg-black/20">
        <p>
          © {new Date().getFullYear()} tkt | Data from{" "}
          <a
            href="https://lapras.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            LAPRAS
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Technologies;
