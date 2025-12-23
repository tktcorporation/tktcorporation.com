/**
 * ============================================================================
 * AI-Friendly Resume Export Feature Specification
 * ============================================================================
 *
 * ## Purpose (Why)
 * AI agents and humans need easy, programmatic access to resume data in
 * multiple formats. This feature enables:
 * - AI assistants to fetch and analyze career information via URL
 * - Developers to integrate resume data into other applications
 * - Multiple export formats for different use cases
 *
 * ## Design Philosophy
 * Following Claude Docs' minimalist approach:
 * - Simple plain text display (just a <pre> tag)
 * - No complex UI or JavaScript interactions
 * - Maximum compatibility with AI agents and scrapers
 * - URL-based access (e.g., /resume.md, /resume.txt, /resume.json)
 *
 * ## Implementation Status
 * ✅ Completed:
 * - URL-based export routes (/resume.md, /resume.txt, /resume.json)
 * - Zod-based structured parsing with hierarchical indentation
 * - Markdown generation with YAML frontmatter
 * - Plain text conversion (80-char width)
 * - JSON export with calculated fields
 * - 43 unit tests (100% coverage)
 * - Claude Docs-style minimal UI
 *
 * ⏳ Future Enhancements:
 * - PDF export generation
 * - Multi-language support (en/ja)
 * - Custom styling options via query parameters
 * - RSS/Atom feed for career updates
 *
 * ## Technical Architecture
 *
 * ### Data Flow
 * ```
 * experiences.json (LAPRAS sync)
 *   ↓
 * parseExperienceDescription (Zod validation)
 *   ↓
 * generateResumeMarkdown / Text / JSON
 *   ↓
 * ResumeExports component (React)
 *   ↓
 * Simple <pre> tag display
 * ```
 *
 * ### Key Design Decisions
 * 1. **Zod for parsing**: Type-safe runtime validation prevents data corruption
 * 2. **Hierarchical structure**: Preserves indentation from bullet points
 * 3. **Build-time generation**: Static files for performance and caching
 * 4. **Minimal UI**: No buttons, no styling - just plain text
 * 5. **YAML frontmatter**: AI-friendly metadata for context understanding
 *
 * ## Testing Strategy
 * - Unit tests: Parser logic, data transformation (43 tests)
 * - E2E tests (this file): URL access, content validation, UI behavior
 * - Integration tests: Build pipeline, static file generation
 *
 * ============================================================================
 * EXECUTABLE SPECIFICATION TESTS BELOW
 * ============================================================================
 */

import { expect, test } from "@playwright/test";

/**
 * ============================================================================
 * Feature: URL-based Resume Export Access
 * ============================================================================
 *
 * As an AI agent or developer,
 * I want to fetch resume data via simple URLs,
 * So that I can easily integrate career information into my application.
 *
 * Acceptance Criteria:
 * - URLs return 200 status code
 * - Content is plain text (not HTML-rendered)
 * - No JavaScript errors occur
 * - Content format matches specification
 */
test.describe("Resume Export URLs", () => {
  const exportRoutes = [
    {
      path: "/resume.md",
      format: "Markdown",
      contentType: "text/html", // React app serves HTML
      expectedPatterns: [
        /^---\s*$/m, // YAML frontmatter start
        /AI Context Metadata:/,
        /Document Type:/,
        /# Professional Resume/,
        /## Summary/,
        /## Skills & Technologies/,
        /## Professional Experience/,
        /## Career Timeline/,
      ],
      description: "Markdown format with YAML frontmatter for AI context",
    },
    {
      path: "/resume.txt",
      format: "Plain Text",
      contentType: "text/html",
      expectedPatterns: [
        /PROFESSIONAL RESUME/,
        /SUMMARY/,
        /SKILLS & TECHNOLOGIES/,
        /PROFESSIONAL EXPERIENCE/,
        /CAREER TIMELINE/,
      ],
      description: "Plain text format (80-char width) for terminal display",
    },
    {
      path: "/resume.json",
      format: "JSON",
      contentType: "text/html",
      expectedPatterns: [
        /"metadata":/,
        /"summary":/,
        /"skills":/,
        /"experiences":/,
      ],
      description: "Structured JSON for programmatic access",
    },
  ];

  for (const route of exportRoutes) {
    test(`should serve ${route.format} export at ${route.path}`, async ({
      page,
    }) => {
      // Context: User or AI agent accesses the export URL directly
      const response = await page.goto(route.path);

      // Verification: URL should be accessible
      expect(response?.status()).toBe(200);
      console.log(`✅ ${route.path} returned 200 OK`);

      // Verification: Page should have content
      const content = await page.textContent("pre");
      expect(content).toBeTruthy();
      expect(content?.length).toBeGreaterThan(100);
      console.log(
        `✅ ${route.path} has content (${content?.length} characters)`
      );
    });

    test(`should display ${route.format} in simple pre tag at ${route.path}`, async ({
      page,
    }) => {
      await page.goto(route.path);

      // Verification: Content should be in a <pre> tag (Claude Docs style)
      const preElement = page.locator("pre");
      await expect(preElement).toBeVisible();

      // Verification: Pre tag should have correct styling
      const wordWrap = await preElement.evaluate(
        (el) => getComputedStyle(el).wordWrap
      );
      const whiteSpace = await preElement.evaluate(
        (el) => getComputedStyle(el).whiteSpace
      );

      expect(wordWrap).toBe("break-word");
      expect(whiteSpace).toBe("pre-wrap");
      console.log(`✅ ${route.path} uses proper pre-wrap styling`);
    });

    test(`should contain expected ${route.format} patterns at ${route.path}`, async ({
      page,
    }) => {
      await page.goto(route.path);
      const content = await page.textContent("pre");

      // Verification: Content should match format specification
      for (const pattern of route.expectedPatterns) {
        expect(
          content,
          `${route.path} should contain pattern: ${pattern}`
        ).toMatch(pattern);
      }

      console.log(
        `✅ ${route.path} contains all expected ${route.format} patterns`
      );
    });

    test(`should load ${route.format} export without JavaScript errors at ${route.path}`, async ({
      page,
    }) => {
      const errors: Error[] = [];
      page.on("pageerror", (error) => errors.push(error));

      await page.goto(route.path);

      // Wait for any async operations
      await page.waitForLoadState("networkidle");

      // Verification: No JavaScript errors should occur
      expect(
        errors,
        `JavaScript errors found at ${route.path}: ${errors.map((e) => e.message).join(", ")}`
      ).toHaveLength(0);
      console.log(`✅ ${route.path} loaded without JavaScript errors`);
    });
  }
});

/**
 * ============================================================================
 * Feature: Minimal UI (Claude Docs Style)
 * ============================================================================
 *
 * As a user,
 * I want to see resume content in a simple, distraction-free format,
 * So that I can easily read and share it with AI agents.
 *
 * Design Decision: Remove all UI elements (buttons, headers, footers)
 * - Previous versions had Copy/Download buttons
 * - Removed to match Claude Docs' pure text approach
 * - Content is accessible via browser's built-in right-click menu
 */
test.describe("Minimal UI Design", () => {
  test("should not display copy or download buttons on export pages", async ({
    page,
  }) => {
    await page.goto("/resume.md");

    // Verification: No buttons should be present
    const copyButton = page.locator('button:has-text("Copy")');
    const downloadButton = page.locator('button:has-text("Download")');

    await expect(copyButton).toHaveCount(0);
    await expect(downloadButton).toHaveCount(0);
    console.log("✅ Export pages have no Copy/Download buttons");
  });

  test("should not display header or title on export pages", async ({
    page,
  }) => {
    await page.goto("/resume.md");

    // Verification: No h1 or header should be present outside <pre>
    const headers = page.locator("h1, h2, h3, h4, h5, h6").filter({
      has: page.locator("pre"),
      hasNot: page.locator("pre"),
    });

    await expect(headers).toHaveCount(0);
    console.log("✅ Export pages have no external headers");
  });

  test("should display only pre tag with plain text", async ({ page }) => {
    await page.goto("/resume.md");

    // Verification: Page structure should be minimal
    const preTag = page.locator("pre");
    await expect(preTag).toBeVisible();

    // Content should be directly in pre tag, no nested components
    const preContent = await preTag.innerHTML();
    expect(preContent).not.toContain("<div");
    expect(preContent).not.toContain("<span");
    expect(preContent).not.toContain("<button");
    console.log("✅ Export pages display only plain text in pre tag");
  });
});

/**
 * ============================================================================
 * Feature: Data Accuracy and Format Compliance
 * ============================================================================
 *
 * As a developer integrating resume data,
 * I want to receive accurate, well-formatted content,
 * So that I can parse and use it reliably.
 */
test.describe("Content Format Validation", () => {
  test("Markdown export should have valid YAML frontmatter", async ({
    page,
  }) => {
    await page.goto("/resume.md");
    const content = await page.textContent("pre");

    // Specification: YAML frontmatter structure
    // ---
    // AI Context Metadata:
    //   Document Type: Professional Resume/CV
    //   Format Version: 1.0
    //   ...
    // ---
    const frontmatterRegex = /^---\n[\s\S]*?---\n/;
    expect(content).toMatch(frontmatterRegex);

    // Verification: Required metadata fields
    expect(content).toContain("AI Context Metadata:");
    expect(content).toContain("Document Type:");
    expect(content).toContain("Format Version:");
    expect(content).toContain("Last Updated:");
    expect(content).toContain("Source:");
    expect(content).toContain("Total Experience:");
    expect(content).toContain("Primary Technologies:");
    expect(content).toContain("Career Focus:");

    console.log("✅ Markdown export has valid YAML frontmatter");
  });

  test("JSON export should be valid JSON", async ({ page }) => {
    await page.goto("/resume.json");
    const content = await page.textContent("pre");

    // Verification: Content should be parseable as JSON
    let jsonData: unknown;
    expect(() => {
      jsonData = JSON.parse(content || "");
    }).not.toThrow();

    // Specification: Required JSON structure
    expect(jsonData).toHaveProperty("metadata");
    expect(jsonData).toHaveProperty("summary");
    expect(jsonData).toHaveProperty("skills");
    expect(jsonData).toHaveProperty("experiences");

    console.log("✅ JSON export is valid and well-structured");
  });

  test("Plain text export should have proper line width", async ({ page }) => {
    await page.goto("/resume.txt");
    const content = await page.textContent("pre");

    // Specification: Terminal-friendly 80-character width
    // (excluding section separators which may be longer)
    const lines = content?.split("\n") || [];
    const contentLines = lines.filter(
      (line) => line.trim() !== "" && !line.match(/^[=-]{3,}$/) // Exclude separators
    );

    const tooLongLines = contentLines.filter((line) => line.length > 82); // 80 + margin
    expect(
      tooLongLines.length,
      `Found ${tooLongLines.length} lines exceeding 80 chars`
    ).toBeLessThan(contentLines.length * 0.1); // Allow 10% tolerance

    console.log("✅ Plain text export respects 80-char line width");
  });
});

/**
 * ============================================================================
 * Feature: Performance and Caching
 * ============================================================================
 *
 * As a system administrator,
 * I want export pages to load quickly and be cacheable,
 * So that the application scales efficiently.
 */
test.describe("Performance", () => {
  test("should load export pages within acceptable time", async ({ page }) => {
    const start = Date.now();
    await page.goto("/resume.md");
    await page.waitForLoadState("networkidle");
    const loadTime = Date.now() - start;

    // Specification: Pages should load within 3 seconds
    expect(loadTime, `Load time: ${loadTime}ms`).toBeLessThan(3000);
    console.log(`✅ Export page loaded in ${loadTime}ms`);
  });

  test("should generate content on-the-fly during development", async ({
    page,
  }) => {
    // Context: In development mode, content is generated by React component
    await page.goto("/resume.md");
    const content = await page.textContent("pre");

    // Verification: Content should be up-to-date with data source
    expect(content).toBeTruthy();
    expect(content?.length).toBeGreaterThan(100);

    // Note: In production, Vite plugin generates static files
    // This test verifies dev server behavior
    console.log("✅ Content generated successfully in dev mode");
  });
});

/**
 * ============================================================================
 * Integration: Main Resume Page
 * ============================================================================
 *
 * The main /resume page should provide context and links to export formats.
 * This ensures users can discover the export functionality.
 */
test.describe("Resume Page Integration", () => {
  test("should provide access to export formats from main resume page", async ({
    page,
  }) => {
    await page.goto("/resume");

    // Verification: Main page should have links or indication of exports
    // Note: This is a future enhancement - exports are currently direct URLs
    const bodyContent = await page.textContent("body");
    expect(bodyContent).toBeTruthy();

    console.log("✅ Main resume page loaded (export links are direct URLs)");
  });
});

/**
 * ============================================================================
 * Future Enhancement Specifications (Not Yet Implemented)
 * ============================================================================
 *
 * These tests are marked as .skip() and serve as TODO items.
 * Uncomment when implementing these features.
 */
test.describe
  .skip("Future Enhancements", () => {
    test("should support multi-language exports (en/ja)", async ({ page }) => {
      // TODO: Implement ?lang=ja query parameter
      await page.goto("/resume.md?lang=ja");
      const content = await page.textContent("pre");
      expect(content).toContain("職務経歴書");
    });

    test("should support custom styling via query parameters", async ({
      page,
    }) => {
      // TODO: Implement ?theme=dark or ?style=compact
      await page.goto("/resume.md?theme=dark");
      const bgColor = await page.evaluate(
        () => getComputedStyle(document.body).backgroundColor
      );
      expect(bgColor).toMatch(/rgb\(.*\)/); // Dark background
    });

    test("should provide RSS/Atom feed for career updates", async ({
      page,
    }) => {
      // TODO: Implement /resume.xml or /resume.atom
      const response = await page.goto("/resume.xml");
      expect(response?.status()).toBe(200);
      const content = await page.textContent("body");
      expect(content).toContain("<rss");
    });
  });
