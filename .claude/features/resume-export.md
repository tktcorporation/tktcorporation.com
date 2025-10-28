# AI-Friendly Resume Export

The Resume page includes AI-friendly export functionality, allowing users to easily share their career information with AI assistants and enabling programmatic access to resume data.

## Features

**Copy Button**:
- One-click copy of resume in Markdown format optimized for AI consumption
- Located in Resume page header
- Uses modern Clipboard API with fallback support
- Visual feedback with success state

**URL-based Exports**:
- `/resume.md` - AI-friendly Markdown with YAML frontmatter metadata
- `/resume.txt` - Terminal-friendly plain text (80-char width)
- `/resume.json` - Structured JSON with calculated fields

## Usage Examples

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

## Technical Implementation

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

## Markdown Format Structure

The exported Markdown includes:
1. **AI Context Metadata** (YAML frontmatter) - Document type, version, source, statistics
2. **Summary** - Total experience, current position, specialization, key technologies
3. **Skills & Technologies** - With years/months of experience per skill
4. **Professional Experience** - Detailed work history in reverse chronological order
5. **Career Timeline** - Condensed timeline view
6. **Footer** - Attribution and links

## Maintenance

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
- Deployed to GitHub Pages with the rest of the site
- No server-side logic required
