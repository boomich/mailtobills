import { getLocale, getTranslations } from "next-intl/server";

import { getMonthInfo } from "@/lib/months";
import { ExpenseDocumentsTable } from "@/features/expense-documents/components/expense-documents-table";
import { getExpenseDocuments } from "@/features/expense-documents/read-model/getExpenseDocuments";
import { percentDelta } from "@/features/expense-documents/read-model/transform";
import { formatCollectionMonthLabel } from "@/lib/localized-format";
import { Button } from "@mailtobills/ui/components/button";
import { OnboardingEmptyState } from "@/components/onboarding-empty-state";
import { SendToAccountantButton } from "@/components/send-to-accountant-button";
import { getCollectionMonthRoute } from "@/lib/collection-month-route";
import { requireCurrentCustomer } from "@/features/customer/read-model/getCurrentCustomer";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ month: string }>;
}) {
  const { month } = await params;
  const monthInfo = getCollectionMonthRoute(month);
  const [
    { summary, previousSummary, exportSummary, totalCount, documents },
    { customer },
    locale,
    t,
    tableT,
  ] = await Promise.all([
    getExpenseDocuments(monthInfo.value),
    requireCurrentCustomer(),
    getLocale(),
    getTranslations("CollectionMonth"),
    getTranslations("ExpenseDocuments.table"),
  ]);

  if (totalCount === 0) {
    return <OnboardingEmptyState />;
  }

  const previousShortLabel = formatCollectionMonthLabel(
    getMonthInfo(monthInfo.previous).start,
    locale,
    "short",
  );
  const monthLabel = formatCollectionMonthLabel(monthInfo.start, locale);
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
    <section className="relative border border-foreground bg-background shadow-[8px_8px_0_0_oklch(0.27_0.025_268/0.12)]">
      <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-b-2 border-foreground px-5 pt-7 pb-6 sm:px-8">
        <div>
          <div className="mb-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            {t("registrationLine", { month: monthInfo.value })}
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-[-0.01em] [font-stretch:112%] sm:text-5xl">
            {monthLabel}
          </h1>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <div className="flex flex-wrap gap-2.5">
            <Button asChild variant="outline">
              <a href={`/api/exports/${monthInfo.value}`}>{t("downloadZip")}</a>
            </Button>
            <SendToAccountantButton
              month={monthInfo.value}
              isPro={customer.plan === "pro"}
              accountantEmail={customer.accountantAddress ?? undefined}
            />
          </div>
          {customer.plan === "free" ? (
            <form action="/api/billing/checkout" method="post">
              <button type="submit" className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase underline decoration-primary underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {t("freeScheduleUpsell")}
              </button>
            </form>
          ) : null}
        </div>
      </header>
      <div className="flex flex-wrap gap-x-7 gap-y-1 border-b border-border px-5 py-3 font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase sm:px-8">
        <span><span className="font-bold text-foreground">{summary.count}</span> {t("stats.collected")}</span>
        <span><span className="font-bold text-foreground">{summary.attachmentCount}</span> {t("stats.pdfAttachments")}</span>
        <span><span className="font-bold text-foreground">{exportSummary.includedDocumentCount}</span> {t("stats.primaryPdfs")}</span>
        <span className="ml-auto">{t("stats.vsPrevious", { month: previousShortLabel })} · {deltaLabel}</span>
      </div>
      <ExpenseDocumentsTable
        documents={documents}
        emptyLabel={tableT("emptyMonth", {
          month: monthLabel,
        })}
      />
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-foreground px-5 py-4 sm:px-8">
        <span className="font-mono text-[10.5px] tracking-[0.1em] text-muted-foreground uppercase">
          {t("exportContents", { count: exportSummary.includedDocumentCount })}
        </span>
      </footer>
    </section>
  );
}
