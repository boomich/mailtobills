import * as React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@mailtobills/ui";
import { InvoiceTableRows } from "./InvoiceTableRows";
import { InvoiceTableEmpty } from "./InvoiceTableEmpty";
import { InvoiceRow } from "../../lib/types";

interface InvoiceTableProps {
  invoices: InvoiceRow[];
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="w-[40px] pl-4">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                aria-label="Select all"
              />
            </TableHead>
            <TableHead className="min-w-[200px]">Invoice</TableHead>
            <TableHead className="min-w-[150px]">From</TableHead>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead className="w-[120px] text-right">Amount</TableHead>
            <TableHead className="w-[140px] text-right pr-4">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length === 0 ? (
            <InvoiceTableEmpty />
          ) : (
            <InvoiceTableRows invoices={invoices} />
          )}
        </TableBody>
      </Table>
    </div>
  );
}
