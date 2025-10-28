# MCP (Model Context Protocol) Integration

The project uses MCP servers for enhanced functionality. Configuration is in `.mcp.json`.

## Available MCP Servers

### 1. LAPRAS (`mcp__lapras__*`)
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

### 2. Serena (`mcp__serena__*`)
**Purpose**: Advanced code analysis and semantic code operations

**When to use**:
- Analyzing code structure and symbols (classes, functions, methods)
- Finding symbol references and dependencies
- Making precise, symbol-aware code edits
- Searching for patterns in codebase
- ~~Storing and retrieving project memories/documentation~~ (Use `.claude/` directory instead)

**Key functions**:
- `mcp__serena__get_symbols_overview` - Understand file structure without reading entire file
- `mcp__serena__find_symbol` - Find specific symbols by name path
- `mcp__serena__find_referencing_symbols` - Find all references to a symbol
- `mcp__serena__replace_symbol_body` - Replace entire symbol definitions
- `mcp__serena__insert_before_symbol` / `insert_after_symbol` - Insert code precisely
- `mcp__serena__replace_regex` - Pattern-based replacements with wildcards
- `mcp__serena__search_for_pattern` - Flexible pattern search across codebase
- `mcp__serena__list_dir` / `find_file` - Navigate project structure

**Best practices**:
- Use symbol tools instead of reading entire files when possible
- Prefer `get_symbols_overview` before deep file analysis
- Use regex with wildcards for efficient large replacements
- **For project documentation, use `.claude/` directory instead of Serena memories**

### 3. Context7 (`mcp__context7__*`)
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

## MCP Usage Guidelines

1. **Choose the right tool for the task**:
   - File operations → Native tools (Read, Write, Edit)
   - Code analysis → Serena (symbols, patterns)
   - Library docs → Context7
   - Career data → LAPRAS
   - **Project documentation → `.claude/` directory (not Serena memories)**

2. **Efficiency considerations**:
   - Serena's symbol tools are more efficient than reading entire files
   - Context7 can save time vs. web searches for library documentation
   - LAPRAS operations directly update the live profile

3. **Integration flow**:
   - LAPRAS data flows: LAPRAS platform ↔ MCP ↔ Local JSON ↔ Website
   - Context7 provides real-time documentation without local storage
