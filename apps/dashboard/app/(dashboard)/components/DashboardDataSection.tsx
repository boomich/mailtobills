"use client";

import { DashboardSummaryBar } from "./DashboardSummaryBar";
import { InvoiceTable } from "./InvoiceTable";
import { useInvoices } from "../hooks/useInvoices";

export type DashboardDataSectionProps = {
  monthValue: string;
  monthLabel: string;
};

export const DashboardDataSection = ({
  monthValue,
  monthLabel,
}: DashboardDataSectionProps) => {
  const { invoices, summary, isLoading } = useInvoices(monthValue);

  const summaryItems = [
    {
      label: "invoices",
      value: String(summary.count),
    },
    {
      label: "total",
      value: `€${summary.total.toFixed(2)}`,
      tone: "success" as const,
    },
    {
      label: "missing VAT IDs",
      value: String(summary.missingVatCount),
      tone: "warning" as const,
    },
    {
      label: "unreviewed",
      value: String(summary.unreviewedCount),
    },
  ];

  return (
    <section className="space-y-4">
      <DashboardSummaryBar items={summaryItems} />
      <InvoiceTable invoices={invoices} monthLabel={monthLabel} isLoading={isLoading} />
    </section>
  );
};
