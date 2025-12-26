"use client";

import { useMemo } from "react";
import { useQuery } from "convex/react";
import type { InvoiceRow } from "@mailtobills/types";
import { api } from "../../../convexClient";
import { parseMonthParam } from "../lib/month";

const getInvoiceTimestamp = (invoice: { receivedAt?: number; createdAt: number }) =>
  invoice.receivedAt ?? invoice.createdAt;

export type UseInvoicesResult = {
  invoices: InvoiceRow[];
  isLoading: boolean;
};

export const useInvoices = (month: string): UseInvoicesResult => {
  const invoices = useQuery(api.invoices.listMine, {});

  const data = useMemo(() => {
    if (!invoices) {
      return [] as InvoiceRow[];
    }

    const { year, month: monthIndex } = parseMonthParam(month);

    return invoices
      .map((invoice) => ({
        id: invoice._id,
        originalFilename: invoice.originalFilename,
        fromEmail: invoice.fromEmail,
        subject: invoice.subject,
        receivedAt: invoice.receivedAt ?? invoice.createdAt,
        createdAt: invoice.createdAt,
        fileUrl: invoice.fileUrl,
      }))
      .filter((invoice) => {
        const timestamp = getInvoiceTimestamp(invoice);
        const date = new Date(timestamp);
        return (
          date.getFullYear() === year &&
          date.getMonth() + 1 === monthIndex
        );
      })
      .sort((a, b) => getInvoiceTimestamp(b) - getInvoiceTimestamp(a));
  }, [invoices, month]);

  return {
    invoices: data,
    isLoading: invoices === undefined,
  };
};
