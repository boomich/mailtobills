"use client";

import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";

import { OnboardingEmptyState } from "@/components/onboarding-empty-state";
import { SendToAccountantDialog } from "@/components/send-to-accountant-dialog";
import { api } from "@/lib/convexClient";
import { percentDelta } from "@/features/expense-documents/read-model/transform";
import { useExpenseDocuments } from "@/features/expense-documents/read-model/useExpenseDocuments";
import { Skeleton } from "@mailtobills/ui/components/skeleton";

import { ExpenseDocumentsTable } from "./expense-documents-table";
import { ExpenseDocumentsTableSkeleton } from "./expense-documents-table-skeleton";
import { SealMonthDialog } from "./seal-month-dialog";

type ExpenseDocumentsMonthDataProps = {
  month: string;
  monthLabel: string;
  previousMonthLabel: string;
  locale: string;
};

function CollectionMonthStatsSkeleton() {
  return (
    <div
      aria-busy="true"
      className="flex flex-wrap gap-x-7 gap-y-1 border-b border-border px-5 py-3 sm:px-8"
    >
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-28" />
      <Skeleton className="ml-auto h-4 w-28" />
    </div>
  );
}

export function CollectionMonthExportActions({
  month,
  monthLabel,
}: Pick<ExpenseDocumentsMonthDataProps, "month" | "monthLabel">) {
  const t = useTranslations("CollectionMonth");
  const subscription = useQuery(api.subscriptions.getMySubscription);
  const viewer = useQuery(api.users.viewer);
  const isLoading = subscription === undefined || viewer === undefined;
  const isPro = !isLoading && subscription?.status === "active";

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <div className="flex flex-wrap gap-2.5">
        <SealMonthDialog month={month} monthLabel={monthLabel} />
        <SendToAccountantDialog
          month={month}
          monthLabel={monthLabel}
          isPro={isPro}
          accountantEmail={viewer?.accountantEmail ?? undefined}
          disabled={isLoading}
        />
      </div>
      {!isLoading && !isPro ? (
        <form action="/api/billing/checkout" method="post">
          <button
            type="submit"
            className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase underline decoration-primary underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("freeScheduleUpsell")}
          </button>
        </form>
      ) : null}
    </div>
  );
}

export function ExpenseDocumentsMonthData({
  month,
  monthLabel,
  previousMonthLabel,
  locale,
}: ExpenseDocumentsMonthDataProps) {
  const t = useTranslations("CollectionMonth");
  const tableT = useTranslations("ExpenseDocuments.table");
  const {
    documents,
    summary,
    previousSummary,
    exportSummary,
    totalCount,
    isLoading,
  } = useExpenseDocuments(month);

  if (!isLoading && totalCount === 0) {
    return <OnboardingEmptyState />;
  }

  const delta = percentDelta(summary.count, previousSummary.count);
  const deltaLabel =
    delta === null
      ? t("stats.new")
      : new Intl.NumberFormat(locale, {
          maximumFractionDigits: 0,
          signDisplay: "always",
          style: "percent",
        }).format(delta / 100);

  return (
    <>
      {isLoading ? (
        <CollectionMonthStatsSkeleton />
      ) : (
        <div className="flex flex-wrap gap-x-7 gap-y-1 border-b border-border px-5 py-3 font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase sm:px-8">
          <span>
            <span className="font-bold text-foreground">{summary.count}</span>{" "}
            {t("stats.collected")}
          </span>
          <span>
            <span className="font-bold text-foreground">
              {summary.attachmentCount}
            </span>{" "}
            {t("stats.pdfAttachments")}
          </span>
          <span>
            <span className="font-bold text-foreground">
              {exportSummary.includedDocumentCount}
            </span>{" "}
            {t("stats.primaryPdfs")}
          </span>
          <span className="ml-auto">
            {t("stats.vsPrevious", { month: previousMonthLabel })} · {deltaLabel}
          </span>
        </div>
      )}
      {isLoading ? (
        <ExpenseDocumentsTableSkeleton />
      ) : (
        <ExpenseDocumentsTable
          documents={documents}
          emptyLabel={tableT("emptyMonth", { month: monthLabel })}
        />
      )}
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-foreground px-5 py-4 sm:px-8">
        {isLoading ? (
          <Skeleton className="h-3 w-72 max-w-full" />
        ) : (
          <span className="font-mono text-[10.5px] tracking-[0.1em] text-muted-foreground uppercase">
            {t("exportContents", {
              count: exportSummary.includedDocumentCount,
            })}
          </span>
        )}
      </footer>
    </>
  );
}
