# Using shadcn/ui CLI

This package is configured to use the shadcn/ui CLI for easy component installation.

## Adding Components

To add a shadcn/ui component, run:

```bash
cd packages/ui
pnpm dlx shadcn@latest add <component-name>
```

For example:
```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
```

## Configuration

The configuration is in `components.json`:
- Components are added to `src/components/`
- Uses `@/` path aliases (configured in `tsconfig.json`)
- Tailwind config points to the shared preset
- CSS variables are disabled (using direct Tailwind classes)

## After Adding a Component

1. The component will be created in `src/components/`
2. Export it from `src/index.ts` to make it available to other packages
3. The component will use the `@/lib/cn` utility for className merging

## Example

```bash
# Add the Item component (if not already added)
cd packages/ui
pnpm dlx shadcn@latest add item

# Then export it in src/index.ts
export { Item, ItemContent, ItemTitle, ... } from "./components/item";
```

