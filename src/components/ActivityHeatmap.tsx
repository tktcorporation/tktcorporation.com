/**
 * Purpose:
 * GitHub風のコントリビューションヒートマップで、日次の活動密度を可視化する。
 * 直近約6ヶ月分の活動をカレンダーグリッド形式で表示し、
 * 活動の集中度やパターンを直感的に確認できるようにする。
 *
 * Context:
 * - 外部ライブラリ不要、SVGで直接描画
 * - デザインシステムのblue系パレットで濃淡を表現
 * - 週ごとの列、曜日ごとの行で配置
 */

import type { Activity } from "@/data/laprasSchema";

/**
 * 日付文字列 (YYYY-MM-DD) → アクティビティ数のマップを作成。
 * 直近26週（約6ヶ月）分を対象とする。
 */
function computeDailyActivity(activities: Activity[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const a of activities) {
    const key = a.date.slice(0, 10);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return counts;
}

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * アクティビティ数に応じた色クラスを返す。
 * 0: stone-100, 1-2: blue-100, 3-5: blue-200, 6-9: blue-400, 10+: blue-600
 */
function getColorClass(count: number): string {
  if (count === 0) return "fill-stone-100";
  if (count <= 2) return "fill-blue-100";
  if (count <= 5) return "fill-blue-200";
  if (count <= 9) return "fill-blue-400";
  return "fill-blue-600";
}

interface ActivityHeatmapProps {
  activities: Activity[];
}

export function ActivityHeatmap({ activities }: ActivityHeatmapProps) {
  const dailyCounts = computeDailyActivity(activities);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /** 26週前の日曜日を起点にする */
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 26 * 7 - startDate.getDay());

  const cellSize = 12;
  const cellGap = 2;
  const step = cellSize + cellGap;

  const weeks: Array<Array<{ date: Date; count: number }>> = [];
  let currentWeek: Array<{ date: Date; count: number }> = [];

  const cursor = new Date(startDate);
  while (cursor <= today) {
    const key = toDateKey(cursor);
    currentWeek.push({
      date: new Date(cursor),
      count: dailyCounts.get(key) || 0,
    });

    if (cursor.getDay() === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const svgWidth = weeks.length * step + 28;
  const svgHeight = 7 * step + 4;

  /** 月ラベル用: 各月の最初の週のインデックスを収集 */
  const monthLabels: Array<{ label: string; weekIndex: number }> = [];
  let lastMonth = -1;
  for (let wi = 0; wi < weeks.length; wi++) {
    const firstDay = weeks[wi][0];
    if (firstDay && firstDay.date.getMonth() !== lastMonth) {
      lastMonth = firstDay.date.getMonth();
      monthLabels.push({
        label: firstDay.date.toLocaleDateString("en-US", { month: "short" }),
        weekIndex: wi,
      });
    }
  }

  return (
    <div>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight + 16}`}
        className="w-full"
        role="img"
        aria-label="アクティビティヒートマップ（直近6ヶ月）"
      >
        {/* 月ラベル */}
        {monthLabels.map((m) => (
          <text
            key={`${m.label}-${m.weekIndex}`}
            x={28 + m.weekIndex * step}
            y={10}
            className="fill-stone-400 text-[9px]"
          >
            {m.label}
          </text>
        ))}

        {/* セルグリッド */}
        {weeks.map((week, wi) =>
          week.map((day) => (
            <rect
              key={toDateKey(day.date)}
              x={28 + wi * step}
              y={16 + day.date.getDay() * step}
              width={cellSize}
              height={cellSize}
              rx={2}
              className={getColorClass(day.count)}
            >
              <title>
                {toDateKey(day.date)}: {day.count} activities
              </title>
            </rect>
          ))
        )}
      </svg>

      {/* 凡例 */}
      <div className="mt-2 flex items-center justify-end gap-1 text-xs text-stone-400">
        <span>Less</span>
        <span className="inline-block h-2.5 w-2.5 rounded-sm bg-stone-100" />
        <span className="inline-block h-2.5 w-2.5 rounded-sm bg-blue-100" />
        <span className="inline-block h-2.5 w-2.5 rounded-sm bg-blue-200" />
        <span className="inline-block h-2.5 w-2.5 rounded-sm bg-blue-400" />
        <span className="inline-block h-2.5 w-2.5 rounded-sm bg-blue-600" />
        <span>More</span>
      </div>
    </div>
  );
}
