# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with React, TypeScript, and Vite. It includes a main homepage and a resume page with LAPRAS integration for displaying work experiences.

**Key Technologies**: React 19, TypeScript, Vite, Tailwind CSS, Biome

**Node.js Requirement**: >= 24.0.0

## IMPORTANT: Required Checks Before Completing Tasks

**ALWAYS run the following commands after making code changes:**

```bash
npm run lint      # Check code formatting and linting
npm run typecheck # Check TypeScript types
npm run test      # Run tests (if applicable)
```

If any of these checks fail, you MUST fix the issues before considering the task complete. This ensures code quality and prevents CI/CD failures.

**Tip**: Use the `/precheck` command to run all required checks at once.

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

**Best practices**:
- Use Plan mode for tasks with ambiguity or multiple valid approaches
- Review plans carefully - they're designed to catch issues early
- Provide feedback on plans to refine the approach before implementation
- Plan mode is automatic for appropriate tasks, but you can request it explicitly

### Subagent Resume

**Purpose**: Allows Claude to resume previous subagent sessions, maintaining context and continuity.

**Benefits**:
- Preserves context from previous work
- Avoids redundant exploration or analysis
- Enables iterative development workflows
- Maintains consistency across sessions

### Dynamic Model Selection

**Purpose**: Claude automatically selects the appropriate AI model for each subagent task.

**Available models**:
- **Sonnet**: Default model, balanced performance (current: Sonnet 4.5)
- **Opus**: Most capable model for complex reasoning and tasks
- **Haiku**: Fast, efficient model for straightforward tasks

**Manual override**:
```
"Use Opus for this architectural analysis"
"Use Haiku to quickly search for all config files"
```

**Best practices**:
1. **Trust the automation**: Claude selects appropriate modes and models automatically
2. **Provide context**: Clear task descriptions help Plan mode create better plans
3. **Review plans**: Always review generated plans for complex tasks
4. **Iterate**: Use resume capability to refine solutions across sessions
5. **Be explicit**: Request specific models or Plan mode when you have preferences

## Additional Documentation

For detailed information, refer to these documents:

- **Architecture** - @.claude/architecture.md - Tech stack, project structure, configuration files
- **Development Workflows** - @.claude/development.md - Development commands, CI/CD
- **Living Documentation** - @.claude/living-documentation.md - Test-driven specification approach
- **MCP Integration** - @.claude/mcp-integration.md - LAPRAS, Serena, Context7 integration guides
- **Resume Export Feature** - @.claude/features/resume-export.md - AI-friendly resume export implementation

## Useful Slash Commands

- `/precheck` - Run all required checks (lint, typecheck, test) before completing tasks
- `/build-check` - Build the project and run all checks
- `/test-all` - Run all tests (unit + E2E)

Run `/help` to see all available commands.
