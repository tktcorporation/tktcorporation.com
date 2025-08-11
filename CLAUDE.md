# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT: Required Checks Before Completing Tasks

**ALWAYS run the following commands after making code changes:**

```bash
npm run lint      # Check code formatting and linting
npm run typecheck # Check TypeScript types
npm run test      # Run tests (if applicable)
```

If any of these checks fail, you MUST fix the issues before considering the task complete. This ensures code quality and prevents CI/CD failures.

## Project Overview

This is a personal website built with React, TypeScript, and Vite. It includes a main homepage and a resume page with LAPRAS integration for displaying work experiences.

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
npm run test           # Run display tests
npm run screenshot     # Generate screenshot for PR
```

## Architecture

### Tech Stack
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with PostCSS
- **Code Quality**: Biome (linting and formatting)
- **Type Checking**: TypeScript with strict mode
- **Hosting**: Firebase (configuration in src/firebase.ts)

### Project Structure
- `/src` - React application source code
  - `/pages` - Page components (Home.tsx, Resume.tsx)
  - `/data` - JSON data files (experiences.json for resume)
  - `/types` - TypeScript type definitions
  - `/styles` - CSS modules and global styles
- `/public` - Static assets
- `/scripts` - Build and test utilities
- `/dist` - Production build output

### Key Configuration Files
- `vite.config.js` - Vite configuration with React plugin
- `biome.json` - Code formatting and linting rules
- `tsconfig.json` - TypeScript configuration (ES2020, strict mode)
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration for Tailwind

## Code Standards

### Purpose Documentation (IMPORTANT)
**Every TypeScript/TSX file MUST have a Purpose comment at the top of the file.**

Purpose comments document:
- Why this file/module exists
- What it aims to achieve
- Core functionality and intent
- Any important design decisions

Format:
```typescript
/**
 * Purpose:
 * [Describe why this file exists, what it does, and its core intent]
 * 
 * Context:
 * [Optional: Additional context about design decisions or implementation approach]
 */
```

**Why this matters:**
- Prevents AI agents from losing or misinterpreting original intent
- Maintains design consistency across code changes
- Helps future developers (human or AI) understand the "why" behind the code
- Reduces accidental removal or modification of important functionality

**Maintenance:**
- Purpose comments should be updated when the file's intent changes significantly
- When using AI agents for coding, always verify that the Purpose is preserved and accurate
- If an AI agent suggests changes that conflict with the Purpose, the Purpose takes precedence

### Biome Configuration
- **Indentation**: 2 spaces
- **Line width**: 80 characters
- **Quotes**: Double quotes for strings and JSX attributes
- **Semicolons**: Always required
- **Trailing commas**: ES5 style
- **Arrow functions**: Always use parentheses

### TypeScript
- Strict mode enabled
- Target ES2020
- React JSX transform
- No emit (type checking only)

## CI/CD

GitHub Actions workflow runs on push to master and pull requests:
1. Uses Docker Compose for consistent environment
2. Installs dependencies
3. Runs linting checks
4. Builds the project

## LAPRAS Integration

The project includes MCP (Model Context Protocol) integration with LAPRAS for managing work experiences and job search functionality. Configuration is in `.mcp.json`.

## Development Notes

- Node.js version requirement: >= 24.0.0
- The project uses React Router for navigation between pages
- Firebase is configured but implementation details are in `src/firebase.ts`
- Screenshot generation uses Playwright for automated PR previews