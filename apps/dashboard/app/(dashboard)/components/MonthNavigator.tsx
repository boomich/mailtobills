import Link from "next/link";
import { IconButton } from "@mailtobills/ui";
import { addMonths, getMonthLabel } from "../lib/month";

export type MonthNavigatorProps = {
  month: string;
};

const ArrowLeftIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden
    className="h-4 w-4"
  >
    <path
      d="M12.5 5 7.5 10l5 5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden
    className="h-4 w-4"
  >
    <path
      d="m7.5 5 5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden
    className="h-4 w-4 text-slate-500"
  >
    <path
      d="m5 7.5 5 5 5-5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MonthNavigator = ({ month }: MonthNavigatorProps) => {
  const prevMonth = addMonths(month, -1);
  const nextMonth = addMonths(month, 1);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-2xl font-semibold">
        <span>{getMonthLabel(month)}</span>
        <ChevronDownIcon />
      </div>
      <div className="flex items-center gap-2">
        <IconButton asChild aria-label="Previous month">
          <Link href={`?month=${prevMonth}`}>
            <ArrowLeftIcon />
          </Link>
        </IconButton>
        <IconButton asChild aria-label="Next month">
          <Link href={`?month=${nextMonth}`}>
            <ArrowRightIcon />
          </Link>
        </IconButton>
      </div>
    </div>
  );
};
