import type { ReactNode } from "react";

import { Check, Inbox, Mail } from "lucide-react";

import { getMonthInfo } from "@/lib/months";
import { getInvoices } from "@/lib/invoices/getInvoices";
import { Button } from "@mailtobills/ui/components/button";
import { Card, CardContent } from "@mailtobills/ui/components/card";
import { OnboardingEmptyState } from "@/components/onboarding-empty-state";
import { InvoicesTable } from "@/components/invoices-table";

function SummaryCard({
  icon,
  title,
  value,
  action,
  className,
  iconClassName,
}: {
  title: string;
  value: number;
  icon: ReactNode;
  action?: ReactNode;
  className?: string;
  iconClassName: string;
}) {
  return (
    <Card className={className}>
      <CardContent className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`flex size-11 items-center justify-center rounded-xl ${iconClassName}`}
          >
            {icon}
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground text-sm">{title}</div>
            <div className="text-3xl font-semibold leading-none">{value}</div>
          </div>
        </div>
        {action}
      </CardContent>
    </Card>
  );
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ month: string }>;
}) {
  const { month } = await params;
  const monthInfo = getMonthInfo(month);
  const { summary, totalCount, invoices } = await getInvoices(monthInfo.value);

  if (totalCount === 0) {
    return <OnboardingEmptyState />;
  }

  const markedAsPaid = Math.max(0, summary.count - summary.unreviewedCount);

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <SummaryCard
          title="Invoices added"
          value={summary.count}
          icon={<Mail className="size-5" />}
          iconClassName="bg-primary/10 text-primary"
          className="md:col-span-1"
        />
        <SummaryCard
          title="Marked as paid"
          value={markedAsPaid}
          icon={<Check className="size-5" />}
          iconClassName="bg-emerald-500/10 text-emerald-600 dark:text-emerald-500"
          className="md:col-span-1"
        />
        <SummaryCard
          title="Left to review"
          value={summary.unreviewedCount}
          icon={<Inbox className="size-5" />}
          iconClassName="bg-primary/10 text-primary"
          action={<Button type="button">Review inbox</Button>}
          className="md:col-span-2"
        />
      </div>
      <InvoicesTable
        invoices={invoices}
        emptyLabel={`Nothing to review in ${monthInfo.label}.`}
      />
    </>
  );
}
