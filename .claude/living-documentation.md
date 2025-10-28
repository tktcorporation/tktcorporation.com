# Living Documentation Approach

This project uses **Test-Driven Specification** - tests serve as executable documentation that never goes out of sync with code.

## Why Living Documentation?

Traditional documentation problems:
- `.md` files become outdated quickly
- No verification that docs match implementation
- Design intent gets lost over time
- Difficult to maintain across refactorings

Living Documentation solves this by:
- Embedding specs directly in test code
- Running specs on every CI build
- Keeping intent close to implementation
- Making tests self-documenting

## Where to Find Specifications

**Feature-Level Specs** (E2E Tests):
- `tests/e2e/*.spec.ts` - User-facing behavior and acceptance criteria
- Contains: Purpose, design philosophy, architecture, acceptance criteria
- Example: `tests/e2e/resume-export.spec.ts` for AI resume export feature

**Implementation Specs** (Unit Tests):
- `tests/utils/*.test.ts` - Implementation details and design decisions
- Contains: Input/output specs, edge cases, design rationale
- Example: `tests/utils/parseExperienceDescription.test.ts` for parser logic

## Test File Structure

```typescript
/**
 * ============================================================================
 * Feature Name - Specification
 * ============================================================================
 *
 * ## Purpose (Why)
 * Why this feature exists and what problem it solves
 *
 * ## Design Decisions (How)
 * Key architectural choices and their rationale
 *
 * ## Implementation Status
 * What's done, what's in progress, what's planned
 *
 * ============================================================================
 * EXECUTABLE SPECIFICATION TESTS BELOW
 * ============================================================================
 */

describe("Feature Name", () => {
  // Tests that serve as runnable specifications
});
```

## Writing Living Documentation

When adding features:
1. **Start with E2E tests** - Define user-facing behavior
2. **Add unit tests** - Specify implementation details
3. **Document design decisions** - Explain "why" in test comments
4. **Mark future work as `.skip()`** - Planned features as skipped tests

When reading code:
1. **Check E2E tests first** - Understand user perspective
2. **Read unit tests** - Understand implementation
3. **Code comments explain "how"** - Tests explain "why"

## Example: AI Resume Export

Documentation location:
- Overview: `IMPLEMENTATION_AI_EXPORT.md` (points to test files)
- E2E Spec: `tests/e2e/resume-export.spec.ts` (feature behavior)
- Unit Specs: `tests/utils/*.test.ts` (implementation details)

This approach ensures code and documentation evolve together.
