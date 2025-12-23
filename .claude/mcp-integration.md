# MCP (Model Context Protocol) Integration

The project uses MCP servers for enhanced functionality. Configuration is in `.mcp.json`.

## Available MCP Servers

### 1. Chrome DevTools (`mcp__chrome-devtools__*`)
**Purpose**: Browser automation and debugging via Chrome DevTools Protocol

**When to use**:
- Taking screenshots of pages
- Navigating and interacting with web pages
- Debugging frontend issues
- E2E testing and visual verification
- Performance analysis

**Key functions**:
- `mcp__chrome-devtools__take_screenshot` - Capture page screenshots
- `mcp__chrome-devtools__take_snapshot` - Get page accessibility tree snapshot
- `mcp__chrome-devtools__navigate_page` - Navigate to URLs
- `mcp__chrome-devtools__click` - Click on elements
- `mcp__chrome-devtools__fill` - Fill form inputs
- `mcp__chrome-devtools__evaluate_script` - Execute JavaScript in page context
- `mcp__chrome-devtools__list_console_messages` - Get console output
- `mcp__chrome-devtools__list_network_requests` - Monitor network activity

**Setup**: Requires Chrome/Chromium installation. Setup script at `.devcontainer/setup-chrome-devtools-mcp.sh`.

### 2. Context7 (`mcp__context7__*`)
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

### 3. IDE (`mcp__ide__*`)
**Purpose**: IDE integration tools from Anthropic for enhanced development workflows

**When to use**:
- Enhanced code editing and refactoring
- IDE-specific operations and integrations
- Advanced development tooling

**Note**: This is an official Anthropic MCP server for IDE integration.

## MCP Usage Guidelines

1. **Choose the right tool for the task**:
   - File operations → Native tools (Read, Write, Edit)
   - Browser automation → Chrome DevTools
   - Library docs → Context7
   - IDE operations → IDE MCP
   - **Project documentation → `.claude/` directory**

2. **Efficiency considerations**:
   - Chrome DevTools for visual verification and browser testing
   - Context7 saves time vs. web searches for library documentation
   - Use snapshots over screenshots when possible (faster, more accessible)

3. **Browser automation tips**:
   - Prefer `take_snapshot` for understanding page structure
   - Use `take_screenshot` for visual verification
   - Chain navigation and interaction commands efficiently
