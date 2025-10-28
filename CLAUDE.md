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
npm run test           # Run unit tests (Vitest)
npm run test:ui        # Run unit tests with UI
npm run test:run       # Run unit tests once
npm run test:e2e       # Run E2E tests (Playwright)
npm run test:e2e:ui    # Run E2E tests with UI
npm run test:all       # Run all tests (unit + E2E)
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

## Living Documentation Approach

This project uses **Test-Driven Specification** - tests serve as executable documentation that never goes out of sync with code.

### Why Living Documentation?

Traditional documentation problems:
- `.md` files become outdated quickly
- No verification that docs match implementation
- Design intent gets lost over time
- Difficult to maintain across refactorings

Living Documentation solves this by:
- Embedding specs directly in test code
- Running specs on every CI build
- Keeping intent close to implementation
- Making tests self-documenting

### Where to Find Specifications

**Feature-Level Specs** (E2E Tests):
- `tests/e2e/*.spec.ts` - User-facing behavior and acceptance criteria
- Contains: Purpose, design philosophy, architecture, acceptance criteria
- Example: `tests/e2e/resume-export.spec.ts` for AI resume export feature

**Implementation Specs** (Unit Tests):
- `tests/utils/*.test.ts` - Implementation details and design decisions
- Contains: Input/output specs, edge cases, design rationale
- Example: `tests/utils/parseExperienceDescription.test.ts` for parser logic

### Test File Structure

```typescript
/**
 * ============================================================================
 * Feature Name - Specification
 * ============================================================================
 *
 * ## Purpose (Why)
 * Why this feature exists and what problem it solves
 *
 * ## Design Decisions (How)
 * Key architectural choices and their rationale
 *
 * ## Implementation Status
 * What's done, what's in progress, what's planned
 *
 * ============================================================================
 * EXECUTABLE SPECIFICATION TESTS BELOW
 * ============================================================================
 */

describe("Feature Name", () => {
  // Tests that serve as runnable specifications
});
```

### Writing Living Documentation

When adding features:
1. **Start with E2E tests** - Define user-facing behavior
2. **Add unit tests** - Specify implementation details
3. **Document design decisions** - Explain "why" in test comments
4. **Mark future work as `.skip()`** - Planned features as skipped tests

When reading code:
1. **Check E2E tests first** - Understand user perspective
2. **Read unit tests** - Understand implementation
3. **Code comments explain "how"** - Tests explain "why"

### Example: AI Resume Export

Documentation location:
- Overview: `IMPLEMENTATION_AI_EXPORT.md` (points to test files)
- E2E Spec: `tests/e2e/resume-export.spec.ts` (feature behavior)
- Unit Specs: `tests/utils/*.test.ts` (implementation details)

This approach ensures code and documentation evolve together.

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

## Claude Code Advanced Features

Claude Code provides advanced capabilities for complex task management and efficient execution.

### Plan Mode (Plan Subagent)

**Purpose**: Creates a structured plan before executing complex tasks, allowing for review and approval.

**When to use**:
- Complex multi-step implementations requiring architectural decisions
- Tasks with multiple possible approaches that need discussion
- Features that impact multiple parts of the codebase
- When you want to review the implementation strategy before execution

**How it works**:
1. Claude analyzes the task and creates a detailed plan
2. The plan is presented to you for review
3. You can approve, modify, or reject the plan
4. Claude executes the approved plan step-by-step

**Example workflow**:
```
User: "Add a new PDF export feature with customization options"

Claude: [Uses Plan subagent]
- Analyzes requirements
- Creates implementation plan with steps
- Shows plan for approval

User: [Reviews and approves]

Claude: [Executes plan systematically]
```

**Best practices**:
- Use Plan mode for tasks with ambiguity or multiple valid approaches
- Review plans carefully - they're designed to catch issues early
- Provide feedback on plans to refine the approach before implementation
- Plan mode is automatic for appropriate tasks, but you can request it explicitly

### Subagent Resume

**Purpose**: Allows Claude to resume previous subagent sessions, maintaining context and continuity.

**When to use**:
- Continuing work from a previous session
- Building upon earlier explorations or analyses
- Iterating on complex tasks across multiple interactions

**Benefits**:
- Preserves context from previous work
- Avoids redundant exploration or analysis
- Enables iterative development workflows
- Maintains consistency across sessions

**Example**:
```
Session 1: Claude explores authentication patterns in codebase
Session 2: Claude resumes the exploration subagent and implements auth feature
```

### Dynamic Model Selection

**Purpose**: Claude automatically selects the appropriate AI model for each subagent task.

**Available models**:
- **Sonnet**: Default model, balanced performance (current: Sonnet 4.5)
- **Opus**: Most capable model for complex reasoning and tasks
- **Haiku**: Fast, efficient model for straightforward tasks

**Automatic selection criteria**:
- **Haiku**: Simple tasks like file searches, basic linting, quick code formatting
- **Sonnet**: Standard development tasks, code reviews, moderate complexity
- **Opus**: Complex architectural decisions, intricate refactoring, advanced debugging

**Benefits**:
- Cost optimization: Uses lighter models when appropriate
- Performance: Faster execution for simple tasks with Haiku
- Quality: Uses more powerful models when needed for complex reasoning

**Manual override**:
You can request a specific model if needed:
```
"Use Opus for this architectural analysis"
"Use Haiku to quickly search for all config files"
```

### Combining Advanced Features

These features work together seamlessly:

```
Example: Large refactoring task
1. Plan mode creates strategy → Uses Sonnet for planning
2. Simple file operations → Subagents use Haiku for speed
3. Complex logic changes → Subagents use Opus for quality
4. Resume capability → Continue work across sessions
```

**Best practices for advanced features**:
1. **Trust the automation**: Claude selects appropriate modes and models automatically
2. **Provide context**: Clear task descriptions help Plan mode create better plans
3. **Review plans**: Always review generated plans for complex tasks
4. **Iterate**: Use resume capability to refine solutions across sessions
5. **Be explicit**: Request specific models or Plan mode when you have preferences

## AI-Friendly Resume Export

The Resume page includes AI-friendly export functionality, allowing users to easily share their career information with AI assistants and enabling programmatic access to resume data.

### Features

**Copy Button**:
- One-click copy of resume in Markdown format optimized for AI consumption
- Located in Resume page header
- Uses modern Clipboard API with fallback support
- Visual feedback with success state

**URL-based Exports**:
- `/resume.md` - AI-friendly Markdown with YAML frontmatter metadata
- `/resume.txt` - Terminal-friendly plain text (80-char width)
- `/resume.json` - Structured JSON with calculated fields

### Usage Examples

**For AI Assistants**:
```bash
# Users can click "Copy for AI" button and paste directly to Claude/ChatGPT
# Or AI agents can fetch programmatically:
curl https://tktcorporation.com/resume.md
```

**For Developers**:
```typescript
// Markdown generation is available as a utility
import { generateResumeMarkdown } from '@/utils/exportResumeMarkdown';
const markdown = generateResumeMarkdown(experiences, skills);
```

### Technical Implementation

**Build-time Generation**:
- Vite plugin (`generate-resume-exports`) runs during build
- Generates static files in `dist/` directory
- Uses the same data source as the Resume page (`src/data/experiences.json`)

**Key Files**:
```
src/
  utils/
    exportResumeMarkdown.ts    # Markdown generator (core logic)
    exportResumeText.ts         # Plain text converter
    exportResumeJson.ts         # JSON formatter
    calculateSkills.ts          # Skills duration calculation
  components/
    CopyResumeButton.tsx        # Copy button UI component
  types/
    resume-export.ts            # TypeScript type definitions
```

**Testing**:
- Full test coverage with Vitest (28 tests)
- Tests located in `tests/utils/exportResumeMarkdown.test.ts`
- Run tests: `npm run test`

### Markdown Format Structure

The exported Markdown includes:
1. **AI Context Metadata** (YAML frontmatter) - Document type, version, source, statistics
2. **Summary** - Total experience, current position, specialization, key technologies
3. **Skills & Technologies** - With years/months of experience per skill
4. **Professional Experience** - Detailed work history in reverse chronological order
5. **Career Timeline** - Condensed timeline view
6. **Footer** - Attribution and links

### Maintenance

**Updating Export Logic**:
1. Modify utilities in `src/utils/exportResume*.ts`
2. Update tests in `tests/utils/exportResumeMarkdown.test.ts`
3. Run verification: `npm run test && npm run build`
4. Verify generated files in `dist/resume.*`

**Data Source**:
- Resume data comes from `src/data/experiences.json`
- Updated via LAPRAS integration (see MCP Integration section)
- Skills are calculated from experience descriptions

**Deployment**:
- Static export files are automatically generated during build
- Deployed to Firebase hosting with the rest of the site
- No server-side logic required

## Development Notes

- Node.js version requirement: >= 24.0.0
- The project uses React Router for navigation between pages
- Firebase is configured but implementation details are in `src/firebase.ts`
- Screenshot generation uses Playwright for automated PR previews
- **Testing Framework**: Vitest with happy-dom environment for unit tests