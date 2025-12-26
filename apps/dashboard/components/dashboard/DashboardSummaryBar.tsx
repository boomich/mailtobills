import * as React from "react";
import { FileText, AlertTriangle, Clock, MoreHorizontal, Wallet } from "lucide-react";
import { IconButton } from "@mailtobills/ui";

interface DashboardSummaryBarProps {
  totalInvoices: number;
  totalAmount: string;
  missingVatCount: number;
  unreviewedCount: number;
}

export function DashboardSummaryBar({
  totalInvoices,
  totalAmount,
  missingVatCount,
  unreviewedCount,
}: DashboardSummaryBarProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-6 divide-x divide-slate-200 text-sm">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-slate-500" />
          <span className="font-medium text-slate-900">
            {totalInvoices} invoices
          </span>
        </div>
        <div className="flex items-center gap-2 pl-6">
          <Wallet className="h-4 w-4 text-green-600" />
          <span className="font-medium text-slate-900">{totalAmount} total</span>
        </div>
        {missingVatCount > 0 && (
          <div className="flex items-center gap-2 pl-6">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="font-medium text-amber-700">
              {missingVatCount} missing VAT IDs
            </span>
          </div>
        )}
        {unreviewedCount > 0 && (
          <div className="flex items-center gap-2 pl-6">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="font-medium text-slate-900">
              {unreviewedCount} unreviewed
            </span>
          </div>
        )}
      </div>
      <div>
        <IconButton
          icon={<MoreHorizontal className="h-4 w-4" />}
          variant="ghost"
          aria-label="More options"
        />
      </div>
    </div>
  );
}
