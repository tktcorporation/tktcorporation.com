# Design System - Design Tokens

This document defines the canonical design tokens for this project. **AI agents MUST use only these values** to maintain visual consistency.

## Design Philosophy

**ミニマル + イラストアクセント**: 温かみのあるライトテーマをベースに、手書き風SVGイラストで個性を表現。タイポグラフィとホワイトスペース主導のデザイン。

## Color Palette

### Semantic Colors (Use These)

| Token | CSS Variable | Usage |
|-------|--------------|-------|
| `bg-background` | `--background` | Page background (warm off-white) |
| `text-foreground` | `--foreground` | Primary text (near-black) |
| `bg-card` | `--card` | Card backgrounds (white) |
| `text-muted-foreground` | `--muted-foreground` | Secondary text |
| `border-border` | `--border` | Default borders |

### Brand Colors

| Color | Tailwind Class | Usage |
|-------|----------------|-------|
| Warm White | `bg-background` / `#fafaf8` | Page background |
| Accent Blue | `text-blue-600` / `bg-blue-500` | Links, accents, progress bars |
| Stone Dark | `text-stone-900` | Primary text |

### Text Colors (Hierarchy)

| Level | Class | Usage |
|-------|-------|-------|
| Primary | `text-stone-900` | Headings, important text |
| Secondary | `text-stone-600` | Body text |
| Muted | `text-stone-400` | Metadata, captions |
| Disabled | `text-stone-300` | Inactive elements |

### Surface Colors

| Surface | Classes | Usage |
|---------|---------|-------|
| Card | `border border-stone-200` | Content containers |
| Card Hover | `hover:border-stone-300` | Interactive cards |
| Badge | `bg-blue-50 text-blue-700 border-blue-200` | Tech badges |
| Badge Alt | `bg-stone-50 text-stone-600 border-stone-200` | Position badges |

## Typography

### Font Stack
```
Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif
```

### Size Scale (Mobile → Desktop)

| Name | Mobile | Desktop | Usage |
|------|--------|---------|-------|
| Title | `text-2xl` | `text-3xl` | Page titles |
| Section | `text-lg` | `text-xl` | Section headings |
| Card Title | `text-base` | `text-lg` | Card headings |
| Body | `text-sm` | `text-base` | Body text |
| Caption | `text-xs` | `text-sm` | Metadata, labels |
| Micro | `text-[10px]` | `text-xs` | Badges, tags |

### Font Weights

| Weight | Class | Usage |
|--------|-------|-------|
| Normal | `font-normal` | Body text |
| Medium | `font-medium` | Card titles, labels |
| Bold | `font-bold` | Page titles, headings |

## Spacing Scale

### Standard Spacing

| Size | Value | Usage |
|------|-------|-------|
| xs | `1` (0.25rem) | Tight inline spacing |
| sm | `2` (0.5rem) | Badge padding, small gaps |
| md | `4` (1rem) | Default element gaps |
| lg | `6` (1.5rem) | Section padding |
| xl | `8` (2rem) | Section margins |
| 2xl | `12` (3rem) | Page section spacing |

## Border & Radius

### Border Radius

| Size | Class | Usage |
|------|-------|-------|
| Small | `rounded-sm` | Buttons, badges |
| Default | `rounded-md` | Cards, inputs |
| Large | `rounded-lg` | Modal, large cards |
| Full | `rounded-full` | Pills, avatars, timeline dots |

### Border Width

| Type | Class | Usage |
|------|-------|-------|
| Default | `border` (1px) | Cards, inputs |
| None | `border-0` | Seamless elements |

## Animation Tokens

### Allowed Animations

**ONLY** `transition-colors duration-200` and `transition-all duration-200` are permitted for hover/focus states. No decorative animations.

### Transition

| Property | Class | Usage |
|----------|-------|-------|
| Colors | `transition-colors duration-200` | Hover color changes |

## Component Patterns

### Card Pattern
```tsx
<div className="border border-stone-200 rounded-lg p-4 md:p-5
  hover:border-stone-300 transition-colors duration-200">
```

### Badge Pattern
```tsx
<span className="inline-flex items-center px-2 py-0.5
  text-xs rounded-md
  bg-blue-50 text-blue-700 border border-blue-200">
```

### Nav Pattern
```tsx
<nav className="px-6 py-4 border-b border-stone-200">
  <div className="max-w-3xl mx-auto flex justify-between items-center">
```

### Link Pattern
```tsx
<a className="text-stone-500 hover:text-blue-600
  transition-colors duration-200 border-b border-stone-200
  hover:border-blue-300 pb-0.5">
```

## Illustration Accents

Hand-drawn SVG components from `@/components/illustrations`:

| Component | Usage |
|-----------|-------|
| `WavyUnderline` | Below page titles |
| `DotPattern` | Section separators |
| `HandArrow` | Navigation link decoration |
| `SmallStar` | Emphasis accent |

Usage: `<WavyUnderline className="text-blue-400 mt-2" />`

## Grid Layouts

### Container

```tsx
<div className="max-w-3xl mx-auto px-6">
```

---

**Usage Note**: When implementing UI, always reference this document first. Do not invent new color values, spacing, or animation patterns.
