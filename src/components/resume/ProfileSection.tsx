/**
 * Purpose:
 * プロフィール情報を表示するセクションコンポーネント。
 * 「この人は何者か」を最初の5秒で伝えるためのヘッダー部分。
 *
 * Context:
 * - 経験データから自動的にサマリーを生成
 * - 職務経歴書の顔となる部分
 * - 採用担当者が最初に目にする情報を集約
 */

import { Github, Linkedin, Twitter } from "lucide-react";
import type { Experience, GroupedExperience } from "@/types/experience";

interface ProfileSectionProps {
  experiences: Experience[];
  groupedExperiences: GroupedExperience[];
}

/**
 * 経験データから総経験年数を計算
 */
function calculateTotalExperience(experiences: Experience[]): {
  years: number;
  months: number;
} {
  if (experiences.length === 0) return { years: 0, months: 0 };

  const now = new Date();
  const currentYearMonth = now.getFullYear() * 12 + (now.getMonth() + 1);

  // 最も古い開始日を見つける
  let earliestStart = currentYearMonth;
  for (const exp of experiences) {
    const startMonth = exp.start_year * 12 + exp.start_month;
    if (startMonth < earliestStart) {
      earliestStart = startMonth;
    }
  }

  const totalMonths = currentYearMonth - earliestStart;
  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
  };
}

/**
 * 現在の所属を取得
 */
function getCurrentPosition(
  groupedExperiences: GroupedExperience[]
): { organization: string; position: string } | null {
  const current = groupedExperiences.find((g) => g.total_end_year === null);
  if (!current) return null;

  const latestExp = current.experiences[0];
  return {
    organization: current.organization_name,
    position: latestExp?.position_name || "ソフトウェアエンジニア",
  };
}

export function ProfileSection({
  experiences,
  groupedExperiences,
}: ProfileSectionProps) {
  const totalExp = calculateTotalExperience(experiences);
  const currentPosition = getCurrentPosition(groupedExperiences);

  return (
    <section className="mb-10 md:mb-14">
      <div className="rounded-xl p-6 md:p-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-lg border border-white/10">
        {/* Name & Title */}
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
            tkt
            <span className="text-base md:text-lg font-normal text-slate-400 ml-2">
              (tktcorporation)
            </span>
          </h2>
          <p className="text-lg md:text-xl text-purple-300">
            Software Engineer
          </p>
        </div>

        {/* Summary */}
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
          {totalExp.years}年以上のWeb開発経験を持つフルスタックエンジニア。
          {currentPosition && <>現在は{currentPosition.organization}にて、</>}
          プロダクト開発のリードからCI/CD改善、チーム運営まで幅広く対応。
          フロントエンド・バックエンド両方の開発に加え、開発プロセス改善にも注力。
        </p>

        {/* Social Links */}
        <div className="flex gap-3">
          <a
            href="https://github.com/tktcorporation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 text-slate-300 hover:text-white transition-all text-sm"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href="https://twitter.com/tktcorporation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 text-slate-300 hover:text-white transition-all text-sm"
            aria-label="X (Twitter)"
          >
            <Twitter className="w-4 h-4" />
            <span>X</span>
          </a>
          <a
            href="https://www.linkedin.com/in/tktcorporation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 text-slate-300 hover:text-white transition-all text-sm"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}
