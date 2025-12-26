import * as React from "react";
import { format } from "date-fns";
import { FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { TableRow, TableCell, Badge, cn } from "@mailtobills/ui";
import { InvoiceRow as InvoiceRowType } from "../../lib/types";

interface InvoiceRowProps {
  invoice: InvoiceRowType;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export function InvoiceRow({ invoice, selected, onSelect }: InvoiceRowProps) {
  const statusConfig = {
    reviewed: {
      icon: CheckCircle,
      color: "text-green-600",
      badge: "success",
      label: null, // Just icon
    },
    unreviewed: {
      icon: Clock,
      color: "text-blue-600",
      badge: "secondary", // Or custom style
      label: "Unreviewed",
    },
    missing_vat: {
      icon: AlertTriangle,
      color: "text-amber-600",
      badge: "warning",
      label: "Missing VAT ID",
    },
  };

  const status = invoice.status || "reviewed";
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <TableRow className="group">
      <TableCell className="w-[40px]">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
          checked={selected}
          onChange={() => onSelect?.(invoice.id)}
        />
      </TableCell>
      <TableCell className="font-medium">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
             <FileText className="h-4 w-4" />
          </div>
          <a href={invoice.fileUrl} className="hover:underline text-slate-900 truncate max-w-[200px]" title={invoice.originalFilename}>
            {invoice.originalFilename}
          </a>
        </div>
      </TableCell>
      <TableCell className="text-slate-600">
        {invoice.fromEmail ? (
             <span title={invoice.fromEmail}>
                {invoice.subject || invoice.fromEmail.split('@')[0]}
             </span>
        ) : (
            <span className="text-slate-400 italic">Unknown sender</span>
        )}
      </TableCell>
      <TableCell className="text-slate-600 whitespace-nowrap">
        {format(invoice.receivedAt, "MMM d")}
      </TableCell>
      <TableCell className="font-medium text-slate-900 text-right">
        {invoice.amount || "—"}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end">
            {config.label ? (
                <Badge variant={config.badge as any} className="flex w-fit items-center gap-1">
                    <StatusIcon className="h-3 w-3" />
                    {config.label}
                </Badge>
            ) : (
                <div className={cn("flex items-center justify-center w-8 h-8 rounded-full bg-green-50", config.color)}>
                     <StatusIcon className="h-4 w-4" />
                </div>
            )}
        </div>
      </TableCell>
    </TableRow>
  );
}
