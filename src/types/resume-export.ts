/**
 * Purpose:
 * TypeScript type definitions for AI-friendly resume export functionality.
 * Defines interfaces and types for Markdown, text, and JSON export operations.
 *
 * Context:
 * - Used by export utility functions to ensure type safety
 * - Provides options for customizing export output
 * - Supports multiple export formats (Markdown, plain text, JSON)
 */

export type ExportFormat = "markdown" | "text" | "json";

export interface ResumeMarkdownOptions {
  /** Include AI context metadata in frontmatter */
  includeMetadata?: boolean;
  /** Include skill duration statistics */
  includeTechStats?: boolean;
  /** Output verbosity level */
  format?: "detailed" | "concise";
}

export interface ResumeExportMetadata {
  /** Document type identifier */
  documentType: string;
  /** Format version for compatibility tracking */
  formatVersion: string;
  /** Last update timestamp */
  lastUpdated: string;
  /** Data source attribution */
  source: string;
  /** Total years and months of professional experience */
  totalExperience: string;
  /** Top 5 primary technologies */
  primaryTechnologies: string[];
  /** Career focus based on recent roles */
  careerFocus: string;
}
