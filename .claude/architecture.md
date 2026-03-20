# Architecture

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Unified Toolchain**: Vite+ (vite-plus) - dev server, build, lint, format, test
- **Styling**: Tailwind CSS with `@tailwindcss/vite` plugin
- **Linting**: Oxlint (via vite-plus)
- **Formatting**: Oxfmt (via vite-plus)
- **Testing**: Vitest (via vite-plus)
- **Type Checking**: TypeScript with strict mode
- **Hosting**: GitHub Pages

## Project Structure

- `/src` - React application source code
  - `/pages` - Page components (Home.tsx, Resume.tsx)
  - `/data` - JSON data files (experiences.json for resume)
  - `/types` - TypeScript type definitions
  - `/styles` - CSS modules and global styles
- `/public` - Static assets
- `/scripts` - Build and test utilities
- `/dist` - Production build output

## Key Configuration Files

- `vite.config.ts` - Unified Vite+ configuration (build, lint, format, test)
- `tsconfig.json` - TypeScript configuration (ES2020, strict mode)
- `tailwind.config.js` - Tailwind CSS configuration

## Vite+ (vite-plus) Configuration

All tool configuration is unified in `vite.config.ts`:

- **Build**: Vite + Rolldown bundler
- **Lint** (`lint` block): Oxlint rules and ignore patterns
- **Format** (`fmt` block): Oxfmt options (printWidth, semi, quotes, etc.)
- **Test** (`test` block): Vitest environment, globals, coverage

### Formatting Rules (Oxfmt)

- **Print width**: 80 characters
- **Quotes**: Double quotes for strings and JSX attributes
- **Semicolons**: Always required
- **Trailing commas**: ES5 style
- **Arrow functions**: Always use parentheses
- **Import sorting**: Enabled
- **Tailwind class sorting**: Enabled

## TypeScript

- Strict mode enabled
- Target ES2020
- React JSX transform
- No emit (type checking only)
