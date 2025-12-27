import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

import { mutation, query } from "./_generated/server";

const MAIL_DOMAIN = "mailtobills.com";

const requireSignedInUserId = async (ctx: { auth: unknown }) => {
  const userId = await getAuthUserId(ctx as { auth: any });
  if (userId === null) {
    throw new Error("UNAUTHENTICATED");
  }

  return userId;
};

export const getMySettings = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireSignedInUserId(ctx);
    const user = await ctx.db.get(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      userId,
      loginEmail: user.email ?? undefined,
      inboxAlias: user.inboxAlias ?? undefined,
      emailForwardingEnabled: user.emailForwardingEnabled ?? undefined,
      notifyOnNewInvoice: user.notifyOnNewInvoice ?? undefined,
      weeklyDigest: user.weeklyDigest ?? undefined,
      timezone: user.timezone ?? undefined,
      exportFormat: user.exportFormat ?? undefined,
    };
  },
});

export const updateMySettings = mutation({
  args: {
    inboxAlias: v.optional(v.string()),
    emailForwardingEnabled: v.optional(v.boolean()),
    notifyOnNewInvoice: v.optional(v.boolean()),
    weeklyDigest: v.optional(v.boolean()),
    timezone: v.optional(v.string()),
    exportFormat: v.optional(v.union(v.literal("zip"), v.literal("pdf"), v.literal("csv"))),
  },
  handler: async (ctx, args) => {
    const userId = await requireSignedInUserId(ctx);
    const user = await ctx.db.get(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const updates: Record<string, unknown> = {};

    if (args.inboxAlias !== undefined) {
      const trimmedAlias = args.inboxAlias.trim();
      if (!trimmedAlias) {
        throw new Error("Inbox alias cannot be empty");
      }
      updates.inboxAlias = trimmedAlias;
    }

    if (args.emailForwardingEnabled !== undefined) {
      updates.emailForwardingEnabled = args.emailForwardingEnabled;
    }

    if (args.notifyOnNewInvoice !== undefined) {
      updates.notifyOnNewInvoice = args.notifyOnNewInvoice;
    }

    if (args.weeklyDigest !== undefined) {
      updates.weeklyDigest = args.weeklyDigest;
    }

    if (args.timezone !== undefined) {
      updates.timezone = args.timezone;
    }

    if (args.exportFormat !== undefined) {
      updates.exportFormat = args.exportFormat;
    }

    if (args.inboxAlias !== undefined || args.emailForwardingEnabled !== undefined) {
      const resolvedAlias =
        (updates.inboxAlias as string | undefined) ??
        user.inboxAlias ??
        "inbox";
      const resolvedForwardingEnabled =
        (updates.emailForwardingEnabled as boolean | undefined) ??
        user.emailForwardingEnabled ??
        true;

      updates.forwardingEmails = resolvedForwardingEnabled
        ? [`${resolvedAlias}@${MAIL_DOMAIN}`]
        : [];
    }

    if (Object.keys(updates).length === 0) {
      return;
    }

    await ctx.db.patch(userId, updates);
  },
});
