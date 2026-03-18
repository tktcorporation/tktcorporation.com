/**
 * Purpose:
 * 職務経歴書を表示するページ。
 * LAPRASから取得した経験データを基に、視覚的に分かりやすい形で
 * キャリアの経歴とスキルセットを提示する。
 *
 * Context:
 * - 経験を組織別・期間別にグループ化して表示
 * - 技術スタックを自動的に抽出してハイライト
 * - スキルの習熟度を期間ベースで計算・可視化
 * - ミニマルなライトテーマ、タイポグラフィ主導のデザイン
 */

import { Link } from "react-router-dom";
import { CopyResumeButton } from "@/components/CopyResumeButton";
import { WavyUnderline } from "@/components/illustrations";
import {
  ExperienceSection,
  ExportSection,
  SkillsSection,
} from "@/components/resume";
import { useResumeData } from "@/hooks/useResumeData";
import { formatDateRange } from "@/utils/formatDate";
import { formatDescription } from "@/utils/formatDescription";
import { extractTechnologies } from "@/utils/languageMap";

function Resume() {
  const { groupedExperiences, skillsWithYears, resumeMarkdown, loading } =
    useResumeData();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="px-6 py-4 border-b border-stone-200">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-sm text-stone-500 hover:text-stone-900 transition-colors duration-200"
          >
            Home
          </Link>
          <span className="text-sm font-medium text-stone-900">Resume</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto w-full px-6 py-12 flex-grow">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
              Resume
            </h1>
            <CopyResumeButton markdown={resumeMarkdown} variant="primary" />
          </div>
          <WavyUnderline className="text-blue-400" />
        </header>

        <SkillsSection skills={skillsWithYears} loading={loading} />

        <ExperienceSection
          groupedExperiences={groupedExperiences}
          loading={loading}
          formatDate={formatDateRange}
          extractTechTags={extractTechnologies}
          formatDescription={formatDescription}
        />

        <ExportSection />
      </main>

      <footer className="mt-auto py-6 text-center text-xs text-stone-400 border-t border-stone-200">
        <p>
          © {new Date().getFullYear()} tkt | Data from{" "}
          <a
            href="https://lapras.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
          >
            LAPRAS
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Resume;
