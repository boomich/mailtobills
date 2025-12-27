import type { InvoiceRow as InvoiceRowType } from "@mailtobills/types";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@mailtobills/ui";
import { InvoiceTableEmpty } from "./InvoiceTableEmpty";
import { InvoiceTableRows } from "./InvoiceTableRows";

export type InvoiceTableProps = {
  invoices: InvoiceRowType[];
  monthLabel: string;
  isLoading?: boolean;
};

export const InvoiceTable = ({
  invoices,
  monthLabel,
  isLoading,
}: InvoiceTableProps) => (
  <Card className="overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <input
              type="checkbox"
              aria-label="Select all invoices"
              className="h-4 w-4 rounded border-slate-300 text-brand-600"
            />
          </TableHead>
          <TableHead>Invoice</TableHead>
          <TableHead>From</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="p-8">
              <InvoiceTableEmpty monthLabel={monthLabel} isLoading={isLoading} />
            </TableCell>
          </TableRow>
        ) : (
          <InvoiceTableRows invoices={invoices} />
        )}
      </TableBody>
    </Table>
  </Card>
);
