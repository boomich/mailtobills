import type { InvoiceRow as InvoiceRowType } from "@mailtobills/types";
import { InvoiceRow } from "./InvoiceRow";

export type InvoiceTableRowsProps = {
  invoices: InvoiceRowType[];
};

export const InvoiceTableRows = ({ invoices }: InvoiceTableRowsProps) => (
  <>
    {invoices.map((invoice) => (
      <InvoiceRow key={invoice.id} invoice={invoice} />
    ))}
  </>
);
