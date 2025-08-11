/**
 * Purpose:
 * 技術スタックと活動履歴を時系列で表示するページ。
 * LAPRASデータを基に、期間ごとの活動をタイムライン形式で
 * 視覚化し、技術的な成長と興味の変遷を表現する。
 *
 * Context:
 * - カスタムフックとコンポーネントに処理を分離
 * - 1ヶ月、6ヶ月、1年単位での表示切り替えをサポート
 * - 縦型タイムラインで職歴のような視覚的表現を実現
 */

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TechnologyTimeline } from "../components/TechnologyTimeline";
import { getLaprasDataSafe } from "../data/laprasData";
import type { LaprasData } from "../data/laprasSchema";
import { useLaprasActivities } from "../hooks/useLaprasActivities";
import "./Technologies.css";

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
    <div className="min-h-screen flex flex-col text-slate-200">
      <nav className="p-6 border-b border-white/10 backdrop-blur-lg bg-black/20">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-lg font-bold hover:text-purple-400 transition-colors flex items-center gap-2"
          >
            Home
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Technology Timeline
          </h1>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
              Activities
            </h1>
            {laprasData && (
              <div className="flex justify-center gap-4 text-sm text-slate-400 mt-4">
                <span>
                  📊 {laprasData.github_repositories.length} repositories
                </span>
                <span>
                  ✍️{" "}
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
                <p className="text-slate-400">
                  表示可能な活動データがありません
                </p>
              </div>
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
