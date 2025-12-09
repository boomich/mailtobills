import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const ingestInvoice = httpAction(async (ctx, request) => {
  const authHeader = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${process.env.INGEST_SECRET}`;

  if (!expected || authHeader !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

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
    typeof (body as any).fileUrl !== "string" ||
    typeof (body as any).receivedAt !== "number"
  ) {
    return new Response("Invalid payload", { status: 400 });
  }

  const { userId, originalFilename, fileUrl, fromEmail, subject, receivedAt } =
    body as {
      userId: string;
      originalFilename: string;
      fileUrl: string;
      fromEmail?: string;
      subject?: string;
      receivedAt: number;
    };

  await ctx.runMutation(api.invoices.createInvoice, {
    userId,
    originalFilename,
    fileUrl,
    fromEmail,
    subject,
    receivedAt,
  });

  return new Response("ok", { status: 201 });
});

const http = httpRouter();

http.route({
  path: "/ingest",
  method: "POST",
  handler: ingestInvoice,
});

export default http;
