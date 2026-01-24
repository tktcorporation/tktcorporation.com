# UI/UX Design Guidelines

This document provides rules and constraints for AI agents implementing UI/UX changes. Following these guidelines ensures visual consistency and prevents common AI design pitfalls.

## Core Philosophy

### 1. Constraint-Driven Design

**Rule**: Use ONLY values defined in `design-system.md`. Never invent new colors, spacing, or animation values.

**Why**: AI tends to generate visually "interesting" but inconsistent designs. Constraints ensure cohesion.

### 2. Subtraction Over Addition

**Rule**: Before adding any visual element, ask "Does removing this hurt the user experience?"

**Why**: AI often adds decorative elements that add visual noise without functional value.

### 3. Function Defines Form

**Rule**: Every visual treatment must serve a functional purpose (hierarchy, affordance, feedback, grouping).

**Why**: Decoration without function creates "AI-looking" interfaces.

---

## Anti-Patterns (NEVER Do These)

### 1. Gradient Overuse

**Bad**:
```tsx
// Multiple gradients competing for attention
<div className="bg-gradient-to-r from-purple-500 to-pink-500">
  <h1 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
    <span className="bg-gradient-to-r from-green-400 to-teal-400">
```

**Good**:
```tsx
// One gradient for primary emphasis only
<h1 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
  Title
</h1>
<p className="text-slate-300">Description in solid color</p>
```

**Rule**: Maximum ONE gradient per visual section. Use solid colors for everything else.

### 2. Excessive Animation

**Bad**:
```tsx
<div className="animate-bounce">
  <span className="animate-pulse">
    <Icon className="animate-spin" />
  </span>
</div>
```

**Good**:
```tsx
<div className="transition-all duration-300 hover:scale-105">
  <Icon />
</div>
```

**Rule**:
- Use `transition-*` for hover/focus states
- Use `animate-*` only for page load or state changes
- Never combine multiple animations on nested elements

### 3. Empty Visual Containers

**Bad**:
```tsx
<div className="border rounded-lg p-8 shadow-lg">
  <span className="text-4xl font-bold">5</span>
</div>
```

**Good**:
```tsx
<span className="text-lg font-semibold text-slate-300">5 projects</span>
```

**Rule**: Don't wrap single values in prominent containers. Use text hierarchy instead.

### 4. Inconsistent Spacing

**Bad**:
```tsx
<div className="p-3">
  <div className="mt-7 mb-2 px-5">
    <div className="gap-3">
```

**Good**:
```tsx
<div className="p-4 md:p-6">
  <div className="space-y-4">
    <div className="gap-4">
```

**Rule**: Use only spacing values from the scale: 1, 2, 4, 6, 8, 12, 16, 24.

### 5. Decoration Without Function

**Bad**:
```tsx
// Random decorative elements
<div className="relative">
  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
  <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl" />
  <div className="absolute ...more decorations..." />
  <Content />
</div>
```

**Good**:
```tsx
<div className="bg-white/5 border border-white/10 rounded-lg">
  <Content />
</div>
```

**Rule**: Decorative background elements are FORBIDDEN unless explicitly in the original design.

### 6. Misaligned Visual Hierarchy

**Bad**:
```tsx
// Metadata styled more prominently than content
<div>
  <span className="text-2xl font-bold text-purple-400">March 2024</span>
  <h3 className="text-sm text-slate-400">Project Title</h3>
</div>
```

**Good**:
```tsx
<div>
  <h3 className="text-lg font-semibold text-slate-100">Project Title</h3>
  <span className="text-xs text-slate-400">March 2024</span>
</div>
```

**Rule**: Visual prominence must match content importance: Title > Description > Metadata.

### 7. Inconsistent Interactive States

**Bad**:
```tsx
// Different hover patterns
<Card className="hover:bg-blue-500 hover:scale-110" />
<Card className="hover:border-red-500 hover:shadow-xl" />
<Card className="hover:opacity-80" />
```

**Good**:
```tsx
// Unified hover pattern
<Card className="hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300" />
<Card className="hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300" />
```

**Rule**: All similar elements must have identical interactive states.

---

## Required Checks Before Implementation

### Pre-Implementation Checklist

Before writing any UI code, verify:

- [ ] **Scope**: What is the minimal change needed? (Don't redesign adjacent components)
- [ ] **Reference**: Which existing component is most similar? (Copy its patterns)
- [ ] **Tokens**: Are all values from `design-system.md`? (No custom colors/spacing)
- [ ] **Hierarchy**: Is the most important element most prominent?
- [ ] **Consistency**: Does this match existing similar components?

### Implementation Rules

1. **Start by reading existing code**
   - Find the most similar existing component
   - Copy its structure and styling patterns
   - Modify only what's necessary

2. **Use semantic color tokens**
   ```tsx
   // Prefer semantic tokens
   className="text-foreground bg-card border-border"

   // Over arbitrary values
   className="text-slate-100 bg-slate-900 border-slate-700"
   ```

3. **Responsive patterns follow convention**
   ```tsx
   // Always mobile-first with consistent breakpoints
   className="p-4 md:p-6 text-sm md:text-base gap-4 md:gap-6"
   ```

4. **Interactive states are uniform**
   ```tsx
   // Standard card hover
   className="hover:bg-white/10 hover:border-purple-500/50
              hover:shadow-lg hover:shadow-purple-500/20
              transition-all duration-300"
   ```

---

## Post-Implementation Checklist

After implementing UI changes, verify:

### Visual Consistency
- [ ] Colors match existing palette (no new colors introduced)
- [ ] Spacing uses standard scale values
- [ ] Typography follows size hierarchy
- [ ] Borders and radius match existing components

### Interaction Patterns
- [ ] Hover states match similar elements
- [ ] Focus states are visible (accessibility)
- [ ] Transitions are smooth (300ms default)
- [ ] No jarring animations

### Information Hierarchy
- [ ] Most important content is most prominent
- [ ] Metadata is visually subordinate
- [ ] Grouping is logical (related items together)
- [ ] Whitespace guides the eye naturally

### Simplicity Check
- [ ] Can any element be removed without hurting UX?
- [ ] Are there unnecessary borders/shadows/gradients?
- [ ] Is animation serving a purpose?
- [ ] Would a simpler approach work equally well?

---

## Decision Frameworks

### When to Use Gradient Text

**YES**:
- Page titles (one per page)
- Primary section headers (one per section)

**NO**:
- Body text
- Multiple headings in same view
- Interactive elements (buttons, links)
- Metadata or labels

### When to Use Animation

**YES**:
- Page load (staggered fade-in)
- State transitions (collapse/expand)
- Loading indicators
- Hover feedback (subtle)

**NO**:
- Constant motion (distracting)
- Multiple simultaneous animations
- Decoration without purpose
- Critical content (delay perception)

### When to Use Cards/Containers

**YES**:
- Grouping related content
- Creating scannable lists
- Interactive elements (clickable cards)
- Separating distinct sections

**NO**:
- Single values or labels
- Already-grouped content
- Purely decorative wrapping
- Nested containers (cards within cards)

### When to Use Shadows

**YES**:
- Hover states (elevation feedback)
- Modals/overlays (depth)
- Floating elements (tooltips)

**NO**:
- Static elements by default
- Multiple competing shadows
- Decorative enhancement

---

## Common Patterns Reference

### Page Layout
```tsx
<main className="min-h-screen bg-slate-950">
  <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
    {/* Content */}
  </div>
</main>
```

### Section with Title
```tsx
<section className="mb-8 md:mb-12">
  <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-4 md:mb-6">
    Section Title
  </h2>
  <div className="space-y-4">
    {/* Content */}
  </div>
</section>
```

### Interactive Card
```tsx
<div className="bg-white/5 border border-white/10 rounded-lg p-4 md:p-6
  hover:bg-white/10 hover:border-purple-500/50
  hover:shadow-lg hover:shadow-purple-500/20
  transition-all duration-300 cursor-pointer">
  <h3 className="text-base md:text-lg font-semibold text-slate-100">
    Card Title
  </h3>
  <p className="text-sm text-slate-300 mt-2">
    Description text
  </p>
  <span className="text-xs text-slate-400 mt-2 block">
    Metadata
  </span>
</div>
```

### Badge/Tag
```tsx
<span className="inline-flex items-center px-2 py-1
  text-xs font-medium rounded-md
  bg-purple-500/20 text-purple-300 border border-purple-500/30">
  Label
</span>
```

### Primary Button
```tsx
<button className="px-4 py-2 rounded-md font-medium
  bg-purple-600 hover:bg-purple-700
  text-white transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
  Action
</button>
```

---

## Accessibility Requirements

### Color Contrast
- Text on dark backgrounds: minimum `text-slate-300` (4.5:1 ratio)
- Interactive elements must be distinguishable
- Don't rely on color alone for meaning

### Focus States
- All interactive elements need visible focus
- Use `focus:ring-2 focus:ring-purple-500`
- Don't remove focus outlines

### Motion
- Respect `prefers-reduced-motion`
- Avoid auto-playing animations
- Keep transitions under 500ms

### Semantic HTML
- Use proper heading hierarchy (h1 > h2 > h3)
- Use `<button>` for actions, `<a>` for navigation
- Include ARIA labels where needed

---

## Summary: Golden Rules

1. **Copy, don't invent** - Find existing patterns and replicate them
2. **Less is more** - Remove before adding
3. **Function first** - Every visual element needs a purpose
4. **Consistency wins** - Matching existing > "better" but different
5. **Mobile first** - Design for small screens, enhance for large
6. **Check the tokens** - Use only defined values from design-system.md
7. **Test interactions** - Verify hover, focus, and transition states

---

**Related Documents**:
- [Design System Tokens](./design-system.md)
- [Architecture Overview](./architecture.md)
