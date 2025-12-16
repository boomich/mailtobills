import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

const requireSignedInUserId = async (ctx: { auth: unknown }) => {
  const userId = await getAuthUserId(ctx as { auth: any });
  if (userId === null) {
    throw new Error("UNAUTHENTICATED");
  }
  // We store it as a string in the invoices table for now.
  return userId as unknown as string;
};

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireSignedInUserId(ctx);
    return ctx.db
      .query("invoices")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
  },
});

export const createInvoice = mutation({
  args: {
    originalFilename: v.string(),
    fileUrl: v.optional(v.string()),
    fromEmail: v.optional(v.string()),
    subject: v.optional(v.string()),
    receivedAt: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await requireSignedInUserId(ctx);
    return ctx.db.insert("invoices", {
      ...args,
      userId,
      createdAt: Date.now(),
    });
  },
});

export const createInvoiceFromStorage = mutation({
  args: {
    storageId: v.id("_storage"),
    originalFilename: v.string(),
    fromEmail: v.optional(v.string()),
    subject: v.optional(v.string()),
    receivedAt: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await requireSignedInUserId(ctx);
    return ctx.db.insert("invoices", {
      userId,
      originalFilename: args.originalFilename,
      fileStorageId: args.storageId,
      fromEmail: args.fromEmail,
      subject: args.subject,
      receivedAt: args.receivedAt,
      createdAt: Date.now(),
    });
  },
});

export const ingestCreateInvoice = internalMutation({
  args: {
    userId: v.string(),
    originalFilename: v.string(),
    fileUrl: v.optional(v.string()),
    fromEmail: v.optional(v.string()),
    subject: v.optional(v.string()),
    receivedAt: v.number(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("invoices", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const ingestCreateInvoiceFromStorage = internalMutation({
  args: {
    userId: v.string(),
    storageId: v.id("_storage"),
    originalFilename: v.string(),
    fromEmail: v.optional(v.string()),
    subject: v.optional(v.string()),
    receivedAt: v.number(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("invoices", {
      userId: args.userId,
      originalFilename: args.originalFilename,
      fileStorageId: args.storageId,
      fromEmail: args.fromEmail,
      subject: args.subject,
      receivedAt: args.receivedAt,
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
