import type { InvoiceRow } from "@mailtobills/types";

import type { MonthInfo } from "../months";
import { isInMonthRange } from "../months";

const getConvexHttpBase = () =>
  process.env.NEXT_PUBLIC_CONVEX_HTTP_URL ??
  process.env.NEXT_PUBLIC_CONVEX_URL?.replace(".cloud", ".site") ??
  "";

export function invoiceRowsForMonth(
  data: Array<{
    _id: string;
    originalFilename: string;
    fromEmail?: string | null;
    subject?: string | null;
    receivedAt?: number | null;
    createdAt: number;
    fileUrl?: string | null;
    fileStorageId?: string | null;
  }>,
  monthInfo: MonthInfo,
): InvoiceRow[] {
  const convexHttpBase = getConvexHttpBase();

  return data
    .filter((invoice) =>
      isInMonthRange(invoice.receivedAt ?? invoice.createdAt, monthInfo),
    )
    .sort(
      (a, b) => (b.receivedAt ?? b.createdAt) - (a.receivedAt ?? a.createdAt),
    )
    .map<InvoiceRow>((invoice) => {
      const fileUrl =
        invoice.fileUrl ||
        (invoice.fileStorageId && convexHttpBase
          ? `${convexHttpBase}/file?storageId=${invoice.fileStorageId}`
          : undefined);

      return {
        id: invoice._id,
        originalFilename: invoice.originalFilename,
        fromEmail: invoice.fromEmail ?? undefined,
        subject: invoice.subject ?? undefined,
        receivedAt: invoice.receivedAt ?? invoice.createdAt,
        createdAt: invoice.createdAt,
        fileUrl,
      };
    });
}

export function summarizeInvoices(invoices: InvoiceRow[]) {
  const count = invoices.length;
  return {
    count,
    total: 0,
    missingVatCount: 0,
    unreviewedCount: count,
  };
}

