import { Button } from "@mailtobills/ui";
import { DashboardShell } from "./components/DashboardShell";
import { MonthNavigator } from "./components/MonthNavigator";
import { DashboardDataSection } from "./components/DashboardDataSection";
import { getMonthInfo } from "./lib/months";

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { month?: string };
}) {
  const monthInfo = getMonthInfo(searchParams.month);

  return (
    <DashboardShell
      headerAction={<Button>Export</Button>}
      monthNavigator={
        <MonthNavigator
          label={monthInfo.label}
          monthValue={monthInfo.value}
          previousMonth={monthInfo.previous}
          nextMonth={monthInfo.next}
        />
      }
    >
      <DashboardDataSection
        monthValue={monthInfo.value}
        monthLabel={monthInfo.label}
      />
    </DashboardShell>
  );
}
