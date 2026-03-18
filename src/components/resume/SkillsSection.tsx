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
    <div className="animate-pulse rounded-md bg-stone-100 p-2 md:p-3">
      <div className="mb-1 h-4 w-2/3 rounded bg-stone-200" />
      <div className="h-3 w-1/3 rounded bg-stone-200" />
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
  const skillId = `skill-${skill.name.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`;
  const durationText = `${skill.years > 0 ? `${skill.years}年` : ""}${skill.months > 0 ? `${skill.months}ヶ月` : ""}`;

  return (
    <li
      className="list-none rounded-md border border-stone-200 p-2 transition-colors duration-200 hover:border-stone-300 md:p-3"
      aria-labelledby={skillId}
    >
      <div className="flex flex-col gap-1">
        <h3
          id={skillId}
          className="truncate text-xs font-medium text-stone-800 md:text-sm"
        >
          {skill.name}
        </h3>
        <span className="text-[10px] text-stone-400 md:text-xs">
          {durationText}
        </span>
      </div>
      <div
        className="mt-1.5 h-1 w-full rounded-full bg-stone-100 md:h-1.5"
        role="progressbar"
        aria-valuenow={Math.round(progressPercent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-labelledby={skillId}
        aria-valuetext={`${skill.name}: ${durationText}`}
      >
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-700"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </li>
  );
}

export function SkillsSection({ skills, loading = false }: SkillsSectionProps) {
  const maxMonths = useMemo(() => calculateMaxMonths(skills), [skills]);

  return (
    <section className="mb-10 md:mb-14" aria-labelledby="skills-section-title">
      <h2
        id="skills-section-title"
        className="mb-4 text-lg font-bold text-stone-900 md:mb-6 md:text-xl"
      >
        Skills & Technologies
      </h2>
      {loading ? (
        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-3 lg:grid-cols-5"
          aria-busy="true"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkillCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <ul
          className="grid list-none grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-3 lg:grid-cols-5"
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
