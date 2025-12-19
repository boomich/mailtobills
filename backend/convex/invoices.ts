import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

import { internalMutation, mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

const requireSignedInUserId = async (ctx: { auth: unknown }) => {
  const userId = await getAuthUserId(ctx as { auth: any });
  if (userId === null) {
    throw new Error("UNAUTHENTICATED");
  }

  return userId;
};

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireSignedInUserId(ctx);
    return ctx.db
      .query("invoices")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const createInvoice = mutation({
  args: {
    receivedAt: v.number(),
    originalFilename: v.string(),
    subject: v.optional(v.string()),
    fileUrl: v.optional(v.string()),
    fromEmail: v.optional(v.string()),
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

export const ingestCreateInvoiceFromStorage = internalMutation({
  args: {
    userId: v.id("users"),
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
    // Try to find existing demo user
    const demoUser = await db
      .query("users")
      .withIndex("email", (q) => q.eq("email", "demo@example.com"))
      .first();

    let insertedUserId: Id<"users"> | undefined;

    // If not found, insert new user and fetch that user document
    if (!demoUser) {
      insertedUserId = await db.insert("users", {
        email: "demo@example.com",
        name: "Demo User",
        image: "https://example.com/demo-user.png",
        forwardingEmails: ["demo@example.com"],
        phone: "+1234567890",
        phoneVerificationTime: Date.now(),
        isAnonymous: false,
        emailVerificationTime: Date.now(),
      });
    }

    const userId = demoUser?._id ?? insertedUserId;

    // Now it's type-safe: demoUser is the user document, so we can use demoUser._id
    return db.insert("invoices", {
      userId: userId!,
      originalFilename: "example-invoice.pdf",
      fileUrl: "https://example.com/example-invoice.pdf",
      fromEmail: "demo@example.com",
      subject: "Seed invoice",
      receivedAt: Date.now(),
      createdAt: Date.now(),
    });
  },
});
