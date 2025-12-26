import * as React from "react";
import { TableRow, TableCell, EmptyState, Button } from "@mailtobills/ui";
import { Upload } from "lucide-react";

export function InvoiceTableEmpty() {
  return (
    <TableRow>
      <TableCell colSpan={6} className="h-[400px]">
        <EmptyState
          title="No invoices yet"
          description="We haven't received any invoices for this month. Forward them to your inbox or upload manually."
          action={
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Invoice
            </Button>
          }
          className="border-none shadow-none"
        />
      </TableCell>
    </TableRow>
  );
}
