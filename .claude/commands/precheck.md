---
description: Run all required checks (lint, typecheck, test) before completing tasks
allowed-tools: Bash(npm run lint:*), Bash(npm run typecheck:*), Bash(npm run test:*)
model: haiku
---

Run the following required checks in sequence:

1. **Linting**: !`npm run lint`
2. **Type Checking**: !`npm run typecheck`
3. **Unit Tests**: !`npm run test`

After running all checks:
- If all checks pass, confirm that the code is ready for commit
- If any check fails, report which checks failed and what needs to be fixed
- Do NOT proceed until all issues are resolved

This command ensures code quality and prevents CI/CD failures.
