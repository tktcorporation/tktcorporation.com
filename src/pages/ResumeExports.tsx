/**
 * Purpose:
 * Serve resume export files as readable plain text/markdown/json pages.
 * Enables AI agents to fetch resume data via URL (e.g., /resume.md).
 *
 * Context:
 * - Generates export content on-the-fly during development
 * - Displays content in readable format for both humans and AI agents
 * - Works in both dev server and production build
 * - Mimics Claude Docs' simple pre-tag approach
 */

import { useMemo } from "react";
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
  const content = useMemo(() => {
    const experiences = experiencesData.experience_list;
    const skills = calculateSkillsWithYears(experiences);

    switch (type) {
      case "markdown": {
        return generateResumeMarkdown(experiences, skills);
      }
      case "text": {
        const markdown = generateResumeMarkdown(experiences, skills);
        return markdownToPlainText(markdown);
      }
      case "json": {
        return generateResumeJson(experiences, skills);
      }
    }
  }, [type]);

  return (
    <pre style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
      {content}
    </pre>
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
