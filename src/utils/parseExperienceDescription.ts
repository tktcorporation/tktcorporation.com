/**
 * Purpose:
 * Parse experience description strings into structured data.
 * Handles technology extraction and hierarchical bullet point parsing.
 *
 * Context:
 * - Robust parsing logic that preserves indentation and hierarchy
 * - Uses Zod validation for type safety
 * - Replaces fragile string manipulation with structured data
 */

import {
  type BulletItem,
  type StructuredDescription,
  StructuredDescriptionSchema,
} from "@/types/resume-export";

/**
 * Parse experience description into structured data
 *
 * Expected format:
 * ```
 * Tech1 / Tech2 / Tech3
 *
 * * Responsibility 1
 *     * Sub-item 1
 *     * Sub-item 2
 * * Responsibility 2
 * ```
 */
export function parseExperienceDescription(
  description: string
): StructuredDescription {
  const lines = description.split("\n");

  // Extract technologies from first line
  const technologies = extractTechnologies(lines[0] || "");

  // Find the start of bullet points (skip empty lines after tech line)
  let bulletStartIndex = 1;
  while (bulletStartIndex < lines.length && !lines[bulletStartIndex].trim()) {
    bulletStartIndex++;
  }

  // Parse bullet points with hierarchy
  const bulletLines = lines.slice(bulletStartIndex);
  const responsibilities = parseBulletPoints(bulletLines);

  // Validate with Zod
  const result = StructuredDescriptionSchema.parse({
    technologies,
    responsibilities,
  });

  return result;
}

/**
 * Extract technologies from first line
 * Expected format: "Tech1 / Tech2 / Tech3"
 */
function extractTechnologies(firstLine: string): string[] {
  if (!firstLine.trim()) {
    return [];
  }

  // Split by " / " and clean up
  return firstLine
    .split("/")
    .map((tech) => tech.trim())
    .filter((tech) => tech.length > 0);
}

/**
 * Parse bullet points into hierarchical structure
 * Recognizes indentation (spaces) to build tree
 */
function parseBulletPoints(lines: string[]): BulletItem[] {
  interface LineWithIndent {
    text: string;
    indent: number;
  }

  // Parse lines with their indentation level
  const parsedLines: LineWithIndent[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Skip lines that don't start with "*"
    if (!trimmed.startsWith("*")) continue;

    // Calculate indentation (number of leading spaces before "*")
    const indent = line.indexOf("*");
    const text = trimmed.substring(1).trim(); // Remove "*" and trim

    parsedLines.push({ text, indent });
  }

  // Build hierarchy based on indentation
  return buildHierarchy(parsedLines, 0).items;
}

/**
 * Build hierarchical structure from flat list of indented items
 * Returns items at the specified base indent level
 */
function buildHierarchy(
  lines: Array<{ text: string; indent: number }>,
  baseIndent: number
): { items: BulletItem[]; nextIndex: number } {
  const items: BulletItem[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // If indent is less than base, we've reached the end of this level
    if (line.indent < baseIndent) {
      break;
    }

    // If indent equals base, this is an item at our level
    if (line.indent === baseIndent) {
      const item: BulletItem = { text: line.text };

      // Look ahead to see if next items are children (greater indent)
      if (i + 1 < lines.length && lines[i + 1].indent > baseIndent) {
        // Find the next indent level (first child's indent)
        const childIndent = lines[i + 1].indent;

        // Recursively build children
        const childResult = buildHierarchy(lines.slice(i + 1), childIndent);
        if (childResult.items.length > 0) {
          item.children = childResult.items;
        }

        // Skip processed children
        i += childResult.nextIndex + 1;
      } else {
        i++;
      }

      items.push(item);
    } else {
      // Indent is greater than base but we're not in child processing
      // This shouldn't happen with proper input, but handle gracefully
      i++;
    }
  }

  return { items, nextIndex: i };
}

/**
 * Extract technologies from description (legacy fallback)
 * Use parseExperienceDescription instead for full parsing
 */
export function extractTechnologiesLegacy(description: string): string[] {
  return parseExperienceDescription(description).technologies;
}
