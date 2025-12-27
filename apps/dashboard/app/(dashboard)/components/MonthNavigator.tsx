import Link from "next/link";

export type MonthNavigatorProps = {
  label: string;
  nextMonth: string;
  monthValue: string;
  previousMonth: string;
};

export const MonthNavigator = ({
  label,
  nextMonth,
  monthValue,
  previousMonth,
}: MonthNavigatorProps) => (
  <section className="flex flex-wrap items-center gap-3">
    <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
      {label}
    </h1>
    <div className="flex items-center gap-2">
      <Link
        href={`?month=${previousMonth}`}
        aria-label="Previous month"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        <ChevronLeftIcon />
      </Link>
      <Link
        href={`?month=${nextMonth}`}
        aria-label="Next month"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        <ChevronRightIcon />
      </Link>
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
        {monthValue}
      </span>
    </div>
  </section>
);

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
