import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const invoices = defineTable({
  userId: v.string(),
  originalFilename: v.string(),
  createdAt: v.number(),
});

export default defineSchema({
  invoices,
});
