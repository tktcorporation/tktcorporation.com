# Code Style and Conventions

## Purpose Documentation (CRITICAL)
**Every TypeScript/TSX file MUST have a Purpose comment at the top:**

```typescript
/**
 * Purpose:
 * [Describe why this file exists, what it does, and its core intent]
 * 
 * Context:
 * [Optional: Additional context about design decisions or implementation approach]
 */
```

This is crucial to:
- Prevent AI agents from losing original intent
- Maintain design consistency
- Help future developers understand the "why"
- Reduce accidental removal of important functionality

## Biome Formatting Rules
- **Indentation**: 2 spaces
- **Line Width**: 80 characters maximum
- **Quotes**: Double quotes for strings and JSX attributes
- **Semicolons**: Always required
- **Trailing Commas**: ES5 style
- **Arrow Functions**: Always use parentheses `(param) => {}`
- **Bracket Spacing**: true
- **Line Ending**: LF (Unix style)

## TypeScript Configuration
- **Strict Mode**: Enabled (all strict checks)
- **Target**: ES2020
- **Module**: ESNext
- **JSX**: react-jsx transform
- **No Emit**: true (type checking only)
- **Module Resolution**: node
- **Force Consistent Casing**: true

## Linting Rules (Biome)
### Errors
- `noBannedTypes`: No usage of banned types
- `noUselessConstructor`: No empty constructors
- `useArrowFunction`: Prefer arrow functions
- `noUnusedVariables`: No unused variables
- `useConst`: Use const for never reassigned variables
- `useTemplate`: Use template literals
- `noVar`: Use let/const instead of var

### Warnings
- `useExhaustiveDependencies`: React hook dependencies
- `noExplicitAny`: Avoid explicit any type

### Disabled
- `noDuplicateFontNames`: Allowed
- `noArrayIndexKey`: Allowed in React

## Project Structure Conventions
```
src/
├── pages/       # Page components (Home.tsx, Resume.tsx)
├── components/  # Reusable components
├── data/        # JSON data files
├── types/       # TypeScript type definitions
├── styles/      # CSS modules and global styles
├── hooks/       # Custom React hooks
└── assets/      # Static assets
```

## Import Organization
- Biome automatically organizes imports on format
- Follow existing patterns in neighboring files

## Component Naming
- Use PascalCase for components
- Use descriptive names that reflect purpose
- Follow existing naming patterns in the codebase