import { httpRouter } from "convex/server";

import { auth } from "./auth";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

import type { Id } from "./_generated/dataModel";

const ingestInvoice = httpAction(async (ctx, request) => {
  const authHeader = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${process.env.INGEST_SECRET}`;

  if (!expected || authHeader !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

  const contentType = request.headers.get("content-type") ?? "";

  // 1) Caminho JSON – mantém o form web funcionando
  if (contentType.includes("application/json")) {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    if (
      typeof body !== "object" ||
      body === null ||
      typeof (body as any).userId !== "string" ||
      typeof (body as any).originalFilename !== "string" ||
      typeof (body as any).receivedAt !== "number"
    ) {
      return new Response("Invalid payload", { status: 400 });
    }

    const { originalFilename, fileUrl, fromEmail, subject, receivedAt } =
      body as {
        originalFilename: string;
        fileUrl: string;
        fromEmail?: string;
        subject?: string;
        receivedAt: number;
      };

    await ctx.runMutation(internal.invoices.ingestCreateInvoice, {
      originalFilename,
      fileUrl,
      fromEmail,
      subject,
      receivedAt,
    });

    return new Response("ok", { status: 201 });
  }

  // 2) Caminho binário – para o n8n com attachment_0 + Convex storage
  const url = new URL(request.url);

  const fromEmail = url.searchParams.get("fromEmail") ?? undefined;
  const subject = url.searchParams.get("subject") ?? undefined;
  const receivedAtParam = url.searchParams.get("receivedAt");
  const receivedAt = receivedAtParam ? Number(receivedAtParam) : Date.now();
  const originalFilename =
    url.searchParams.get("originalFilename") ?? "invoice.pdf";

  if (!fromEmail) {
    return new Response("Missing forwarding email", { status: 400 });
  }

  const user = await ctx.runQuery(internal.users.getUserByForwardingEmail, {
    fromEmail,
  });

  if (!user) {
    return new Response("Unknown sender", { status: 404 });
  }

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
  });

  return new Response("ok", { status: 201 });
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
