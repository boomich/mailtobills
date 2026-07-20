/// <reference types="vitest/importMeta" />

import { convexTest } from "convex-test";
import type { TestConvex } from "convex-test";
import { describe, expect, it } from "vitest";

import { api } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import schema from "./schema";

const modules = (
  import.meta as ImportMeta & {
    glob(patterns: string[]): Record<string, () => Promise<unknown>>;
  }
).glob(["./**/*.*s", "!./**/*.test.ts"]);

async function insertUser(
  t: TestConvex<typeof schema>,
  email: string,
) {
  return await t.run((ctx) => ctx.db.insert("users", { email }));
}

function asIdentity(userId: Id<"users">) {
  return {
    subject: `${userId}|test-session`,
    email: "user@example.com",
  };
}

describe("feedback Convex functions", () => {
  it("stores a trimmed feedback letter for the signed-in customer", async () => {
    const t = convexTest({ schema, modules });
    const userId = await insertUser(t, "customer@example.com");
    const feedbackId = await t.withIdentity(asIdentity(userId)).mutation(
      api.feedback.submit,
      { message: "  Please add CSV filters.  " },
    );

    const feedback = await t.run((ctx) => ctx.db.get(feedbackId));

    expect(feedback).toMatchObject({
      userId,
      message: "Please add CSV filters.",
    });
    expect(feedback?.forwardedAt).toBeUndefined();
    expect(feedback?.asanaTaskGid).toBeUndefined();
  });

  it("rejects empty and overlong feedback letters", async () => {
    const t = convexTest({ schema, modules });
    const userId = await insertUser(t, "customer@example.com");
    const authed = t.withIdentity(asIdentity(userId));

    await expect(
      authed.mutation(api.feedback.submit, { message: "   " }),
    ).rejects.toThrow("FEEDBACK_MESSAGE_REQUIRED");
    await expect(
      authed.mutation(api.feedback.submit, { message: "x".repeat(2001) }),
    ).rejects.toThrow("FEEDBACK_MESSAGE_TOO_LONG");
  });
});
