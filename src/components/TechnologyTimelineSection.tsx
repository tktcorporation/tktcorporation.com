/**
 * Purpose:
 * Technology Timeline を表示するセクションコンポーネント。
 * Home ページから Technology Timeline 関連のロジックを分離し、
 * 再利用可能なコンポーネントとして独立させる。
 *
 * Context:
 * - Home.tsx の複雑さを軽減し、単一責任の原則に従う
 * - Technology Timeline の表示ロジックをカプセル化
 * - デフォルトは1年間隔で表示、ユーザーが期間を切り替え可能
 */

import { useEffect } from "react";
import { TechnologyTimeline } from "@/components/TechnologyTimeline";
import { getLaprasData } from "@/data/laprasData";
import { useLaprasActivities } from "@/hooks/useLaprasActivities";

export function TechnologyTimelineSection() {
  const { timelineEntries, timeSpan, setTimeSpan, loading } =
    useLaprasActivities(getLaprasData());

  // デフォルトは1年間隔
  useEffect(() => {
    setTimeSpan("1year");
  }, [setTimeSpan]);

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
          Technology Timeline
        </h2>
        {!loading && (
          <TechnologyTimeline
            entries={timelineEntries}
            timeSpan={timeSpan}
            onTimeSpanChange={setTimeSpan}
          />
        )}
      </div>
    </section>
  );
}
