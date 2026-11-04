/**
 * Purpose:
 * 月次の活動量を積み上げ棒グラフで可視化するコンポーネント。
 * Code（commits+PRs）、Articles、Eventsの3カテゴリを色分けして表示し、
 * 活動の推移を直感的に把握できるようにする。
 *
 * Context:
 * - 外部チャートライブラリを使わず、純粋なSVGで描画
 * - デザインシステムの色（blue, stone）のみ使用
 * - レスポンシブ対応（viewBox + percentage幅）
 */

import type { Activity } from "@/data/laprasSchema";

interface MonthlyData {
  label: string;
  code: number;
  articles: number;
  events: number;
}

/**
 * アクティビティ配列から直近12ヶ月の月次集計を計算する。
 * 各月のcode(github+github_pr)、articles(qiita/zenn/blog/note)、events(connpass)をカウント。
 */
function computeMonthlyData(activities: Activity[]): MonthlyData[] {
  const now = new Date();
  const months: MonthlyData[] = [];

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);

    let code = 0;
    let articles = 0;
    let events = 0;

    for (const a of activities) {
      const d = new Date(a.date);
      if (d >= date && d < nextMonth) {
        if (a.type === "github" || a.type === "github_pr") {
          code++;
        } else if (a.type === "connpass") {
          events++;
        } else {
          articles++;
        }
      }
    }

    const monthLabel = date.toLocaleDateString("en-US", { month: "short" });
    months.push({ label: monthLabel, code, articles, events });
  }

  return months;
}

interface ActivityBarChartProps {
  activities: Activity[];
}

export function ActivityBarChart({ activities }: ActivityBarChartProps) {
  const data = computeMonthlyData(activities);
  const maxTotal = Math.max(
    ...data.map((d) => d.code + d.articles + d.events),
    1
  );

  const chartWidth = 600;
  const chartHeight = 160;
  const barWidth = 32;
  const gap = (chartWidth - barWidth * 12) / 13;

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-xs text-stone-400">
          <span className="inline-block h-2 w-2 rounded-sm bg-blue-400" />
          Code
        </span>
        <span className="flex items-center gap-1.5 text-xs text-stone-400">
          <span className="inline-block h-2 w-2 rounded-sm bg-blue-200" />
          Articles
        </span>
        <span className="flex items-center gap-1.5 text-xs text-stone-400">
          <span className="inline-block h-2 w-2 rounded-sm bg-stone-300" />
          Events
        </span>
      </div>

      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight + 24}`}
        className="w-full"
        role="img"
        aria-label="月次アクティビティ棒グラフ"
      >
        {data.map((d, i) => {
          const x = gap + i * (barWidth + gap);
          const total = d.code + d.articles + d.events;
          const maxBarHeight = chartHeight - 8;

          const codeH = (d.code / maxTotal) * maxBarHeight;
          const articlesH = (d.articles / maxTotal) * maxBarHeight;
          const eventsH = (d.events / maxTotal) * maxBarHeight;

          let y = chartHeight;

          const bars = [];

          if (d.code > 0) {
            y -= codeH;
            bars.push(
              <rect
                key="code"
                x={x}
                y={y}
                width={barWidth}
                height={codeH}
                rx={2}
                className="fill-blue-400"
              />
            );
          }

          if (d.articles > 0) {
            y -= articlesH;
            bars.push(
              <rect
                key="articles"
                x={x}
                y={y}
                width={barWidth}
                height={articlesH}
                rx={2}
                className="fill-blue-200"
              />
            );
          }

          if (d.events > 0) {
            y -= eventsH;
            bars.push(
              <rect
                key="events"
                x={x}
                y={y}
                width={barWidth}
                height={eventsH}
                rx={2}
                className="fill-stone-300"
              />
            );
          }

          return (
            <g key={d.label}>
              {total === 0 && (
                <rect
                  x={x}
                  y={chartHeight - 2}
                  width={barWidth}
                  height={2}
                  rx={1}
                  className="fill-stone-100"
                />
              )}
              {bars}
              <text
                x={x + barWidth / 2}
                y={chartHeight + 16}
                textAnchor="middle"
                className="fill-stone-400 text-[10px]"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
