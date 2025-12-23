/**
 * Purpose:
 * スキルと技術スタックを表示するセクションコンポーネント。
 * スキルの経験年数をプログレスバーで視覚化する。
 *
 * Context:
 * - Resume.tsxから分離されたコンポーネント
 * - スキルデータを受け取り、グリッド形式で表示
 * - ローディング状態のスケルトンUIをサポート
 * - 進捗バーの最大値はスキルの中で最も長いものを基準に動的計算
 */

import { useMemo } from "react";
import type { SkillWithYears } from "@/types/experience";

/** 進捗バーの最小月数（短すぎるバーを防ぐ） */
const MIN_PROGRESS_BAR_MONTHS = 12;

interface SkillsSectionProps {
  skills: SkillWithYears[];
  loading?: boolean;
}

/**
 * スキルの月数を計算
 */
function calculateTotalMonths(skill: SkillWithYears): number {
  return skill.years * 12 + skill.months;
}

/**
 * 進捗バーの最大月数を動的に計算
 * 最も長いスキルの月数を基準にする
 */
function calculateMaxMonths(skills: SkillWithYears[]): number {
  if (skills.length === 0) return MIN_PROGRESS_BAR_MONTHS;

  const maxMonths = Math.max(...skills.map(calculateTotalMonths));
  return Math.max(maxMonths, MIN_PROGRESS_BAR_MONTHS);
}

function SkillCardSkeleton() {
  return (
    <div className="rounded-md p-2 md:p-3 bg-white/5 backdrop-blur-lg border border-white/10 animate-pulse">
      <div className="h-4 bg-white/10 rounded w-2/3 mb-1" />
      <div className="h-3 bg-white/10 rounded w-1/3" />
    </div>
  );
}

interface SkillCardProps {
  skill: SkillWithYears;
  maxMonths: number;
}

function SkillCard({ skill, maxMonths }: SkillCardProps) {
  const totalMonths = calculateTotalMonths(skill);
  const progressPercent = Math.min(100, (totalMonths / maxMonths) * 100);
  // 一意のIDを生成（スキル名からスペースと特殊文字を除去）
  const skillId = `skill-${skill.name.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`;
  const durationText = `${skill.years > 0 ? `${skill.years}年` : ""}${skill.months > 0 ? `${skill.months}ヶ月` : ""}`;

  return (
    <li
      className="rounded-md p-2 md:p-3 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 md:hover:shadow-lg md:hover:shadow-purple-500/20 md:hover:-translate-y-1 list-none"
      aria-labelledby={skillId}
    >
      <div className="flex flex-col gap-1">
        <h3
          id={skillId}
          className="text-xs md:text-sm font-semibold text-purple-200 truncate"
        >
          {skill.name}
        </h3>
        <span className="text-[10px] md:text-xs text-purple-300">
          {durationText}
        </span>
      </div>
      <div
        className="w-full bg-slate-700 rounded-full h-1 md:h-1.5 mt-1.5"
        role="progressbar"
        aria-valuenow={Math.round(progressPercent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-labelledby={skillId}
        aria-valuetext={`${skill.name}: ${durationText}`}
      >
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-700"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </li>
  );
}

export function SkillsSection({ skills, loading = false }: SkillsSectionProps) {
  // 動的に最大月数を計算（メモ化してパフォーマンス最適化）
  const maxMonths = useMemo(() => calculateMaxMonths(skills), [skills]);

  return (
    <section className="mb-8 md:mb-12" aria-labelledby="skills-section-title">
      <h2
        id="skills-section-title"
        className="text-xl md:text-2xl font-bold mb-4 md:mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
      >
        Skills & Technologies
      </h2>
      {loading ? (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3"
          aria-busy="true"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkillCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <ul
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 list-none"
          aria-label="Professional skills with experience duration"
        >
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} maxMonths={maxMonths} />
          ))}
        </ul>
      )}
    </section>
  );
}
