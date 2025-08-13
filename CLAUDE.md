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

## MCP (Model Context Protocol) Integration

The project uses MCP servers for enhanced functionality. Configuration is in `.mcp.json`.

### Available MCP Servers

#### 1. LAPRAS (`mcp__lapras__*`)
**Purpose**: Integration with LAPRAS career platform for managing professional data

**When to use**:
- Searching for job opportunities with specific criteria
- Managing work experiences and career information
- Updating professional summary and career aspirations
- Fetching LAPRAS profile data

**Key functions**:
- `mcp__lapras__search_jobs` - Search jobs by criteria (salary, tech stack, position)
- `mcp__lapras__get_job_detail` - Get detailed information about a specific job
- `mcp__lapras__get_experiences` - Retrieve work experiences from LAPRAS
- `mcp__lapras__create_experience` - Add new work experience
- `mcp__lapras__update_experience` - Update existing work experience
- `mcp__lapras__delete_experience` - Remove work experience
- `mcp__lapras__get_job_summary` - Get career summary (職務要約)
- `mcp__lapras__update_job_summary` - Update career summary
- `mcp__lapras__get_want_to_do` - Get career aspirations
- `mcp__lapras__update_want_to_do` - Update career aspirations

**Note**: Requires `LAPRAS_API_KEY` environment variable. Data synced to https://lapras.com/cv

#### 2. Serena (`mcp__serena__*`)
**Purpose**: Advanced code analysis and semantic code operations

**When to use**:
- Analyzing code structure and symbols (classes, functions, methods)
- Finding symbol references and dependencies
- Making precise, symbol-aware code edits
- Searching for patterns in codebase
- Storing and retrieving project memories/documentation

**Key functions**:
- `mcp__serena__get_symbols_overview` - Understand file structure without reading entire file
- `mcp__serena__find_symbol` - Find specific symbols by name path
- `mcp__serena__find_referencing_symbols` - Find all references to a symbol
- `mcp__serena__replace_symbol_body` - Replace entire symbol definitions
- `mcp__serena__insert_before_symbol` / `insert_after_symbol` - Insert code precisely
- `mcp__serena__replace_regex` - Pattern-based replacements with wildcards
- `mcp__serena__search_for_pattern` - Flexible pattern search across codebase
- `mcp__serena__write_memory` / `read_memory` - Store/retrieve project knowledge
- `mcp__serena__list_dir` / `find_file` - Navigate project structure

**Best practices**:
- Use symbol tools instead of reading entire files when possible
- Prefer `get_symbols_overview` before deep file analysis
- Use regex with wildcards for efficient large replacements
- Store important project insights as memories for future reference

#### 3. Context7 (`mcp__context7__*`)
**Purpose**: Retrieve up-to-date documentation for libraries and frameworks

**When to use**:
- Looking up current API documentation for any library
- Getting code examples for specific library features
- Resolving library versions and compatibility
- Understanding library usage patterns

**Key functions**:
- `mcp__context7__resolve-library-id` - Convert library name to Context7 ID
- `mcp__context7__get-library-docs` - Fetch comprehensive library documentation

**Best practices**:
- Always call `resolve-library-id` first unless user provides exact library ID
- Specify `topic` parameter to focus documentation retrieval
- Use appropriate `tokens` limit based on needed detail (default: 10000)

### MCP Usage Guidelines

1. **Choose the right tool for the task**:
   - File operations → Native tools (Read, Write, Edit)
   - Code analysis → Serena (symbols, patterns)
   - Library docs → Context7
   - Career data → LAPRAS

2. **Efficiency considerations**:
   - Serena's symbol tools are more efficient than reading entire files
   - Context7 can save time vs. web searches for library documentation
   - LAPRAS operations directly update the live profile

3. **Integration flow**:
   - LAPRAS data flows: LAPRAS platform ↔ MCP ↔ Local JSON ↔ Website
   - Serena memories persist across sessions in `.serena/memories/`
   - Context7 provides real-time documentation without local storage

## Development Notes

- Node.js version requirement: >= 24.0.0
- The project uses React Router for navigation between pages
- Firebase is configured but implementation details are in `src/firebase.ts`
- Screenshot generation uses Playwright for automated PR previews