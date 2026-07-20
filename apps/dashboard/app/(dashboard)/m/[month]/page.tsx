import { getLocale, getTranslations } from "next-intl/server";

import { getMonthInfo } from "@/lib/months";
import {
  CollectionMonthExportActions,
  ExpenseDocumentsMonthData,
} from "@/features/expense-documents/components/expense-documents-month-data";
import { formatCollectionMonthLabel } from "@/lib/localized-format";
import { getCollectionMonthRoute } from "@/lib/collection-month-route";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ month: string }>;
}) {
  const { month } = await params;
  const monthInfo = getCollectionMonthRoute(month);
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("CollectionMonth"),
  ]);

  const previousShortLabel = formatCollectionMonthLabel(
    getMonthInfo(monthInfo.previous).start,
    locale,
    "short",
  );
  const monthLabel = formatCollectionMonthLabel(monthInfo.start, locale);
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
        <CollectionMonthExportActions
          month={monthInfo.value}
          monthLabel={monthLabel}
        />
      </header>
      <ExpenseDocumentsMonthData
        month={monthInfo.value}
        monthLabel={monthLabel}
        previousMonthLabel={previousShortLabel}
        locale={locale}
      />
    </section>
  );
}
