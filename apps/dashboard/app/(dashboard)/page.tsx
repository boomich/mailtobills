import * as React from "react";
import { format } from "date-fns";
import { getInvoices } from "../../lib/data";
import { MonthNavigator } from "../../components/dashboard/MonthNavigator";
import { DashboardSummaryBar } from "../../components/dashboard/DashboardSummaryBar";
import { InvoiceTable } from "../../components/dashboard/InvoiceTable";
import { InvoiceRow } from "../../lib/types";

// Helper to calculate totals from mocked string amounts
function calculateStats(invoices: InvoiceRow[]) {
  let totalAmount = 0;
  let missingVatCount = 0;
  let unreviewedCount = 0;

  invoices.forEach((inv) => {
    const amountStr = inv.amount || "0";
    const amount = parseFloat(amountStr.replace(/[^0-9.]/g, ""));
    if (!isNaN(amount)) {
      totalAmount += amount;
    }

    if (inv.status === "missing_vat") missingVatCount++;
    if (inv.status === "unreviewed") unreviewedCount++;
  });

  return {
    totalInvoices: invoices.length,
    totalAmount: new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency: "EUR",
    }).format(totalAmount),
    missingVatCount,
    unreviewedCount,
  };
}

interface DashboardPageProps {
  searchParams: {
    month?: string;
  };
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const month = searchParams.month || format(new Date(), "yyyy-MM");
  const invoices = await getInvoices(month);
  const stats = calculateStats(invoices);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <MonthNavigator />
      </div>

      <DashboardSummaryBar
        totalInvoices={stats.totalInvoices}
        totalAmount={stats.totalAmount}
        missingVatCount={stats.missingVatCount}
        unreviewedCount={stats.unreviewedCount}
      />

      <InvoiceTable invoices={invoices} />
    </div>
  );
}
