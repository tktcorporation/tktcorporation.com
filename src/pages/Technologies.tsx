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
    <div className="min-h-screen flex flex-col">
      <nav className="px-6 py-4 border-b border-stone-200">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-sm text-stone-500 hover:text-stone-900 transition-colors duration-200"
          >
            Home
          </Link>
          <span className="text-sm font-medium text-stone-900">
            Technologies
          </span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto w-full px-6 py-12 flex-grow">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight mb-2">
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
          <div className="text-center py-12">
            {/* biome-ignore lint/a11y/useSemanticElements: role="status" is correct for loading spinners */}
            <div
              className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-stone-300 border-t-stone-600"
              role="status"
              aria-label="データを読み込み中"
            />
            <p className="mt-4 text-sm text-stone-400" aria-live="polite">
              技術データを読み込み中...
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-12" role="alert">
            <p className="text-red-600 mb-4 text-sm">エラー: {error}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="px-4 py-2 text-sm border border-stone-300 rounded-md hover:bg-stone-50 transition-colors duration-200"
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
            <div className="text-center py-12">
              <p className="text-stone-400 text-sm">
                表示可能な活動データがありません
              </p>
            </div>
          )}
      </main>

      <footer className="mt-auto py-6 text-center text-xs text-stone-400 border-t border-stone-200">
        <p>
          © {new Date().getFullYear()} tkt | Data from{" "}
          <a
            href="https://lapras.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
          >
            LAPRAS
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Technologies;
