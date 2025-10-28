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

  const { content, title } = useMemo(() => {
    const experiences = experiencesData.experience_list;
    const skills = calculateSkillsWithYears(experiences);

    switch (type) {
      case "markdown": {
        return {
          content: generateResumeMarkdown(experiences, skills),
          title: "Resume - Markdown Format",
        };
      }
      case "text": {
        const markdown = generateResumeMarkdown(experiences, skills);
        return {
          content: markdownToPlainText(markdown),
          title: "Resume - Plain Text Format",
        };
      }
      case "json": {
        return {
          content: generateResumeJson(experiences, skills),
          title: "Resume - JSON Format",
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
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="w-3.5 h-3.5" />
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 transition-colors"
              title="Download file"
            >
              Download
            </button>
          </div>
        </div>

        <pre style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
          {content}
        </pre>
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
