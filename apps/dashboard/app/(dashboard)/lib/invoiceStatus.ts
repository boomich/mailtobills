import type { InvoiceRow } from "@mailtobills/types";

export type InvoiceStatusKey = "ready" | "needs-review" | "missing-file";

export type InvoiceStatus = {
  key: InvoiceStatusKey;
  label: string;
  variant: "success" | "warning" | "neutral";
};

export const getInvoiceStatus = (invoice: InvoiceRow): InvoiceStatus => {
  if (!invoice.fileUrl) {
    return { key: "missing-file", label: "Missing file", variant: "warning" };
  }

  if (!invoice.fromEmail || !invoice.subject) {
    return { key: "needs-review", label: "Needs review", variant: "neutral" };
  }

  return { key: "ready", label: "Ready", variant: "success" };
};

export const getInvoiceSummary = (invoices: InvoiceRow[]) => {
  const missingFile = invoices.filter((invoice) => !invoice.fileUrl).length;
  const needsReview = invoices.filter(
    (invoice) => invoice.fileUrl && (!invoice.fromEmail || !invoice.subject)
  ).length;

  return {
    total: invoices.length,
    missingFile,
    needsReview,
  };
};
