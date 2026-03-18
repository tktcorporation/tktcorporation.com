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
          className="animate-pulse rounded-lg border border-stone-200 bg-stone-50 p-4 md:p-6"
          aria-hidden="true"
        >
          <div className="mb-3 h-5 w-1/3 rounded bg-stone-200 md:mb-4 md:h-6" />
          <div className="mb-2 h-4 w-1/2 rounded bg-stone-200" />
          <div className="h-4 w-full rounded bg-stone-200" />
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
        className="mb-4 text-lg font-bold text-stone-900 md:mb-6 md:text-xl"
      >
        Professional Experience
      </h2>

      {loading ? (
        <ExperienceSkeleton />
      ) : (
        <div className="relative">
          {/* シンプルなタイムラインライン */}
          <div
            className="absolute top-2 bottom-2 left-[7px] w-px bg-stone-200 md:left-[7px]"
            aria-hidden="true"
          />
          <ol
            className="list-none space-y-6"
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
