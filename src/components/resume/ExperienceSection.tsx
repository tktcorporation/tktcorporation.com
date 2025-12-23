/**
 * Purpose:
 * 職務経験セクション全体を表示するコンポーネント。
 * タイムライン形式でグループ化された経験を表示する。
 *
 * Context:
 * - Resume.tsxから分離されたコンポーネント
 * - ローディング状態のスケルトンUIをサポート
 * - ExperienceCardを使用して各経験を表示
 */

import type React from "react";
import type { GroupedExperience } from "@/types/experience";
import { ExperienceCard } from "./ExperienceCard";

interface ExperienceSectionProps {
  groupedExperiences: GroupedExperience[];
  loading?: boolean;
  formatDate: (
    year: number,
    month: number,
    endYear: number | null,
    endMonth: number | null
  ) => string;
  extractTechTags: (description: string) => string[];
  formatDescription: (description: string) => React.ReactElement[];
}

function ExperienceSkeleton() {
  return (
    <div className="space-y-6 md:space-y-8">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="rounded-lg p-4 md:p-6 bg-white/5 backdrop-blur-lg border border-white/10 animate-pulse"
        >
          <div className="h-5 md:h-6 bg-white/10 rounded w-1/3 mb-3 md:mb-4" />
          <div className="h-4 bg-white/10 rounded w-1/2 mb-2" />
          <div className="h-4 bg-white/10 rounded w-full" />
        </div>
      ))}
    </div>
  );
}

export function ExperienceSection({
  groupedExperiences,
  loading = false,
  formatDate,
  extractTechTags,
  formatDescription,
}: ExperienceSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Professional Experience
      </h2>

      {loading ? (
        <ExperienceSkeleton />
      ) : (
        <div className="relative">
          <div className="absolute left-2 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent" />
          <div className="space-y-6 md:space-y-8">
            {groupedExperiences.map((group, index) => (
              <ExperienceCard
                key={`${group.organization_name}-${group.total_start_year}-${group.total_start_month}`}
                group={group}
                index={index}
                formatDate={formatDate}
                extractTechTags={extractTechTags}
                formatDescription={formatDescription}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
