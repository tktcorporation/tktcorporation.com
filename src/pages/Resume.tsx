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
 * - レスポンシブデザインで様々なデバイスに対応
 */

import type React from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { CopyResumeButton } from "@/components/CopyResumeButton";
import {
  ExperienceSection,
  ExportSection,
  SkillsSection,
} from "@/components/resume";
import { useResumeData } from "@/hooks/useResumeData";
import { formatDateRange } from "@/utils/formatDate";
import { extractTechnologies } from "@/utils/languageMap";

function Resume() {
  const { groupedExperiences, skillsWithYears, resumeMarkdown, loading } =
    useResumeData();

  const extractTechTags = useCallback((description: string): string[] => {
    if (!description) return [];
    // languageMap の extractTechnologies を使用
    return extractTechnologies(description);
  }, []);

  const formatDescription = (description: string): React.ReactElement[] => {
    if (!description) return [];

    return description
      .split("\n")
      .map((line, index) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return null;

        if (line.startsWith("●") || line.startsWith("*")) {
          return (
            <li key={`${index}-disc`} className="ml-4 list-disc">
              {line.substring(1).trim()}
            </li>
          );
        }
        if (line.startsWith("　　■") || line.startsWith("    *")) {
          return (
            <li key={`${index}-sub`} className="ml-8 text-sm list-circle">
              {line.replace(/^[　■\s*]+/, "")}
            </li>
          );
        }
        if (line.startsWith("　○") || line.startsWith("  *")) {
          return (
            <li key={`${index}-circle`} className="ml-6 list-circle">
              {line.replace(/^[　○\s*]+/, "")}
            </li>
          );
        }
        return (
          <p key={`${index}-para`} className="mb-1">
            {trimmedLine}
          </p>
        );
      })
      .filter(Boolean) as React.ReactElement[];
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-200">
      <nav className="p-6 border-b border-white/10 backdrop-blur-lg bg-black/20">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-lg font-bold hover:text-purple-400 transition-colors flex items-center gap-2"
          >
            Home
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Resume
          </h1>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white animate-fade-in">
                Resume
              </h1>
              <CopyResumeButton markdown={resumeMarkdown} variant="primary" />
            </div>
          </header>

          <SkillsSection skills={skillsWithYears} loading={loading} />

          <ExperienceSection
            groupedExperiences={groupedExperiences}
            loading={loading}
            formatDate={formatDateRange}
            extractTechTags={extractTechTags}
            formatDescription={formatDescription}
          />

          <ExportSection />
        </div>
      </main>

      <footer className="mt-auto py-6 text-center text-sm text-slate-400 border-t border-white/10 backdrop-blur-lg bg-black/20">
        <p>
          © {new Date().getFullYear()} tkt | Data from{" "}
          <a
            href="https://lapras.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            LAPRAS
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Resume;
