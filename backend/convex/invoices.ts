import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listForUser = query({
  args: { userId: v.string() },
  handler: async ({ db }, { userId }) => {
    return db
      .query("invoices")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
  },
});

export const createInvoice = mutation({
  args: {
    userId: v.string(),
    originalFilename: v.string(),
    createdAt: v.number(),
  },
  handler: async ({ db }, args) => {
    return db.insert("invoices", {
      userId: args.userId,
      originalFilename: args.originalFilename,
      createdAt: args.createdAt,
    });
  },
});

export const seedDemo = mutation({
  args: {},
  handler: async ({ db }) => {
    return db.insert("invoices", {
      userId: "demo-user",
      originalFilename: "example-invoice.pdf",
      createdAt: Date.now(),
    });
  },
});
