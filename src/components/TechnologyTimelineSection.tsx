/**
 * Purpose:
 * Technology Timeline を表示するセクションコンポーネント。
 * Home ページから Technology Timeline 関連のロジックを分離し、
 * 再利用可能なコンポーネントとして独立させる。
 *
 * Context:
 * - Home.tsx の複雑さを軽減し、単一責任の原則に従う
 * - Technology Timeline の表示ロジックをカプセル化
 * - 1年間隔での表示に固定し、シンプルなインターフェースを提供
 */

import { useEffect } from "react";
import { TechnologyTimeline } from "@/components/TechnologyTimeline";
import { getLaprasData } from "@/data/laprasData";
import { useLaprasActivities } from "@/hooks/useLaprasActivities";

export function TechnologyTimelineSection() {
  const { timelineEntries, setTimeSpan, loading } = useLaprasActivities(
    getLaprasData()
  );

  // 1年間隔に固定
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
            timeSpan="1year"
            onTimeSpanChange={() => {}} // 1年固定なので変更不可
          />
        )}
      </div>
    </section>
  );
}
