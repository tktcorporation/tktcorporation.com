/**
 * Purpose:
 * Serve resume export files as readable plain text/markdown/json pages.
 * Enables AI agents to fetch resume data via URL (e.g., /resume.md).
 *
 * Context:
 * - Generates export content on-the-fly during development
 * - Displays content in readable format for both humans and AI agents
 * - Works in both dev server and production build
 */

import { Copy } from "lucide-react";
import { useMemo, useState } from "react";
import { calculateSkillsWithYears } from "@/utils/calculateSkills";
import { generateResumeJson } from "@/utils/exportResumeJson";
import { generateResumeMarkdown } from "@/utils/exportResumeMarkdown";
import { markdownToPlainText } from "@/utils/exportResumeText";
import experiencesData from "../data/experiences.json";

type ExportType = "markdown" | "text" | "json";

interface ResumeExportProps {
  type: ExportType;
}

export function ResumeExport({ type }: ResumeExportProps) {
  const [copied, setCopied] = useState(false);

  const { content, title, language } = useMemo(() => {
    const experiences = experiencesData.experience_list;
    const skills = calculateSkillsWithYears(experiences);

    switch (type) {
      case "markdown": {
        return {
          content: generateResumeMarkdown(experiences, skills),
          title: "Resume - Markdown Format",
          language: "markdown",
        };
      }
      case "text": {
        const markdown = generateResumeMarkdown(experiences, skills);
        return {
          content: markdownToPlainText(markdown),
          title: "Resume - Plain Text Format",
          language: "text",
        };
      }
      case "json": {
        return {
          content: generateResumeJson(experiences, skills),
          title: "Resume - JSON Format",
          language: "json",
        };
      }
    }
  }, [type]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `resume.${type === "markdown" ? "md" : type === "json" ? "json" : "txt"}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Download file"
            >
              Download
            </button>
          </div>
        </div>

        <pre className="bg-slate-900 border border-slate-800 rounded-lg p-6 overflow-x-auto text-sm text-slate-300 whitespace-pre-wrap break-words">
          <code className={`language-${language}`}>{content}</code>
        </pre>

        <div className="mt-4 text-sm text-slate-500">
          <p>
            This content is available for AI agents to fetch and parse. Share
            this URL with AI assistants for resume analysis.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ResumeMarkdownExport() {
  return <ResumeExport type="markdown" />;
}

export function ResumeTextExport() {
  return <ResumeExport type="text" />;
}

export function ResumeJsonExport() {
  return <ResumeExport type="json" />;
}
