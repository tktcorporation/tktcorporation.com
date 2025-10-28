/**
 * Purpose:
 * Resume data to AI-friendly Markdown converter.
 * Generates structured, parseable text format optimized for AI agents
 * to understand career information, skills, and work history.
 *
 * Context:
 * - Inspired by Repomix's approach to making content AI-readable
 * - Uses Markdown format for universal compatibility
 * - Includes metadata for better AI context understanding
 * - Preserves all critical information from experiences.json
 */

import type {
  ResumeExportMetadata,
  ResumeMarkdownOptions,
} from "../types/resume-export";

interface Experience {
  id: number;
  organization_name: string;
  is_client_work: boolean;
  client_company_name: string;
  positions: Position[];
  position_name: string;
  start_year: number;
  start_month: number;
  end_year: number | null;
  end_month: number | null;
  description: string;
  updated_at: string;
}

interface Position {
  id: number;
  job_position_name: string;
}

interface SkillWithYears {
  name: string;
  years: number;
  months: number;
}

/**
 * Calculate total experience duration from experiences list
 */
function calculateTotalExperience(experiences: Experience[]): string {
  if (experiences.length === 0) return "0 years 0 months";

  // Find earliest start date and latest end date (or current date if still working)
  let earliestDate: Date | null = null;
  let totalMonths = 0;

  for (const exp of experiences) {
    const startDate = new Date(exp.start_year, exp.start_month - 1);
    const endDate =
      exp.end_year && exp.end_month
        ? new Date(exp.end_year, exp.end_month - 1)
        : new Date(); // Current date if still ongoing

    const months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      endDate.getMonth() -
      startDate.getMonth();

    totalMonths += months;

    if (!earliestDate || startDate < earliestDate) {
      earliestDate = startDate;
    }
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return `${years} years ${months} months`;
}

/**
 * Format date range for display
 */
function formatDateRange(exp: Experience): string {
  const start = `${exp.start_year}/${String(exp.start_month).padStart(2, "0")}`;
  const end =
    exp.end_year && exp.end_month
      ? `${exp.end_year}/${String(exp.end_month).padStart(2, "0")}`
      : "Present";

  // Calculate duration
  const startDate = new Date(exp.start_year, exp.start_month - 1);
  const endDate =
    exp.end_year && exp.end_month
      ? new Date(exp.end_year, exp.end_month - 1)
      : new Date();

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    endDate.getMonth() -
    startDate.getMonth();

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let duration = "";
  if (years > 0) duration += `${years} year${years > 1 ? "s" : ""}`;
  if (remainingMonths > 0) {
    if (duration) duration += " ";
    duration += `${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`;
  }

  return `${start} - ${end} (${duration || "< 1 month"})`;
}

/**
 * Extract technologies from description
 */
function extractTechnologies(description: string): string[] {
  const lines = description.split("\n");
  const firstLine = lines[0] || "";

  // Technologies are usually in the first line, separated by " / "
  if (firstLine.includes(" / ")) {
    return firstLine.split(" / ").map((tech) => tech.trim());
  }

  return [];
}

/**
 * Format skill with duration
 */
function formatSkillDuration(skill: SkillWithYears): string {
  let duration = "";
  if (skill.years > 0) {
    duration += `${skill.years} year${skill.years > 1 ? "s" : ""}`;
  }
  if (skill.months > 0) {
    if (duration) duration += " ";
    duration += `${skill.months} month${skill.months > 1 ? "s" : ""}`;
  }
  return `**${skill.name}**: ${duration || "< 1 month"}`;
}

/**
 * Generate AI context metadata
 */
function generateMetadata(
  experiences: Experience[],
  skills: SkillWithYears[]
): ResumeExportMetadata {
  const totalExperience = calculateTotalExperience(experiences);
  const primaryTechnologies = skills.slice(0, 5).map((skill) => skill.name);

  // Determine career focus from recent positions
  const recentPositions = experiences
    .slice(0, 3)
    .flatMap((exp) => exp.positions.map((pos) => pos.job_position_name));
  const uniquePositions = [...new Set(recentPositions)];
  const careerFocus = uniquePositions.join(", ");

  return {
    documentType: "Professional Resume/CV",
    formatVersion: "1.0",
    lastUpdated: new Date().toISOString().split("T")[0],
    source: "LAPRAS Integration",
    totalExperience,
    primaryTechnologies,
    careerFocus: careerFocus || "Software Engineering",
  };
}

/**
 * Generate Markdown frontmatter with metadata
 */
function generateFrontmatter(metadata: ResumeExportMetadata): string {
  return `---
AI Context Metadata:
  Document Type: ${metadata.documentType}
  Format Version: ${metadata.formatVersion}
  Last Updated: ${metadata.lastUpdated}
  Source: ${metadata.source}
  Total Experience: ${metadata.totalExperience}
  Primary Technologies: [${metadata.primaryTechnologies.join(", ")}]
  Career Focus: ${metadata.careerFocus}
---

`;
}

/**
 * Generate Professional Summary section
 */
function generateSummary(
  experiences: Experience[],
  skills: SkillWithYears[],
  metadata: ResumeExportMetadata
): string {
  const currentExp = experiences[0];
  const currentPosition = currentExp?.position_name || "Software Engineer";
  const currentCompany = currentExp?.organization_name || "N/A";

  const topSkills = skills
    .slice(0, 5)
    .map((skill) => skill.name)
    .join(", ");

  return `## Summary

- **Total Professional Experience**: ${metadata.totalExperience}
- **Current Position**: ${currentPosition} at ${currentCompany}
- **Specialization**: ${metadata.careerFocus}
- **Key Technologies**: ${topSkills}

`;
}

/**
 * Group skills by category (basic heuristic)
 */
function groupSkillsByCategory(skills: SkillWithYears[]): {
  languages: SkillWithYears[];
  frameworks: SkillWithYears[];
  cloud: SkillWithYears[];
  tools: SkillWithYears[];
  other: SkillWithYears[];
} {
  const languages: SkillWithYears[] = [];
  const frameworks: SkillWithYears[] = [];
  const cloud: SkillWithYears[] = [];
  const tools: SkillWithYears[] = [];
  const other: SkillWithYears[] = [];

  const languageKeywords = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "Go",
    "Ruby",
    "PHP",
    "Rust",
    "Kotlin",
    "Swift",
    "C++",
    "C#",
    "Scala",
  ];
  const frameworkKeywords = [
    "React",
    "Vue",
    "Angular",
    "Django",
    "Rails",
    "Laravel",
    "Spring",
    "Express",
    "Next.js",
    "Nuxt",
    "Flutter",
  ];
  const cloudKeywords = [
    "AWS",
    "GCP",
    "Azure",
    "Firebase",
    "Docker",
    "Kubernetes",
    "Terraform",
  ];
  const toolKeywords = [
    "Git",
    "GitHub",
    "GitLab",
    "CircleCI",
    "Jenkins",
    "Webpack",
    "Vite",
    "npm",
  ];

  for (const skill of skills) {
    const name = skill.name;
    if (languageKeywords.some((keyword) => name.includes(keyword))) {
      languages.push(skill);
    } else if (frameworkKeywords.some((keyword) => name.includes(keyword))) {
      frameworks.push(skill);
    } else if (cloudKeywords.some((keyword) => name.includes(keyword))) {
      cloud.push(skill);
    } else if (toolKeywords.some((keyword) => name.includes(keyword))) {
      tools.push(skill);
    } else {
      other.push(skill);
    }
  }

  return { languages, frameworks, cloud, tools, other };
}

/**
 * Generate Skills & Technologies section
 */
function generateSkillsSection(skills: SkillWithYears[]): string {
  const grouped = groupSkillsByCategory(skills);

  let section = "## Skills & Technologies\n\n";

  if (grouped.languages.length > 0) {
    section += "### Programming Languages\n\n";
    for (const skill of grouped.languages) {
      section += `- ${formatSkillDuration(skill)}\n`;
    }
    section += "\n";
  }

  if (grouped.frameworks.length > 0) {
    section += "### Frameworks & Libraries\n\n";
    for (const skill of grouped.frameworks) {
      section += `- ${formatSkillDuration(skill)}\n`;
    }
    section += "\n";
  }

  if (grouped.cloud.length > 0) {
    section += "### Cloud & Infrastructure\n\n";
    for (const skill of grouped.cloud) {
      section += `- ${formatSkillDuration(skill)}\n`;
    }
    section += "\n";
  }

  if (grouped.tools.length > 0) {
    section += "### Tools & Platforms\n\n";
    for (const skill of grouped.tools) {
      section += `- ${formatSkillDuration(skill)}\n`;
    }
    section += "\n";
  }

  if (grouped.other.length > 0) {
    section += "### Other Technologies\n\n";
    for (const skill of grouped.other) {
      section += `- ${formatSkillDuration(skill)}\n`;
    }
    section += "\n";
  }

  return section;
}

/**
 * Format experience description as bullet points
 */
function formatDescription(description: string): string[] {
  const lines = description.split("\n").slice(1); // Skip first line (technologies)
  const bullets: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Convert existing list items to proper Markdown bullets
    if (trimmed.startsWith("*")) {
      const content = trimmed.substring(1).trim();
      bullets.push(`- ${content}`);
    } else {
      bullets.push(`- ${trimmed}`);
    }
  }

  return bullets;
}

/**
 * Generate Professional Experience section
 */
function generateExperienceSection(experiences: Experience[]): string {
  let section = "## Professional Experience\n\n";

  for (const exp of experiences) {
    const companyName =
      exp.is_client_work && exp.client_company_name
        ? `${exp.client_company_name} (via ${exp.organization_name})`
        : exp.organization_name;

    section += `### ${companyName} | ${exp.position_name}\n\n`;
    section += `**Duration**: ${formatDateRange(exp)}\n`;

    const positions = exp.positions.map((p) => p.job_position_name).join(", ");
    section += `**Position**: ${positions}\n\n`;

    const technologies = extractTechnologies(exp.description);
    if (technologies.length > 0) {
      section += `**Technologies**: ${technologies.join(", ")}\n\n`;
    }

    const responsibilities = formatDescription(exp.description);
    if (responsibilities.length > 0) {
      section += "**Responsibilities**:\n\n";
      for (const item of responsibilities) {
        section += `${item}\n`;
      }
    }

    section += "\n---\n\n";
  }

  return section;
}

/**
 * Generate Career Timeline section
 */
function generateTimelineSection(experiences: Experience[]): string {
  let section = "## Career Timeline\n\n";

  for (const exp of experiences) {
    const start = `${exp.start_year}/${String(exp.start_month).padStart(2, "0")}`;
    const end =
      exp.end_year && exp.end_month
        ? `${exp.end_year}/${String(exp.end_month).padStart(2, "0")}`
        : "Present";

    section += `- **${start} - ${end}**: ${exp.organization_name} (${exp.position_name})\n`;
  }

  section += "\n";
  return section;
}

/**
 * Generate footer with attribution
 */
function generateFooter(): string {
  return `---

*Generated with [Claude Code](https://claude.com/claude-code)*

For latest information: [https://tktcorporation.com/resume](https://tktcorporation.com/resume)

Data source: [LAPRAS](https://lapras.com)
`;
}

/**
 * Main function to generate AI-friendly Markdown resume
 */
export function generateResumeMarkdown(
  experiences: Experience[],
  skills: SkillWithYears[],
  options: ResumeMarkdownOptions = {}
): string {
  const {
    includeMetadata = true,
    includeTechStats = true,
    format = "detailed",
  } = options;

  let markdown = "";

  // Generate metadata
  const metadata = generateMetadata(experiences, skills);

  // Add frontmatter
  if (includeMetadata) {
    markdown += generateFrontmatter(metadata);
  }

  // Add title
  markdown += "# Professional Resume\n\n";

  // Add summary
  markdown += generateSummary(experiences, skills, metadata);

  // Add skills section
  if (includeTechStats) {
    markdown += generateSkillsSection(skills);
  }

  // Add experience section
  markdown += generateExperienceSection(experiences);

  // Add timeline (for concise view or as addition to detailed)
  if (format === "concise" || format === "detailed") {
    markdown += generateTimelineSection(experiences);
  }

  // Add footer
  markdown += generateFooter();

  return markdown;
}
