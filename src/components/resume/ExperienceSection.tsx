/**
 * Purpose:
 * 職務経験セクション全体を表示するコンポーネント。
 * シンプルなリスト形式でグループ化された経験を表示する。
 *
 * Context:
 * - Resume.tsxから分離されたコンポーネント
 * - ローディング状態のスケルトンUIをサポート
 * - ExperienceCardを使用して各経験を表示
 * - タイムラインの装飾は最小限に抑え、コンテンツ主導のレイアウト
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
    <div className="space-y-6" aria-busy="true">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="rounded-lg p-4 md:p-6 bg-stone-50 border border-stone-200 animate-pulse"
          aria-hidden="true"
        >
          <div className="h-5 md:h-6 bg-stone-200 rounded w-1/3 mb-3 md:mb-4" />
          <div className="h-4 bg-stone-200 rounded w-1/2 mb-2" />
          <div className="h-4 bg-stone-200 rounded w-full" />
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
        className="text-lg md:text-xl font-bold text-stone-900 mb-4 md:mb-6"
      >
        Professional Experience
      </h2>

      {loading ? (
        <ExperienceSkeleton />
      ) : (
        <div className="relative">
          {/* シンプルなタイムラインライン */}
          <div
            className="absolute left-[7px] md:left-[7px] top-2 bottom-2 w-px bg-stone-200"
            aria-hidden="true"
          />
          <ol
            className="space-y-6 list-none"
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
        </div>
      )}
    </section>
  );
}
