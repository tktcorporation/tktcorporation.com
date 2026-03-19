/**
 * Purpose:
 * 職務経験セクション全体を表示するコンポーネント。
 * 余白リズムで経験を区切り、装飾的タイムラインは使わない。
 *
 * Context:
 * - Resume.tsxから分離されたコンポーネント
 * - ローディング状態のスケルトンUIをサポート
 * - ExperienceCardを使用して各経験を表示
 * - 近接の原則: 経験間は広い余白、経験内は詰める
 */

import type {
  DateFormatter,
  DescriptionFormatter,
  GroupedExperience,
  TechExtractor,
} from "@/types/experience";

import { ExperienceCard } from "./ExperienceCard";

interface ExperienceSectionProps {
  groupedExperiences: GroupedExperience[];
  loading?: boolean;
  formatDate: DateFormatter;
  extractTechTags: TechExtractor;
  formatDescription: DescriptionFormatter;
}

function ExperienceSkeleton() {
  return (
    <div className="space-y-10" aria-busy="true">
      {[1, 2].map((i) => (
        <div key={i} className="animate-pulse" aria-hidden="true">
          <div className="mb-2 h-5 w-1/3 rounded bg-stone-100 md:h-6" />
          <div className="mb-1.5 h-3 w-1/4 rounded bg-stone-100" />
          <div className="mt-3 h-4 w-full rounded bg-stone-50" />
          <div className="mt-1.5 h-4 w-4/5 rounded bg-stone-50" />
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
    <section className="mb-12" aria-labelledby="experience-section-title">
      <h2
        id="experience-section-title"
        className="mb-6 text-lg font-bold text-stone-900 md:mb-8 md:text-xl"
      >
        Professional Experience
      </h2>

      {loading ? (
        <ExperienceSkeleton />
      ) : (
        <ol
          className="list-none space-y-10 md:space-y-12"
          aria-label="Work experience timeline (most recent first)"
        >
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
        </ol>
      )}
    </section>
  );
}
