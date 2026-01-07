import { httpRouter } from "convex/server";

import { auth } from "./auth";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

import type { Id } from "./_generated/dataModel";
import type { ActionCtx } from "./_generated/server";

type ParsedForward = {
  originFromEmail?: string;
  originFromName?: string;
  originDomain?: string;
  originSubject?: string;
  originSentAt?: number;
};

function parseForwardedBodyPreview(
  bodyPreview: string | undefined
): ParsedForward {
  if (!bodyPreview || typeof bodyPreview !== "string") return {};

  // Common forward header block:
  // From: Name <email>
  // Date: Sun, Dec 14, 2025 at 11:37 AM
  // Subject: ...
  const fromMatch =
    bodyPreview.match(/\bFrom:\s*([^\n<]+)?\s*<([^>\s]+)>/i) ||
    bodyPreview.match(/\bFrom:\s*([^\n]+?)\s*(?:\n|$)/i);

  let originFromName: string | undefined;
  let originFromEmail: string | undefined;

  if (fromMatch) {
    if (fromMatch.length >= 3 && fromMatch[2]) {
      originFromEmail = fromMatch[2].trim();
      originFromName = (fromMatch[1] ?? "").trim() || undefined;
    } else if (fromMatch[1]) {
      // fallback: "From: noreply@domain.com" or "From: Endesa Energia"
      const raw = fromMatch[1].trim();
      if (raw.includes("@")) originFromEmail = raw;
      else originFromName = raw;
    }
  }

  const subjectMatch = bodyPreview.match(/\bSubject:\s*(.+?)(?:\n|$)/i);
  const originSubject = subjectMatch?.[1]?.trim() || undefined;

  const dateMatch = bodyPreview.match(/\bDate:\s*(.+?)(?:\n|$)/i);
  const dateRaw = dateMatch?.[1]?.trim();
  const parsedDate = dateRaw ? new Date(dateRaw) : null;
  const originSentAt =
    parsedDate && !Number.isNaN(parsedDate.getTime())
      ? parsedDate.getTime()
      : undefined;

  const originDomain =
    originFromEmail && originFromEmail.includes("@")
      ? originFromEmail.split("@").pop()
      : undefined;

  return {
    originFromEmail,
    originFromName,
    originDomain,
    originSubject,
    originSentAt,
  };
}

function jsonError(
  status: number,
  code: string,
  message: string,
  context: Record<string, unknown> = {}
) {
  return new Response(
    JSON.stringify({ ok: false, code, message, ...context }),
    { status, headers: { "content-type": "application/json" } }
  );
}

function toBase64Url(bytes: Uint8Array) {
  // Browser-compatible base64url
  // Browser-compatible base64url encoding for Uint8Array
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    // Ensure byte is defined, fallback to 0 if somehow undefined (shouldn't happen)
    binary += String.fromCharCode(byte ?? 0);
  }
  const b64 = btoa(binary);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function shortDedupeKey(raw: string) {
  const data = new TextEncoder().encode(raw);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(digest).slice(0, 12); // 96 bits is enough here
  return `d_${toBase64Url(bytes)}`;
}

async function getUserByForwardingEmail(ctx: ActionCtx, fromEmail: string) {
  const user = await ctx.runQuery(internal.users.getUserByForwardingEmail, {
    fromEmail,
  });

  if (!user) {
    return null;
  }

  return user;
}

const ingestInvoice = httpAction(async (ctx, request) => {
  const authHeader = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${process.env.INGEST_SECRET}`;

  if (!expected || authHeader !== expected) {
    return jsonError(401, "UNAUTHORIZED", "Unauthorized");
  }

  const contentType = request.headers.get("content-type") ?? "";

  // 1) Caminho JSON – aceita payload do n8n
  if (contentType.includes("application/json")) {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return jsonError(400, "INVALID_JSON", "Invalid JSON");
    }

    // New validation for n8n payload
    if (typeof body !== "object" || body === null) {
      return jsonError(400, "INVALID_PAYLOAD", "Invalid payload");
    }

    const b = body as any;

    // n8n payload (current workflow) sends these:
    if (typeof b.forwarderFrom !== "string" || !b.forwarderFrom.trim()) {
      return jsonError(400, "MISSING_FORWARDER_FROM", "Missing forwarderFrom", {
        messageId:
          typeof (b as any).messageId === "string"
            ? (b as any).messageId
            : undefined,
      });
    }

    if (typeof b.messageId !== "string" || !b.messageId.trim()) {
      return jsonError(400, "MISSING_MESSAGE_ID", "Missing messageId");
    }

    const receivedAtRaw = b.receivedAt;
    const receivedAtMs =
      typeof receivedAtRaw === "number"
        ? receivedAtRaw
        : typeof receivedAtRaw === "string"
          ? new Date(receivedAtRaw).getTime()
          : NaN;

    if (!Number.isFinite(receivedAtMs)) {
      return jsonError(400, "INVALID_RECEIVED_AT", "Invalid receivedAt", {
        messageId:
          typeof (b as any).messageId === "string"
            ? (b as any).messageId
            : undefined,
      });
    }

    const {
      // n8n current fields
      forwarderFrom,
      subject,
      messageId,
      dedupeKey,

      // optional fields (future / other callers)
      attachmentId,
      bodyPreview,
      originFromEmail,
      originFromName,
      originDomain,
      originSubject,
      originSentAt,

      // pass-through payloads (we don't store them yet, but may be useful later)
      raw,
      pdfMeta,
    } = b as {
      forwarderFrom: string;
      subject?: string;
      messageId: string;
      dedupeKey?: string;

      attachmentId?: string;
      bodyPreview?: string;

      originFromEmail?: string;
      originFromName?: string;
      originDomain?: string;
      originSubject?: string;
      originSentAt?: number;

      raw?: any;
      pdfMeta?: any;
    };

    const user = await getUserByForwardingEmail(ctx, forwarderFrom);

    if (!user) {
      return jsonError(400, "UNKNOWN_SENDER", "Unknown sender", {
        messageId,
        forwarderFrom,
      });
    }

    const derivedOriginalFilename =
      typeof pdfMeta?.fileName === "string" && pdfMeta.fileName.trim()
        ? pdfMeta.fileName.trim()
        : "invoice.pdf";

    // Best-effort attachment identifier for idempotency when n8n doesn't send one yet
    const derivedAttachmentId =
      (typeof attachmentId === "string" && attachmentId.trim()) ||
      (typeof pdfMeta?.key === "string" && pdfMeta.key.trim()) ||
      (typeof pdfMeta?.fileName === "string" && pdfMeta.fileName.trim()) ||
      undefined;

    // bodyPreview often lives in the raw Outlook payload
    const effectiveBodyPreview =
      typeof bodyPreview === "string"
        ? bodyPreview
        : typeof raw?.bodyPreview === "string"
          ? raw.bodyPreview
          : undefined;

    const parsed = parseForwardedBodyPreview(effectiveBodyPreview);

    const rawDedupe =
      dedupeKey ??
      `${user._id}|${messageId}|${derivedAttachmentId ?? derivedOriginalFilename}|${receivedAtMs}`;

    const finalDedupeKey = await shortDedupeKey(rawDedupe);

    await ctx.runMutation(internal.invoices.ingestCreateInvoice, {
      userId: user._id,
      originalFilename: derivedOriginalFilename,
      fileUrl: undefined,
      fromEmail: forwarderFrom,
      subject,
      receivedAt: receivedAtMs,
      messageId,
      attachmentId: derivedAttachmentId,
      dedupeKey: finalDedupeKey,
      originFromEmail: originFromEmail ?? parsed.originFromEmail,
      originFromName: originFromName ?? parsed.originFromName,
      originDomain: originDomain ?? parsed.originDomain,
      originSubject: originSubject ?? parsed.originSubject,
      originSentAt: originSentAt ?? parsed.originSentAt,
    });

    return new Response(JSON.stringify({ ok: true, messageId }), {
      status: 201,
      headers: { "content-type": "application/json" },
    });
  }

  // 2) Caminho binário – para o n8n com attachment_0 + Convex storage
  const url = new URL(request.url);

  const fromEmail =
    url.searchParams.get("fromEmail") ??
    url.searchParams.get("forwarderFrom") ??
    undefined;
  const subject = url.searchParams.get("subject") ?? undefined;
  const receivedAtParam = url.searchParams.get("receivedAt");
  const receivedAt = receivedAtParam ? Number(receivedAtParam) : Date.now();
  const originalFilename =
    url.searchParams.get("originalFilename") ?? "invoice.pdf";

  const messageId = url.searchParams.get("messageId") ?? undefined;
  const attachmentId = url.searchParams.get("attachmentId") ?? undefined;

  const originFromEmail = url.searchParams.get("originFromEmail") ?? undefined;
  const originFromName = url.searchParams.get("originFromName") ?? undefined;
  const originDomain = url.searchParams.get("originDomain") ?? undefined;
  const originSubject = url.searchParams.get("originSubject") ?? undefined;
  const originSentAtParam = url.searchParams.get("originSentAt");
  const originSentAt = originSentAtParam
    ? Number(originSentAtParam)
    : undefined;

  if (!fromEmail) {
    return jsonError(
      400,
      "MISSING_FORWARDING_EMAIL",
      "Missing forwarding email",
      {
        messageId,
      }
    );
  }

  const user = await getUserByForwardingEmail(ctx, fromEmail);

  if (!user) {
    return jsonError(400, "UNKNOWN_SENDER", "Unknown sender", {
      messageId,
      fromEmail,
    });
  }

  const rawDedupe = `${user._id}|${messageId ?? "no-message"}|${attachmentId ?? originalFilename}|${receivedAt}`;
  const dedupeKey = await shortDedupeKey(rawDedupe);

  // Aqui a mágica do Convex storage
  // Precisamos armazenar apenas o corpo do arquivo (um Blob/ArrayBuffer), não o Request inteiro
  const fileBuffer = await request.arrayBuffer();
  const fileBlob = new Blob([fileBuffer]);
  const storageId = await ctx.storage.store(fileBlob);

  await ctx.runMutation(internal.invoices.ingestCreateInvoiceFromStorage, {
    userId: user._id,
    originalFilename,
    storageId,
    fromEmail,
    subject,
    receivedAt,
    messageId,
    attachmentId,
    dedupeKey,
    originFromEmail,
    originFromName,
    originDomain,
    originSubject,
    originSentAt,
  });

  return new Response(JSON.stringify({ ok: true, messageId }), {
    status: 201,
    headers: { "content-type": "application/json" },
  });
});

const downloadFile = httpAction(async (ctx, request) => {
  const url = new URL(request.url);
  const storageIdParam = url.searchParams.get("storageId");

  if (!storageIdParam) {
    return new Response("Missing storageId", { status: 400 });
  }

  try {
    const storageId = storageIdParam as Id<"_storage">;
    const file = await ctx.storage.get(storageId);

    if (!file) {
      return new Response("File not found", { status: 404 });
    }

    // For now we assume PDF; later we can persist and return content-type from metadata
    return new Response(file, {
      status: 200,
      headers: {
        "content-type": "application/pdf",
        "cache-control": "private, max-age=0, must-revalidate",
        "content-disposition": 'inline; filename="invoice.pdf"',
      },
    });
  } catch (error) {
    console.error("Error fetching file from storage", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});

const http = httpRouter();

auth.addHttpRoutes(http);

http.route({
  path: "/ingest",
  method: "POST",
  handler: ingestInvoice,
});

http.route({
  path: "/file",
  method: "GET",
  handler: downloadFile,
});

export default http;
