import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

import { getDateLocale } from "@/lib/localized-format";

export async function YearRegister({
  year,
  activeMonth,
  counts,
  earliestYear,
}: {
  year: number;
  activeMonth: string;
  counts: number[];
  earliestYear: number;
}) {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("YearRegister"),
  ]);
  const now = new Date();
  const currentMonth = `${now.getUTCFullYear()}-${String(
    now.getUTCMonth() + 1,
  ).padStart(2, "0")}`;
  const currentYear = Number(currentMonth.slice(0, 4));
  const activeMonthIndex = Number(activeMonth.slice(5, 7)) - 1;
  const canGoPrevious = year > earliestYear;
  const canGoNext = year < currentYear;
  const previousHref = `/m/${year - 1}-${String(activeMonthIndex + 1).padStart(2, "0")}`;
  const nextHref = `/m/${year + 1}-${String(activeMonthIndex + 1).padStart(2, "0")}`;
  const monthFormatter = new Intl.DateTimeFormat(getDateLocale(locale), {
    month: "short",
    timeZone: "UTC",
  });

  return (
    <nav aria-label={t("label")} className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-3 px-1">
      <div className="flex items-center gap-1">
        {canGoPrevious ? (
          <Link href={previousHref} aria-label={t("previousYear")} className="grid size-7 place-items-center border border-transparent font-mono text-[13px] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            «
          </Link>
        ) : (
          <span aria-hidden className="grid size-7 place-items-center font-mono text-[13px] text-muted-foreground/35">«</span>
        )}
        <span className="font-mono text-[15px] font-bold tracking-[0.06em]">{year}</span>
        {canGoNext ? (
          <Link href={nextHref} aria-label={t("nextYear")} className="grid size-7 place-items-center border border-transparent font-mono text-[13px] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            »
          </Link>
        ) : (
          <span aria-hidden className="grid size-7 place-items-center font-mono text-[13px] text-muted-foreground/35">»</span>
        )}
      </div>
      <span aria-hidden className="h-5 w-px bg-foreground/25 max-sm:hidden" />
      <div className="grid flex-1 grid-cols-6 gap-x-1 gap-y-2 sm:flex sm:flex-wrap sm:gap-x-0.5">
        {Array.from({ length: 12 }, (_, monthIndex) => {
          const month = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
          const isActive = month === activeMonth;
          const isFuture = month > currentMonth;
          const label = monthFormatter
            .format(new Date(Date.UTC(year, monthIndex, 1)))
            .replace(".", "")
            .toUpperCase();
          const className = "flex flex-col items-center gap-0.5 border-b-2 px-2.5 pt-1 pb-1.5 font-display text-[12.5px] font-bold tracking-[0.1em] uppercase [font-stretch:86%] transition-colors sm:px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
            (isActive
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:border-foreground/25 hover:text-foreground");

          if (isFuture) {
            return (
              <span key={month} aria-disabled="true" className="flex flex-col items-center gap-0.5 border-b-2 border-transparent px-2.5 pt-1 pb-1.5 font-display text-[12.5px] font-bold tracking-[0.1em] text-muted-foreground/40 uppercase [font-stretch:86%] sm:px-3">
                {label}
                <span className="font-mono text-[9.5px] leading-none font-normal">—</span>
              </span>
            );
          }

          return (
            <Link key={month} href={`/m/${month}`} aria-current={isActive ? "page" : undefined} aria-label={t("month", { month: label, count: counts[monthIndex] ?? 0 })} className={className}>
              {label}
              <span className="font-mono text-[9.5px] leading-none font-normal">{counts[monthIndex] ?? 0}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
