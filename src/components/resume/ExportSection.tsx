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
      className="group block rounded-lg border border-stone-200 p-4 transition-colors duration-200 hover:border-stone-300"
    >
      <div className="mb-1 flex items-center gap-2">
        {icon}
        <h3 className="font-medium text-stone-800 transition-colors duration-200 group-hover:text-blue-600">
          {title}
        </h3>
      </div>
      <p className="text-sm text-stone-400">{description}</p>
    </a>
  );
}

export function ExportSection() {
  return (
    <section className="mt-14 border-t border-stone-200 pt-8">
      <h2 className="mb-4 text-sm font-medium text-stone-500">
        Export formats
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
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
