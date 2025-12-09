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
    fileUrl: v.string(),
    fromEmail: v.optional(v.string()),
    subject: v.optional(v.string()),
    receivedAt: v.number(),
  },
  handler: async ({ db }, args) => {
    return db.insert("invoices", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const seedDemo = mutation({
  args: {},
  handler: async ({ db }) => {
    return db.insert("invoices", {
      userId: "demo-user",
      originalFilename: "example-invoice.pdf",
      fileUrl: "https://example.com/example-invoice.pdf",
      fromEmail: "demo@example.com",
      subject: "Seed invoice",
      receivedAt: Date.now(),
      createdAt: Date.now(),
    });
  },
});
