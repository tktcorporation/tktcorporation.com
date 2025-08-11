# Integrations and APIs

## LAPRAS Integration
- **Purpose**: Automatically sync work experience and professional data
- **Configuration**: `.mcp.json` file contains MCP settings
- **Data Flow**: LAPRAS API → MCP → experiences.json → Resume page
- **Update Command**: `npm run update:lapras`
- **Profile URL**: https://lapras.com/public/tktcorporation

### MCP (Model Context Protocol)
- Used for integrating with LAPRAS API
- Enables Claude AI to interact with external services
- Configuration in `.mcp.json`

## Firebase Hosting
- **Configuration**: `src/firebase.ts`
- **Purpose**: Production hosting for the website
- **Deployment**: Automatic via GitHub Actions on push to master
- **Domain**: https://tktcorporation.com

## GitHub Actions CI/CD
- **Workflow**: Runs on push to master and pull requests
- **Steps**:
  1. Uses Docker Compose for environment consistency
  2. Installs dependencies
  3. Runs linting checks
  4. Builds the project
  5. Deploys to Firebase (on master branch)

## Development Tools Integration

### Playwright
- **Purpose**: Automated screenshot generation for PRs
- **Command**: `npm run screenshot`
- **Configuration**: `playwright.config.js`

### Docker Compose
- **Purpose**: Consistent development and CI environment
- **Configuration**: `docker-compose.yml`
- Used primarily in GitHub Actions

### Simple Git Hooks
- **Pre-push Hook**: Runs `npm run lint && npm run typecheck`
- Ensures code quality before pushing to remote

## External Links
- **Website**: https://tktcorporation.com
- **GitHub**: @tktcorporation
- **LAPRAS Profile**: https://lapras.com/public/tktcorporation
- **Social Links**: Displayed on homepage