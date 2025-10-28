# Architecture

## Tech Stack
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with PostCSS
- **Code Quality**: Biome (linting and formatting)
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
- `vite.config.js` - Vite configuration with React plugin
- `biome.json` - Code formatting and linting rules
- `tsconfig.json` - TypeScript configuration (ES2020, strict mode)
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration for Tailwind

## Biome Configuration
- **Indentation**: 2 spaces
- **Line width**: 80 characters
- **Quotes**: Double quotes for strings and JSX attributes
- **Semicolons**: Always required
- **Trailing commas**: ES5 style
- **Arrow functions**: Always use parentheses

## TypeScript
- Strict mode enabled
- Target ES2020
- React JSX transform
- No emit (type checking only)
