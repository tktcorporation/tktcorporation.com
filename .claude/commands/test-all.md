---
description: Run all tests (unit + E2E) with coverage
allowed-tools: Bash(npm run test:*)
model: haiku
---

Run comprehensive test suite:

1. **Unit Tests**: !`npm run test:run`
2. **E2E Tests**: !`npm run test:e2e`

After running tests:
- Report test results summary (passed/failed/skipped counts)
- Show coverage statistics if available
- If any tests fail, report which ones and why
- Suggest fixes for failed tests if errors are clear

This command runs the complete test suite to verify functionality.
