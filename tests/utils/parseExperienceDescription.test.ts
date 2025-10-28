/**
 * Purpose:
 * Unit tests for experience description parser.
 * Validates robust parsing of technologies and hierarchical bullet points.
 *
 * Context:
 * - Tests Zod-validated structured parsing
 * - Ensures indentation preservation
 * - Covers edge cases and malformed input
 */

import { describe, it, expect } from "vitest";
import { parseExperienceDescription } from "../../src/utils/parseExperienceDescription";

describe("parseExperienceDescription", () => {
  describe("Technology Extraction", () => {
    it("should extract technologies from first line", () => {
      const description = "TypeScript / React / Node.js\n\n* Task 1";
      const result = parseExperienceDescription(description);

      expect(result.technologies).toEqual(["TypeScript", "React", "Node.js"]);
    });

    it("should handle technologies without spaces after slashes", () => {
      const description = "AWS/Docker/Python\n\n* Task 1";
      const result = parseExperienceDescription(description);

      expect(result.technologies).toEqual(["AWS", "Docker", "Python"]);
    });

    it("should handle technologies with extra spaces", () => {
      const description = "  AWS  /  Docker  /  Python  \n\n* Task 1";
      const result = parseExperienceDescription(description);

      expect(result.technologies).toEqual(["AWS", "Docker", "Python"]);
    });

    it("should return empty array when no technologies", () => {
      const description = "\n\n* Task 1";
      const result = parseExperienceDescription(description);

      expect(result.technologies).toEqual([]);
    });
  });

  describe("Simple Bullet Points", () => {
    it("should parse single-level bullets", () => {
      const description = `AWS / Docker

* Task 1
* Task 2
* Task 3`;

      const result = parseExperienceDescription(description);

      expect(result.responsibilities).toHaveLength(3);
      expect(result.responsibilities[0].text).toBe("Task 1");
      expect(result.responsibilities[1].text).toBe("Task 2");
      expect(result.responsibilities[2].text).toBe("Task 3");
      expect(result.responsibilities[0].children).toBeUndefined();
    });

    it("should handle bullets with various text content", () => {
      const description = `Tech

* Developed web applications using React
* Improved performance by 50%`;

      const result = parseExperienceDescription(description);

      expect(result.responsibilities).toHaveLength(2);
      expect(result.responsibilities[0].text).toBe(
        "Developed web applications using React"
      );
      expect(result.responsibilities[1].text).toBe(
        "Improved performance by 50%"
      );
    });
  });

  describe("Nested Bullet Points", () => {
    it("should parse 2-level hierarchy", () => {
      const description = `AWS

* Main Task
    * Sub Task 1
    * Sub Task 2`;

      const result = parseExperienceDescription(description);

      expect(result.responsibilities).toHaveLength(1);
      expect(result.responsibilities[0].text).toBe("Main Task");
      expect(result.responsibilities[0].children).toHaveLength(2);
      expect(result.responsibilities[0].children?.[0].text).toBe("Sub Task 1");
      expect(result.responsibilities[0].children?.[1].text).toBe("Sub Task 2");
    });

    it("should parse 3-level hierarchy", () => {
      const description = `Tech

* Level 1
    * Level 2A
        * Level 3A
        * Level 3B
    * Level 2B`;

      const result = parseExperienceDescription(description);

      expect(result.responsibilities).toHaveLength(1);
      const level1 = result.responsibilities[0];
      expect(level1.text).toBe("Level 1");
      expect(level1.children).toHaveLength(2);

      const level2A = level1.children?.[0];
      expect(level2A?.text).toBe("Level 2A");
      expect(level2A?.children).toHaveLength(2);
      expect(level2A?.children?.[0].text).toBe("Level 3A");
      expect(level2A?.children?.[1].text).toBe("Level 3B");

      const level2B = level1.children?.[1];
      expect(level2B?.text).toBe("Level 2B");
      expect(level2B?.children).toBeUndefined();
    });

    it("should handle real-world LAPRAS data format", () => {
      const description = `AWS / Docker / Python / Django / TypeScript / Vue

* C向けプロダクト開発
    * アジャイル
    * 開発チームのリード
        * 要件のすり合わせからタスク整理、実装リリース
* 開発改善
    * GitHub Actions の追加改修
    * MyPyなど開発環境の整備
* frontend課題に向き合うチームの運営
    * 課題の優先度付
    * vitest browser-mode 導入
    * パフォーマンス改善`;

      const result = parseExperienceDescription(description);

      expect(result.technologies).toEqual([
        "AWS",
        "Docker",
        "Python",
        "Django",
        "TypeScript",
        "Vue",
      ]);

      expect(result.responsibilities).toHaveLength(3);

      // First item: C向けプロダクト開発
      const item1 = result.responsibilities[0];
      expect(item1.text).toBe("C向けプロダクト開発");
      expect(item1.children).toHaveLength(2);
      expect(item1.children?.[0].text).toBe("アジャイル");
      expect(item1.children?.[1].text).toBe("開発チームのリード");
      expect(item1.children?.[1].children).toHaveLength(1);
      expect(item1.children?.[1].children?.[0].text).toBe(
        "要件のすり合わせからタスク整理、実装リリース"
      );

      // Second item: 開発改善
      const item2 = result.responsibilities[1];
      expect(item2.text).toBe("開発改善");
      expect(item2.children).toHaveLength(2);
      expect(item2.children?.[0].text).toBe("GitHub Actions の追加改修");
      expect(item2.children?.[1].text).toBe("MyPyなど開発環境の整備");

      // Third item: frontend課題に向き合うチームの運営
      const item3 = result.responsibilities[2];
      expect(item3.text).toBe("frontend課題に向き合うチームの運営");
      expect(item3.children).toHaveLength(3);
      expect(item3.children?.[0].text).toBe("課題の優先度付");
      expect(item3.children?.[1].text).toBe("vitest browser-mode 導入");
      expect(item3.children?.[2].text).toBe("パフォーマンス改善");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty description", () => {
      const description = "";
      const result = parseExperienceDescription(description);

      expect(result.technologies).toEqual([]);
      expect(result.responsibilities).toEqual([]);
    });

    it("should handle description with only technologies", () => {
      const description = "TypeScript / React";
      const result = parseExperienceDescription(description);

      expect(result.technologies).toEqual(["TypeScript", "React"]);
      expect(result.responsibilities).toEqual([]);
    });

    it("should ignore lines without asterisk", () => {
      const description = `Tech

* Valid bullet
Some text without asterisk
* Another valid bullet`;

      const result = parseExperienceDescription(description);

      expect(result.responsibilities).toHaveLength(2);
      expect(result.responsibilities[0].text).toBe("Valid bullet");
      expect(result.responsibilities[1].text).toBe("Another valid bullet");
    });

    it("should handle empty lines between bullets", () => {
      const description = `Tech

* Task 1

* Task 2

* Task 3`;

      const result = parseExperienceDescription(description);

      expect(result.responsibilities).toHaveLength(3);
    });

    it("should handle bullets with no space after asterisk", () => {
      const description = `Tech

*Task 1
*Task 2`;

      const result = parseExperienceDescription(description);

      expect(result.responsibilities).toHaveLength(2);
      expect(result.responsibilities[0].text).toBe("Task 1");
      expect(result.responsibilities[1].text).toBe("Task 2");
    });
  });

  describe("Zod Validation", () => {
    it("should validate structure with Zod schema", () => {
      const description = `TypeScript / React

* Task 1
    * Sub Task`;

      // Should not throw
      expect(() => parseExperienceDescription(description)).not.toThrow();
    });

    it("should pass Zod validation for complex nested structure", () => {
      const description = `A / B / C

* Level 1
    * Level 2
        * Level 3
            * Level 4`;

      // Should not throw
      const result = parseExperienceDescription(description);
      expect(result.responsibilities[0].children?.[0].children?.[0].children).toBeDefined();
    });
  });
});
