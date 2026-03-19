/**
 * Purpose:
 * レジュメのエクスポートリンクを表示するセクション。
 * Markdown、テキスト、JSONの3形式でダウンロードリンクを提供する。
 *
 * Context:
 * - Resume.tsxから分離されたコンポーネント
 * - ボーダーカードなし: インラインリンクとして控えめに表示
 * - ページの主役は職歴であり、エクスポートは脇役
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
      className="group flex items-start gap-2.5 py-2 transition-colors duration-200"
    >
      <span className="mt-0.5 shrink-0 text-stone-300 transition-colors duration-200 group-hover:text-blue-500">
        {icon}
      </span>
      <div>
        <span className="text-sm font-medium text-stone-600 transition-colors duration-200 group-hover:text-blue-600">
          {title}
        </span>
        <p className="text-xs text-stone-400">{description}</p>
      </div>
    </a>
  );
}

export function ExportSection() {
  return (
    <section className="mt-16 pt-8">
      <h2 className="mb-3 text-xs font-medium tracking-wide text-stone-400 uppercase">
        Export
      </h2>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-4">
        <ExportLink
          href="/resume.md"
          title="Markdown"
          description="AI-friendly format"
          icon={<MarkdownIcon />}
        />
        <ExportLink
          href="/resume.txt"
          title="Plain Text"
          description="Terminal-friendly"
          icon={<TextIcon />}
        />
        <ExportLink
          href="/resume.json"
          title="JSON"
          description="Structured data"
          icon={<JsonIcon />}
        />
      </div>
    </section>
  );
}
