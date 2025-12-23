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

function MarkdownIcon() {
  return (
    <svg
      className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  );
}

function TextIcon() {
  return (
    <svg
      className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function JsonIcon() {
  return (
    <svg
      className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
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
