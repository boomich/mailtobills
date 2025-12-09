import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const invoices = defineTable({
  userId: v.string(),
  originalFilename: v.string(),
  fileUrl: v.string(), // URL no storage (S3/Hetzner) – v1
  fromEmail: v.optional(v.string()),
  subject: v.optional(v.string()),
  receivedAt: v.number(), // timestamp do email
  createdAt: v.number(), // timestamp de criação no sistema
});

export default defineSchema({
  invoices,
});
