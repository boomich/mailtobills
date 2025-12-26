"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format, addMonths, subMonths, parse } from "date-fns";
import { IconButton } from "@mailtobills/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function MonthNavigator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentMonthStr = searchParams.get("month") || format(new Date(), "yyyy-MM");
  const currentDate = parse(currentMonthStr, "yyyy-MM", new Date());

  const handlePrevMonth = () => {
    const prev = subMonths(currentDate, 1);
    const params = new URLSearchParams(searchParams);
    params.set("month", format(prev, "yyyy-MM"));
    router.push(`?${params.toString()}`);
  };

  const handleNextMonth = () => {
    const next = addMonths(currentDate, 1);
    const params = new URLSearchParams(searchParams);
    params.set("month", format(next, "yyyy-MM"));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <h2 className="text-2xl font-bold text-slate-900">
        {format(currentDate, "MMMM yyyy")}
      </h2>
      <div className="flex items-center gap-1 ml-2">
        <IconButton
          icon={<ChevronLeft className="h-4 w-4" />}
          onClick={handlePrevMonth}
          aria-label="Previous month"
        />
        <IconButton
          icon={<ChevronRight className="h-4 w-4" />}
          onClick={handleNextMonth}
          aria-label="Next month"
        />
      </div>
    </div>
  );
}
