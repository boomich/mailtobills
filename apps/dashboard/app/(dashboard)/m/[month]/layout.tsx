import { YearRegister } from "@/components/year-register";
import { getCollectionMonthRoute } from "@/lib/collection-month-route";

/* No data fetch here on purpose: the register subscribes client-side, so
   month/year navigation is never blocked on counting documents. */
export default async function MonthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ month: string }>;
}) {
  const { month } = await params;
  const monthInfo = getCollectionMonthRoute(month);

  return (
    <div className="min-w-0">
      <YearRegister activeMonth={monthInfo.value} />
      {children}
    </div>
  );
}
