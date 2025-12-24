/**
 * Purpose:
 * スキルと技術スタックをカテゴリ別に表示するセクションコンポーネント。
 * スキルの経験年数をプログレスバーで視覚化する。
 *
 * Context:
 * - Resume.tsxから分離されたコンポーネント
 * - スキルをLanguages/Frontend/Backend/Infrastructure/Databaseに分類
 * - ローディング状態のスケルトンUIをサポート
 * - 進捗バーの最大値はスキルの中で最も長いものを基準に動的計算
 */

import { useMemo } from "react";
import type { SkillCategory, SkillWithYears } from "@/types/experience";

/** 進捗バーの最小月数（短すぎるバーを防ぐ） */
const MIN_PROGRESS_BAR_MONTHS = 12;

/** カテゴリの表示設定 */
const CATEGORY_CONFIG: Record<SkillCategory, { label: string; order: number }> =
  {
    language: { label: "Languages", order: 1 },
    frontend: { label: "Frontend", order: 2 },
    backend: { label: "Backend", order: 3 },
    infrastructure: { label: "Infrastructure", order: 4 },
    database: { label: "Database", order: 5 },
    other: { label: "Other", order: 6 },
  };

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

/**
 * スキルをカテゴリ別にグループ化
 */
function groupSkillsByCategory(
  skills: SkillWithYears[]
): Map<SkillCategory, SkillWithYears[]> {
  const grouped = new Map<SkillCategory, SkillWithYears[]>();

  for (const skill of skills) {
    const category = skill.category;
    if (!grouped.has(category)) {
      grouped.set(category, []);
    }
    grouped.get(category)?.push(skill);
  }

  return grouped;
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

  return (
    <div className="rounded-md p-2 md:p-3 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 md:hover:shadow-lg md:hover:shadow-purple-500/20 md:hover:-translate-y-1">
      <div className="flex flex-col gap-1">
        <h4 className="text-xs md:text-sm font-semibold text-purple-200 truncate">
          {skill.name}
        </h4>
        <span className="text-[10px] md:text-xs text-purple-300">
          {skill.years > 0 && `${skill.years}年`}
          {skill.months > 0 && `${skill.months}ヶ月`}
        </span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-1 md:h-1.5 mt-1.5">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-700"
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progressPercent)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skill.name}: ${skill.years > 0 ? `${skill.years}年` : ""}${skill.months > 0 ? `${skill.months}ヶ月` : ""}`}
        />
      </div>
    </div>
  );
}

interface SkillCategoryGroupProps {
  category: SkillCategory;
  skills: SkillWithYears[];
  maxMonths: number;
}

function SkillCategoryGroup({
  category,
  skills,
  maxMonths,
}: SkillCategoryGroupProps) {
  const config = CATEGORY_CONFIG[category];

  return (
    <div className="mb-6">
      <h3 className="text-sm md:text-base font-semibold text-slate-300 mb-3">
        {config.label}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
        {skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} maxMonths={maxMonths} />
        ))}
      </div>
    </div>
  );
}

export function SkillsSection({ skills, loading = false }: SkillsSectionProps) {
  // 動的に最大月数を計算（メモ化してパフォーマンス最適化）
  const maxMonths = useMemo(() => calculateMaxMonths(skills), [skills]);

  // スキルをカテゴリ別にグループ化
  const groupedSkills = useMemo(() => groupSkillsByCategory(skills), [skills]);

  // カテゴリを表示順でソート
  const sortedCategories = useMemo(() => {
    return Array.from(groupedSkills.keys()).sort(
      (a, b) => CATEGORY_CONFIG[a].order - CATEGORY_CONFIG[b].order
    );
  }, [groupedSkills]);

  return (
    <section className="mb-8 md:mb-12">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Skills & Technologies
      </h2>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkillCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div>
          {sortedCategories.map((category) => {
            const categorySkills = groupedSkills.get(category);
            if (!categorySkills || categorySkills.length === 0) return null;

            return (
              <SkillCategoryGroup
                key={category}
                category={category}
                skills={categorySkills}
                maxMonths={maxMonths}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
