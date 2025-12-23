/**
 * Purpose:
 * スキルと技術スタックを表示するセクションコンポーネント。
 * スキルの経験年数をプログレスバーで視覚化する。
 *
 * Context:
 * - Resume.tsxから分離されたコンポーネント
 * - スキルデータを受け取り、グリッド形式で表示
 * - ローディング状態のスケルトンUIをサポート
 */

import type { SkillWithYears } from "@/types/experience";

const PROGRESS_BAR_MAX_MONTHS = 24; // 2 years maximum for progress bar calculation

interface SkillsSectionProps {
  skills: SkillWithYears[];
  loading?: boolean;
}

function SkillCardSkeleton() {
  return (
    <div className="rounded-md p-2 md:p-3 bg-white/5 backdrop-blur-lg border border-white/10 animate-pulse">
      <div className="h-4 bg-white/10 rounded w-2/3 mb-1" />
      <div className="h-3 bg-white/10 rounded w-1/3" />
    </div>
  );
}

function SkillCard({ skill }: { skill: SkillWithYears }) {
  const totalMonths = skill.years * 12 + skill.months;
  const progressPercent = Math.min(
    100,
    (totalMonths / PROGRESS_BAR_MAX_MONTHS) * 100
  );

  return (
    <div className="rounded-md p-2 md:p-3 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 md:hover:shadow-lg md:hover:shadow-purple-500/20 md:hover:-translate-y-1">
      <div className="flex flex-col gap-1">
        <h3 className="text-xs md:text-sm font-semibold text-purple-200 truncate">
          {skill.name}
        </h3>
        <span className="text-[10px] md:text-xs text-purple-300">
          {skill.years > 0 && `${skill.years}年`}
          {skill.months > 0 && `${skill.months}ヶ月`}
        </span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-1 md:h-1.5 mt-1.5">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-700"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

export function SkillsSection({ skills, loading = false }: SkillsSectionProps) {
  return (
    <section className="mb-8 md:mb-12">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Skills & Technologies
      </h2>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkillCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      )}
    </section>
  );
}
