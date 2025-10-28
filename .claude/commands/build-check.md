---
description: Build the project and run all checks (lint, typecheck, test, build)
allowed-tools: Bash(npm run lint:*), Bash(npm run typecheck:*), Bash(npm run test:*), Bash(npm run build:*)
model: haiku
---

Run the complete verification workflow:

1. **Linting**: !`npm run lint`
2. **Type Checking**: !`npm run typecheck`
3. **Unit Tests**: !`npm run test`
4. **Production Build**: !`npm run build`

After running all checks:
- Report the status of each step
- If all pass, confirm the project is production-ready
- If any step fails, report what needs to be fixed
- Show build output summary (file sizes, warnings)

This is the full CI/CD verification workflow run locally.
