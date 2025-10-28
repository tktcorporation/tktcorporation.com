# .claude Directory Structure

This directory contains modular documentation and configuration for Claude Code.

## Directory Structure

```
.claude/
├── README.md                      # This file - overview of .claude directory
├── architecture.md                # Tech stack, project structure, config files
├── development.md                 # Development commands, CI/CD workflows
├── living-documentation.md        # Test-driven specification approach
├── mcp-integration.md            # MCP servers integration guides
├── features/
│   └── resume-export.md          # AI-friendly resume export feature
└── commands/                     # Custom slash commands
    ├── precheck.md               # /precheck - Run lint, typecheck, test
    ├── build-check.md            # /build-check - Full CI/CD checks
    └── test-all.md               # /test-all - Run all tests
```

## Why This Structure?

### Benefits of Modular Documentation

1. **Context Efficiency**: Claude Code only loads relevant sections when needed
2. **Maintainability**: Easier to update specific sections without touching core CLAUDE.md
3. **Discoverability**: Clear organization makes it easier to find information
4. **Scalability**: Easy to add new feature docs or commands without bloating main file
5. **Team Collaboration**: Team members can update specific sections independently

### What Goes Where?

**CLAUDE.md** (Core - Always Loaded):
- Project overview and key technologies
- Required checks before completing tasks
- Code standards (Purpose documentation)
- Claude Code advanced features overview
- References to detailed documentation

**Modular Documentation** (Loaded on Import):
- `architecture.md` - Technical implementation details
- `development.md` - Development workflows and commands
- `living-documentation.md` - Documentation philosophy and practices
- `mcp-integration.md` - MCP server usage guides
- `features/*.md` - Feature-specific documentation

**Custom Commands** (.claude/commands/):
- Reusable workflows as slash commands
- Can specify allowed tools and model for efficiency
- Accessible via `/command-name` in Claude Code

## How Claude Code Uses This

Claude Code automatically:
1. Loads `CLAUDE.md` as base context
2. Imports referenced files via `@.claude/filename.md` syntax when needed
3. Makes custom commands available via `/command-name`
4. Indexes all content for semantic search

## Migration from Old Structure

**Before** (Single CLAUDE.md):
- 506 lines, all context loaded every conversation
- Hard to maintain and navigate
- Difficult to add feature-specific docs

**After** (Modular .claude/):
- Core CLAUDE.md: ~135 lines
- Detailed docs: Loaded only when relevant
- Easy to extend with new features
- Custom commands for common workflows

## Adding New Documentation

### For Feature Documentation

Create a new file in `.claude/features/`:

```bash
touch .claude/features/your-feature.md
```

Reference it in `CLAUDE.md`:

```markdown
- **Your Feature** - @.claude/features/your-feature.md - Feature description
```

### For Custom Commands

Create a command file:

```bash
touch .claude/commands/your-command.md
```

Add frontmatter and instructions:

```markdown
---
description: Brief description for /help
allowed-tools: Bash(npm run *:*)
model: haiku
---

Your command instructions here.
Use !`command` to execute and include output.
```

Use it via `/your-command` in Claude Code.

### For Specialized Subagents

Create a subagent file in `.claude/agents/`:

```bash
mkdir -p .claude/agents
touch .claude/agents/your-agent.md
```

Format:

```markdown
---
name: your-agent
description: When to invoke this agent
tools: Read, Write, Edit
model: sonnet
---

Your agent's system prompt and instructions here.
```

## Best Practices

1. **Keep CLAUDE.md focused**: Only essential, frequently-needed info
2. **Use clear filenames**: Make content discoverable at a glance
3. **Link related docs**: Cross-reference related documentation
4. **Update references**: When renaming files, update `@` imports in CLAUDE.md
5. **Test commands**: Verify slash commands work before committing
6. **Version control**: All `.claude/` content should be in git

## Resources

- [Claude Code Memory Docs](https://docs.claude.com/en/docs/claude-code/memory)
- [Slash Commands Guide](https://docs.claude.com/en/docs/claude-code/slash-commands)
- [Subagents Guide](https://docs.claude.com/en/docs/claude-code/sub-agents)
