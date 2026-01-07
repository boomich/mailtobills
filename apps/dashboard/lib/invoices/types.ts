import type { InvoiceRow } from "@mailtobills/types";

export type InvoiceSummary = {
  count: number;
  total: number;
  missingVatCount: number;
  unreviewedCount: number;
};

export type InvoicesResult = {
  invoices: InvoiceRow[];
  summary: InvoiceSummary;
  isLoading: boolean;
  totalCount: number;
};

