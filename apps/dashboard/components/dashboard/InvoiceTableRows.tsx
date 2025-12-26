import * as React from "react";
import { InvoiceRow } from "./InvoiceRow";
import { InvoiceRow as InvoiceRowType } from "../../lib/types";

interface InvoiceTableRowsProps {
  invoices: InvoiceRowType[];
}

export function InvoiceTableRows({ invoices }: InvoiceTableRowsProps) {
  return (
    <>
      {invoices.map((invoice) => (
        <InvoiceRow key={invoice.id} invoice={invoice} />
      ))}
    </>
  );
}
