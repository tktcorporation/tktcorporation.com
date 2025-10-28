/**
 * Purpose:
 * Calculate professional skills and their durations from work experiences.
 * Shared utility used by both Resume component and build-time export generation.
 *
 * Context:
 * - Merges overlapping experience periods for accurate duration calculation
 * - Uses extractTechnologies from languageMap for tech stack extraction
 * - Sorts skills by total experience duration (descending)
 */

import { extractTechnologies } from "./languageMap";

interface Experience {
  id: number;
  organization_name: string;
  is_client_work: boolean;
  client_company_name: string;
  positions: Array<{ id: number; job_position_name: string }>;
  position_name: string;
  start_year: number;
  start_month: number;
  end_year: number | null;
  end_month: number | null;
  description: string;
  updated_at: string;
}

export interface SkillWithYears {
  name: string;
  years: number;
  months: number;
}

/**
 * Calculate skills with years of experience from a list of experiences
 * Handles overlapping periods and merges them correctly
 */
export function calculateSkillsWithYears(
  experiences: Experience[]
): SkillWithYears[] {
  const skillPeriods: Map<
    string,
    Array<{ start: number; end: number }>
  > = new Map();

  const currentDate = new Date();
  const currentYearMonth =
    currentDate.getFullYear() * 12 + (currentDate.getMonth() + 1);

  for (const exp of experiences) {
    if (exp.description) {
      const matches = extractTechnologies(exp.description);
      if (matches.length > 0) {
        const startMonth = exp.start_year * 12 + exp.start_month;
        const endMonth = exp.end_year
          ? exp.end_year * 12 + (exp.end_month ?? 12)
          : currentYearMonth;

        // matches は既に正規化された技術名の配列（重複を除去）
        const uniqueSkills = Array.from(new Set(matches));

        for (const skill of uniqueSkills) {
          if (!skillPeriods.has(skill)) {
            skillPeriods.set(skill, []);
          }
          const periods = skillPeriods.get(skill);
          if (periods) {
            periods.push({
              start: startMonth,
              end: endMonth,
            });
          }
        }
      }
    }
  }

  // Merge overlapping periods and calculate total months for each skill
  const skillsWithYears: SkillWithYears[] = [];

  for (const [skillName, periods] of skillPeriods) {
    // Sort periods by start date
    periods.sort((a, b) => a.start - b.start);

    // Merge overlapping periods
    const mergedPeriods: Array<{ start: number; end: number }> = [];
    let current = periods[0];

    for (let i = 1; i < periods.length; i++) {
      const next = periods[i];
      if (next.start <= current.end) {
        // Overlapping or adjacent, merge
        current.end = Math.max(current.end, next.end);
      } else {
        // No overlap, add current and move to next
        mergedPeriods.push(current);
        current = next;
      }
    }
    mergedPeriods.push(current);

    // Calculate total months
    const totalMonths = mergedPeriods.reduce((sum, period) => {
      return sum + (period.end - period.start);
    }, 0);

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    skillsWithYears.push({
      name: skillName,
      years,
      months,
    });
  }

  // Sort by total experience (years + months), then by name
  return skillsWithYears.sort((a, b) => {
    const totalA = a.years * 12 + a.months;
    const totalB = b.years * 12 + b.months;
    if (totalB !== totalA) {
      return totalB - totalA; // Descending by total experience
    }
    return a.name.localeCompare(b.name); // Ascending by name
  });
}
