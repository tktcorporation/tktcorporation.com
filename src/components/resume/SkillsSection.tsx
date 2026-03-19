/**
 * Purpose:
 * スキルと技術スタックを表示するセクションコンポーネント。
 * スキル名と期間をコンパクトなインライン表示で可視化する。
 *
 * Context:
 * - Resume.tsxから分離されたコンポーネント
 * - ボーダーなし: テキスト+薄い背景バーのみで表現
 * - 近接の原則: スキル名と期間を密着、スキル間は余白で区切る
 */

import { useMemo } from "react";

import type { SkillWithYears } from "@/types/experience";

/** 進捗バーの最小月数（短すぎるバーを防ぐ） */
const MIN_PROGRESS_BAR_MONTHS = 12;

interface SkillsSectionProps {
  skills: SkillWithYears[];
  loading?: boolean;
}

function calculateTotalMonths(skill: SkillWithYears): number {
  return skill.years * 12 + skill.months;
}

function calculateMaxMonths(skills: SkillWithYears[]): number {
  if (skills.length === 0) return MIN_PROGRESS_BAR_MONTHS;

  const maxMonths = Math.max(...skills.map(calculateTotalMonths));
  return Math.max(maxMonths, MIN_PROGRESS_BAR_MONTHS);
}

function SkillItemSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-0.5 h-3 w-16 rounded bg-stone-100" />
      <div className="h-1 w-full rounded-full bg-stone-50" />
    </div>
  );
}

interface SkillItemProps {
  skill: SkillWithYears;
  maxMonths: number;
}

/**
 * 個別スキル表示: 名前+期間をインラインで、その下に薄いバー
 * ボーダーなし、パディングなしのミニマル表現
 */
function SkillItem({ skill, maxMonths }: SkillItemProps) {
  const totalMonths = calculateTotalMonths(skill);
  const progressPercent = Math.min(100, (totalMonths / maxMonths) * 100);
  const skillId = `skill-${skill.name.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`;
  const durationText = `${skill.years > 0 ? `${skill.years}年` : ""}${skill.months > 0 ? `${skill.months}ヶ月` : ""}`;

  return (
    <li className="list-none" aria-labelledby={skillId}>
      <div className="flex items-baseline justify-between gap-2">
        <h3
          id={skillId}
          className="truncate text-xs font-medium text-stone-700 md:text-sm"
        >
          {skill.name}
        </h3>
        <span className="shrink-0 text-[10px] text-stone-400 md:text-xs">
          {durationText}
        </span>
      </div>
      <div
        className="mt-1 h-0.5 w-full rounded-full bg-stone-100"
        role="progressbar"
        aria-valuenow={Math.round(progressPercent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-labelledby={skillId}
        aria-valuetext={`${skill.name}: ${durationText}`}
      >
        <div
          className="h-full rounded-full bg-blue-400/60"
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
          className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          aria-busy="true"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkillItemSkeleton key={i} />
          ))}
        </div>
      ) : (
        <ul
          className="grid list-none grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          aria-label="Professional skills with experience duration"
        >
          {skills.map((skill) => (
            <SkillItem key={skill.name} skill={skill} maxMonths={maxMonths} />
          ))}
        </ul>
      )}
    </section>
  );
}
