import "server-only";

import { fetchQuery } from "convex/nextjs";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@mailtobills/convex/_generated/api";

import { getMonthInfo } from "../months";
import type { InvoicesResult } from "./types";
import { invoiceRowsForMonth, summarizeInvoices } from "./transform";

export async function getInvoices(month: string): Promise<InvoicesResult> {
  const token = await convexAuthNextjsToken();
  const data = await fetchQuery(api.invoices.listMine, {}, { token });
  const monthInfo = getMonthInfo(month);

  const invoices = invoiceRowsForMonth(data, monthInfo);
  const summary = summarizeInvoices(invoices);

  return {
    invoices,
    summary,
    isLoading: false,
    totalCount: data.length,
  };
}

