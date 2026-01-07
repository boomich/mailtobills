"use client";

import type { InvoiceRow } from "@mailtobills/types";

import { Button } from "@mailtobills/ui/components/button";
import { Card, CardContent } from "@mailtobills/ui/components/card";
import { Skeleton } from "@mailtobills/ui/components/skeleton";

const getSenderName = (invoice: InvoiceRow) => {
  const email = invoice.fromEmail;
  if (email?.includes("@")) {
    const domain = email.split("@")[1]?.split(".")[0];
    if (domain) return domain.charAt(0).toUpperCase() + domain.slice(1);
  }

  const fallback = invoice.subject?.trim() || invoice.originalFilename;
  return fallback.length
    ? fallback.charAt(0).toUpperCase() + fallback.slice(1)
    : "Unknown";
};

const formatAddedOn = (timestamp: number) => {
  const date = new Date(timestamp);
  const now = new Date();
  const isSameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isSameDay) return "Today";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

function StatusPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-400">
      {label}
    </span>
  );
}

export function InvoicesTable({
  invoices,
  emptyLabel,
}: {
  invoices: InvoiceRow[];
  emptyLabel: string;
}) {
  if (invoices.length === 0) {
    return (
      <Card className="py-0">
        <CardContent className="min-h-[340px] py-10 text-center flex flex-col items-center justify-center">
          <div className="text-sm font-medium">No invoices</div>
          <div className="text-muted-foreground mt-1 text-sm">{emptyLabel}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-sm">
            <colgroup>
              <col className="w-[260px]" />
              <col />
              <col className="w-[140px]" />
              <col className="w-[140px]" />
              <col className="w-[140px]" />
            </colgroup>
            <thead className="bg-muted/20 text-muted-foreground">
              <tr className="[&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-medium">
                <th>Sender</th>
                <th className="sr-only">Invoice</th>
                <th className="border-l">Added on</th>
                <th className="border-l">Status</th>
                <th className="border-l text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {invoices.map((invoice) => {
                const sender = getSenderName(invoice);
                const details = invoice.subject || invoice.originalFilename;
                const addedOn = formatAddedOn(invoice.receivedAt);
                const fileUrl = invoice.fileUrl;

                return (
                  <tr
                    key={invoice.id}
                    className="hover:bg-muted/30 [&>td]:px-4 [&>td]:py-3"
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-lg text-xs font-semibold">
                          {sender.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-medium">{sender}</div>
                      </div>
                    </td>
                    <td className="text-muted-foreground max-w-[38rem] truncate">
                      {details}
                    </td>
                    <td className="text-muted-foreground whitespace-nowrap border-l">
                      {addedOn}
                    </td>
                    <td className="border-l">
                      <StatusPill label="Unreviewed" />
                    </td>
                    <td className="text-right border-l">
                      {fileUrl ? (
                        <Button asChild variant="outline" size="sm">
                          <a href={fileUrl} target="_blank" rel="noreferrer">
                            View PDF
                          </a>
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          View PDF
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export function InvoicesTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <Card className="gap-0 overflow-hidden py-0">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-sm">
            <colgroup>
              <col className="w-[260px]" />
              <col />
              <col className="w-[140px]" />
              <col className="w-[140px]" />
              <col className="w-[140px]" />
            </colgroup>
            <thead className="bg-muted/20 text-muted-foreground">
              <tr className="[&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-medium">
                <th>Sender</th>
                <th className="sr-only">Invoice</th>
                <th className="border-l">Added on</th>
                <th className="border-l">Status</th>
                <th className="border-l text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {Array.from({ length: rows }).map((_, idx) => (
                <tr key={idx} className="[&_td]:px-4 [&_td]:py-3">
                  <td>
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-9 rounded-lg" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </td>
                  <td>
                    <Skeleton className="h-4 w-[22rem] max-w-full" />
                  </td>
                  <td className="border-l">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="border-l">
                    <Skeleton className="h-6 w-20 rounded-md" />
                  </td>
                  <td className="flex justify-end border-l">
                    <Skeleton className="h-8 w-20 rounded-md" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
