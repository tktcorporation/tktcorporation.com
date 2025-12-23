/**
 * Purpose:
 * Unit tests for AI-friendly Markdown resume export functionality.
 * Tests follow TDD principles: Red-Green-Refactor cycle.
 *
 * Context:
 * - Tests markdown generation from resume data
 * - Validates AI-friendly formatting and structure
 * - Ensures metadata and content accuracy
 */

import { describe, expect, it } from "vitest";
import { generateResumeMarkdown } from "../../src/utils/exportResumeMarkdown";

describe("generateResumeMarkdown", () => {
  // Test data fixtures
  const mockExperiences = [
    {
      id: 1,
      organization_name: "Test Company",
      is_client_work: false,
      client_company_name: "",
      positions: [{ id: 1, job_position_name: "Software Engineer" }],
      position_name: "Senior Engineer",
      start_year: 2023,
      start_month: 1,
      end_year: null,
      end_month: null,
      description:
        "TypeScript / React / Node.js\n\n* Built web applications\n* Improved performance",
      updated_at: "2025-01-01T00:00:00Z",
    },
    {
      id: 2,
      organization_name: "Previous Company",
      is_client_work: false,
      client_company_name: "",
      positions: [{ id: 2, job_position_name: "Junior Developer" }],
      position_name: "Junior Developer",
      start_year: 2021,
      start_month: 6,
      end_year: 2022,
      end_month: 12,
      description: "Python / Django\n\n* Developed backend APIs",
      updated_at: "2022-12-01T00:00:00Z",
    },
  ];

  const mockSkills = [
    { name: "TypeScript", years: 2, months: 6 },
    { name: "React", years: 2, months: 0 },
    { name: "Python", years: 1, months: 6 },
  ];

  describe("Basic Functionality", () => {
    it("should generate valid Markdown string", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      expect(result).toBeTypeOf("string");
      expect(result.length).toBeGreaterThan(0);
    });

    it("should include AI context metadata frontmatter", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      expect(result).toContain("---");
      expect(result).toContain("AI Context Metadata:");
      expect(result).toContain("Document Type:");
      expect(result).toContain("Format Version:");
      expect(result).toContain("Last Updated:");
    });

    it("should include main title", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      expect(result).toContain("# Professional Resume");
    });
  });

  describe("Summary Section", () => {
    it("should include summary section", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      expect(result).toContain("## Summary");
    });

    it("should include total professional experience", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      expect(result).toMatch(/Total Professional Experience.*years.*months/);
    });

    it("should include current position information", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      expect(result).toContain("Current Position");
      expect(result).toContain("Test Company");
    });

    it("should include key technologies", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      expect(result).toContain("Key Technologies");
      expect(result).toContain("TypeScript");
    });
  });

  describe("Skills Section", () => {
    it("should include skills section when skills are provided", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      expect(result).toContain("## Skills & Technologies");
    });

    it("should format skills with duration", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      expect(result).toContain("**TypeScript**: 2 years 6 months");
      expect(result).toContain("**React**: 2 years");
      expect(result).toContain("**Python**: 1 year 6 months");
    });

    it("should handle empty skills array", () => {
      const result = generateResumeMarkdown(mockExperiences, []);
      expect(result).toContain("## Skills & Technologies");
      // Should still render section even if empty
    });
  });

  describe("Professional Experience Section", () => {
    it("should include professional experience section", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      expect(result).toContain("## Professional Experience");
    });

    it("should list all experiences", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      expect(result).toContain("Test Company");
      expect(result).toContain("Previous Company");
    });

    it("should include position titles", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      // positions[0].job_position_name is prioritized over position_name
      expect(result).toContain("Software Engineer");
      expect(result).toContain("Junior Developer");
    });

    it("should format date ranges correctly", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      // Current position
      expect(result).toContain("2023/01 - Present");
      // Past position
      expect(result).toContain("2021/06 - 2022/12");
    });

    it("should extract and display technologies", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      expect(result).toContain("TypeScript, React, Node.js");
      expect(result).toContain("Python, Django");
    });

    it("should handle client work correctly", () => {
      const clientExperience = {
        ...mockExperiences[0],
        is_client_work: true,
        client_company_name: "Client Corp",
      };
      const result = generateResumeMarkdown([clientExperience], mockSkills);
      expect(result).toContain("Client Corp (via Test Company)");
    });
  });

  describe("Career Timeline Section", () => {
    it("should include career timeline section", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      expect(result).toContain("## Career Timeline");
    });

    it("should list all positions in timeline", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      expect(result).toMatch(/2023\/01 - Present.*Test Company/);
      expect(result).toMatch(/2021\/06 - 2022\/12.*Previous Company/);
    });
  });

  describe("Options Handling", () => {
    it("should respect includeMetadata option", () => {
      const withoutMetadata = generateResumeMarkdown(
        mockExperiences,
        mockSkills,
        {
          includeMetadata: false,
        }
      );
      expect(withoutMetadata).not.toContain("AI Context Metadata:");
    });

    it("should respect includeTechStats option", () => {
      const withoutSkills = generateResumeMarkdown(
        mockExperiences,
        mockSkills,
        {
          includeTechStats: false,
        }
      );
      // Should still have section header but not skill details
      expect(withoutSkills).not.toContain("**TypeScript**:");
    });

    it("should handle concise format", () => {
      const concise = generateResumeMarkdown(mockExperiences, mockSkills, {
        format: "concise",
      });
      expect(concise).toContain("## Career Timeline");
      expect(concise).toBeTypeOf("string");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty experiences array", () => {
      const result = generateResumeMarkdown([], mockSkills);
      expect(result).toBeTypeOf("string");
      expect(result).toContain("# Professional Resume");
    });

    it("should handle experiences without descriptions", () => {
      const expWithoutDesc = [
        {
          ...mockExperiences[0],
          description: "",
        },
      ];
      const result = generateResumeMarkdown(expWithoutDesc, mockSkills);
      expect(result).toBeTypeOf("string");
    });

    it("should handle special characters in company names", () => {
      const expWithSpecialChars = [
        {
          ...mockExperiences[0],
          organization_name: "Company & Co. (Ltd.)",
        },
      ];
      const result = generateResumeMarkdown(expWithSpecialChars, mockSkills);
      expect(result).toContain("Company & Co. (Ltd.)");
    });
  });

  describe("Markdown Validity", () => {
    it("should have proper markdown headers hierarchy", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      // Check header levels are properly nested
      expect(result).toContain("# Professional Resume");
      expect(result).toContain("## Summary");
      expect(result).toContain("## Professional Experience");
      expect(result).toMatch(/###.*Test Company/);
    });

    it("should properly escape markdown special characters if needed", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      // Markdown should be valid
      expect(result).not.toMatch(/\*\*\*\*/); // No triple asterisks
    });

    it("should have consistent line breaks", () => {
      const result = generateResumeMarkdown(mockExperiences, mockSkills);
      // Should not have excessive line breaks
      expect(result).not.toContain("\n\n\n\n");
    });
  });
});
