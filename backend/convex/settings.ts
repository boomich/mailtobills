import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

import { mutation, query } from "./_generated/server";

const requireSignedInUserId = async (ctx: { auth: unknown }) => {
  const userId = await getAuthUserId(ctx as { auth: any });
  if (userId === null) {
    throw new Error("UNAUTHENTICATED");
  }

  return userId;
};

const pruneUndefined = <T extends Record<string, unknown>>(payload: T) =>
  Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined)
  ) as Partial<T>;

export const getMine = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireSignedInUserId(ctx);
    const user = await ctx.db.get(userId);

    return {
      userId,
      email: user?.email ?? null,
      settings: user?.settings ?? {},
    };
  },
});

export const updateMine = mutation({
  args: {
    settings: v.object({
      inboxAlias: v.optional(v.string()),
      emailForwardingEnabled: v.optional(v.boolean()),
      notifyOnNewInvoice: v.optional(v.boolean()),
      weeklyDigest: v.optional(v.boolean()),
      timezone: v.optional(v.string()),
      exportFormat: v.optional(
        v.union(v.literal("zip"), v.literal("pdf"), v.literal("csv"))
      ),
    }),
  },
  handler: async (ctx, args) => {
    const userId = await requireSignedInUserId(ctx);
    const user = await ctx.db.get(userId);

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    const updates = pruneUndefined(args.settings);
    const nextSettings = {
      ...(user.settings ?? {}),
      ...updates,
    };

    await ctx.db.patch(userId, { settings: nextSettings });

    return {
      userId,
      email: user.email ?? null,
      settings: nextSettings,
    };
  },
});
