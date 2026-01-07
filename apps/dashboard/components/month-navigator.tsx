"use client";

import * as React from "react";

import { usePathname, useParams, useRouter } from "next/navigation";

import Link from "next/link";

import { getMonthInfo } from "@/lib/months";
import { useNavigationProgress } from "@/components/navigation-progress";
import { Separator } from "@mailtobills/ui/components/separator";

const buildMonthHref = (pathname: string, month: string) => {
  if (pathname.startsWith("/m/")) {
    return pathname.replace(/^\/m\/[^/]+/, `/m/${month}`);
  }

  return `/m/${month}`;
};

export const MonthNavigator = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ month?: string }>();
  const monthParam =
    typeof params.month === "string" ? params.month : undefined;
  const monthInfo = getMonthInfo(monthParam);
  const { navigate, isNavigating } = useNavigationProgress();

  const previous2 = getMonthInfo(monthInfo.previous).previous;
  const next2 = getMonthInfo(monthInfo.next).next;

  const previousHref = buildMonthHref(pathname, monthInfo.previous);
  const nextHref = buildMonthHref(pathname, monthInfo.next);
  const previous2Href = buildMonthHref(pathname, previous2);
  const next2Href = buildMonthHref(pathname, next2);

  React.useEffect(() => {
    // Prefetch a small window of months to reduce skeleton flashes when paging quickly.
    for (const href of [previousHref, nextHref, previous2Href, next2Href]) {
      router.prefetch(href);
    }
  }, [router, previousHref, nextHref, previous2Href, next2Href]);

  return (
    <section className="flex w-full flex-wrap items-center gap-3">
      <h1 className="absolute hidden text-base font-semibold tracking-tight text-foreground sm:block lg:text-xl">
        {monthInfo.label}
      </h1>
      <div className="bg-background mx-auto flex items-center overflow-hidden">
        <div className="bg-background flex items-center overflow-hidden rounded-lg border shadow-xs">
          <Link
            prefetch
            href={previousHref}
            aria-label="Previous month"
            aria-disabled={isNavigating}
            onClick={(event) => {
              if (isNavigating) return;
              event.preventDefault();
              navigate(previousHref);
            }}
            className="text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 inline-flex h-8 w-8 items-center justify-center transition outline-none focus-visible:ring-[3px] aria-disabled:pointer-events-none aria-disabled:opacity-50"
          >
            <ChevronLeftIcon />
          </Link>
          <Separator orientation="vertical" className="h-8" />
          {/* TODO: make this a datepicker */}
          <div className="text-foreground px-3 py-1 text-sm font-medium">
            {monthInfo.label}
          </div>
          <Separator orientation="vertical" className="h-8" />
          <Link
            href={nextHref}
            prefetch
            aria-label="Next month"
            aria-disabled={isNavigating}
            onClick={(event) => {
              if (isNavigating) return;
              event.preventDefault();
              navigate(nextHref);
            }}
            className="text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 inline-flex h-8 w-8 items-center justify-center transition outline-none focus-visible:ring-[3px] aria-disabled:pointer-events-none aria-disabled:opacity-50"
          >
            <ChevronRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};

const ChevronLeftIcon = () => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
