import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { query, internalQuery } from "./_generated/server";

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const user = await ctx.db.get(userId);
    return user;
  },
});

export const getUserByForwardingEmail = internalQuery({
  args: { fromEmail: v.string() },
  handler: async (ctx, args) => {
    // First, try to find by primary email using the index
    if (args.fromEmail) {
      const byPrimaryEmail = await ctx.db
        .query("users")
        .withIndex("email", (q) => q.eq("email", args.fromEmail))
        .first();

      if (byPrimaryEmail) {
        return byPrimaryEmail;
      }
    }

    // If not found by primary email, check forwardingEmails arrays
    // Note: We need to query all users since we can't efficiently index array membership
    const allUsers = await ctx.db.query("users").collect();

    const byForwarding = allUsers.find(
      (user) =>
        Array.isArray(user.forwardingEmails) &&
        user.forwardingEmails.includes(args.fromEmail)
    );

    return byForwarding ?? null;
  },
});
