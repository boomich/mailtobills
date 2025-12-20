# MailToBills Design System 0.1

The design system 0.1 defines a small, shared visual kit so landing, dashboard and future agents stay consistent without introducing a heavy framework.

## Purpose
- Provide a minimal set of UI primitives that reflect the MailToBills brand.
- Align typography, spacing and corner radii across apps.
- Document what is official and prevent ad-hoc components until discussed.

## Color rules
- **Brand (primary):** `brand-50` to `brand-900` palette, with `brand-600` as main action color and `brand-700` for hover/pressed.
- **Neutral/slate:** use Tailwind slate scale for text, borders and surfaces (`slate-50` backgrounds, `slate-200` borders, `slate-700` text).
- **States:**
  - Success: `green-600` text/icons on `green-50` backgrounds.
  - Warning: `amber-600` text/icons on `amber-50` backgrounds.
  - Error: `red-600` text/icons on `red-50` backgrounds.
- Avoid introducing new palettes without alignment.

## Typography
- Base font stack uses **Inter** first, falling back to the Tailwind sans set.
- Titles: semibold/bold, sizes from `text-lg` to `text-4xl` depending on hierarchy.
- Body: `text-sm`/`text-base` with `text-slate-700` or darker for readability.
- Labels and meta: `text-xs`–`text-sm`, semibold when acting as form labels.

## Layout tokens
- Spacing: use Tailwind spacing scale (`2`, `4`, `6`, `8`, `10`, `12`, `16`) for padding and gaps; prefer multiples of 2 or 4 for rhythm.
- Radii: default/`md` `0.5rem`, `sm` `0.375rem`, `lg` `0.75rem`; cards and inputs use `md`, chips/pills can use `full` when needed.

## Official components
- **Button:** primary and secondary variants, focus-visible outlines, disabled support.
- **Input:** text input with consistent padding, border and focus outline.
- **Label:** form label styling to pair with inputs.
- **Card:** container plus header/title/description/content slots for grouping sections.
- **EmptyState:** simple centered layout with optional description and action.

## Governance
- Do not add new primitives or variants without discussing the use case first.
- Prefer composing the official components before introducing new patterns.
