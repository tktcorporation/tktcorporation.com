# Development Process Workflow

This document describes the standard development workflow for implementing new features in this project, including Test-Driven Development (TDD) practices.

## Standard Workflow

### 1. Planning Phase

When starting a new feature or complex task:

1. **Use Plan Mode** (for complex features)
   - Let Claude analyze the requirements
   - Review the generated plan
   - Discuss and approve the approach

2. **Create Implementation Document**
   - File location: Project root (e.g., `IMPLEMENTATION_[FEATURE_NAME].md`)
   - Include:
     - Overview and goals
     - Architecture decisions
     - Detailed checklist with checkboxes
     - File structure (new files, modified files)
     - Technical notes and considerations
     - Success criteria
     - Test plan (following TDD principles)
     - References

3. **Save to Serena Memory**
   - Document the development process
   - Store important architectural decisions
   - Create searchable knowledge for future sessions

### 2. Test-Driven Development (TDD) Phase

**IMPORTANT**: Follow TDD principles for all new features and utilities.

#### TDD Cycle (Red-Green-Refactor)

1. **RED: Write Failing Tests First**
   ```typescript
   // tests/utils/myFeature.test.ts
   describe("myFeature", () => {
     it("should do something specific", () => {
       const result = myFeature(input);
       expect(result).toBe(expected);
     });
   });
   ```
   - Write tests BEFORE implementation
   - Tests should fail initially (RED)
   - Focus on behavior, not implementation
   - Use descriptive test names

2. **GREEN: Write Minimum Code to Pass**
   ```typescript
   // src/utils/myFeature.ts
   export function myFeature(input) {
     // Minimum code to make tests pass
     return expected;
   }
   ```
   - Write just enough code to pass tests
   - Don't over-engineer
   - Run tests frequently: `npm run test`

3. **REFACTOR: Improve Code Quality**
   - Clean up code while keeping tests green
   - Extract functions, improve names
   - Optimize performance if needed
   - Ensure tests still pass

#### TDD Best Practices (Kent Beck Principles)

1. **Test One Thing at a Time**
   - Each test should verify one behavior
   - Use `describe` blocks to organize related tests
   - Keep tests independent

2. **Write Tests for Edge Cases**
   - Empty inputs
   - Null/undefined values
   - Boundary conditions
   - Error scenarios

3. **Use Meaningful Test Names**
   - Bad: `test("works")`
   - Good: `it("should generate markdown with AI metadata frontmatter")`

4. **Arrange-Act-Assert Pattern**
   ```typescript
   it("should calculate total duration", () => {
     // Arrange: Set up test data
     const experiences = [mockExp1, mockExp2];
     
     // Act: Execute the function
     const result = calculateDuration(experiences);
     
     // Assert: Verify the result
     expect(result).toBe("3 years 6 months");
   });
   ```

5. **Keep Tests Fast**
   - Mock external dependencies
   - Avoid I/O operations in unit tests
   - Use test fixtures for data

#### Test Organization

```
tests/
  setup.ts                    # Global test configuration
  utils/
    myFeature.test.ts         # Unit tests for utilities
  components/
    MyComponent.test.tsx      # Component tests
  integration/
    featureFlow.test.ts       # Integration tests
```

#### Running Tests

```bash
npm run test              # Watch mode (development)
npm run test:run          # Run once (CI/CD)
npm run test:ui           # Visual UI for test results
npm run test:coverage     # Generate coverage report
```

### 3. Implementation Phase

Follow the checklist in the implementation document:

1. **Use TodoWrite Tool**
   - Create todos based on checklist phases
   - Mark tasks as in_progress → completed
   - Keep only one task in_progress at a time

2. **Follow File Organization**
   - Create new files as specified in the plan
   - Add Purpose comments to ALL new files
   - Follow existing code style and conventions

3. **Incremental Development with TDD**
   - Write tests for each new function/component
   - Implement features following Red-Green-Refactor
   - Run tests after each change
   - Commit logical chunks with passing tests

### 4. Quality Assurance Phase

Before considering a task complete:

1. **Run Required Checks** (from CLAUDE.md)
   ```bash
   npm run test         # Run ALL tests (must pass)
   npm run lint         # Fix all linting issues
   npm run typecheck    # Fix all type errors
   npm run build        # Verify build succeeds
   ```

2. **Test Coverage**
   ```bash
   npm run test:coverage  # Check code coverage
   ```
   - Aim for >80% coverage for utilities
   - Aim for >70% coverage for components
   - 100% coverage for critical business logic

3. **Manual Testing**
   - Test on multiple browsers (if UI changes)
   - Test on mobile devices (if responsive)
   - Test accessibility (keyboard navigation, screen readers)

4. **Code Review Checklist**
   - [ ] All new files have Purpose comments
   - [ ] All new code has corresponding tests
   - [ ] All tests pass
   - [ ] Code follows Biome formatting rules
   - [ ] TypeScript types are properly defined
   - [ ] No console errors or warnings
   - [ ] Documentation is updated (CLAUDE.md, README, etc.)

### 5. Documentation Phase

1. **Update CLAUDE.md**
   - Add new features to relevant sections
   - Document usage examples
   - Update architecture notes if needed

2. **Update Implementation Document**
   - Mark completed checklist items
   - Add "Completed" status and date
   - Note any deviations from original plan
   - Document lessons learned
   - Include test results and coverage

3. **Update Serena Memories**
   - Store new architectural patterns
   - Document important decisions
   - Create references for future work

### 6. Completion Phase

1. **Update TodoWrite**
   - Mark all tasks as completed
   - Clear the todo list

2. **Final Verification**
   - All checklist items completed
   - All tests passing
   - All quality checks passed
   - Documentation updated
   - Implementation document finalized

3. **Archive/Move Implementation Document**
   - Option A: Keep in root for easy access
   - Option B: Move to `.github/` or `docs/` folder
   - Option C: Delete after completion (if all info is in code/memory)

## TDD Testing Stack

### Current Setup (2025-10-28)

- **Test Framework**: Vitest 4.0.4
- **Test Runner**: Vitest with happy-dom environment
- **UI Testing**: @testing-library/react + @testing-library/user-event
- **Coverage**: Vitest built-in coverage (v8 provider)

### Configuration Files

- `vitest.config.ts`: Main test configuration
- `tests/setup.ts`: Global test setup and utilities
- `package.json`: Test scripts

### Test File Naming

- Unit tests: `*.test.ts` or `*.test.tsx`
- Integration tests: `*.integration.test.ts`
- E2E tests: `*.e2e.ts` or `*.spec.js` (Playwright)

## Implementation Document Template

```markdown
# Implementation Plan: [Feature Name]

**Status**: In Progress / Completed
**Created**: YYYY-MM-DD
**Last Updated**: YYYY-MM-DD
**Assignee**: Claude Code

## 📋 Overview
[Brief description]

## 🎯 Goals
1. Goal 1
2. Goal 2

## 🏗️ Architecture
[Technical approach]

## 🧪 Test Plan (TDD)

### Test Coverage Goals
- Unit tests: >80%
- Integration tests: Key user flows
- Edge cases: All identified scenarios

### Test Cases
1. **Feature A**
   - [ ] Should handle normal input
   - [ ] Should handle empty input
   - [ ] Should handle invalid input
   
2. **Feature B**
   - [ ] Should generate correct output
   - [ ] Should handle edge cases

## 📝 Implementation Checklist

### Phase 1: Write Tests (RED)
- [ ] Write failing tests for Feature A
- [ ] Write failing tests for Feature B
- [ ] Verify tests fail as expected

### Phase 2: Implement Features (GREEN)
- [ ] Implement Feature A (make tests pass)
- [ ] Implement Feature B (make tests pass)

### Phase 3: Refactor (REFACTOR)
- [ ] Optimize Feature A
- [ ] Improve code readability
- [ ] Ensure all tests still pass

### Phase 4: Integration
- [ ] Integrate with existing code
- [ ] Run full test suite
- [ ] Fix any regressions

## 📂 File Structure

### New Files
```
src/utils/feature.ts
tests/utils/feature.test.ts
```

### Modified Files
```
src/pages/Page.tsx
```

## 🔧 Technical Notes
[Important implementation details]

## ⚠️ Known Issues & Considerations
[Things to watch out for]

## 🎯 Success Criteria
✅ All tests passing (28/28)
✅ Code coverage >80%
✅ Lint and typecheck pass
✅ Build succeeds
✅ Manual testing complete

## 📚 References
[Links and resources]
```

## Benefits of This Workflow

1. **Resumability**: If interrupted, can resume from checklist
2. **Context Preservation**: Implementation docs provide full context
3. **Quality Assurance**: TDD ensures code quality from the start
4. **Bug Prevention**: Tests catch regressions early
5. **Knowledge Retention**: Serena memories help future sessions
6. **Consistency**: Same process for all features
7. **Transparency**: User can see progress at any time
8. **Confidence**: High test coverage gives confidence in changes

## When to Use This Workflow

✅ **Use for:**
- New features (multi-file changes)
- Complex refactoring
- Architecture changes
- Integration with external services
- Multi-phase implementations
- Critical business logic

❌ **Skip for:**
- Simple bug fixes (1-2 line changes)
- Documentation-only updates
- Trivial style tweaks
- Emergency hotfixes (but add tests afterward)

## Example: AI Export Feature (2025-10-28)

This workflow with TDD was successfully applied during the implementation:

1. ✅ Used Plan mode to create detailed plan
2. ✅ Created `IMPLEMENTATION_AI_EXPORT.md` with comprehensive checklist
3. ✅ Saved this workflow to Serena memory
4. ✅ Installed and configured Vitest
5. ✅ Wrote comprehensive tests (28 tests covering all scenarios)
6. ✅ All tests passing
7. ✅ Lint and typecheck passing
8. ✅ Build successful with export files generated

**Test Results**:
```
✓ tests/utils/exportResumeMarkdown.test.ts (28 tests) 4ms
  Test Files  1 passed (1)
  Tests  28 passed (28)
```

## Integration with Claude Code Features

- **Plan Mode**: Use for initial planning of complex features
- **Subagent Resume**: Implementation docs help resume across sessions
- **Dynamic Model Selection**: Claude chooses appropriate model for each task
- **TodoWrite**: Tracks progress through implementation checklist
- **Serena Memories**: Stores architectural decisions and patterns
- **TDD**: Ensures quality and prevents regressions

---

**Maintained by**: Claude Code
**Last Updated**: 2025-10-28 (Added TDD practices)
**Version**: 2.0 (TDD Integration)
