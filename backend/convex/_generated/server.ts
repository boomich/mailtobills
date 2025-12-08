// This is a minimal stub for Convex generated helpers to keep TypeScript happy in the scaffold.
// Replace with the real generated files when running `pnpm dev` in the Convex package.

export type QueryCtx = Record<string, any>;
export type MutationCtx = Record<string, any>;

export const query = <Args extends Record<string, unknown>>(definition: {
  args: Args;
  handler: (ctx: QueryCtx, args: Record<string, unknown>) => Promise<unknown> | unknown;
}) => definition;

export const mutation = <Args extends Record<string, unknown>>(definition: {
  args: Args;
  handler: (ctx: MutationCtx, args: Record<string, unknown>) => Promise<unknown> | unknown;
}) => definition;
