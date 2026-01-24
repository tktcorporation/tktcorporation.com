# Design System - Design Tokens

This document defines the canonical design tokens for this project. **AI agents MUST use only these values** to maintain visual consistency.

## Color Palette

### Semantic Colors (Use These)

| Token | CSS Variable | Usage |
|-------|--------------|-------|
| `bg-background` | `--background` | Page background |
| `text-foreground` | `--foreground` | Primary text |
| `bg-card` | `--card` | Card backgrounds |
| `text-muted-foreground` | `--muted-foreground` | Secondary text |
| `border-border` | `--border` | Default borders |

### Brand Colors

| Color | Tailwind Class | Hex | Usage |
|-------|----------------|-----|-------|
| Deep Navy | `bg-slate-950` | `#0f172a` | Background |
| Primary Gradient | `from-purple-400 to-pink-400` | - | Accent headings |
| Secondary Gradient | `from-blue-500 to-cyan-500` | - | Alternative accent |

### Text Colors (Hierarchy)

| Level | Class | Usage |
|-------|-------|-------|
| Primary | `text-slate-100` or `text-foreground` | Headings, important text |
| Secondary | `text-slate-300` | Body text |
| Muted | `text-slate-400` | Metadata, captions |
| Disabled | `text-slate-500` | Inactive elements |

### Surface Colors

| Surface | Classes | Usage |
|---------|---------|-------|
| Card | `bg-white/5 border-white/10` | Content containers |
| Card Hover | `bg-white/10 border-purple-500/50` | Interactive cards |
| Modal | `bg-slate-900/95 backdrop-blur-lg` | Overlays |

## Typography

### Font Stack
```
Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif
```

### Size Scale (Mobile → Desktop)

| Name | Mobile | Desktop | Usage |
|------|--------|---------|-------|
| Display | `text-5xl` | `text-7xl` | Page hero titles |
| Title | `text-3xl` | `text-4xl` | Page titles |
| Section | `text-xl` | `text-2xl` | Section headings |
| Card Title | `text-base` | `text-lg` | Card headings |
| Body | `text-sm` | `text-base` | Body text |
| Caption | `text-xs` | `text-sm` | Metadata, labels |
| Micro | `text-[10px]` | `text-xs` | Badges, tags |

### Font Weights

| Weight | Class | Usage |
|--------|-------|-------|
| Normal | `font-normal` | Body text |
| Semibold | `font-semibold` | Card titles, emphasis |
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

### Responsive Patterns

| Pattern | Mobile | Desktop | Usage |
|---------|--------|---------|-------|
| Card Padding | `p-4` | `p-6` | Card internal spacing |
| Section Gap | `gap-4` | `gap-6` | Between cards |
| Section Margin | `mb-8` | `mb-12` | Between sections |

## Border & Radius

### Border Radius

| Size | Class | Usage |
|------|-------|-------|
| Small | `rounded-sm` | Buttons, badges |
| Default | `rounded-md` | Cards, inputs |
| Large | `rounded-lg` | Modal, large cards |
| Full | `rounded-full` | Pills, avatars |

### Border Width

| Type | Class | Usage |
|------|-------|-------|
| Default | `border` (1px) | Cards, inputs |
| None | `border-0` | Seamless elements |

## Shadows & Effects

### Shadow Scale

| Level | Classes | Usage |
|-------|---------|-------|
| None | - | Default state |
| Subtle | `shadow-lg shadow-purple-500/10` | Cards |
| Prominent | `shadow-lg shadow-purple-500/20` | Hover state |

### Backdrop Effects

| Effect | Class | Usage |
|--------|-------|-------|
| Blur | `backdrop-blur-lg` | Overlays, glass effect |

## Animation Tokens

### Allowed Animations

| Animation | Class | Duration | Usage |
|-----------|-------|----------|-------|
| Fade In | `animate-fadeIn` | 0.5s | Page load elements |
| Fade In Up | `animate-fadeInUp` | 0.6s | Staggered lists |
| Scale In | `animate-scaleIn` | 0.4s | Modals, tooltips |

### Transition

| Property | Class | Usage |
|----------|-------|-------|
| All | `transition-all duration-300` | Hover effects |
| Colors | `transition-colors duration-200` | Color changes only |

### Animation Delays (Staggered)

```
animation-delay-100, animation-delay-200, ...
```

## Component Patterns

### Card Pattern
```tsx
<div className="bg-white/5 border border-white/10 rounded-lg p-4 md:p-6
  hover:bg-white/10 hover:border-purple-500/50
  hover:shadow-lg hover:shadow-purple-500/20
  transition-all duration-300">
```

### Badge Pattern
```tsx
<span className="inline-flex items-center px-2 py-1
  text-xs font-medium rounded-md
  bg-purple-500/20 text-purple-300">
```

### Gradient Text Pattern
```tsx
<h1 className="bg-gradient-to-r from-purple-400 to-pink-400
  bg-clip-text text-transparent">
```

### Button Pattern
```tsx
<button className="px-4 py-2 rounded-md font-medium
  bg-purple-600 hover:bg-purple-700
  text-white transition-colors duration-200">
```

## Grid Layouts

### Responsive Grid Patterns

| Layout | Classes | Usage |
|--------|---------|-------|
| Skills | `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5` | Tag grids |
| Cards | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | Card layouts |
| Export | `grid grid-cols-1 md:grid-cols-3` | Feature grids |

### Container

```tsx
<div className="max-w-5xl mx-auto px-4 md:px-6">
```

## Z-Index Scale

| Layer | Value | Usage |
|-------|-------|-------|
| Base | `z-0` | Default content |
| Elevated | `z-10` | Floating elements |
| Modal | `z-50` | Modal overlays |
| Toast | `z-100` | Notifications |

---

**Usage Note**: When implementing UI, always reference this document first. Do not invent new color values, spacing, or animation patterns.
