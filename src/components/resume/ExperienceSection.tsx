/**
 * Purpose:
 * 職務経験セクション全体を表示するコンポーネント。
 * 会社単位でグルーピングし、各会社内で期間ごとの経験を表示する。
 *
 * Context:
 * - CompanyGroup を使い、同じ会社の経験をまとめて表示
 * - 会社ヘッダーで大きな区切り、期間ごとの経験で小さな区切りを作る
 * - 近接の原則: 会社間は広い余白、会社内は詰める
 */

import type {
  CompanyGroup,
  DateFormatter,
  DescriptionFormatter,
  TechExtractor,
} from "@/types/experience";

import { CompanyGroupCard } from "./ExperienceCard";

interface ExperienceSectionProps {
  companyGroups: CompanyGroup[];
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
  companyGroups,
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
          className="list-none space-y-12 md:space-y-16"
          aria-label="Work experience timeline (most recent first)"
        >
          {companyGroups.map((company) => (
            <CompanyGroupCard
              key={company.company_name}
              company={company}
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
