"use client";

import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convexClient";
import type { InvoiceRow } from "@mailtobills/types";
import { getMonthInfo, isInMonthRange } from "../lib/months";

const convexHttpBase =
  process.env.NEXT_PUBLIC_CONVEX_HTTP_URL ??
  process.env.NEXT_PUBLIC_CONVEX_URL?.replace(".cloud", ".site") ??
  "";

export type InvoiceSummary = {
  count: number;
  total: number;
  missingVatCount: number;
  unreviewedCount: number;
};

export type UseInvoicesResult = {
  invoices: InvoiceRow[];
  summary: InvoiceSummary;
  isLoading: boolean;
};

export const useInvoices = (month: string): UseInvoicesResult => {
  const data = useQuery(api.invoices.listMine, {});
  const monthInfo = useMemo(() => getMonthInfo(month), [month]);

  const invoices = useMemo(() => {
    if (!data) return [];

    return data
      .filter((invoice) =>
        isInMonthRange(invoice.receivedAt ?? invoice.createdAt, monthInfo)
      )
      .sort((a, b) => (b.receivedAt ?? b.createdAt) - (a.receivedAt ?? a.createdAt))
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
          receivedAt: invoice.receivedAt,
          createdAt: invoice.createdAt,
          fileUrl,
        };
      });
  }, [data, monthInfo]);

  const summary = useMemo<InvoiceSummary>(() => {
    const count = invoices.length;
    return {
      count,
      total: 0,
      missingVatCount: 0,
      unreviewedCount: count,
    };
  }, [invoices]);

  return {
    invoices,
    summary,
    isLoading: data === undefined,
  };
};
