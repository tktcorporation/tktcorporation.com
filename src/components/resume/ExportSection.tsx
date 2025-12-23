/**
 * Purpose:
 * レジュメのエクスポートリンクを表示するセクション。
 * Markdown、テキスト、JSONの3形式でダウンロードリンクを提供する。
 *
 * Context:
 * - Resume.tsxから分離されたコンポーネント
 * - 静的なエクスポートリンクを表示
 * - 各形式の説明を含む
 */

import { JsonIcon, MarkdownIcon, TextIcon } from "@/components/icons";

interface ExportLinkProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function ExportLink({ href, title, description, icon }: ExportLinkProps) {
  return (
    <a
      href={href}
      download
      className="block p-4 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-600 transition-all group"
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-sm text-slate-400">{description}</p>
    </a>
  );
}

export function ExportSection() {
  return (
    <section className="mt-16 pt-8 border-t border-slate-700">
      <h2 className="text-lg font-semibold text-slate-300 mb-4">
        Export formats
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ExportLink
          href="/resume.md"
          title="Markdown"
          description="AI-friendly format with YAML frontmatter"
          icon={<MarkdownIcon />}
        />
        <ExportLink
          href="/resume.txt"
          title="Plain Text"
          description="Terminal-friendly 80-character format"
          icon={<TextIcon />}
        />
        <ExportLink
          href="/resume.json"
          title="JSON"
          description="Structured data with calculated fields"
          icon={<JsonIcon />}
        />
      </div>
    </section>
  );
}
