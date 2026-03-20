/**
 * Purpose:
 * 技術スタックと活動履歴を時系列で表示するページ。
 * LAPRASデータを基に、期間ごとの活動をタイムライン形式で
 * 視覚化し、技術的な成長と興味の変遷を表現する。
 *
 * Context:
 * - カスタムフックとコンポーネントに処理を分離
 * - 1ヶ月、6ヶ月、1年単位での表示切り替えをサポート
 * - ミニマルなライトテーマのタイムライン表示
 */

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { TechnologyTimeline } from "../components/TechnologyTimeline";
import { getLaprasDataSafe } from "../data/laprasData";
import type { LaprasData } from "../data/laprasSchema";
import { useLaprasActivities } from "../hooks/useLaprasActivities";

function Technologies() {
  const [laprasData, setLaprasData] = useState<LaprasData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    timelineEntries,
    timeSpan,
    setTimeSpan,
    loading: activitiesLoading,
  } = useLaprasActivities(laprasData);

  const fetchLaprasData = useCallback(() => {
    try {
      setLoading(true);
      const data = getLaprasDataSafe();

      if (!data) {
        throw new Error("LAPRASデータの読み込みに失敗しました");
      }

      setLaprasData(data);
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
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    setLoading(true);
    fetchLaprasData();
  }, [fetchLaprasData]);

  useEffect(() => {
    fetchLaprasData();
  }, [fetchLaprasData]);

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

      <main className="mx-auto w-full max-w-3xl flex-grow px-6 py-12">
        <header className="mb-8">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
            Activities
          </h1>
          {laprasData && (
            <div className="flex gap-4 text-sm text-stone-400">
              <span>{laprasData.github_repositories.length} repositories</span>
              <span>
                {laprasData.qiita_articles.length +
                  laprasData.zenn_articles.length}{" "}
                articles
              </span>
            </div>
          )}
        </header>

        {loading && (
          <div className="py-12 text-center">
            {/* oxlint-ignore: role="status" is correct for loading spinners */}
            <div
              className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600"
              role="status"
              aria-label="データを読み込み中"
            />
            <p className="mt-4 text-sm text-stone-400" aria-live="polite">
              技術データを読み込み中...
            </p>
          </div>
        )}

        {error && (
          <div className="py-12 text-center" role="alert">
            <p className="mb-4 text-sm text-red-600">エラー: {error}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-md border border-stone-300 px-4 py-2 text-sm transition-colors duration-200 hover:bg-stone-50"
              aria-label="データの再読み込み"
            >
              再試行
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          !activitiesLoading &&
          timelineEntries.length > 0 && (
            <TechnologyTimeline
              entries={timelineEntries}
              timeSpan={timeSpan}
              onTimeSpanChange={setTimeSpan}
            />
          )}

        {!loading &&
          !error &&
          !activitiesLoading &&
          timelineEntries.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-stone-400">
                表示可能な活動データがありません
              </p>
            </div>
          )}
      </main>

      <footer className="mt-auto py-8 text-center text-xs text-stone-300">
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
