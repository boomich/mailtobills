"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { useLocale, useTranslations } from "next-intl";

import { api } from "@/lib/convexClient";
import { getDateLocale } from "@/lib/localized-format";

/*
 * The year register (DESIGN.md §7) — client-side on purpose: the counts
 * come from a Convex subscription, so month-to-month navigation inside a
 * year never refetches, year switches are cached after first visit, and
 * new collected documents update the counts live. Navigation is never
 * blocked on this data (the archive/v01 lesson).
 */
export function YearRegister({ activeMonth }: { activeMonth: string }) {
  const year = Number(activeMonth.slice(0, 4));
  const locale = useLocale();
  const t = useTranslations("YearRegister");
  const register = useQuery(api.expenseDocuments.getCollectionYearRegister, {
    year,
  });

  const now = new Date();
  const currentMonth = `${now.getUTCFullYear()}-${String(
    now.getUTCMonth() + 1,
  ).padStart(2, "0")}`;
  const currentYear = now.getUTCFullYear();
  const activeMonthNumber = activeMonth.slice(5, 7);
  const canGoPrevious =
    register === undefined ? false : year > register.earliestYear;
  const canGoNext = year < currentYear;
  const monthFormatter = new Intl.DateTimeFormat(getDateLocale(locale), {
    month: "short",
    timeZone: "UTC",
  });

  const stepperClass =
    "grid size-7 place-items-center border border-transparent font-mono text-[13px] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const stepperDisabledClass =
    "grid size-7 place-items-center font-mono text-[13px] text-muted-foreground/35";

  return (
    <nav
      aria-label={t("label")}
      className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-3 px-1"
    >
      <div className="flex items-center gap-1">
        {canGoPrevious ? (
          <Link
            href={`/m/${year - 1}-${activeMonthNumber}`}
            aria-label={t("previousYear")}
            className={stepperClass}
          >
            «
          </Link>
        ) : (
          <span aria-hidden className={stepperDisabledClass}>
            «
          </span>
        )}
        <span className="font-mono text-[15px] font-bold tracking-[0.06em]">
          {year}
        </span>
        {canGoNext ? (
          <Link
            href={`/m/${year + 1}-${activeMonthNumber}`}
            aria-label={t("nextYear")}
            className={stepperClass}
          >
            »
          </Link>
        ) : (
          <span aria-hidden className={stepperDisabledClass}>
            »
          </span>
        )}
      </div>
      <span aria-hidden className="h-5 w-px bg-foreground/25 max-sm:hidden" />
      <div className="grid flex-1 grid-cols-6 gap-x-1 gap-y-2 sm:flex sm:flex-wrap sm:gap-x-0.5">
        {Array.from({ length: 12 }, (_, monthIndex) => {
          const month = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
          const isActive = month === activeMonth;
          const isFuture = month > currentMonth;
          const count = register?.counts[monthIndex];
          const label = monthFormatter
            .format(new Date(Date.UTC(year, monthIndex, 1)))
            .replace(".", "")
            .toUpperCase();

          if (isFuture) {
            return (
              <span
                key={month}
                aria-disabled="true"
                className="flex flex-col items-center gap-0.5 border-b-2 border-transparent px-2.5 pt-1 pb-1.5 font-display text-[12.5px] font-bold tracking-[0.1em] text-muted-foreground/40 uppercase [font-stretch:86%] sm:px-3"
              >
                {label}
                <span className="font-mono text-[9.5px] leading-none font-normal">
                  —
                </span>
              </span>
            );
          }

          return (
            <Link
              key={month}
              href={`/m/${month}`}
              aria-current={isActive ? "page" : undefined}
              aria-label={t("month", { month: label, count: count ?? 0 })}
              className={
                "flex flex-col items-center gap-0.5 border-b-2 px-2.5 pt-1 pb-1.5 font-display text-[12.5px] font-bold tracking-[0.1em] uppercase [font-stretch:86%] transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:px-3 " +
                (isActive
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:border-foreground/25 hover:text-foreground")
              }
            >
              {label}
              <span className="font-mono text-[9.5px] leading-none font-normal">
                {count ?? "·"}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
