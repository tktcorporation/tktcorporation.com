# Development Workflows

## Common Development Commands

### Running the Development Server
```bash
npm run dev      # Start Vite dev server on http://localhost:3000
```

### Building the Project
```bash
npm run build    # Build for production to dist/
```

### Linting and Type Checking
```bash
npm run lint           # Run all linting checks (Biome + TypeScript + GitHub Actions)
npm run lint:biome     # Run Biome linter only
npm run lint:actions   # Run GitHub Actions linter
npm run typecheck      # Run TypeScript type checking
npm run lint:fix       # Auto-fix linting issues with Biome
npm run format         # Format code with Biome
```

### Testing and Screenshots
```bash
npm run test           # Run unit tests (Vitest)
npm run test:ui        # Run unit tests with UI
npm run test:run       # Run unit tests once
npm run test:e2e       # Run E2E tests (Playwright)
npm run test:e2e:ui    # Run E2E tests with UI
npm run test:all       # Run all tests (unit + E2E)
npm run screenshot     # Generate screenshot for PR
```

## CI/CD

GitHub Actions workflow runs on push to master and pull requests:
1. Uses Docker Compose for consistent environment
2. Installs dependencies
3. Runs linting checks
4. Builds the project
