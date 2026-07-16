import { YearRegister } from "@/components/year-register";
import { getCollectionYearRegister } from "@/features/expense-documents/read-model/getCollectionYearRegister";
import { getCollectionMonthRoute } from "@/lib/collection-month-route";

export default async function MonthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ month: string }>;
}) {
  const { month } = await params;
  const monthInfo = getCollectionMonthRoute(month);
  const { counts, earliestYear } = await getCollectionYearRegister(
    monthInfo.start.getUTCFullYear(),
  );

  return (
    <div className="min-w-0">
      <YearRegister
        year={monthInfo.start.getUTCFullYear()}
        activeMonth={monthInfo.value}
        counts={counts}
        earliestYear={earliestYear}
      />
      {children}
    </div>
  );
}
