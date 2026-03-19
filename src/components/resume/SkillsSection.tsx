/**
 * Purpose:
 * スキルと技術スタックをカテゴリ別に表示するセクションコンポーネント。
 * Languages / Frameworks / Infrastructure / Databases / Tools のグループで
 * 整理し、スキル名と期間をコンパクトなインライン表示で可視化する。
 *
 * Context:
 * - Resume.tsxから分離されたコンポーネント
 * - ボーダーなし: テキスト+薄い背景バーのみで表現
 * - カテゴリ別グループ化で技術スタックの全体像を把握しやすくする
 */

import { useMemo } from "react";

import type { SkillWithYears } from "@/types/experience";
import { getTechnologyType } from "@/utils/languageMap";

/** 進捗バーの最小月数（短すぎるバーを防ぐ） */
const MIN_PROGRESS_BAR_MONTHS = 12;

/**
 * カテゴリ表示順と表示名の定義
 * type値 → 表示ラベルのマッピング
 */
const CATEGORY_CONFIG: { types: string[]; label: string }[] = [
  { types: ["programming"], label: "Languages" },
  { types: ["framework", "backend", "css"], label: "Frameworks" },
  { types: ["cloud", "infrastructure", "hosting", "ci"], label: "Infrastructure" },
  { types: ["database"], label: "Databases" },
  { types: ["tool", "mobile", "markup"], label: "Tools & Others" },
];

interface SkillCategory {
  label: string;
  skills: SkillWithYears[];
}

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
        <h4
          id={skillId}
          className="truncate text-xs font-medium text-stone-700 md:text-sm"
        >
          {skill.name}
        </h4>
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

/**
 * スキルをカテゴリ別にグループ化
 * getTechnologyType で各スキルの種類を判定し、CATEGORY_CONFIG に基づいて分類
 */
function categorizeSkills(skills: SkillWithYears[]): SkillCategory[] {
  const categoryMap = new Map<string, SkillWithYears[]>();

  for (const skill of skills) {
    const type = getTechnologyType(skill.name);
    let assigned = false;

    for (const config of CATEGORY_CONFIG) {
      if (config.types.includes(type)) {
        const existing = categoryMap.get(config.label) ?? [];
        existing.push(skill);
        categoryMap.set(config.label, existing);
        assigned = true;
        break;
      }
    }

    // 未分類のスキルは "Tools & Others" に
    if (!assigned) {
      const fallbackLabel = "Tools & Others";
      const existing = categoryMap.get(fallbackLabel) ?? [];
      existing.push(skill);
      categoryMap.set(fallbackLabel, existing);
    }
  }

  // CATEGORY_CONFIG の順序でカテゴリを返す（空カテゴリは除外）
  return CATEGORY_CONFIG.map((config) => ({
    label: config.label,
    skills: categoryMap.get(config.label) ?? [],
  })).filter((cat) => cat.skills.length > 0);
}

export function SkillsSection({ skills, loading = false }: SkillsSectionProps) {
  const maxMonths = useMemo(() => calculateMaxMonths(skills), [skills]);
  const categories = useMemo(() => categorizeSkills(skills), [skills]);

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
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.label}>
              <h3 className="mb-2 text-xs font-medium tracking-wide text-stone-400 uppercase">
                {category.label}
              </h3>
              <ul
                className="grid list-none grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                aria-label={`${category.label} skills`}
              >
                {category.skills.map((skill) => (
                  <SkillItem
                    key={skill.name}
                    skill={skill}
                    maxMonths={maxMonths}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
