import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { internal } from "./_generated/api";
import {
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
} from "./_generated/server";

import type { MutationCtx, QueryCtx } from "./_generated/server";

const MAX_MESSAGE_LENGTH = 2000;
const ASANA_TASKS_URL = "https://app.asana.com/api/1.0/tasks";

async function requireSignedInUserId(
  ctx: Pick<QueryCtx | MutationCtx, "auth">,
) {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    throw new Error("UNAUTHENTICATED");
  }

  return userId;
}

function feedbackPreview(message: string) {
  return message.length > 60 ? `${message.slice(0, 57).trimEnd()}…` : message;
}

export const submit = mutation({
  args: {
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await requireSignedInUserId(ctx);
    const message = args.message.trim();

    if (!message) {
      throw new Error("FEEDBACK_MESSAGE_REQUIRED");
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      throw new Error("FEEDBACK_MESSAGE_TOO_LONG");
    }

    const feedbackId = await ctx.db.insert("feedback", {
      userId,
      message,
    });

    await ctx.scheduler.runAfter(0, internal.feedback.forwardToAsana, {
      feedbackId,
    });

    return feedbackId;
  },
});

export const markForwarded = internalMutation({
  args: {
    feedbackId: v.id("feedback"),
    asanaTaskGid: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.feedbackId, {
      forwardedAt: Date.now(),
      asanaTaskGid: args.asanaTaskGid,
    });
  },
});

export const forwardToAsana = internalAction({
  args: {
    feedbackId: v.id("feedback"),
  },
  handler: async (ctx, args) => {
    const asanaPat = process.env.ASANA_PAT;
    const asanaProjectGid = process.env.ASANA_PROJECT_GID;

    if (!asanaPat || !asanaProjectGid) {
      console.warn("feedback_asana_forwarding_not_configured", {
        feedbackId: args.feedbackId,
        hasAsanaPat: Boolean(asanaPat),
        hasAsanaProjectGid: Boolean(asanaProjectGid),
      });
      return;
    }

    try {
      const feedback = await ctx.runQuery(internal.feedback.getForForwarding, {
        feedbackId: args.feedbackId,
      });

      if (!feedback) {
        console.warn("feedback_asana_forwarding_not_found", {
          feedbackId: args.feedbackId,
        });
        return;
      }

      const customer = await ctx.runQuery(internal.users.getUserById, {
        userId: feedback.userId,
      });
      const customerName =
        customer?.name?.trim() || customer?.email || "Customer";
      const submissionDate = new Date(feedback._creationTime).toISOString();
      const response = await fetch(ASANA_TASKS_URL, {
        method: "POST",
        headers: {
          authorization: `Bearer ${asanaPat}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          data: {
            projects: [asanaProjectGid],
            name: `Feedback — ${customerName} — ${feedbackPreview(feedback.message)}`,
            notes: [
              feedback.message,
              "",
              `Customer: ${customer?.name?.trim() || "Not provided"}`,
              `Email: ${customer?.email ?? "Not provided"}`,
              `Submitted: ${submissionDate}`,
            ].join("\n"),
          },
        }),
      });

      if (!response.ok) {
        console.error("feedback_asana_forward_failed", {
          feedbackId: args.feedbackId,
          status: response.status,
          statusText: response.statusText,
        });
        return;
      }

      const body = (await response.json()) as { data?: { gid?: string } };
      const asanaTaskGid = body.data?.gid;

      if (!asanaTaskGid) {
        console.error("feedback_asana_forward_missing_task_gid", {
          feedbackId: args.feedbackId,
        });
        return;
      }

      await ctx.runMutation(internal.feedback.markForwarded, {
        feedbackId: args.feedbackId,
        asanaTaskGid,
      });
    } catch (error) {
      console.error("feedback_asana_forward_failed", {
        feedbackId: args.feedbackId,
        error,
      });
    }
  },
});

export const getForForwarding = internalQuery({
  args: {
    feedbackId: v.id("feedback"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.feedbackId);
  },
});
