/**
 * Purpose:
 * 技術活動の全体像を「トレンド + タイムライン」で提示するページ。
 * 直近1年のハイライトを大きな余白とタイポグラフィで伝え、
 * 詳細はフラットなタイムラインで深掘りできる構成。
 *
 * Context:
 * - Dia/Arc風: 余白で語る、洗練されつつワクワクするデザイン
 * - トレンドセクションで直近の全体像を一目で把握
 * - タイムラインで時系列の詳細を確認
 */

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { DotPattern, WavyUnderline } from "@/components/illustrations";

import { TechnologyTimeline } from "../components/TechnologyTimeline";
import { fetchLaprasData } from "../data/laprasData";
import type { LaprasData } from "../data/laprasSchema";
import { useLaprasActivities } from "../hooks/useLaprasActivities";
import { getTechIcon } from "../utils/techIcons";

function Technologies() {
  const [laprasData, setLaprasData] = useState<LaprasData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    timelineEntries,
    timeSpan,
    setTimeSpan,
    trendSummary,
    loading: activitiesLoading,
  } = useLaprasActivities(laprasData);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLaprasData();
      setLaprasData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("不明なエラーが発生しました");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRetry = useCallback(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            to="/"
            className="text-sm text-stone-400 transition-colors duration-200 hover:text-stone-700"
          >
            Home
          </Link>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-3xl flex-grow px-6 py-16 md:py-24">
        {/* ヒーローヘッダー — 余白たっぷり */}
        <header className="mb-20">
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
            Activities
          </h1>
          <WavyUnderline className="mt-2 text-blue-400" />
          <p className="mt-4 text-sm text-stone-400">
            What I&apos;ve been building, writing, and attending.
          </p>
        </header>

        {loading && (
          <div className="py-24 text-center">
            <div
              className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-stone-200 border-t-stone-500"
              role="status"
              aria-label="データを読み込み中"
            />
          </div>
        )}

        {error && (
          <div className="py-24 text-center" role="alert">
            <p className="mb-4 text-sm text-stone-500">{error}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="text-sm text-stone-400 underline transition-colors duration-200 hover:text-stone-700"
              aria-label="データの再読み込み"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && !activitiesLoading && trendSummary && (
          <>
            {/* ===== Recent Trends ===== */}
            <section className="mb-24">
              <div className="mb-8 flex items-center gap-3">
                <h2 className="text-xs font-medium tracking-widest text-stone-400 uppercase">
                  Past 12 Months
                </h2>
                <DotPattern className="text-stone-200" />
              </div>

              {/* キー数値 — 大きな数字、余白で区切る */}
              <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
                <div>
                  <p className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
                    {trendSummary.activeRepoCount}
                  </p>
                  <p className="mt-1 text-xs text-stone-400">Repositories</p>
                </div>
                <div>
                  <p className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
                    {trendSummary.totalPRs}
                  </p>
                  <p className="mt-1 text-xs text-stone-400">Pull Requests</p>
                </div>
                <div>
                  <p className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
                    {trendSummary.articleCount}
                  </p>
                  <p className="mt-1 text-xs text-stone-400">Articles</p>
                </div>
                <div>
                  <p className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
                    {trendSummary.eventCount}
                  </p>
                  <p className="mt-1 text-xs text-stone-400">Events</p>
                </div>
              </div>

              {/* トップ言語 — ミニマルバー */}
              {trendSummary.topLanguages.length > 0 && (
                <div className="mb-12">
                  <h3 className="mb-4 text-xs font-medium text-stone-400">
                    Top Languages
                  </h3>
                  <div className="space-y-3">
                    {trendSummary.topLanguages.map((lang) => {
                      const Icon = getTechIcon(lang.name);
                      return (
                        <div
                          key={lang.name}
                          className="flex items-center gap-3"
                        >
                          <span className="flex w-24 items-center gap-1.5 text-sm text-stone-600">
                            {Icon && (
                              <Icon className="h-4 w-4 text-stone-400" />
                            )}
                            {lang.name}
                          </span>
                          <div className="h-1 flex-1 overflow-hidden rounded-full bg-stone-100">
                            <div
                              className="h-full rounded-full bg-blue-400 transition-all duration-200"
                              style={{ width: `${lang.ratio * 100}%` }}
                            />
                          </div>
                          <span className="w-8 text-right text-xs text-stone-300">
                            {lang.count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* トップリポジトリ */}
              {trendSummary.topRepos.length > 0 && (
                <div>
                  <h3 className="mb-4 text-xs font-medium text-stone-400">
                    Most Active
                  </h3>
                  <div className="space-y-1">
                    {trendSummary.topRepos.map((repo) => (
                      <a
                        key={repo.name}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-baseline gap-3 rounded-md px-1 py-1.5 transition-colors duration-200 hover:bg-stone-50"
                      >
                        <span className="min-w-0 flex-1 truncate text-sm text-stone-700 transition-colors duration-200 group-hover:text-stone-900">
                          {repo.name}
                        </span>
                        <span className="flex-shrink-0 text-xs text-stone-300">
                          {repo.language && (
                            <span className="mr-2 text-stone-400">
                              {repo.language}
                            </span>
                          )}
                          {repo.activityCount} activities
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* ===== Timeline ===== */}
            <section>
              <div className="mb-12 flex items-center gap-3">
                <h2 className="text-xs font-medium tracking-widest text-stone-400 uppercase">
                  Timeline
                </h2>
                <div className="h-px flex-1 bg-stone-100" />
              </div>

              {timelineEntries.length > 0 && (
                <TechnologyTimeline
                  entries={timelineEntries}
                  timeSpan={timeSpan}
                  onTimeSpanChange={setTimeSpan}
                />
              )}

              {timelineEntries.length === 0 && (
                <p className="text-sm text-stone-400">
                  No activity data available.
                </p>
              )}
            </section>
          </>
        )}
      </main>

      <footer className="mt-auto py-12 text-center text-xs text-stone-300">
        <p>
          © {new Date().getFullYear()} tkt · Data from{" "}
          <a
            href="https://lapras.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 transition-colors duration-200 hover:text-blue-500"
          >
            LAPRAS
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Technologies;
