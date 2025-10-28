# AI-Friendly Resume Export Feature

**Status**: ✅ Completed
**Implementation Date**: 2025-10-28
**Test-Driven**: Yes (43 unit tests + 15 E2E tests)

## 📖 Living Documentation

This feature follows **Living Documentation** principles - the specification lives in executable test code rather than separate markdown files.

**Why?** Test-driven specifications ensure:
- Code and documentation never drift apart
- Specifications are verified on every CI run
- Implementation intent is captured in test descriptions
- Future maintainers understand the "why" not just the "how"

## 🔍 Where to Find the Specification

### Feature Specification (E2E Tests)
**Location**: [`tests/e2e/resume-export.spec.ts`](./tests/e2e/resume-export.spec.ts)

This file contains:
- **Purpose & Design Philosophy**: Why this feature exists
- **Implementation Status**: What's done, what's planned
- **Technical Architecture**: Data flow and design decisions
- **Acceptance Criteria**: User-facing behavior specifications
- **Future Enhancements**: Planned features (marked as `.skip()`)

Run E2E tests:
```bash
npm run test:e2e        # Run all E2E tests
npm run test:e2e:ui     # Run with Playwright UI
```

### Implementation Specifications (Unit Tests)

#### Parser Specification
**Location**: [`tests/utils/parseExperienceDescription.test.ts`](./tests/utils/parseExperienceDescription.test.ts)

Documents:
- Input format specification (LAPRAS text format)
- Output schema (Zod-validated structure)
- Design decisions (why Zod, why recursive parsing)
- Edge cases and error handling

#### Markdown Generator Specification
**Location**: [`tests/utils/exportResumeMarkdown.test.ts`](./tests/utils/exportResumeMarkdown.test.ts)

Documents:
- Markdown format structure
- YAML frontmatter schema
- Section generation logic
- Content formatting rules

Run unit tests:
```bash
npm run test            # Run unit tests in watch mode
npm run test:run        # Run once
npm run test:ui         # Run with Vitest UI
```

### Run All Tests
```bash
npm run test:all        # Run unit tests + E2E tests
```

## 🎯 Quick Summary

### What It Does
Provides AI-friendly resume exports via URL:
- `/resume.md` - Markdown with YAML frontmatter
- `/resume.txt` - Plain text (80-char width)
- `/resume.json` - Structured JSON

### Design Philosophy
Following Claude Docs' minimalist approach:
- Simple `<pre>` tag display
- No UI buttons or complex styling
- Maximum compatibility with AI agents

### Key Technologies
- **Zod**: Runtime validation and type safety
- **Vite Plugin**: Build-time static file generation
- **Vitest**: Unit testing with 100% coverage
- **Playwright**: E2E testing for user journeys

## 📊 Test Coverage

```
Unit Tests:  43 passing
E2E Tests:   15 passing (see test file for current count)
Coverage:    ~100% for core utilities
```

## 🚀 Development Workflow

### Adding New Features
1. Write E2E test in `tests/e2e/resume-export.spec.ts`
2. Write unit tests for new utilities
3. Implement feature following TDD (Red-Green-Refactor)
4. Update test descriptions to document intent

### Understanding Existing Code
1. Start with E2E tests to understand user-facing behavior
2. Read unit tests to understand implementation details
3. Code comments explain "how", tests explain "why"

## 🔗 Related Files

### Implementation
- `src/pages/ResumeExports.tsx` - Export page component
- `src/utils/parseExperienceDescription.ts` - Structured parser
- `src/utils/exportResumeMarkdown.ts` - Markdown generator
- `src/utils/exportResumeText.ts` - Plain text converter
- `src/utils/exportResumeJson.ts` - JSON formatter
- `src/types/resume-export.ts` - Zod schemas

### Configuration
- `vite.config.js` - Build plugin for static files
- `playwright.config.js` - E2E test configuration
- `vitest.config.ts` - Unit test configuration

## 📝 Contributing

When modifying this feature:
1. **Update tests first** - Specify behavior in tests
2. **Update documentation comments** - Explain design decisions
3. **Run all tests** - Ensure nothing breaks
4. **Keep tests as documentation** - Future you will thank you

## ❓ FAQ

**Q: Where's the detailed implementation plan?**
A: In the test files. Tests serve as executable specifications.

**Q: How do I know what's implemented vs. planned?**
A: Check E2E tests. Implemented features are active tests, planned features are `.skip()` tests.

**Q: Why not keep specs in markdown?**
A: Markdown goes stale. Tests are verified on every CI run.

**Q: What if I need to update the API?**
A: Update the tests first to specify the new behavior, then implement.

---

**Remember**: Tests are not just for catching bugs - they're living documentation that explains intent and validates specifications. Read them, write them, maintain them.
