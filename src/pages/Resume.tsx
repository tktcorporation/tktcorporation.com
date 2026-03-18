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
    <div className="flex min-h-screen flex-col">
      <nav className="border-b border-stone-200 px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            to="/"
            className="text-sm text-stone-500 transition-colors duration-200 hover:text-stone-900"
          >
            Home
          </Link>
          <span className="text-sm font-medium text-stone-900">Resume</span>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-3xl flex-grow px-6 py-12">
        <header className="mb-12">
          <div className="mb-2 flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
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

      <footer className="mt-auto border-t border-stone-200 py-6 text-center text-xs text-stone-400">
        <p>
          © {new Date().getFullYear()} tkt | Data from{" "}
          <a
            href="https://lapras.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 transition-colors duration-200 hover:text-blue-700"
          >
            LAPRAS
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Resume;
