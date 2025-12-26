import type { InvoiceRow as InvoiceRowType } from "@mailtobills/types";
import { Badge, TableCell, TableRow } from "@mailtobills/ui";

export type InvoiceRowProps = {
  invoice: InvoiceRowType;
};

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const InvoiceRow = ({ invoice }: InvoiceRowProps) => {
  const receivedAt = invoice.receivedAt ?? invoice.createdAt;
  const statusLabel = invoice.fileUrl ? "Received" : "Missing file";
  const statusTone = invoice.fileUrl ? "success" : "warning";

  return (
    <TableRow className="cursor-pointer hover:bg-slate-50">
      <TableCell className="w-10">
        <input
          type="checkbox"
          aria-label={`Select ${invoice.originalFilename}`}
          className="h-4 w-4 rounded border-slate-300 text-brand-600"
        />
      </TableCell>
      <TableCell className="min-w-[220px] font-medium text-slate-900">
        <div className="flex items-center gap-3">
          <FileIcon />
          <span>{invoice.originalFilename}</span>
        </div>
      </TableCell>
      <TableCell className="text-slate-700">
        {invoice.fromEmail ?? "Unknown"}
      </TableCell>
      <TableCell className="text-slate-700">
        {formatDate(receivedAt)}
      </TableCell>
      <TableCell className="text-slate-900">—</TableCell>
      <TableCell>
        <Badge tone={statusTone}>{statusLabel}</Badge>
      </TableCell>
    </TableRow>
  );
};

const FileIcon = () => (
  <div className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500">
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  </div>
);
