/**
 * Purpose:
 * Generate structured JSON format for programmatic resume data access.
 * Enhances raw experience data with calculated fields and metadata
 * for API consumers and data analysis tools.
 *
 * Context:
 * - Preserves original data structure from experiences.json
 * - Adds computed fields (durations, statistics, metadata)
 * - Provides machine-readable format for integrations
 */

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

interface EnhancedExperience extends Experience {
  duration_months: number;
  duration_display: string;
  technologies: string[];
}

interface ResumeJsonOutput {
  metadata: {
    generated_at: string;
    format_version: string;
    source: string;
    total_experience_months: number;
    total_experience_display: string;
  };
  skills: SkillWithYears[];
  experiences: EnhancedExperience[];
  statistics: {
    total_positions: number;
    total_companies: number;
    primary_technologies: string[];
    career_timeline: {
      start: string;
      end: string;
    };
  };
}

/**
 * Calculate duration in months
 */
function calculateDurationMonths(exp: Experience): number {
  const startDate = new Date(exp.start_year, exp.start_month - 1);
  const endDate =
    exp.end_year && exp.end_month
      ? new Date(exp.end_year, exp.end_month - 1)
      : new Date();

  return (
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    endDate.getMonth() -
    startDate.getMonth()
  );
}

/**
 * Format duration for display
 */
function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let duration = "";
  if (years > 0) duration += `${years} year${years > 1 ? "s" : ""}`;
  if (remainingMonths > 0) {
    if (duration) duration += " ";
    duration += `${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`;
  }

  return duration || "< 1 month";
}

/**
 * Extract technologies from description
 */
function extractTechnologies(description: string): string[] {
  const lines = description.split("\n");
  const firstLine = lines[0] || "";

  if (firstLine.includes(" / ")) {
    return firstLine.split(" / ").map((tech) => tech.trim());
  }

  return [];
}

/**
 * Generate enhanced JSON export with metadata and calculations
 */
export function generateResumeJson(
  experiences: Experience[],
  skills: SkillWithYears[]
): string {
  // Enhance experiences with calculated fields
  const enhancedExperiences: EnhancedExperience[] = experiences.map((exp) => {
    const durationMonths = calculateDurationMonths(exp);
    return {
      ...exp,
      duration_months: durationMonths,
      duration_display: formatDuration(durationMonths),
      technologies: extractTechnologies(exp.description),
    };
  });

  // Calculate total experience
  const totalExperienceMonths = enhancedExperiences.reduce(
    (sum, exp) => sum + exp.duration_months,
    0
  );

  // Get primary technologies (top 5 by experience)
  const primaryTechnologies = skills.slice(0, 5).map((skill) => skill.name);

  // Get career timeline
  const sortedByDate = [...experiences].sort((a, b) => {
    const aDate = new Date(a.start_year, a.start_month - 1);
    const bDate = new Date(b.start_year, b.start_month - 1);
    return aDate.getTime() - bDate.getTime();
  });

  const firstExp = sortedByDate[0];
  const latestExp = experiences[0]; // Already sorted by most recent

  const timelineStart = firstExp
    ? `${firstExp.start_year}/${String(firstExp.start_month).padStart(2, "0")}`
    : "N/A";

  const timelineEnd =
    latestExp?.end_year && latestExp?.end_month
      ? `${latestExp.end_year}/${String(latestExp.end_month).padStart(2, "0")}`
      : "Present";

  // Count unique companies
  const uniqueCompanies = new Set(
    experiences.map((exp) => exp.organization_name)
  ).size;

  const output: ResumeJsonOutput = {
    metadata: {
      generated_at: new Date().toISOString(),
      format_version: "1.0",
      source: "LAPRAS Integration",
      total_experience_months: totalExperienceMonths,
      total_experience_display: formatDuration(totalExperienceMonths),
    },
    skills,
    experiences: enhancedExperiences,
    statistics: {
      total_positions: experiences.length,
      total_companies: uniqueCompanies,
      primary_technologies: primaryTechnologies,
      career_timeline: {
        start: timelineStart,
        end: timelineEnd,
      },
    },
  };

  return JSON.stringify(output, null, 2);
}
