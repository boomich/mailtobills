"use client";

import type { InvoiceRow as InvoiceRowType } from "@mailtobills/types";
import { Badge, TableCell, TableRow } from "@mailtobills/ui";
import { getInvoiceStatus } from "../lib/invoiceStatus";

export type InvoiceRowProps = {
  invoice: InvoiceRowType;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const formatDate = (timestamp: number) =>
  dateFormatter.format(new Date(timestamp));

export const InvoiceRow = ({ invoice }: InvoiceRowProps) => {
  const status = getInvoiceStatus(invoice);
  const date = formatDate(invoice.receivedAt ?? invoice.createdAt);

  const handleRowClick = () => {
    if (!invoice.fileUrl) {
      return;
    }

    window.open(invoice.fileUrl, "_blank", "noreferrer");
  };

  return (
    <TableRow
      className={
        invoice.fileUrl ? "cursor-pointer hover:bg-slate-50" : "bg-white"
      }
      onClick={handleRowClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleRowClick();
        }
      }}
      role={invoice.fileUrl ? "button" : undefined}
      tabIndex={invoice.fileUrl ? 0 : undefined}
    >
      <TableCell>
        <input type="checkbox" aria-label={`Select ${invoice.originalFilename}`} />
      </TableCell>
      <TableCell className="font-medium text-slate-900">
        {invoice.originalFilename}
      </TableCell>
      <TableCell className="text-slate-700">
        {invoice.fromEmail ?? "Unknown"}
      </TableCell>
      <TableCell className="text-slate-600">{date}</TableCell>
      <TableCell className="text-slate-600">—</TableCell>
      <TableCell>
        <Badge variant={status.variant}>{status.label}</Badge>
      </TableCell>
    </TableRow>
  );
};
