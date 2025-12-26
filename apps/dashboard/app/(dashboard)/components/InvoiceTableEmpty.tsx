import { EmptyState, TableCell, TableRow } from "@mailtobills/ui";

export type InvoiceTableEmptyProps = {
  title: string;
  description?: string;
};

export const InvoiceTableEmpty = ({
  title,
  description,
}: InvoiceTableEmptyProps) => (
  <TableRow>
    <TableCell colSpan={6} className="py-10">
      <EmptyState title={title} description={description} />
    </TableCell>
  </TableRow>
);
