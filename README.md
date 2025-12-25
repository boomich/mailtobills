# MailToBills

Forward your invoices. We organize everything.

## Monorepo layout

- `apps/landing`: Public marketing site (Next.js).
- `apps/dashboard`: Authenticated dashboard (Next.js + Convex).
- `backend/convex`: Convex backend (schema, queries, mutations).
- `packages/ui`: Shared React UI components.
- `packages/types`: Shared TypeScript types.
- `packages/config`: Shared configs (ESLint/TS).
- `workflows/n8n`: Email ingestion workflows (exports live here).

## Development

```bash
pnpm install
pnpm dev
```

`pnpm dev` runs the Turborepo pipeline; you can also run app-specific scripts inside each package.

## Auth env (OAuth)

For `@convex-dev/auth` OAuth redirects, the Convex backend must know the dashboard base URL:

- Set `SITE_URL` (and/or `CONVEX_SITE_URL`) to the dashboard origin, e.g. `http://localhost:3001`.
