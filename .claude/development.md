# Development Workflows

## Common Development Commands

### Running the Development Server

```bash
npm run dev      # Start Vite+ dev server (vp dev)
```

### Building the Project

```bash
npm run build    # Build for production to dist/ (vp build)
```

### Quality Checks

```bash
npm run check          # Run all checks: lint + format + typecheck (vp check)
npm run lint           # Run linting only (Oxlint + GitHub Actions)
npm run lint:fix       # Auto-fix linting issues with Oxlint
npm run lint:actions   # Run GitHub Actions linter
npm run format         # Format code with Oxfmt (vp fmt --write)
npm run typecheck      # Run TypeScript type checking
```

### Testing and Screenshots

```bash
npm run test           # Run unit tests (Vitest via vp test)
npm run test:ui        # Run unit tests with UI
npm run test:run       # Run unit tests once
npm run test:e2e       # Run E2E tests (Playwright)
npm run test:e2e:ui    # Run E2E tests with UI
npm run test:all       # Run all tests (unit + E2E)
npm run screenshot     # Generate screenshot for PR
```

## Vite+ CLI (`vp`)

All development tools are unified under the `vp` command:

```bash
npx vp dev       # Development server
npx vp build     # Production build
npx vp preview   # Preview production build
npx vp check     # Run lint + format check + typecheck
npx vp lint      # Oxlint linting
npx vp fmt       # Oxfmt format check
npx vp test      # Vitest test runner
```

## CI/CD

GitHub Actions workflow runs on push to master and pull requests:

1. Uses Docker Compose for consistent environment
2. Installs dependencies
3. Runs `npm run check` (lint + format + typecheck via vp)
4. Builds the project
