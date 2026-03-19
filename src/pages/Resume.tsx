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
 * - ミニマルなライトテーマ、タイポグラフィと余白主導のデザイン
 * - ボーダーは構造上必須の箇所のみ（ナビの下線のみ残す）
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
    <div className="bg-background flex min-h-screen flex-col">
      <nav className="px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            to="/"
            className="text-sm text-stone-400 transition-colors duration-200 hover:text-stone-700"
          >
            Home
          </Link>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-3xl flex-grow px-6 py-8 md:py-12">
        <header className="mb-12 md:mb-16">
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

      <footer className="mt-auto py-8 text-center text-xs text-stone-300">
        <p>
          © {new Date().getFullYear()} tkt · Data from{" "}
          <a
            href="https://lapras.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 transition-colors duration-200 hover:text-blue-500"
          >
            LAPRAS
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Resume;
