# Suggested Commands for Development

## Essential Development Commands

### Starting Development
```bash
npm run dev        # Start Vite dev server on http://localhost:3000
```

### Building the Project
```bash
npm run build      # Build for production to dist/
npm run preview    # Preview the production build locally
```

### Code Quality Checks (MUST RUN BEFORE COMPLETING TASKS)
```bash
npm run lint       # Run all linting checks (Biome + TypeScript + GitHub Actions)
npm run typecheck  # Run TypeScript type checking
npm run test       # Run display tests
```

### Code Formatting and Fixing
```bash
npm run format     # Format code with Biome
npm run lint:fix   # Auto-fix linting issues with Biome
```

### Individual Linting Commands
```bash
npm run lint:biome    # Run Biome linter only
npm run lint:actions  # Run GitHub Actions linter
```

### Testing and Screenshots
```bash
npm run test          # Run display tests
npm run screenshot    # Generate screenshot for PR
```

### Data Updates
```bash
npm run update:lapras # Update LAPRAS data from API
```

## System Commands (Linux)
- `git` - Version control
- `ls` - List directory contents
- `cd` - Change directory
- `grep` - Search text patterns
- `find` - Find files and directories

## Important Notes
- Always run `npm run lint` and `npm run typecheck` after making code changes
- Git hooks will automatically run lint and typecheck on pre-push
- Development server runs on port 3000