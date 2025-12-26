import Link from "next/link";
import { IconButton } from "@mailtobills/ui";

export type MonthNavigatorProps = {
  label: string;
  monthValue: string;
  previousMonth: string;
  nextMonth: string;
};

export const MonthNavigator = ({
  label,
  monthValue,
  previousMonth,
  nextMonth,
}: MonthNavigatorProps) => (
  <section className="flex flex-wrap items-center gap-3">
    <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
      {label}
    </h1>
    <div className="flex items-center gap-2">
      <Link href={`?month=${previousMonth}`} aria-label="Previous month">
        <IconButton icon={<ChevronLeftIcon />} />
      </Link>
      <Link href={`?month=${nextMonth}`} aria-label="Next month">
        <IconButton icon={<ChevronRightIcon />} />
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
