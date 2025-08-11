# Task Completion Checklist

## MANDATORY: Run These Commands Before Considering Any Task Complete

### 1. Linting Check
```bash
npm run lint
```
This runs:
- Biome linter for code style violations
- TypeScript compiler for type checking
- GitHub Actions linter

### 2. Type Checking (if lint doesn't include it)
```bash
npm run typecheck
```
Ensures all TypeScript types are correct with strict mode.

### 3. Run Tests (if applicable)
```bash
npm run test
```
Runs display tests to ensure UI renders correctly.

## Fix Issues if Checks Fail

### Auto-fix Linting Issues
```bash
npm run lint:fix   # Automatically fix Biome issues
npm run format     # Format code with Biome
```

### Manual Fixes Required For:
- TypeScript type errors
- Complex linting issues that can't be auto-fixed
- Test failures

## Important Notes
- **NEVER** consider a task complete if any of these checks fail
- These checks prevent CI/CD pipeline failures
- Git hooks will also run these on pre-push
- If you can't find the correct command, ask the user and suggest adding it to CLAUDE.md

## Purpose Documentation Reminder
- Verify all modified TypeScript/TSX files have Purpose comments
- Update Purpose comments if file intent changes significantly
- Never remove Purpose comments when making changes