import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const invoices = defineTable({
  userId: v.id("users"),
  originalFilename: v.string(),
  fileUrl: v.optional(v.string()), // URL no storage (S3/Hetzner) – v1
  fileStorageId: v.optional(v.id("_storage")),
  fromEmail: v.optional(v.string()),
  subject: v.optional(v.string()),
  receivedAt: v.number(), // timestamp do email
  createdAt: v.number(), // timestamp de criação no sistema
});

const users = defineTable({
  name: v.optional(v.string()),
  image: v.optional(v.string()),
  email: v.optional(v.string()),
  emailVerificationTime: v.optional(v.number()),
  phone: v.optional(v.string()),
  phoneVerificationTime: v.optional(v.number()),
  isAnonymous: v.optional(v.boolean()),
  // custom fields below
  forwardingEmails: v.optional(v.array(v.string())),
})
  .index("email", ["email"])
  .index("phone", ["phone"])
  // custom indexes below
  .index("by_forwardingEmail", ["forwardingEmails"]);

export default defineSchema({
  ...authTables,
  users,
  invoices,
});
