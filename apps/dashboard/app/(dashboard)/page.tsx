import { DashboardShell } from "./components/DashboardShell";
import { normalizeMonthParam } from "./lib/month";

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { month?: string };
}) {
  const month = normalizeMonthParam(searchParams.month);

  return <DashboardShell month={month} />;
}
