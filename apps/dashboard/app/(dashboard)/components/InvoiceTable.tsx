"use client";

import type { InvoiceRow as InvoiceRowType } from "@mailtobills/types";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@mailtobills/ui";
import { InvoiceTableEmpty } from "./InvoiceTableEmpty";
import { InvoiceTableRows } from "./InvoiceTableRows";

export type InvoiceTableProps = {
  invoices: InvoiceRowType[];
  isLoading?: boolean;
};

export const InvoiceTable = ({ invoices, isLoading }: InvoiceTableProps) => {
  const isEmpty = invoices.length === 0;

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">
                  <input type="checkbox" aria-label="Select all invoices" />
                </TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isEmpty ? (
                <InvoiceTableEmpty
                  title={isLoading ? "Loading invoices" : "No invoices for this month"}
                  description={
                    isLoading
                      ? "Connecting to your workspace."
                      : "Forward a PDF to your MailToBills inbox to see it here."
                  }
                />
              ) : (
                <InvoiceTableRows invoices={invoices} />
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
