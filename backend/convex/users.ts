import { v } from "convex/values";

import { internalQuery } from "./_generated/server";

export const getUserByForwardingEmail = internalQuery({
  args: { fromEmail: v.string() },
  handler: async (ctx, args) => {
    // As "contains" is not available, use a filter and check with .includes() in JS after query
    // This will fetch users which have at least some forwardingEmails defined,
    // and then filter on server to avoid scanning all docs
    // Note: We still use .filter to minimize unneeded reads
    return ctx.db
      .query("users")
      .filter((q) => q.field("forwardingEmails") != undefined)
      .collect()
      .then((users) =>
        users.find(
          (user) =>
            Array.isArray(user.forwardingEmails) &&
            user.forwardingEmails.includes(args.fromEmail)
        )
      );
  },
});
