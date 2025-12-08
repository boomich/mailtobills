import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listForUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const invoices = await ctx.db
      .query("invoices")
      .filter((q: any) => q.eq(q.field("userId"), args.userId))
      .collect();

    return invoices;
  },
});

export const createInvoice = mutation({
  args: {
    userId: v.string(),
    originalFilename: v.string(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    const invoiceId = await ctx.db.insert("invoices", {
      userId: args.userId,
      originalFilename: args.originalFilename,
      createdAt: args.createdAt,
    });

    return invoiceId;
  },
});
