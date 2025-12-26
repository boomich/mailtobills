"use client";

import Link from "next/link";
import { Button } from "@mailtobills/ui";
import { useInvoices } from "../hooks/useInvoices";
import { DashboardSummaryBar } from "./DashboardSummaryBar";
import { InvoiceTable } from "./InvoiceTable";
import { MonthNavigator } from "./MonthNavigator";
import { getInvoiceSummary } from "../lib/invoiceStatus";

export type DashboardShellProps = {
  month: string;
};

export const DashboardShell = ({ month }: DashboardShellProps) => {
  const { invoices, isLoading } = useInvoices(month);
  const summary = getInvoiceSummary(invoices);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[240px_1fr]">
        <aside className="hidden flex-col border-r border-slate-200 bg-slate-100/70 p-6 lg:flex">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
              M
            </span>
            MailToBills
          </div>
          <nav className="mt-8 space-y-2 text-sm">
            {["Dashboard", "Reports", "Settings"].map((item) => (
              <Link
                key={item}
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition ${
                  item === "Dashboard"
                    ? "bg-brand-600 text-white"
                    : "text-slate-700 hover:bg-white"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-current" />
                {item}
              </Link>
            ))}
          </nav>
          <div className="mt-auto text-xs text-slate-500">Previous Month</div>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
              <div className="flex items-center gap-4">
                <span className="text-xl font-semibold">Dashboard</span>
                <nav className="hidden items-center gap-6 text-sm text-slate-500 md:flex">
                  <span className="text-slate-900">Reports</span>
                  <span>Settings</span>
                </nav>
              </div>
              <Button>Export</Button>
            </div>
          </header>

          <main className="flex-1 px-6 py-8">
            <div className="space-y-6">
              <MonthNavigator month={month} />
              <DashboardSummaryBar
                isLoading={isLoading}
                total={summary.total}
                missingFile={summary.missingFile}
                needsReview={summary.needsReview}
              />
              <InvoiceTable invoices={invoices} isLoading={isLoading} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
